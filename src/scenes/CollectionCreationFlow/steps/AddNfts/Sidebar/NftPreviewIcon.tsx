import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Nft } from 'types/Nft';

type NftPreviewIconProps = {
  nft: Nft; // TODO: this will be an object in the future
  onStageNft: (nft: Nft) => void;
  onUnstageNft: (id: string) => void;
};

function NftPreviewIcon({
  nft,
  onStageNft,
  onUnstageNft,
}: NftPreviewIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = useCallback(() => {
    setIsSelected((wasSelected) => !wasSelected);
  }, []);

  // only run effect on component update, not initial render
  // https://reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      isSelected ? onStageNft(nft) : onUnstageNft(nft.id);
    } else {
      mountRef.current = true;
    }
  }, [isSelected, nft, onStageNft, onUnstageNft]);

  return (
    <StyledNftPreviewIcon>
      <StyledImage isSelected={isSelected} src={nft.image_url} alt="nft" />
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
