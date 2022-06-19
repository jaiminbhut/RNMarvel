import { CustomHeader } from '@/components';
import { strings } from '@/localization';
import React from 'react';
import { View } from 'react-native';
import styles from './Characters.styles';

export function Characters() {
  return (
    <View style={styles.container}>
      <CustomHeader title={strings.characters} />
    </View>
  );
}
