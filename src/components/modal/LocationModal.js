import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import ModalBase from './base/ModalBase';
import ModalPostBase from './base/ModalPostBase';

function LocationModal({
  heading,
  type,
  children,
  position = 'center',
  onClose = null,
}) {
  const { appStore, modalStore } = useContext(Context);
  const [modalHeading, setModalHeading] = useState(heading);

  const modalBg = useRef(null);
  const lastMouseDownTarget = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.backgroundLocation) {
      navigate(location.pathname, { replace: true, state: { backgroundLocation: '/feed' } });
    }
  });

  const classArray = ['modal modal_type_location modal_active'];
  classArray.push(`modal_${position}`);
  const classList = classArray.join(' ');

  const closeModal = () => {
    navigate(-1);
    modalStore.setBodyUnscrollable(false);
    if (onClose) onClose();
  };

  const modalContainer = () => {
    if (type === 'post') {
      return (
        <ModalPostBase
          containerClickHandler={(e) => {
            e.stopPropagation();
            appStore.setActivePostOptions(null);
          }}
          closeModalHandler={() => closeModal()}
        >
          {cloneElement(children, {
            closeModal,
          })}
        </ModalPostBase>
      );
    }

    return (
      <ModalBase
        heading={modalHeading}
        containerClickHandler={(e) => e.stopPropagation()}
        closeModalHandler={() => closeModal()}
      >
        {cloneElement(children, {
          setModalHeading,
          defaultHeading: heading,
          closeModal,
        })}
      </ModalBase>
    );
  };

  return (
    <div
      className={classList}
      ref={modalBg}
      onMouseDown={(e) => {
        lastMouseDownTarget.current = e.target;
      }}
      onMouseUp={(e) => {
        if (e.target == lastMouseDownTarget.current && e.target == modalBg.current) closeModal();
      }}
    >
      {modalContainer()}
    </div>
  );
}

export default LocationModal;
