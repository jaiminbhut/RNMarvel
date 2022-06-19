import { ms } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  header: { fontWeight: 'bold', fontSize: ms(30) },
  title: {
    fontWeight: 'bold',
    fontSize: ms(24),
  },
  subTitle: {
    fontSize: ms(24),
  },
  text: {
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  label: {
    fontSize: ms(14),
  },
  textInputText: {
    fontWeight: 'bold',
    fontSize: ms(34),
  },
  textText: {
    fontWeight: 'bold',
    fontSize: ms(34),
  },
  caption: { fontWeight: '400', fontSize: ms(14) },
});
