import { useCallback, useMemo } from 'react';
import { navigate, Redirect, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import breakpoints, { pageGutter } from 'components/core/breakpoints';
import ActionText from 'components/core/ActionText/ActionText';
import NftDetailText from './NftDetailText';
import NftDetailAsset from './NftDetailAsset';

import useNft from 'hooks/api/useNft';
import Page from 'components/core/Page/Page';
import ShimmerProvider from 'contexts/shimmer/ShimmerContext';

type Params = {
  collectionId: string;
  nftId: string;
};

function NftDetailPage({
  collectionId,
  nftId,
  location,
}: RouteComponentProps<Params>) {
  const handleBackClick = useCallback(() => {
    // TODO this works but leaves trailing slash
    // navigate('..');
    navigate(`/${window.location.pathname.split('/')[1]}`);
  }, []);

  const nextNftId = useMemo(() => {
    // TODO: return id of next nft in collection array
    return '123';
  }, []);

  const prevNftId = useMemo(() => {
    // TODO: return id of next nft in collection array
    return '456';
  }, []);

  // TODO__v1 figure out if possible to ensure id is defined here
  const nft = useNft({ id: nftId || '' });

  if (!nft) {
    return <Redirect to="/404" />;
  }

  return (
    <StyledNftDetailPage>
      <StyledBackLink onClick={handleBackClick}>
        <ActionText>← Back to gallery</ActionText>
      </StyledBackLink>
      <StyledBody>
        {/* {prevNftId && (
          <NavigationHandle
            direction={Directions.LEFT}
            nftId={prevNftId}
          ></NavigationHandle>
        )} */}
        <StyledContentContainer>
          <ShimmerProvider>
            <NftDetailAsset nft={nft} />
          </ShimmerProvider>
          <NftDetailText nft={nft} />
        </StyledContentContainer>
        {/* {nextNftId && (
          <NavigationHandle
            direction={Directions.RIGHT}
            nftId={nextNftId}
          ></NavigationHandle>
        )} */}
      </StyledBody>
    </StyledNftDetailPage>
  );
}

const StyledBody = styled.div`
  display: flex;
`;

const StyledBackLink = styled.a`
  margin-top: 32px;
  position: absolute;
  z-index: 5;
  display: none;

  @media only screen and ${breakpoints.tablet} {
    display: block;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 112px auto 0;
  width: 100%;

  @media only screen and ${breakpoints.tablet} {
    flex-direction: row;
    width: initial;
  }
`;

const StyledNftDetailPage = styled(Page)`
  margin: 0 ${pageGutter.mobile}px;

  @media only screen and ${breakpoints.tablet} {
    margin: 0 ${pageGutter.tablet}px;
  }
`;

export default NftDetailPage;
