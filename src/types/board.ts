import { BgColor } from "./bgColor";
import { List } from "./lists";

export type Board = {
  id: string;
  title: string;
  lists: List[];
  bgColor: BgColor | null;
};
