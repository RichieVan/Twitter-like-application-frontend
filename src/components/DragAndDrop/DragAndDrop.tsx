import React, { FC, useRef, useState } from 'react';
import { DragAndDropProps } from './types';

const DragAndDrop: FC<DragAndDropProps> = ({
  filesHandler,
  multiple = false,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [dropping, setDropping] = useState(false);

  const dragoverHandler = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragenterHandler = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDropping(true);
  };

  const dragleaveHandler = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDropping(false);
  };

  const dropHandler = (e: React.DragEvent) => {
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
            onChange={() => {
              if (fileInput.current?.files) filesHandler(fileInput.current.files);
            }}
            disabled={dropping}
            multiple={multiple}
          />
        </label>
      </div>
    </div>
  );
};

export default DragAndDrop;
