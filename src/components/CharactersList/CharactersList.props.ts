import { Character } from '@/interfaces';

export interface Props {
  data?: Array<Character>;
  isSearch?: boolean;
  emptyListMessage: string;
  emptyListDescription?: string;
}
