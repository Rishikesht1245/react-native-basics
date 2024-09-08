import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

type IconsProps = PropsWithChildren<{
  name: string;
}>;

// this will return the icon we just have to specify the name of the icon
export default function Icons({name}: IconsProps) {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={38} color="#f7cd2e" />;
    case 'cross':
      return <Icon name="times" size={38} color="red" />;

    default:
      return <Icon name="pencil" size={38} color="#38cc77" />;
  }
}

const styles = StyleSheet.create({});
