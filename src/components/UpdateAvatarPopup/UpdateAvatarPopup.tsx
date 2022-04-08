import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Context } from '../../Context';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import cutImageAndGenerateUrl from '../../lib/cutImageAndGenerateUrl/cutImageAndGenerateUrl';
import ImageClipper from '../ImageClipper/ImageClipper';
import LoadingMask from '../LoadingMask/LoadingMask';
import Button from '../Button/Button';
import { UpdateAvatarProps } from './types';

const UpdateAvatarPopup: FC<UpdateAvatarProps> = ({
  fileUrlHandler,
  directly,
  closeModal,
}) => {
  const { userStore, notificationStore } = useContext(Context);

  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [initialAvatarLink, setInitialAvatarLink] = useState<string>('');
  const [newAvatarLink, setNewAvatarLink] = useState<string>('');
  const [isModifying, setIsModifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandlingAvatar, setIsHandlingAvatar] = useState(false);
  const newAvatarPreview = useRef<HTMLImageElement>(null);

  const handleAvatar = (avatar: File) => {
    setIsHandlingAvatar(true);

    if (avatar.size > 1024 * 1024 * 2) {
      setNewAvatar(null);
      notificationStore.show('Размер загружаемого изображения первышает лимит в 2 мб', 5000, 'error');
      return;
    }

    if (!(avatar.type === 'image/jpeg' || avatar.type === 'image/png')) {
      setNewAvatar(null);
      notificationStore.show('Загружаемый файл не является изображением допустимого формата', 5000, 'error');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const renderResult = e?.target?.result as string;
      if (renderResult) {
        setInitialAvatarLink(renderResult as string);

        const initialImage = document.createElement('img');
        initialImage.onload = () => {
          const previewCoordinates = newAvatarPreview.current!.getBoundingClientRect();

          const ratio = initialImage.naturalWidth / initialImage.naturalHeight;
          if (ratio > 1) {
            initialImage.height = previewCoordinates.height;
            initialImage.width = previewCoordinates.width * ratio;
          } else {
            initialImage.width = previewCoordinates.width;
            initialImage.height = previewCoordinates.height / ratio;
          }

          const imageUrl = cutImageAndGenerateUrl({
            image: initialImage,
            sWidth: initialImage.width,
            sHeight: initialImage.height,
            dx: -(initialImage.width - previewCoordinates.width) / 2,
            dy: -(initialImage.height - previewCoordinates.height) / 2,
            dWidth: previewCoordinates.width,
            dHeight: previewCoordinates.height,
          });
          setNewAvatarLink(imageUrl);
          setIsLoading(false);
          setIsHandlingAvatar(false);
        };
        initialImage.src = renderResult;
      }
    };
    reader.readAsDataURL(avatar);
  };

  useEffect(() => {
    if (newAvatar && !newAvatarLink && !isHandlingAvatar) {
      handleAvatar(newAvatar);
    }
  });

  const loadAnotherHandler = () => {
    setNewAvatar(null);
    setNewAvatarLink('');
  };

  const changeAreaHandler = () => setIsModifying(true);

  const saveButtonClickHandler = () => {
    if (directly) {
      setIsLoading(true);
      // userStore.updateAvatar(newAvatarLink)
      //   .then(() => {
      //     setNewAvatar(null);
      //     setNewAvatarLink(null);
      //     setInitialAvatarLink(null);
      //     setIsLoading(false);
      //     closeModal();

      //     notificationStore.show('Аватар успешно обновлен', 3000, 'success');
      //   })
      //   .catch(() => {
      //     notificationStore.show('Произошла неизвестная ошибка', 3000, 'error');
      //   });
    } else {
      fileUrlHandler(newAvatarLink);
      closeModal();
    }
  };

  const render = () => {
    if (newAvatar && newAvatarLink && isModifying) {
      return (
        <ImageClipper
          link={initialAvatarLink}
          fileUrlHandler={(fileUrl: string | null) => {
            setIsModifying(false);
            if (fileUrl) setNewAvatarLink(fileUrl);
          }}
        />
      );
    }

    if (newAvatar) {
      return (
        <div className="update-avatar__wrapper">
          <div className="update-avatar__compare">
            <div className="update-avatar__preview">
              <span>Новый</span>
              <img
                className="update-avatar__preview-image"
                ref={newAvatarPreview}
                alt="Текущее изображение профиля"
                src={newAvatarLink}
              />
            </div>
            <div className="update-avatar__preview">
              <span>Старый</span>
              <img
                className="update-avatar__preview-image"
                alt="Текущее изображение профиля"
                src={userStore.user!.avatar.url}
              />
            </div>
          </div>
          <div className="buttons-container">
            <Button onClick={loadAnotherHandler}>
              Загрузить другой
            </Button>
            <Button onClick={changeAreaHandler}>
              Изменить область
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
    }

    return (
      <DragAndDrop
        multiple={false}
        filesHandler={(files: FileList) => {
          setNewAvatar(files[0]);
        }}
      />
    );
  };

  return (
    <div className="update-avatar">
      {render()}
      {isLoading ? (
        <LoadingMask
          size={70}
          bg="inherit"
          opacity={0.8}
        />
      ) : ''}
    </div>
  );
};

export default UpdateAvatarPopup;
