import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react';
import styled, { css, keyframes } from 'styled-components';

type ModalActions = {
  showModal: (content: ReactElement) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalActions | undefined>(undefined);

export const useModal = (): ModalActions => {
  const context = useContext(ModalContext);
  if (!context) {
    throw Error('Attempted to use ModalContext without a provider!');
  }
  return context;
};

type Props = { children: ReactNode };

const MODAL_TRANSITION_MS = 300;

function ModalProvider({ children }: Props) {
  // whether node is actually on the DOM
  const [isMounted, setIsMounted] = useState(false);
  // pseudo-state for signaling animations. this will allow us
  // to display an animation prior to unmounting
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState<ReactElement | null>(null);

  const showModal = useCallback((providedContent) => {
    setIsActive(true);
    setIsMounted(true);
    setContent(providedContent);
  }, []);

  const hideModal = useCallback(() => {
    setIsActive(false);
    setTimeout(() => {
      setIsMounted(false);
      setContent(null);
      // unmount a bit sooner to avoid race condition of
      // elements flashing before they're removed from view
    }, MODAL_TRANSITION_MS - 50);
  }, []);

  const actions = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={actions}>
      {children}
      {isMounted && (
        <_ToggleFade isActive={isActive}>
          <Overlay onClick={hideModal} />
          <StyledContentContainer>
            <_ToggleTranslate isActive={isActive}>
              <StyledContent>
                <StyledClose onClick={hideModal}>&#x2715;</StyledClose>
                {content}
              </StyledContent>
            </_ToggleTranslate>
          </StyledContentContainer>
        </_ToggleFade>
      )}
    </ModalContext.Provider>
  );
}

const fadeIn = keyframes`
    from { opacity: 0 };
    to { opacity: 1 };
`;

const fadeOut = keyframes`
    from { opacity: 1 };
    to { opacity: 0 };
`;

// ease-out like style
const transitionStyle = `${MODAL_TRANSITION_MS}ms cubic-bezier(0, 0, 0, 1.07)`;

const _ToggleFade = styled.div<{ isActive: boolean }>`
  animation: ${({ isActive }) =>
    css`
      ${isActive ? fadeIn : fadeOut} ${transitionStyle}
    `};
`;

const TRANSLATE_PIXELS = 10;

const translateUp = keyframes`
    from { transform: translateY(${TRANSLATE_PIXELS}px) };
    to { transform: translateY(0px) };
`;

const translateDown = keyframes`
    from { transform: translateY(0px) };
    to { transform: translateY(${TRANSLATE_PIXELS}px) };
`;

const _ToggleTranslate = styled.div<{ isActive: boolean }>`
  animation: ${({ isActive }) =>
    css`
      ${isActive ? translateUp : translateDown} ${transitionStyle}
    `};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: white;
  opacity: 0.1;

  // should appear above rest of site
  z-index: 1;

  // fixes unusual opacity transition bug: https://stackoverflow.com/a/22648685
  -webkit-backface-visibility: hidden;
`;

const StyledContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // should appear above the overlay
  z-index: 2;
`;

const StyledContent = styled.div`
  position: relative;
  padding: 40px;
  background: white;
`;

const StyledClose = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export default memo(ModalProvider);
