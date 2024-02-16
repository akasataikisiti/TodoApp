import { BgColor } from "./bgColor";

export type Board = {
  id: string;
  title: string;
  data: string;
  bgColor: BgColor | null;
};
