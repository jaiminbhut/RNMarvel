import styles from '@/components/LoadingView/LoadingView.styles';
import React, { RefObject, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

interface LoadingViewProps {
  show: Function;
  hide: Function;
}

export const loadingViewRef: RefObject<LoadingViewProps> = React.createRef();

const LoadingView: React.ForwardRefRenderFunction<Props> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    loadingViewRef,
    () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }),
    [],
  );

  return (
    <Modal
      transparent
      animated
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <View style={[styles.container]}>
        <ActivityIndicator size={'large'} />
      </View>
    </Modal>
  );
};

export default LoadingView;

interface Props {}
