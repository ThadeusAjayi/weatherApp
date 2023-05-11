import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../../redux/store';
import CustomText from '../../components/CustomText';
import {NetworkInfo} from 'react-native-network-info';
import {fetchDashboardWeather} from '../../redux/weatherSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import WeatherItem from './components/weatherItem';
import colors from '../../assets/colors';
import globalstyles from '../../styles/globalstyles';
import {formatDate} from '../../utils/timeFormat';
import {ForecastDayType} from '../../redux/dataTypes';
import {useTranslation} from 'react-i18next';

const WeatherDashboardHeader = ({
  forecast,
}: {
  forecast: ForecastDayType | undefined;
}) => {
  const {t} = useTranslation();
  return (
    <View style={[globalstyles.bottomBorder, styles.headerWrapper]}>
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

  const ip = React.useMemo(async () => {
    const res = await NetworkInfo.getIPAddress();
    return res;
  }, []);

  useEffect(() => {
    dispatch(fetchDashboardWeather('lagos'));
  }, [dispatch, ip]);
  return (
    <FlatList
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        forecast?.weatherDashboardStatus === 'succeeded' ? (
          <WeatherDashboardHeader forecast={forecast.weatherDashboard} />
        ) : null
      }
      data={forecast?.weatherDashboard?.hour}
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
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.white,
    paddingBottom: 0,
  },
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
