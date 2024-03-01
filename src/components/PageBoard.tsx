import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardHeader from "./BoardHeader";
import ListHeader from "./ListHeader";
import CardList from "./CardList";
import { ApplicationService } from "../applications/applicationService";
import { RepositoryLocalFile } from "../repositories/repository";
import { JSX } from "preact/jsx-runtime";
import { useEffect, useRef, useState } from "preact/hooks";
import CardForm from "./CardForm";
import { BgColor } from "../types/bgColor";
import { filterListsByCardName } from "../utils";

export default function PageBoard({
  boardId,
  state,
  cardId
}: {
  boardId: string;
  state: Signal<Board[]>;
  cardId?: string;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  const repository = new RepositoryLocalFile();
  const service = new ApplicationService(repository);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imputCardFilterElement = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [draggingListId, setDraggingListId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (cardId) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [cardId]);

  const found = state.value.find((b) => {
    return b.id === boardId;
  });

  const updateState = (boards: Board[]) => {
    state.value = boards;
  };

  const updateBoardName = (id: string, title: string) => {
    const update = service.updateBoardTitle(state.value, title, id);
    updateState(update);
  };

  const handleSubmitList = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputElement.current) {
      const updated = service.createList(
        state.value,
        inputElement.current.value,
        boardId
      );
      updateState(updated);
      inputElement.current.value = "";
    }
  };

  const updateListTitle = (listId: string, newTitle: string) => {
    const updated = service.updateListTitle(
      state.value,
      newTitle,
      boardId,
      listId
    );
    updateState(updated);
  };

  const selectBgColor = (e: JSX.TargetedMouseEvent<HTMLInputElement>) => {
    const updated = service.updateBoardBgColor(
      state.value,
      e.currentTarget.value as BgColor,
      boardId
    );
    updateState(updated);
  };

  const deleteBoard = (boardId: string) => {
    const updated = service.deleteBoard(state.value, boardId);
    updateState(updated);
  };

  const addCard = (listId: string, cardTitle: string) => {
    const updated = service.createCard(state.value, cardTitle, boardId, listId);
    updateState(updated);
  };

  const updateCardTitle = (
    cardId: string,
    cardTitle: string,
    listId: string
  ) => {
    const updated = service.updateCardTitle(
      state.value,
      boardId,
      listId,
      cardId,
      cardTitle
    );
    updateState(updated);
  };

  const handleSubmit = (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = imputCardFilterElement.current?.value;
    if (query) {
      setQuery(query);
    } else {
      setQuery("");
    }
  };
  const handleReset = () => {
    setQuery("");
  };

  const deleteList = (listId: string) => {
    const updated = service.deleteList(state.value, boardId, listId);
    updateState(updated);
  };

  const deleteAllCards = (listId: string) => {
    const updated = service.deleteAllCards(state.value, boardId, listId);
    updateState(updated);
  };

  const deleteCard = (cardId: string, listId: string) => {
    const updated = service.deleteCard(state.value, cardId, boardId, listId);
    updateState(updated);
  };

  const handleDragStartList = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
    const listId = e.currentTarget.dataset.listId;
    setDraggingListId(listId);
  };

  const handleDragEndList = () => {
    setDraggingListId(undefined);
  };

  const handleDragOver = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropOnList = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    const listId = e.currentTarget.dataset.listId;
    if (draggingListId === listId) return;
    if (draggingListId && listId) {
      const updated = service.moveList(
        state.value,
        boardId,
        draggingListId,
        listId
      );
      updateState(updated);
    }
  };

  return (
    <div
      class={`flex-column h-full bg-${found?.bgColor ? found.bgColor : "primary"}`}
    >
      {found && (
        <div>
          <BoardHeader
            id={found.id}
            title={found.title}
            bgColor={found.bgColor}
            updateBoardName={updateBoardName}
            selectBgColor={selectBgColor}
            deleteBoard={deleteBoard}
          />
        </div>
      )}
      <div class="px-3 h-6">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div class="flex-row">
            <label for="card-filter">
              <div class="inline-block h-6 w-6 text-center border-solid border-1 border-color-primary bg-primary">
                <span class="text-secondary">🔍</span>
              </div>
            </label>
            <input
              id="card-filter"
              type="text"
              class="w-48 h-6 px-2 bg-primary border-solid border-1 border-color-primary border-l-none"
              placeholder="Filter"
              ref={imputCardFilterElement}
            />
            <button
              type="reset"
              class="h-6 border-solid border-1 border-color-primary bg-primary px-2 text-secondary text-small"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div class="f-1 flex-row layout-stack-horizontal-4 overflow-x-auto px-3 pattern-scrollbar-thick">
        {found &&
          filterListsByCardName(query, found.lists).map((list, idx) => (
            <div key={idx} class="flex-column">
              <div
                class="w-64 p-3 bg-secondary rounded-2 layout-stack-3 drop-shadow"
                draggable
                onDrop={handleDropOnList}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEndList}
                onDragStart={handleDragStartList}
                data-list-id={list.id}
              >
                <ListHeader
                  listId={list.id}
                  title={list.title}
                  cardsNum={list.cards.length}
                  updateListTitle={updateListTitle}
                  deleteList={deleteList}
                  deleteAllCards={deleteAllCards}
                />
                <CardForm listId={list.id} addCard={addCard} />
                <CardList
                  cards={list.cards}
                  listId={list.id}
                  deleteCard={deleteCard}
                  updateCardTitle={updateCardTitle}
                />
              </div>
            </div>
          ))}
        <div class="py-3">
          <form onSubmit={handleSubmitList}>
            <div class="border-1 border-soild border-color-primary inline-block">
              <input
                ref={inputElement}
                class="h-6 px-2 border-none"
                // class="w-64 p-3 bg-secondary rounded-2 layout-stack-3 drop-shadow"
                type="text"
                placeholder="Enter list title..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
