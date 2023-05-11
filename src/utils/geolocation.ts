import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

const defaultLocation = {
  coords: {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 24.68773,
    longitude: 46.72185,
    speed: -1,
  },
  timestamp: 1683836753581.135,
};

export const getCurrentLocation = async (
  callback: (coord: Geolocation.GeoPosition) => void,
) => {
  if (Platform.OS === 'ios') {
    (await Geolocation.requestAuthorization('whenInUse')) === 'granted';
  } else {
    (await PermissionsAndroid.request(
      'android.permission.ACCESS_COARSE_LOCATION',
    )) === 'granted';
  }
  console.log('');
  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      callback(position);
    },
    error => {
      console.log(error.code, error.message);
      callback(defaultLocation);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
