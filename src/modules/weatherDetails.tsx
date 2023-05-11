import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/CustomText';
import globalstyles from '../styles/globalstyles';
import {RouteProp} from '@react-navigation/native';
import {CityWeatherType} from '../redux/dataTypes';
import {formatTime} from '../utils/timeFormat';
import {useAppDispatch} from '../redux/store';
import {setWeather} from '../redux/weatherSlice';

interface Prop {
  route: RouteProp<
    {
      WEATHERDETAILS: CityWeatherType;
    },
    'WEATHERDETAILS'
  >;
}

export default ({route}: Prop) => {
  const {location, current} = route.params;
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(setWeather(undefined));
    };
  }, [dispatch]);
  return (
    <SafeAreaView style={globalstyles.safeAreaViewStyle}>
      <View style={globalstyles.backgroundStyle}>
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
