import { Character } from '@/interfaces';

export interface Props {
  row: Character;
  index?: number;
  onFavoriteAction?: ((...args: any[]) => any) | null | undefined;
  hideFavorite?: boolean;
}

export interface ImageProps {
  img: string | undefined;
}

export interface NameNickNameProps {
  name: string;
  nickname: string;
}

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: ((...args: any[]) => any) | null | undefined;
}
