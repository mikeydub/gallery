import styled from 'styled-components';
import { Collection } from 'types/Collection';
import Spacer from 'components/core/Spacer/Spacer';
import CollectionView from './CollectionView';

type Props = {
  collections: Array<Collection>;
};

function Body({ collections }: Props) {
  return (
    <StyledBody>
      {collections.map((collection, index) => (
        <>
          <Spacer height={index === 0 ? 48 : 108} />
          <CollectionView collection={collection} />
        </>
      ))}
    </StyledBody>
  );
}

const StyledBody = styled.div`
  width: 100%;
`;

export default Body;