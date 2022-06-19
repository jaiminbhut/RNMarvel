import Character from '@/interfaces/Character';

export interface HeaderViewProps {
  character: Character;
  allCharacters: Array<Character>;
  dispatch: Function;
}

export interface CharacterImageViewProps {
  img: string | undefined;
  name: string;
  nickname: string;
  status?: string;
}

export interface CharacterPortrayedViewProps {
  portrayed?: string;
  birthday: string;
}

export interface CharacterOccupationViewProps {
  occupation: String[];
}

export interface CharacterAppearanceViewProps {
  appearance: String[];
}

export interface OtherCharacterViewProps {
  otherCharacters?: Array<Character>;
}

export type ParamList = {
  CharacterDetails: {
    char_id: string;
  };
};
