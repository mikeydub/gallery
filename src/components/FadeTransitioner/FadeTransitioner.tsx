import { CSSProperties, memo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './transition.css';

import { fullPageHeightWithoutFooter } from 'components/core/Page/Page';

type Props = {
  nodeKey?: string;
  children: React.ReactNode;
};

// NOTE: if you change these, make sure to update `transition.css`
const FADE_TIME_MS = 300;
const TRANSITION_TIME_MS = 700;

const timeoutConfig = {
  enter: FADE_TIME_MS + TRANSITION_TIME_MS,
  exit: FADE_TIME_MS,
};

const childNodeStyles = {
  width: '100%',
};

const transitionGroupStyles = { minHeight: fullPageHeightWithoutFooter };

/**
 * Fades child elements in and out as they mount/unmount.
 *
 * This file is tightly coupled with `transition.css`, specifically
 * around timing + classNames. More info: https://reactjs.org/docs/animation.html
 */
function FadeTransitioner({ nodeKey = '', children }: Props) {
  return (
    <TransitionGroup style={transitionGroupStyles}>
      <CSSTransition key={nodeKey} timeout={timeoutConfig} classNames="fade">
        <div style={childNodeStyles as CSSProperties}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default memo(FadeTransitioner);
