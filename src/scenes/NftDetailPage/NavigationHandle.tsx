import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Gradient from 'components/core/Gradient/Gradient';
import { Text } from 'components/core/Text/Text';
import colors from 'components/core/colors';
import transitions from 'components/core/transitions';
import Spacer from 'components/core/Spacer/Spacer';
import { navigate } from '@reach/router';

export enum Directions {
  LEFT,
  RIGHT,
}

const ARROWS = new Map<number, string>([
  [Directions.LEFT, '←'],
  [Directions.RIGHT, '→'],
]);

const HOVER_TEXT = new Map<number, string>([
  [Directions.LEFT, 'Prev'],
  [Directions.RIGHT, 'Next'],
]);

type Props = {
  direction: Directions;
  nftId: string;
};

function NavigationHandle({ direction, nftId }: Props) {
  console.log(direction);
  const arrow = useMemo(() => {
    return ARROWS.get(direction) || '';
  }, [direction]);

  const hoverText = useMemo(() => {
    return HOVER_TEXT.get(direction) || '';
  }, [direction]);

  const handleOnClick = useCallback(() => {
    navigate(nftId, { state: { collection: [] } });
  }, [nftId]);

  return (
    <StyledNavigationHandle onClick={handleOnClick}>
      {/* <StyledGradient /> */}
      <StyledTextWrapper direction={direction}>
        {arrow}
        <Spacer width={8} />
        <StyledHoverText color={colors.gray50}>{hoverText}</StyledHoverText>
      </StyledTextWrapper>
    </StyledNavigationHandle>
  );
}

const StyledTextWrapper = styled.div<{ direction: Directions }>`
  display: flex;
  margin: auto;
  flex-direction: ${({ direction }) => (direction ? 'row-reverse' : 'row')};
`;

const StyledHoverText = styled(Text)`
  text-transform: uppercase;
  transition: opacity ${transitions.cubic};
  opacity: 0;
`;

const StyledGradient = styled(Gradient)`
  position: absolute;
  opacity: 0;
`;

const StyledNavigationHandle = styled.div`
  display: flex;
  position: relative;
  width: 80px;
  cursor: pointer;

  &:hover ${StyledGradient} {
    opacity: 1;
  }
  &:hover ${StyledHoverText} {
    opacity: 1;
  }
`;
export default NavigationHandle;
