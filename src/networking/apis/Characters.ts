import urlEndPoints from '@/networking/urlEndPoints';
import { ApisauceInstance } from 'apisauce';

const characters = (api: ApisauceInstance) => () => {
  const getCharacters = () => {
    return api.get(urlEndPoints.characters);
  };

  const searchCharacters = (search: string) => {
    return api.get(urlEndPoints.searchCharacters + search);
  };

  const getOtherCharacters = () => {
    return api.get(urlEndPoints.otherCharacters + 3);
  };

  return {
    getCharacters,
    searchCharacters,
    getOtherCharacters,
  };
};

export default characters;
