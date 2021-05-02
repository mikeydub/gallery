import { useEffect } from 'react';
import { WizardContext } from 'react-albus';
import styled from 'styled-components';

import { useWizardValidationActions } from 'contexts/wizard/WizardValidationContext';
import { useWizardCallback } from 'contexts/wizard/WizardCallbackContext';
import { useModal } from 'contexts/modal/ModalContext';
import { Nft } from 'types/Nft';
import Sidebar from './Sidebar/Sidebar';
import Editor from './Editor/Editor';
import Directions from './Directions';
import CollectionNamingForm from './CollectionNamingForm';
import useNftEditor, { useNftEditorAllNfts } from './useNftEditor';

type ConfigProps = {
  stagedNfts: Nft[];
  onNext: WizardContext['next'];
};

function useWizardConfig({ stagedNfts, onNext }: ConfigProps) {
  const { setNextEnabled } = useWizardValidationActions();
  const { setOnNext } = useWizardCallback();
  const { showModal } = useModal();

  useEffect(() => {
    setOnNext(() => showModal(<CollectionNamingForm onNext={onNext} />));

    return () => setOnNext(undefined);
  }, [setOnNext, showModal, onNext]);

  useEffect(() => {
    setNextEnabled(stagedNfts.length > 0);

    return () => setNextEnabled(true);
  }, [setNextEnabled, stagedNfts.length]);
}

function AddNfts({ next }: WizardContext) {
  const {
    stagedNfts,
    handleStageNft,
    handleUnstageNft,
    handleSortNfts,
  } = useNftEditor();

  useWizardConfig({ stagedNfts, onNext: next });
  // const { allNfts, handleSelectNft } = useNftEditorAllNfts();
  // console.log(allNfts);
  const { setNextEnabled } = useWizardValidationActions();

  useEffect(() => {
    setNextEnabled(stagedNfts.length > 0);
  }, [setNextEnabled, stagedNfts.length]);

  return (
    <StyledAddNfts>
      <SidebarContainer>
        <Sidebar onStageNft={handleStageNft} onUnstageNft={handleUnstageNft} />
      </SidebarContainer>
      <EditorContainer>
        {stagedNfts.length ? (
          <Editor
            stagedNfts={stagedNfts}
            onSortNfts={handleSortNfts}
            onUnstageNft={handleUnstageNft}
          />
        ) : (
          <Directions />
        )}
      </EditorContainer>
    </StyledAddNfts>
  );
}

const StyledAddNfts = styled.div`
  display: flex;
`;

const SIDEBAR_WIDTH = 280;

const SidebarContainer = styled.div`
  width: ${SIDEBAR_WIDTH}px;
`;

const EditorContainer = styled.div`
  width: calc(100vw - ${SIDEBAR_WIDTH}px);
`;

export default AddNfts;
