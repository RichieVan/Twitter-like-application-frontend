import React, { useRef, useState } from 'react';

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

    const { files } = e.dataTransfer;

    setDropping(false);
    filesHandler(files);
  };

  return (
    <div
      className={dropping ? 'drag-n-drop drag-n-drop_dropping' : 'drag-n-drop'}
      onDragEnter={dragenterHandler}
    >
      <div
        className="drag-n-drop__drop-area"
        onDragOver={dragoverHandler}
        onDragEnter={dragenterHandler}
        onDrop={dropHandler}
        onDragLeave={dragleaveHandler}
      />
      <div className="drag-n-drop__form">
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
