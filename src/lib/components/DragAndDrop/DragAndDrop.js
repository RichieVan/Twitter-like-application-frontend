import React, { useRef, useState } from 'react';

import './style.css';

function DragAndDrop({ filesHandler, multiple }) {
  const fileInput = useRef(null);
  const [dropping, setDropping] = useState(false);

  const dragoverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragenterHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropping(true);
  };

  const dragleaveHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropping(false);
  };

  const dropHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const { files } = dt;

    setDropping(false);
    filesHandler(files);
  };

  return (
    <div className={dropping ? 'drop-container dropping' : 'drop-container'} onDragEnter={dragenterHandler}>
      <div className="drop-area" onDragOver={dragoverHandler} onDragEnter={dragenterHandler} onDrop={dropHandler} onDragLeave={dragleaveHandler} />
      <div className="drop-form">
        <b>Перенесите файл сюда</b>
        <span>или</span>
        <label>
          выбрать файл на диске
          <input
            type="file"
            ref={fileInput}
            onChange={() => filesHandler(fileInput.current.files)}
            disabled={dropping}
            multiple={multiple}
          />
        </label>
      </div>
    </div>
  );
}

export default DragAndDrop;
