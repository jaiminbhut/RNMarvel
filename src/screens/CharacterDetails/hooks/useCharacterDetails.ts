import { Character } from '@/interfaces';
import CharacterActions, {
  CharacterSelectors,
} from '@/reducers/CharacterReducer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ParamList } from '../CharacterDetails.props';

const useCharacterDetails = () => {
  const route = useRoute<RouteProp<ParamList, 'CharacterDetails'>>();

  const char_id = route.params?.char_id ?? '';
  const [character, setCharacter] = useState<Character>({
    char_id: '',
    img: undefined,
    name: '',
    nickname: '',
    isFavorite: false,
    portrayed: '',
    birthday: '',
    status: '',
    occupation: [],
    appearance: [],
  });
  const otherCharacters = useSelector(CharacterSelectors.getOtherCharacters);
  const allCharacters = useSelector(CharacterSelectors.getCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CharacterActions.getOtherCharactersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char_id]);

  useEffect(() => {
    if (allCharacters.length > 0) {
      const index = allCharacters.findIndex((item) => item.char_id === char_id);

      if (index > -1) {
        setCharacter({ ...allCharacters[index] });
      }
    }
  }, [allCharacters, char_id]);

  const getter = { character, allCharacters, otherCharacters };
  const setter = { dispatch };

  return {
    getter,
    setter,
  };
};

export default useCharacterDetails;
