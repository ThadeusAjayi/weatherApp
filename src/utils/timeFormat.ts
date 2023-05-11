import moment from 'moment';

export const formatTime = (timeMillis: number): string => {
  return moment.unix(timeMillis).format('dddd, hh:mm a');
};

export const formatDate = (timeMillis: number): string => {
  return moment.unix(timeMillis).format('ddd, Mo MMM');
};
