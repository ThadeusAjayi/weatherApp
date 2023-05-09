import React from 'react';
import {Button} from 'react-native';
import colors from '../assets/colors';

type Props = {
  title: string;
  onClick: () => void;
};

export default ({title, onClick}: Props) => {
  return <Button title={title} onPress={onClick} color={colors.activeButton} />;
};
