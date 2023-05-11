import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {fetchCityWeather} from '../../redux/weather/weatherSlice';
import {useAppDispatch} from '../../redux/store';
import CustomButton from '../../components/CustomButton';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../components/CustomInput';
import globalstyles from '../../styles/globalstyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import {NavigationProp} from '@react-navigation/native';
import routes from '../../navigation/routes';
import colors from '../../assets/colors';

interface Prop {
  navigation: NavigationProp<any, any>;
}

export default ({navigation}: Prop) => {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState('');
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {weatherSearch, weatherSearchStatus} = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    if (weatherSearch && weatherSearchStatus === 'succeeded') {
      setCity('');
      setIsLoading(false);
      navigation.navigate(routes.WEATHERDETAILS, weatherSearch);
    }
    if (weatherSearchStatus === 'loading') {
      setIsLoading(true);
    }
    if (weatherSearchStatus === 'failed') {
      setIsLoading(false);
      Alert.alert(t('weather.failed', {city}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherSearch, weatherSearchStatus]);

  return (
    <View style={globalstyles.backgroundStyle}>
      <CustomInput
        validation="specialCharacter"
        hasError={setHasError}
        props={{
          onChangeText: setCity,
          value: city,
          placeholder: t('weather.city'),
        }}
      />
      {isLoading ? (
        <ActivityIndicator color={colors.activeButton} />
      ) : (
        <CustomButton
          disable={hasError}
          title={t('weather.search')}
          onClick={() => dispatch(fetchCityWeather(city))}
        />
      )}
    </View>
  );
};
