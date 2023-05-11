import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation = (): Geolocation.GeoPosition => {
  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      return position;
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
