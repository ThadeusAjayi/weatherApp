import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomText from '../../../components/CustomText';
import {HourItem} from '../../../redux/dataTypes';
import globalstyles from '../../../styles/globalstyles';
import {formatTime} from '../../../utils/timeFormat';

export default (item: HourItem) => {
  return (
    <View style={globalstyles.bottomBorder}>
      <View style={styles.iconRow}>
        <View style={styles.leftInfo}>
          <CustomText style={[globalstyles.headerFont, styles.condition]}>
            {item.condition.text}
          </CustomText>
          <Image
            source={{uri: 'https:' + item.condition.icon}}
            style={styles.iconSize}
          />
          <CustomText style={styles.time}>
            {formatTime(item.time_epoch)}
          </CustomText>
        </View>
        <View style={styles.tempRow}>
          <CustomText numberOfLines={1} style={[styles.temp]}>
            {item.temp_c}
          </CustomText>
          <CustomText style={[styles.tempMeasure]}>˚C</CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  leftInfo: {alignItems: 'flex-start', flex: 1},
  iconSize: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  condition: {fontSize: 16, marginTop: 6, marginBottom: 6},
  time: {fontSize: 16, marginVertical: 6, marginBottom: 6},
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 1,
  },
  temp: {
    fontSize: 20,
    alignItems: 'flex-end',
  },
  tempMeasure: {
    fontSize: 10,
  },
});
