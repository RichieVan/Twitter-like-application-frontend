import React from "react";
import './style.css';

class DragAndDrop extends React.Component {
    constructor(props) {
      super(props);
      this.fileInput = React.createRef();

      this.state = {
          dropping : false
      }
    }

    dragover = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    dragenter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({dropping : true});
    }

    dragleave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({dropping : false});
    }

    drop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        var dt = e.dataTransfer;
        var files = dt.files;

        this.setState({dropping : false});
        this.props.filesHandler(files);
    }
  
    render() {
      return (
        <div className={this.state.dropping ? 'drop-container dropping' : 'drop-container'} onDragEnter={this.dragenter}>
            <div className='drop-area' onDragOver={this.dragover} onDragEnter={this.dragenter} onDrop={this.drop} onDragLeave={this.dragleave}></div>
            <div className='drop-form'>
                <b>Перенесите файл сюда</b>
                <span>или</span>
                <label>
                    выбрать файл на диске
                    <input type="file" 
                        ref={this.fileInput} 
                        onChange={(e) => {this.props.filesHandler(this.fileInput.current.files)}} 
                        disabled={this.state.dropping}
                        multiple={this.props.multiple}
                    />
                </label>
            </div>
        </div>
      );
    }
}

export default DragAndDrop;