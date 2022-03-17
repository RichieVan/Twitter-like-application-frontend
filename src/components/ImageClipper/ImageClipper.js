import React from 'react';

import cutImageAndGenerateUrl from '../../lib/cutImageAndGenerateUrl';
import Button from '../Button/Button';

class ImageClipper extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.image = React.createRef();
    this.cutArea = React.createRef();
    this.shiftX = 0;
    this.shiftY = 0;

    this.state = {
      correction: false,
      moving: false,
      scale: 1,
    };
  }

  componentDidMount() {
    this.image.current.onload = () => {
      const initialWidth = this.image.current.getBoundingClientRect().width;
      const initialHeight = this.image.current.getBoundingClientRect().height;
      const ratio = initialWidth / initialHeight;

      if (ratio >= 1) {
        this.image.current.style.height = `${this.cutArea.current.getBoundingClientRect().height} px`;
        this.image.current.style.width = `${this.cutArea.current.getBoundingClientRect().height * ratio} px`;
      } else {
        this.image.current.style.width = `${this.cutArea.current.getBoundingClientRect().width}px`;
        this.image.current.style.height = `${this.cutArea.current.getBoundingClientRect().width / ratio}px`;
      }

      this.image.current.style.left = `${(this.container.current.getBoundingClientRect().width - this.image.current.getBoundingClientRect().width / this.state.scale) / 2}px`;
      this.image.current.style.top = `${(this.container.current.getBoundingClientRect().height - this.image.current.getBoundingClientRect().height / this.state.scale) / 2}px`;
    };
  }

  componentDidUpdate() {
    if (this.state.correction) {
      const imageCoordinates = this.image.current.getBoundingClientRect();
      console.log(this.image.current.style.left);
      this.moveAt(
        Number(this.image.current.style.left.substring(0, this.image.current.style.left.length - 2)),
        Number(this.image.current.style.top.substring(0, this.image.current.style.top.length - 2)),
        imageCoordinates.width,
        imageCoordinates.height,
      );

      this.setState((prevState) => Object.assign(prevState, {
        correction: false,
      }));
    }
  }

  calculateBorders = () => {
    const cutAreaCooordinates = this.cutArea.current.getBoundingClientRect();
    const containerCooordinates = this.container.current.getBoundingClientRect();
    const imageCoordinates = this.image.current.getBoundingClientRect();

    const leftCutAreaOffset = cutAreaCooordinates.left - containerCooordinates.left;
    const halfImageWidth = imageCoordinates.width / 2;
    const imageOuterOffsetWidth = halfImageWidth - halfImageWidth / this.state.scale;

    const topCutAreaOffset = cutAreaCooordinates.top - containerCooordinates.top;
    const halfImageHeight = imageCoordinates.height / 2;
    const imageOuterOffsetHeight = halfImageHeight - halfImageHeight / this.state.scale;

    return {
      left: leftCutAreaOffset + imageOuterOffsetWidth,
      right: leftCutAreaOffset + imageOuterOffsetWidth + cutAreaCooordinates.width,
      top: topCutAreaOffset + imageOuterOffsetHeight,
      bottom: topCutAreaOffset + imageOuterOffsetHeight + cutAreaCooordinates.height,
    };
  };

  moveAt = (x, y, width, height, borders = this.calculateBorders()) => {
    if (x + width < borders.right) {
      this.image.current.style.left = `${borders.right - width}px`;
    } else if (x > borders.left) {
      this.image.current.style.left = `${borders.left}px`;
    } else {
      this.image.current.style.left = `${x}px`;
    }

    if (y + height < borders.bottom) {
      this.image.current.style.top = `${borders.bottom - height}px`;
    } else if (y > borders.top) {
      this.image.current.style.top = `${borders.top}px`;
    } else {
      this.image.current.style.top = `${y}px`;
    }
  };

  containerMouseMoveHandler = (e) => {
    if (this.state.moving) {
      const containerCooordinates = this.container.current.getBoundingClientRect();
      const imageCoordinates = this.image.current.getBoundingClientRect();

      const halfImageWidth = imageCoordinates.width / 2;
      const imageOuterOffsetWidth = halfImageWidth - halfImageWidth / this.state.scale;

      const halfImageHeight = imageCoordinates.height / 2;
      const imageOuterOffsetHeight = halfImageHeight - halfImageHeight / this.state.scale;

      this.moveAt(
        e.pageX - containerCooordinates.left - this.shiftX + imageOuterOffsetWidth,
        e.pageY - containerCooordinates.top - this.shiftY + imageOuterOffsetHeight,
        imageCoordinates.width,
        imageCoordinates.height,
      );
    }
  };

  containerMouseLeaveHandler = () => {
    this.setState({ moving: false });
  };

  imageMouseDownHandler = (e) => {
    this.shiftX = e.clientX - this.image.current.getBoundingClientRect().left;
    this.shiftY = e.clientY - this.image.current.getBoundingClientRect().top;

    this.setState((prevState) => Object.assign(prevState, {
      moving: true,
    }));
  };

  imageMouseUpHandler = () => {
    this.setState({ moving: false });
  };

  rangeChangeHandler = (e) => {
    this.setState((prevState) => Object.assign(prevState, {
      correction: true,
      scale: e.target.value,
    }));
  };

  cancelButtonClickHandler = () => {
    this.props.fileUrlHandler(null);
  };

  saveButtonClickHandler = () => {
    const cutAreaCooordinates = this.cutArea.current.getBoundingClientRect();
    const imageCoordinates = this.image.current.getBoundingClientRect();

    const imageUrl = cutImageAndGenerateUrl({
      image: this.image.current,
      sWidth: imageCoordinates.width,
      sHeight: imageCoordinates.height,
      dx: imageCoordinates.left - cutAreaCooordinates.left,
      dy: imageCoordinates.top - cutAreaCooordinates.top,
      dWidth: cutAreaCooordinates.width,
      dHeight: cutAreaCooordinates.height,
    });
    this.props.fileUrlHandler(imageUrl);
  };

  render() {
    return (
      <div className="image-clipper">
        <div
          className="image-clipper__container"
          ref={this.container}
          onMouseMove={(e) => this.containerMouseMoveHandler(e)}
          onMouseLeave={() => this.containerMouseLeaveHandler()}
        >
          <img
            src={this.props.link}
            ref={this.image}
            className='image-clipper__image'
            style={{ transform: `scale(${this.state.scale})` }}
            onDragStart={() => false}
            draggable={false}
            onMouseDown={(e) => this.imageMouseDownHandler(e)}
            onMouseUp={() => this.imageMouseUpHandler()}
          />
          <div
            className="image-clipper__cut-area"
            ref={this.cutArea}
          />
        </div>
        <div className="image-clipper__range">
          <input
            type="range"
            className='image-clipper__range-input'
            value={this.state.scale}
            min="1"
            max="2"
            step="0.001"
            onChange={(e) => this.rangeChangeHandler(e)}
          />
        </div>
        <div className="buttons-container">
          <Button
            mods={['error']}
            clickHandler={this.cancelButtonClickHandler}
          >
            Отменить
          </Button>
          <Button
            mods={['fill', 'success']}
            clickHandler={this.saveButtonClickHandler}
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageClipper;
