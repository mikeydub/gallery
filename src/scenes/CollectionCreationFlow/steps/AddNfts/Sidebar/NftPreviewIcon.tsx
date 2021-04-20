import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

type NftPreviewIconProps = {
  nft: string; // TODO: this will be an object in the future
};

function NftPreviewIcon({ nft }: NftPreviewIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = useCallback(() => {
    setIsSelected((prev) => !prev);
  }, []);

  return (
    <StyledNftPreviewIcon>
      <StyledImage isSelected={isSelected} src={nft} alt="nft" />
      <StyledOutline onClick={handleClick} isSelected={isSelected} />
    </StyledNftPreviewIcon>
  );
}

const StyledNftPreviewIcon = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;

type SelectedProps = {
  isSelected: boolean;
};

const StyledOutline = styled.div<SelectedProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  outline: ${({ isSelected }) => (isSelected ? 1 : 0)}px solid #14ff00;
`;

const StyledImage = styled.img<SelectedProps>`
  width: 100%;
  height: 100%;

  transition: opacity 0.2s;

  opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
`;

export default memo(NftPreviewIcon);
