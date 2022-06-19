import { Character } from '@/interfaces';
import { strings } from '@/localization';
import CharacterActions from '@/reducers/CharacterReducer';
import { isNull } from '@/utils/helper';
import produce from 'immer';
import React from 'react';
import { FlatList, View } from 'react-native';
import CharactersItem from '../CharactersItem/CharactersItem';
import EmptyListView from '../EmptyListView/EmptyListView';
import { Props } from './CharactersList.props';
import styles from './CharactersList.styles';
import useCharactersList from './hooks/useCharactersList';

const getNewList = (list: Array<Character>, item: Character) => {
  const newList = produce(list, (draft) => {
    const index = draft.findIndex((itemD) => itemD.char_id === item.char_id);

    if (index > -1) {
      draft[index].isFavorite = !draft[index].isFavorite;
    }
  });

  return newList;
};

const handleFavoriteAction = (
  item: Character,
  dispatch: Function,
  characters: Array<Character>,
  searchedCharacter: Array<Character>,
  isSearch?: boolean,
) => {
  const newList = getNewList(characters, item);

  dispatch(CharacterActions.charactersSuccess(newList));

  if (isSearch) {
    if (!isNull(searchedCharacter)) {
      const newSearchList = getNewList(searchedCharacter, item);

      dispatch(CharacterActions.searchCharactersSuccess(newSearchList));
    }
  }
};

const CharactersList: React.FC<Props> = ({
  data,
  isSearch,
  emptyListMessage,
  emptyListDescription,
}) => {
  const { getter, setter } = useCharactersList();
  const { characters, searchedCharacter, isLoading } = getter;
  const { dispatch } = setter;

  return (
    <View style={styles.charactersList}>
      <FlatList
        data={isSearch ? searchedCharacter : data}
        bounces={false}
        numColumns={2}
        keyExtractor={(item, index) => `character-list${item.name}${index}`}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <EmptyListView
            isLoading={isLoading}
            message={emptyListMessage}
            description={emptyListDescription}
          />
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <CharactersItem
              row={item}
              index={index}
              onFavoriteAction={() =>
                handleFavoriteAction(
                  item,
                  dispatch,
                  characters,
                  searchedCharacter,
                  isSearch,
                )
              }
            />
          );
        }}
      />
    </View>
  );
};

export default CharactersList;

CharactersList.defaultProps = {
  data: [],
  emptyListMessage: strings.noCharacterFound,
  isSearch: false,
  emptyListDescription: '',
};
