import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';

import cutImageAndGenerateUrl from '../../lib/cutImageAndGenerateUrl/cutImageAndGenerateUrl';
import Button from '../Button/Button';
import {
  BordersObject,
  ImageClipperProps,
  MoveAtProps,
} from './types';

const ImageClipper: FC<ImageClipperProps> = ({
  link,
  fileUrlHandler,
}) => {
  const [correction, setCorrection] = useState(false);
  const [moving, setMoving] = useState(false);
  const [scale, setScale] = useState(1);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);

  const container = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const cutArea = useRef<HTMLDivElement>(null);
  const isFirstLoading = useRef(true);

  const calculateBorders = (): BordersObject => {
    const cutAreaCooordinates = cutArea.current!.getBoundingClientRect();
    const containerCooordinates = container.current!.getBoundingClientRect();
    const imageCoordinates = image.current!.getBoundingClientRect();

    const leftCutAreaOffset = cutAreaCooordinates.left - containerCooordinates.left;
    const halfImageWidth = imageCoordinates.width / 2;
    const imageOuterOffsetWidth = halfImageWidth - halfImageWidth / scale;

    const topCutAreaOffset = cutAreaCooordinates.top - containerCooordinates.top;
    const halfImageHeight = imageCoordinates.height / 2;
    const imageOuterOffsetHeight = halfImageHeight - halfImageHeight / scale;

    return {
      left: leftCutAreaOffset + imageOuterOffsetWidth,
      right: leftCutAreaOffset + imageOuterOffsetWidth + cutAreaCooordinates.width,
      top: topCutAreaOffset + imageOuterOffsetHeight,
      bottom: topCutAreaOffset + imageOuterOffsetHeight + cutAreaCooordinates.height,
    };
  };

  const moveAt = ({
    x,
    y,
    width,
    height,
    borders = calculateBorders(),
  }: MoveAtProps): void => {
    if (image.current) {
      if (x + width < borders.right) {
        image.current.style.left = `${borders.right - width}px`;
      } else if (x > borders.left) {
        image.current.style.left = `${borders.left}px`;
      } else {
        image.current.style.left = `${x}px`;
      }

      if (y + height < borders.bottom) {
        image.current.style.top = `${borders.bottom - height}px`;
      } else if (y > borders.top) {
        image.current.style.top = `${borders.top}px`;
      } else {
        image.current.style.top = `${y}px`;
      }
    }
  };

  useEffect(() => {
    if (isFirstLoading.current) {
      isFirstLoading.current = false;

      if (image.current && cutArea.current && container.current) {
        const currentImage = image.current;
        const currentCutArea = image.current;
        const currentContainer = container.current;

        currentImage.onload = () => {
          const imageWidth = currentImage.getBoundingClientRect().width;
          const imageHeight = currentImage.getBoundingClientRect().height;
          const initialWidth = imageWidth;
          const initialHeight = imageHeight;
          const ratio = initialWidth / initialHeight;

          if (ratio >= 1) {
            const cutAreaHeight = currentCutArea.getBoundingClientRect().height;
            currentImage.style.height = `${cutAreaHeight}px`;
            currentImage.style.width = `${cutAreaHeight * ratio}px`;
          } else {
            const cutAreaWidth = currentCutArea.getBoundingClientRect().width;
            currentImage.style.width = `${cutAreaWidth}px`;
            currentImage.style.height = `${cutAreaWidth / ratio}px`;
          }

          const containerWidth = currentContainer.getBoundingClientRect().width;
          const containerHeight = currentContainer.getBoundingClientRect().height;

          currentImage.style.left = `${(containerWidth - imageWidth / scale) / 2}px`;
          currentImage.style.top = `${(containerHeight - imageHeight / scale) / 2}px`;
        };
      }
    } else if (correction && image.current) {
      const imageCoordinates = image.current.getBoundingClientRect();
      moveAt({
        x: parseInt(image.current.style.left, 10),
        y: parseInt(image.current.style.top, 10),
        width: imageCoordinates.width,
        height: imageCoordinates.height,
      });

      setCorrection(false);
    }
  });

  const containerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (moving && container.current && image.current) {
      const containerCooordinates = container.current.getBoundingClientRect();
      const imageCoordinates = image.current.getBoundingClientRect();

      const halfImageWidth = imageCoordinates.width / 2;
      const imageOuterOffsetWidth = halfImageWidth - halfImageWidth / scale;

      const halfImageHeight = imageCoordinates.height / 2;
      const imageOuterOffsetHeight = halfImageHeight - halfImageHeight / scale;

      moveAt({
        x: e.pageX - containerCooordinates.left - shiftX + imageOuterOffsetWidth,
        y: e.pageY - containerCooordinates.top - shiftY + imageOuterOffsetHeight,
        width: imageCoordinates.width,
        height: imageCoordinates.height,
      });
    }
  };

  const containerMouseLeaveHandler = () => {
    setMoving(false);
  };

  const imageMouseDownHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    if (image.current) {
      setShiftX(e.clientX - image.current.getBoundingClientRect().left);
      setShiftY(e.clientY - image.current.getBoundingClientRect().top);
      setMoving(true);
    }
  };

  const imageMouseUpHandler = () => {
    setMoving(false);
  };

  const rangeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrection(true);
    setScale(Number(e.target.value));
  };

  const cancelButtonClickHandler = () => {
    fileUrlHandler(null);
  };

  const saveButtonClickHandler = () => {
    if (cutArea.current && image.current) {
      const cutAreaCooordinates = cutArea.current.getBoundingClientRect();
      const imageCoordinates = image.current.getBoundingClientRect();

      const imageUrl = cutImageAndGenerateUrl({
        image: image.current,
        sWidth: imageCoordinates.width,
        sHeight: imageCoordinates.height,
        dx: imageCoordinates.left - cutAreaCooordinates.left,
        dy: imageCoordinates.top - cutAreaCooordinates.top,
        dWidth: cutAreaCooordinates.width,
        dHeight: cutAreaCooordinates.height,
      });
      fileUrlHandler(imageUrl);
    }
  };

  return (
    <div className="image-clipper">
      <div
        className="image-clipper__container"
        ref={container}
        onMouseMove={(e) => containerMouseMoveHandler(e)}
        onMouseLeave={() => containerMouseLeaveHandler()}
      >
        <img
          src={link}
          alt=""
          ref={image}
          role="presentation"
          className="image-clipper__image"
          style={{ transform: `scale(${scale})` }}
          onDragStart={() => false}
          draggable={false}
          onMouseDown={(e) => imageMouseDownHandler(e)}
          onMouseUp={() => imageMouseUpHandler()}
        />
        <div
          className="image-clipper__cut-area"
          ref={cutArea}
        />
      </div>
      <div className="image-clipper__range">
        <input
          type="range"
          className="image-clipper__range-input"
          value={scale}
          min="1"
          max="2"
          step="0.001"
          onChange={(e) => rangeChangeHandler(e)}
        />
      </div>
      <div className="buttons-container">
        <Button
          mods={['error']}
          onClick={cancelButtonClickHandler}
        >
          Отменить
        </Button>
        <Button
          mods={['fill', 'success']}
          onClick={saveButtonClickHandler}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ImageClipper;
