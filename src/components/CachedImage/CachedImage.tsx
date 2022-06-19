import { ms, theme } from '@/theme';
import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage, { ResizeMode, Source } from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import styles from './CachedImage.styles';

const CachedImage: React.FC<Props> = ({
  source,
  style,
  resizeMode,
  tintColor,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <View>
      <FastImage
        tintColor={tintColor ?? undefined}
        style={[style]}
        source={source}
        resizeMode={resizeMode}
        onLoadStart={() => {
          setLoaded(false);
          setError(false);
        }}
        onLoadEnd={() => setLoaded(true)}
        onError={() => setError(true)}>
        {(!loaded || error) && (
          <View style={styles.placeHolderView}>
            <Icon name="user" size={ms(40)} color={theme.colors.white} />
          </View>
        )}
      </FastImage>
    </View>
  );
};

export default CachedImage;

interface Props {
  source: Object | Source;
  style?: Object;
  resizeMode?: ResizeMode | undefined;
  tintColor?: string;
}

CachedImage.defaultProps = {
  resizeMode: FastImage.resizeMode.contain,
};
