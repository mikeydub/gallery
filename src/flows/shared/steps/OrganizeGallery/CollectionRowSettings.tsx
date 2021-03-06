import { useCallback } from 'react';
import styled from 'styled-components';
import { Collection } from 'types/Collection';

import Dropdown, {
  StyledDropdownButton,
} from 'components/core/Dropdown/Dropdown';
import TextButton from 'components/core/Button/TextButton';
import { useModal } from 'contexts/modal/ModalContext';
import Spacer from 'components/core/Spacer/Spacer';
import DeleteCollectionConfirmation from './DeleteCollectionConfirmation';
import CollectionNamingForm from '../OrganizeCollection/CollectionNamingForm';
import { withWizard, WizardComponentProps } from 'react-albus';
import { useCollectionWizardActions } from 'contexts/wizard/CollectionWizardContext';

type Props = {
  collection: Collection;
};

function CollectionRowSettings({
  collection,
  wizard: { push },
}: Props & WizardComponentProps) {
  const { showModal } = useModal();
  const { setCollectionIdBeingEdited } = useCollectionWizardActions();

  const handleEditCollectionClick = useCallback(() => {
    setCollectionIdBeingEdited(collection.id);
    push('organizeCollection');
  }, [collection.id, push, setCollectionIdBeingEdited]);

  const handleEditNameClick = useCallback(() => {
    showModal(
      <CollectionNamingForm onNext={() => {}} collection={collection} />
    );
  }, [collection, showModal]);

  const handleToggleHiddenClick = useCallback(() => {
    // make request to update collection
    // on success, update collection state
  }, []);

  const handleDeleteClick = useCallback(() => {
    showModal(<DeleteCollectionConfirmation />);
  }, [showModal]);

  return (
    <StyledCollectionRowSettings>
      <Dropdown>
        <TextButton
          onClick={handleEditCollectionClick}
          text="Edit collection"
          underlineOnHover
        />
        <Spacer height={12} />
        <TextButton
          onClick={handleEditNameClick}
          text="Edit name & description"
          underlineOnHover
        />
        <Spacer height={12} />
        <TextButton
          onClick={handleToggleHiddenClick}
          text={collection.isHidden ? 'Show' : 'Hide'}
          underlineOnHover
        />
        <Spacer height={12} />
        <TextButton
          onClick={handleDeleteClick}
          text="Delete"
          underlineOnHover
        />
      </Dropdown>
    </StyledCollectionRowSettings>
  );
}

const StyledCollectionRowSettings = styled.div`
  position: absolute;
  right: 24px;
  top: 28px;
  z-index: 1;

  ${StyledDropdownButton} {
    width: 32px;
    height: 24px;
  }
`;

export default withWizard(CollectionRowSettings);
