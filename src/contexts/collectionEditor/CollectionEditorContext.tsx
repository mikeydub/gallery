import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { EditModeNft } from 'types/Nft';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';

export type SidebarNftsState = EditModeNft[];
export type StagedNftsState = EditModeNft[];

export type CollectionEditorState = {
  sidebarNfts: SidebarNftsState;
  stagedNfts: StagedNftsState;
};

const CollectionEditorStateContext = createContext<CollectionEditorState>({
  sidebarNfts: [],
  stagedNfts: [],
});

export const useSidebarNftsState = (): SidebarNftsState => {
  const context = useContext(CollectionEditorStateContext);
  if (!context) {
    throw Error(
      'Attempted to use CollectionEditorStateContext without a provider'
    );
  }
  return context.sidebarNfts;
};

export const useStagedNftsState = (): SidebarNftsState => {
  const context = useContext(CollectionEditorStateContext);
  if (!context) {
    throw Error(
      'Attempted to use CollectionEditorStateContext without a provider'
    );
  }
  return context.stagedNfts;
};

type CollectionEditorActions = {
  setSidebarNfts: (nfts: EditModeNft[]) => void;
  setNftsIsSelected: (nfts: EditModeNft[], isSelected: boolean) => void;
  stageNfts: (nfts: EditModeNft[]) => void;
  unstageNfts: (ids: string[]) => void;
  handleSortNfts: (event: DragEndEvent) => void;
};

const CollectionEditorActionsContext = createContext<
  CollectionEditorActions | undefined
>(undefined);

export const useCollectionEditorActions = (): CollectionEditorActions => {
  const context = useContext(CollectionEditorActionsContext);
  if (!context) {
    throw Error('');
  }
  return context;
};

type Props = { children: ReactNode };

const CollectionEditorProvider = memo(({ children }: Props) => {
  const [sidebarNftsState, setSidebarNftsState] = useState<SidebarNftsState>(
    []
  );
  const [stagedNftsState, setStagedNftsState] = useState<StagedNftsState>([]);

  const collectionEditorState = useMemo(
    () => ({
      sidebarNfts: sidebarNftsState,
      stagedNfts: stagedNftsState,
    }),
    [sidebarNftsState, stagedNftsState]
  );

  const setSidebarNfts = useCallback((nfts: EditModeNft[]) => {
    setSidebarNftsState(nfts);
  }, []);

  const setNftsIsSelected = useCallback(
    (nfts: EditModeNft[], isSelected: boolean) => {
      setSidebarNftsState((prev) => {
        let next = [...prev];
        nfts.forEach((nft) => {
          let selectedNft = next[nft.index];
          next[nft.index] = { ...selectedNft, isSelected };
        });
        return next;
      });
    },
    []
  );

  const stageNfts = useCallback((nfts: EditModeNft[]) => {
    setStagedNftsState((prev) => [...prev, ...nfts]);
  }, []);

  const unstageNfts = useCallback((ids: string[]) => {
    const idsMap = ids.reduce((map: { [key: string]: boolean }, id: string) => {
      map[id] = true;
      return map;
    }, {});
    setStagedNftsState((prev) =>
      prev.filter((editModeNft) => !idsMap[editModeNft.id])
    );
  }, []);

  const handleSortNfts = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setStagedNftsState((prev) => {
        const oldIndex = prev.findIndex(({ nft }) => nft.id === active.id);
        const newIndex = prev.findIndex(({ nft }) => nft.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  const collectionEditorActions: CollectionEditorActions = useMemo(
    () => ({
      setSidebarNfts,
      setNftsIsSelected,
      stageNfts,
      unstageNfts,
      handleSortNfts,
    }),
    [setSidebarNfts, setNftsIsSelected, stageNfts, unstageNfts, handleSortNfts]
  );

  return (
    <CollectionEditorStateContext.Provider value={collectionEditorState}>
      <CollectionEditorActionsContext.Provider value={collectionEditorActions}>
        {children}
      </CollectionEditorActionsContext.Provider>
    </CollectionEditorStateContext.Provider>
  );
});

export default CollectionEditorProvider;
