import { Board } from "./types/board";
import { Card } from "./types/card";
import { List } from "./types/lists";

const testCards1: Card[] = [
  {
    id: "c_id1",
    title: "Title 1",
    description: "Description 1",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  },
  {
    id: "c_id2",
    title: "Title 2",
    description: "Description 2",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  }
];
const testCards2: Card[] = [
  {
    id: "c_id3",
    title: "Title 3",
    description: "Description 3",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  },
  {
    id: "c_id4",
    title: "Title 4",
    description: "Description 4",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  }
];
const testCards3: Card[] = [
  {
    id: "c_id5",
    title: "Title 5",
    description: "Description 5",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  },
  {
    id: "c_id6",
    title: "Title 6",
    description: "Description 6",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  }
];
const testCards4: Card[] = [
  {
    id: "c_id7",
    title: "Title 7",
    description: "Description 7",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  },
  {
    id: "c_id8",
    title: "Title 8",
    description: "Description 8",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01"
  }
];

const testLists1: List[] = [
  {
    id: "l_id1",
    title: "Title 1",
    cards: testCards1
  },
  {
    id: "l_id2",
    title: "Title 2",
    cards: testCards2
  }
];
const testLists2 = [
  {
    id: "l_id3",
    title: "Title 3",
    cards: testCards3
  },
  {
    id: "l_id4",
    title: "Title 4",
    cards: testCards4
  }
];

export const testBoards: Board[] = [
  {
    id: "b_id1",
    title: "Title 1",
    lists: testLists1,
    bgColor: "red"
  },
  {
    id: "b_id2",
    title: "Title 2",
    lists: testLists2,
    bgColor: "yellow"
  }
];
