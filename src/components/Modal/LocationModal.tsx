import React, {
  cloneElement,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../../Context';
import ModalBase from './base/ModalBase';
import ModalPostBase from './base/ModalPostBase';
import { ILocationModalProps } from './types';
import getClassList from '../../lib/getClassList/getClassList';
import { LocationStateProps, LocationModalChildProps } from '../../types/types';

const LocationModal: FC<ILocationModalProps> = ({
  heading,
  type = 'default',
  position = 'center',
  onClose = null,
  children,
}) => {
  const { appStore, modalStore } = useContext(Context);
  const [modalHeading, setModalHeading] = useState(heading);

  const modalBg = useRef(null);
  const lastMouseDownTarget = useRef<EventTarget>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as LocationStateProps;
    if (!state?.backgroundLocation) {
      navigate(location.pathname, { replace: true, state: { backgroundLocation: '/feed' } });
    }
  });

  const mods: string[] = ['type_location', 'active', `align_${position}`];
  const classList = getClassList('modal', mods);

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
          {React.isValidElement(children) && (
            cloneElement(children, { closeModal })
          )}
        </ModalPostBase>
      );
    }

    return (
      <ModalBase
        heading={modalHeading}
        containerClickHandler={(e) => e.stopPropagation()}
        closeModalHandler={() => closeModal()}
      >
        {React.isValidElement(children) && (
          cloneElement(children, {
            setModalHeading: (newHeading: string) => setModalHeading(newHeading),
            defaultHeading: heading,
            closeModal,
          } as LocationModalChildProps)
        )}
      </ModalBase>
    );
  };

  return (
    <div
      className={classList}
      ref={modalBg}
      role="presentation"
      onMouseDown={(e) => {
        lastMouseDownTarget.current = e.target;
      }}
      onMouseUp={(e) => {
        if (e.target === lastMouseDownTarget.current && e.target === modalBg.current) closeModal();
      }}
    >
      {modalContainer()}
    </div>
  );
};

export default LocationModal;
