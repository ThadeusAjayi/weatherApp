import {StyleSheet} from 'react-native';
import colors from '../assets/colors';

export default StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundStyle: {padding: 20},
  inputStyle: {
    height: 60,
    backgroundColor: colors.textInputBackgroundColor,
    marginBottom: 20,
    borderRadius: 4,
    paddingHorizontal: 20,
    borderColor: colors.textInputColor,
    borderWidth: 1,
  },
  bottomSpacing: {
    marginBottom: 20,
  },
  textStyle: {
    color: colors.primaryTextColor,
    marginBottom: 20,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'left',
  },
  headerFont: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'left',
  },
  errorTextStyle: {
    color: colors.errorTextColor,
    marginBottom: 0,
    start: 10,
    end: 10,
    fontSize: 10,
    textAlign: 'left',
  },
  bottomBorder: {
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
});
