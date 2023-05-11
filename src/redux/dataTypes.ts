export type CityWeatherType = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: 6.9;
    wind_kph: 11.2;
    wind_degree: 220;
    wind_dir: 'SW';
    pressure_mb: 1009.0;
    pressure_in: 29.8;
    precip_mm: 0.0;
    precip_in: 0.0;
    humidity: 75;
    cloud: 25;
    feelslike_c: 37.4;
    feelslike_f: 99.3;
    vis_km: 10.0;
    vis_miles: 6.0;
    uv: 7.0;
    gust_mph: 15.9;
    gust_kph: 25.6;
  };
};

export type HourItem = {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
};

export type ForecastDayType = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: Array<HourItem>;
};

export type WeatherForecastType = {
  forecast: {
    forecastday: Array<ForecastDayType>;
  };
};
