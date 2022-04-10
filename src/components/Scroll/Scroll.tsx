import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import getClassList from '../../lib/getClassList/getClassList';

const bodyDOMElement = document.querySelector('body')!;

const Scroll: FC = () => {
  const [barHeight, setBarHeight] = useState(100);
  const [barOffset, setBarOffset] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isFirstLoading = useRef(true);
  const visibilityTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevOffset = useRef(0);
  const shift = useRef(0);

  useEffect(() => {
    // Единоразовое добавление отслеживания содержимого body через MutationObserver
    if (isFirstLoading.current) {
      isFirstLoading.current = false;

      const observer = new MutationObserver(() => {
        setBarHeight((window.innerHeight / bodyDOMElement.offsetHeight) * window.innerHeight);
        setBarOffset((window.scrollY / bodyDOMElement.offsetHeight) * window.innerHeight);
      });

      observer.observe(bodyDOMElement, {
        subtree: true,
        childList: true,
      });
    }

    // События document
    const documentMouseMoveEvent = (e: MouseEvent) => {
      if (isActive) {
        const { target } = e;
        if (target instanceof Element) {
          const shiftOffset = e.clientY - shift.current;
          let newBarOffset = prevOffset.current + shiftOffset;

          if (newBarOffset <= 0) {
            newBarOffset = 0;
          } else if (newBarOffset + barHeight >= window.innerHeight) {
            newBarOffset = window.innerHeight - barHeight;
          }

          window.scrollTo({
            left: 0,
            top: newBarOffset * (bodyDOMElement.offsetHeight / window.innerHeight),
          });

          setBarOffset(newBarOffset);
        }
      }
    };

    const documentMouseUpEvent = () => {
      setIsActive(false);
      prevOffset.current = 0;
    };

    document.addEventListener('mouseup', documentMouseUpEvent);
    document.addEventListener('mousemove', documentMouseMoveEvent);

    // События window
    const windowScrollEvent = () => {
      setBarOffset((window.scrollY / bodyDOMElement.offsetHeight) * window.innerHeight);
      if (visibilityTimeout.current) clearTimeout(visibilityTimeout.current);
      setIsVisible(true);
      if (!isMouseOver) {
        visibilityTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 800);
      }
    };

    const windowResizeEvent = () => {
      setBarHeight((window.innerHeight / bodyDOMElement.offsetHeight) * window.innerHeight);
      setBarOffset((window.scrollY / bodyDOMElement.offsetHeight) * window.innerHeight);
    };

    window.addEventListener('scroll', windowScrollEvent);
    window.addEventListener('resize', windowResizeEvent);

    return () => {
      document.removeEventListener('mouseup', documentMouseUpEvent);
      document.removeEventListener('mousemove', documentMouseMoveEvent);
      window.removeEventListener('scroll', windowScrollEvent);
      window.removeEventListener('resize', windowResizeEvent);
    };
  });

  // События и стили scroll
  const scrollMouseEnterEvent = () => {
    if (visibilityTimeout.current) clearTimeout(visibilityTimeout.current);
    setIsMouseOver(true);
    setIsVisible(true);
  };

  const scrollMouseLeaveEvent = () => {
    setIsMouseOver(false);
    visibilityTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  const scrollMods = [];
  if (isActive) scrollMods.push('active');
  if (isVisible) scrollMods.push('visible');
  const scrollClassList = getClassList('scroll', scrollMods);

  // События и стили scroll__bar
  const barMouseDownEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    shift.current = e.clientY;
    prevOffset.current = barOffset;
    setIsActive(true);
  };

  const barStyleList = {
    height: `${barHeight}px`,
    top: `${barOffset}px`,
  };

  return (
    <div
      className={scrollClassList}
      onDragStart={() => false}
      onMouseEnter={scrollMouseEnterEvent}
      onMouseLeave={scrollMouseLeaveEvent}
    >
      <div
        className="scroll__bar"
        role="presentation"
        style={barStyleList}
        onMouseDown={(e) => barMouseDownEvent(e)}
        onDragStart={() => false}
      >
        <div className="scroll__content" />
      </div>
    </div>
  );
};

export default Scroll;
