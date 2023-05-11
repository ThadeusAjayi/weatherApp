import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../../redux/store';
import CustomText from '../../components/CustomText';
import {fetchDashboardWeather} from '../../redux/weather/weatherSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import WeatherItem from './components/weatherItem';
import colors from '../../assets/colors';
import globalstyles from '../../styles/globalstyles';
import {formatDate} from '../../utils/timeFormat';
import {ForecastDayType} from '../../redux/dataTypes';
import {useTranslation} from 'react-i18next';
import {
  DirectionType,
  useLanguageContext,
} from '../../localization/useLanguage';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import {getCurrentLocation} from '../../utils/geolocation';
import Geolocation from 'react-native-geolocation-service';

const WeatherDashboardHeader = ({
  forecast,
  direction,
}: {
  forecast: ForecastDayType | undefined;
  direction?: DirectionType;
}) => {
  const {t} = useTranslation();
  return (
    <View
      style={[globalstyles.bottomBorder, styles.headerWrapper, {direction}]}>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.date')}
        </CustomText>
        <CustomText>{formatDate(forecast!.date_epoch)}</CustomText>
      </View>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.sunrise')}
        </CustomText>
        <CustomText>{forecast!.astro.sunrise}</CustomText>
      </View>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.sunset')}
        </CustomText>
        <CustomText>{forecast!.astro.sunset}</CustomText>
      </View>
    </View>
  );
};

export default () => {
  const dispatch = useAppDispatch();
  const forecast = useSelector((state: RootState) => state.weather);
  const {ltrRlt} = useLanguageContext();
  const [position, setPosition] = useState<Geolocation.GeoPosition>();

  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  useEffect(() => {
    if (position?.coords) {
      dispatch(
        fetchDashboardWeather(
          `${position?.coords.latitude},${position?.coords.longitude}`,
        ),
      );
    }
  }, [dispatch, position]);
  return (
    <View>
      <View style={styles.switcher}>
        <LanguageSwitcher />
      </View>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          forecast?.weatherDashboardStatus === 'succeeded' ? (
            <WeatherDashboardHeader
              forecast={forecast.weatherDashboard}
              direction={ltrRlt}
            />
          ) : null
        }
        data={forecast?.weatherDashboard?.hour}
        style={{direction: ltrRlt}}
        renderItem={({item}) => <WeatherItem {...item} />}
        ListFooterComponent={
          forecast?.weatherDashboardStatus === 'loading' ? (
            <ActivityIndicator
              color={colors.secondaryTextColor}
              style={styles.loader}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.white,
    paddingBottom: 0,
  },
  switcher: {paddingHorizontal: 20},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  keys: {fontSize: 16},
  loader: {
    marginTop: 20,
  },
});
