import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Container} from './styles';

const ButtonCircle: React.FC<TouchableOpacityProps> = props => (
  <Container {...props} />
);

export default ButtonCircle;
