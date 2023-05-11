import React from 'react';
import {Button} from 'react-native';
import colors from '../assets/colors';

type Props = {
  title: string;
  disable?: boolean;
  onClick: () => void;
};

export default ({title, onClick, disable}: Props) => {
  return (
    <Button
      title={title}
      disabled={disable}
      onPress={onClick}
      color={colors.activeButton}
    />
  );
};
