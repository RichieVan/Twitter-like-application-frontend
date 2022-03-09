// import { observer } from 'mobx-react-lite';
import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.css';
import { Context } from '../..';

function LocationModal({
  heading,
  // fadingOutTime,
  type,
  children,
  position = 'center',
  onClose = null,
}) {
  const { appStore, modalStore } = useContext(Context);
  // const [fadingOut, setFadingOut] = useState(false);
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

  const classList = [
    'modal location active ',
    position,
    //fadingOut ? ' fading-out' : '',
  ];

  const styleList = {
    transition: 'none',
  };

  const closeModal = () => {
    navigate(-1);
    modalStore.setBodyUnscrollable(false);
    if (onClose) onClose();
  };

  const modalContainer = () => {
    if (type === 'post') {
      return (
        <div className="modal-container_fix no-pi">
          <div className="container type-post no-pi">
            <div className="row">
              <div className="col-6 mx-auto pi">
                <div
                  className="modal-container"
                  onClick={(e) => {
                    (e) => e.stopPropagation();
                    appStore.setActivePostOptions(null);
                  }}
                >
                  <div className="modal-content">
                    {cloneElement(children, {
                      closeModal,
                    })}
                  </div>
                  <div className="modal-close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-heading">{modalHeading}</h2>
        <div className="modal-content">
          {cloneElement(children, {
            setModalHeading,
            defaultHeading: heading,
            closeModal,
          })}
        </div>
        <div 
          className="modal-close" 
          onClick={() => closeModal()}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={classList.join('')}
      style={styleList}
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
