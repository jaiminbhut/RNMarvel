import { strings } from '@/localization';
import { isNull } from '@/utils/helper';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './EmptyListView.styles';

const EmptyListView: React.FC<Props> = ({
  message,
  isLoading,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textMessage}>
        {isLoading ? strings.loading : message}
      </Text>
      {!isNull(description) && !isLoading && (
        <Text style={styles.textDescription}>{description}</Text>
      )}
    </View>
  );
};

export default EmptyListView;

interface Props {
  message: string;
  isLoading: boolean;
  description?: string;
}

EmptyListView.defaultProps = {
  isLoading: true,
  message: strings.noCharacterFound,
  description: '',
};
