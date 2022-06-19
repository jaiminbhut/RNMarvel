import { NAVIGATION } from '@/constants';
import { Character } from '@/interfaces';
import { navigate } from '@/navigation/NavigationRef';
import { ms, theme } from '@/theme';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CachedImage from '../CachedImage/CachedImage';
import {
  FavoriteButtonProps,
  ImageProps,
  NameNickNameProps,
  Props,
} from './CharactersItem.props';
import styles from './CharactersItem.styles';

const NameNickNameView: React.FC<NameNickNameProps> = ({ name, nickname }) => (
  <View style={styles.nameView}>
    <Text style={styles.textName} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.textNickName} numberOfLines={1}>
      {nickname}
    </Text>
  </View>
);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
}) => (
  <Pressable
    accessibilityRole="button"
    style={styles.buttonSearch}
    onPress={onPress}>
    <Icon
      name={isFavorite ? 'favorite' : 'favorite-border'}
      size={ms(24)}
      color={isFavorite ? theme.colors.green : theme.colors.gray}
    />
  </Pressable>
);

const ImageView: React.FC<ImageProps> = ({ img }) => (
  <CachedImage
    source={{ uri: img }}
    resizeMode={'cover'}
    style={styles.imageCharacter}
  />
);

const handleItemClick = (row: Character) => {
  navigate(NAVIGATION.characterDetails, {
    char_id: row.char_id,
  });
};

const CharactersItem: React.FC<Props> = ({
  row,
  index,
  onFavoriteAction,
  hideFavorite = false,
}) => (
  <View key={index} style={styles.container}>
    <Pressable
      accessibilityRole="button"
      style={styles.innerContainer}
      onPress={() => handleItemClick(row)}>
      <ImageView img={row.img} />
      <View style={styles.nameFavoriteContainer}>
        <NameNickNameView {...row} />
        {!hideFavorite && (
          <FavoriteButton {...row} onPress={onFavoriteAction} />
        )}
      </View>
    </Pressable>
  </View>
);

export default CharactersItem;
