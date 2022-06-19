import { CharactersList } from '@/components';
import { strings } from '@/localization';
import { goBack } from '@/navigation/NavigationRef';
import { ms, theme } from '@/theme';
import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useSearch from './hooks/useSearch';
import { SearchInputProps } from './Search.props';
import styles from './Search.styles';

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => {
  return (
    <View>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.searchInputContainer}>
        <TextInput
          blurOnSubmit
          accessibilityLabel={strings.search}
          accessibilityHint={strings.search}
          placeholder={strings.search}
          placeholderTextColor={theme.colors.placeholder}
          value={search}
          numberOfLines={1}
          style={styles.searchInput}
          returnKeyType={'done'}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={(text) => setSearch(text)}
        />
        <Pressable
          accessibilityRole="button"
          style={styles.cancelContainer}
          onPress={goBack}>
          <Icon name="x" size={ms(20)} color={theme.colors.white} />
        </Pressable>
      </View>
    </View>
  );
};

export function Search() {
  const { getter, setter } = useSearch();

  return (
    <View style={styles.container}>
      <SearchInput {...getter} {...setter} />
      <CharactersList
        isSearch
        emptyListDescription={strings.tryAgain}
        emptyListMessage={strings.noCharacterFound}
      />
    </View>
  );
}
