import { loadingViewRef } from '@/components/LoadingView/LoadingView';
import { Character } from '@/interfaces';
import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';

interface InitialStateInterface {
  characters: Array<Character>;
  fetching: null;
  error: null;
  searchCharacters: Array<Character>;
  otherCharacters: Array<Character>;
}

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  charactersRequest: [''],
  charactersSuccess: ['data'],
  charactersFailure: ['error'],
  searchCharactersRequest: ['search'],
  searchCharactersSuccess: ['data'],
  searchCharactersFailure: ['error'],
  getOtherCharactersRequest: [''],
  getOtherCharactersSuccess: ['data'],
  getOtherCharactersFailure: ['error'],
  clearSearchData: [''],
});

export const CharacterTypes = Types;

const CharacterActions = Creators;

export default CharacterActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ImmutableObject<InitialStateInterface> = Immutable({
  characters: [],
  fetching: null,
  error: null,
  searchCharacters: [],
  otherCharacters: [],
});

/* ------------- Selectors ------------ */
export const CharacterSelectors = {
  getCharacters: (state: { characters: { characters: Array<Character> } }) =>
    state.characters.characters,
  getSearchCharacters: (state: {
    characters: { searchCharacters: Array<Character> };
  }) => state.characters.searchCharacters,
  getOtherCharacters: (state: {
    characters: { otherCharacters: Array<Character> };
  }) => state.characters.otherCharacters,
  fetching: (state: { characters: { fetching: boolean } }) =>
    state.characters.fetching,
};

/* ------------- Reducers ------------- */
// request the data from an api
export const request = (state: any): any =>
  state.merge({ fetching: true, error: null });

export const getCharactersSuccess = (state: any, action: any): any => {
  const { data } = action;

  loadingViewRef.current?.hide();

  return state.merge({
    fetching: false,
    error: null,
    characters: data,
  });
};

export const searchCharactersSuccess = (state: any, action: any): any => {
  const { data } = action;

  loadingViewRef.current?.hide();

  return state.merge({
    fetching: false,
    error: null,
    searchCharacters: data,
  });
};

export const otherCharactersSuccess = (state: any, action: any): any => {
  const { data } = action;

  loadingViewRef.current?.hide();

  return state.merge({
    fetching: false,
    error: null,
    otherCharacters: data,
  });
};

export const failure = (state: any, action: any): any => {
  const { error } = action;

  return state.merge({ fetching: false, error });
};

const clearSearchData = (state: any): any =>
  state.merge({
    searchCharacters: [],
  });

/* ------------- Hookup Reducers To Types ------------- */
export const charactersReducer = createReducer(INITIAL_STATE, {
  [Types.CHARACTERS_REQUEST]: request,
  [Types.CHARACTERS_SUCCESS]: getCharactersSuccess,
  [Types.CHARACTERS_FAILURE]: failure,
  [Types.SEARCH_CHARACTERS_REQUEST]: request,
  [Types.SEARCH_CHARACTERS_SUCCESS]: searchCharactersSuccess,
  [Types.SEARCH_CHARACTERS_FAILURE]: failure,
  [Types.CLEAR_SEARCH_DATA]: clearSearchData,
  [Types.GET_OTHER_CHARACTERS_REQUEST]: request,
  [Types.GET_OTHER_CHARACTERS_SUCCESS]: otherCharactersSuccess,
  [Types.GET_OTHER_CHARACTERS_FAILURE]: failure,
});
