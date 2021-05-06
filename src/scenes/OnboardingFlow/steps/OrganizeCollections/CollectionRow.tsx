import { useMemo } from 'react';
import styled from 'styled-components';
import { Text } from 'components/core/Text/Text';
import Spacer from 'components/core/Spacer/Spacer';
import colors from 'components/core/colors';
import { Nft } from 'types/Nft';

import { ReactComponent as Settings } from './collection-settings.svg';

type Props = {
  title?: string;
  nfts: Nft[];
  className?: string;
};

/**
 * displays the first 3 NFTs in large tiles, while the rest are squeezed into the 4th position
 */
function CollectionRow({ title, nfts, className }: Props) {
  const firstThreeNfts = useMemo(() => nfts.slice(0, 3), [nfts]);
  const remainingNfts = useMemo(() => nfts.slice(3), [nfts]);

  return (
    <StyledCollectionRow className={className}>
      <Header>
        <Text>{title}</Text>
        <Settings />
      </Header>
      <Spacer height={12} />
      <Body>
        {firstThreeNfts.map((nft) => (
          <BigNftPreview src={nft.image_url} />
        ))}
        {remainingNfts.length ? <CompactNfts nfts={remainingNfts} /> : null}
      </Body>
    </StyledCollectionRow>
  );
}

const StyledCollectionRow = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 32px;

  border: 1px solid ${colors.gray50};
  background-color: ${colors.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  column-gap: 24px;
`;

const BigNftPreview = styled.img`
  width: 160px;
  height: 160px;
`;

/**
 * Displays NFTs in mini tiles using the following logic:
 * - if 5 or less NFTs, display them all in a row
 * - if more than 5 NFTs, display the first 3, then the rest in text
 */
function CompactNfts({ nfts }: { nfts: Nft[] }) {
  const firstThreeNfts = useMemo(() => nfts.slice(0, 3), [nfts]);
  const firstFiveNfts = useMemo(() => nfts.slice(0, 5), [nfts]);
  const remainingNfts = useMemo(() => nfts.slice(5), [nfts]);

  // account for the fact that having more than 5 NFTs will result in
  // only 3 tiles being displayed before the text
  const overflowCountText = remainingNfts.length + 2;

  const hasMoreThanFiveNfts = Boolean(remainingNfts.length);

  return (
    <StyledCompactNfts>
      <Content>
        {hasMoreThanFiveNfts ? (
          <NftsWithMoreText>
            {firstThreeNfts.map((nft) => (
              <SmolNftPreview src={nft.image_url} />
            ))}
            <Spacer width={2} />
            <Text>+{overflowCountText} more</Text>
          </NftsWithMoreText>
        ) : (
          firstFiveNfts.map((nft) =>
            nft ? <SmolNftPreview src={nft.image_url} /> : null
          )
        )}
      </Content>
    </StyledCompactNfts>
  );
}

const StyledCompactNfts = styled.div`
  width: 160px;
  height: 160px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 141px;

  display: flex;
  column-gap: 4px;
`;

const SmolNftPreview = styled.img`
  width: 25px;
  height: 25px;
`;

const NftsWithMoreText = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;

  white-space: nowrap;
`;

export default CollectionRow;