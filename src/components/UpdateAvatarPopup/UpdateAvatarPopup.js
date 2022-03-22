import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import cutImageAndGenerateUrl from '../../lib/cutImageAndGenerateUrl';
import ImageClipper from '../ImageClipper/ImageClipper';
import LoadingMask from '../LoadingMask/LoadingMask';
import Button from '../Button/Button';

function UpdateAvatarPopup({ closeModal, fileUrlHandler, directly }) {
  const { userStore, notificationStore } = useContext(Context);

  const [newAvatar, setNewAvatar] = useState(null);
  const [initialAvatarLink, setInitialAvatarLink] = useState(null);
  const [newAvatarLink, setNewAvatarLink] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newAvatar && !newAvatarLink) {
      handleAvatar(newAvatar);
    }
  });

  const handleAvatar = (avatar) => {
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
    reader.onload = (e) => {
      setInitialAvatarLink(e.target.result);

      const initialImage = document.createElement('img');
      initialImage.onload = () => {
        const previewCoordinates = document.getElementById('newAvatarPreview').getBoundingClientRect();

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
      };
      initialImage.src = e.target.result;
    };
    reader.readAsDataURL(avatar);
  };

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
          fileUrlHandler={(fileUrl) => {
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
                id="newAvatarPreview"
                alt="Текущее изображение профиля"
                src={newAvatarLink}
              />
            </div>
            <div className="update-avatar__preview">
              <span>Старый</span>
              <img
                className="update-avatar__preview-image"
                alt="Текущее изображение профиля"
                src={userStore.user.avatar.url}
              />
            </div>
          </div>
          <div className="buttons-container">
            <Button
              onClick={loadAnotherHandler}
            >
              Загрузить другой
            </Button>
            <Button
              onClick={changeAreaHandler}
            >
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
        filesHandler={(files) => {
          setNewAvatar(files[0]);
        }}
      />
    );
  };

  return (
    <div className="update-avatar">
      {render()}
      {isLoading ? (
        <LoadingMask cHeight={70} cWidth={70} bg="#0f0f0f" opacity={0.8} />
      ) : ''}
    </div>
  );
}

export default UpdateAvatarPopup;
