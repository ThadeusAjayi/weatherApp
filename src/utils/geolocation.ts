import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation = async (
  callback: (coord: Geolocation.GeoPosition) => void,
) => {
  const hasPermission =
    (await Geolocation.requestAuthorization('whenInUse')) === 'granted';
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        callback(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  } else {
    callback({
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
    });
  }
};
