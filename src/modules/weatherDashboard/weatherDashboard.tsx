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
import {ForecastDayType, LocationType} from '../../redux/dataTypes';
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
  location,
}: {
  forecast: ForecastDayType | undefined;
  direction: DirectionType;
  location?: LocationType;
}) => {
  const {t} = useTranslation();
  return (
    <View
      style={[globalstyles.bottomBorder, styles.headerWrapper, {direction}]}>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.location')}
        </CustomText>
        <CustomText style={styles.keyValue} numberOfLines={2}>{`${
          location!.name
        }, ${location!.country}`}</CustomText>
      </View>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.date')}
        </CustomText>
        <CustomText style={styles.keyValue} numberOfLines={2}>
          {formatDate(forecast!.date_epoch)}
        </CustomText>
      </View>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.sunrise')}
        </CustomText>
        <CustomText style={styles.keyValue} numberOfLines={2}>
          {forecast!.astro.sunrise}
        </CustomText>
      </View>
      <View style={styles.headerRow}>
        <CustomText style={[globalstyles.headerFont, styles.keys]}>
          {t('dashboard.header.sunset')}
        </CustomText>
        <CustomText style={styles.keyValue} numberOfLines={2}>
          {forecast!.astro.sunset}
        </CustomText>
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
        stickyHeaderIndices={
          forecast?.weatherDashboardStatus === 'succeeded' ? [0] : undefined
        }
        removeClippedSubviews={false}
        ListHeaderComponent={
          forecast?.weatherDashboardStatus === 'succeeded' ? (
            <WeatherDashboardHeader
              forecast={forecast.weatherDashboard?.forecast.forecastday[0]}
              location={forecast.weatherDashboard?.location}
              direction={ltrRlt}
            />
          ) : null
        }
        data={forecast?.weatherDashboard?.forecast?.forecastday?.[0]?.hour}
        style={{direction: ltrRlt}}
        contentContainerStyle={styles.containerStyle}
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
    flex: 1,
  },
  keys: {fontSize: 16, flex: 0.8},
  keyValue: {flex: 1.5, textAlign: 'right'},
  loader: {
    marginTop: 20,
  },
  containerStyle: {paddingBottom: 20},
});
