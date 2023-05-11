import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/CustomText';
import globalstyles from '../styles/globalstyles';
import {formatTime} from '../utils/timeFormat';
import {useAppDispatch} from '../redux/store';
import {setWeather} from '../redux/weather/weatherSlice';
import {useLanguageContext} from '../localization/useLanguage';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/navigationHelpers';

type Props = StackScreenProps<RootStackParamList, 'WEATHERDETAILS'>;

export default ({route}: Props) => {
  const {location, current} = route.params;
  const dispatch = useAppDispatch();
  const {ltrRlt} = useLanguageContext();
  useEffect(() => {
    return () => {
      dispatch(setWeather(undefined));
    };
  }, [dispatch]);
  return (
    <SafeAreaView style={globalstyles.safeAreaViewStyle}>
      <View style={[globalstyles.backgroundStyle, {direction: ltrRlt}]}>
        <CustomText style={globalstyles.headerFont}>{location.name}</CustomText>
        <CustomText>{formatTime(location.localtime_epoch)}</CustomText>
        <View style={styles.iconRow}>
          <Image
            source={{uri: 'https:' + current.condition.icon}}
            style={styles.iconSize}
          />
          <View style={styles.tempRow}>
            <CustomText style={[globalstyles.headerFont, styles.temp]}>
              {current.temp_c}
            </CustomText>
            <CustomText style={[globalstyles.headerFont, styles.tempMeasure]}>
              ˚C
            </CustomText>
          </View>
        </View>
        <CustomText style={globalstyles.headerFont}>
          {current.condition.text}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  iconSize: {
    height: 180,
    width: '50%',
    resizeMode: 'contain',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    direction: 'ltr',
  },
  temp: {
    fontSize: 80,
    textAlign: 'center',
    alignItems: 'flex-start',
  },
  tempMeasure: {
    fontSize: 25,
    top: 10,
  },
});
