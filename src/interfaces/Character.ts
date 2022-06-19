interface Character {
  char_id: string;
  img: string | undefined;
  name: string;
  nickname: string;
  isFavorite: boolean;
  portrayed?: string;
  birthday: string;
  status?: string;
  occupation: String[];
  appearance: String[];
}

export default Character;
