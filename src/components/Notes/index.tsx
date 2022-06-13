import React from 'react';

import INotes from '../../interfaces/Notes';
import {Container, Text, Title} from './styles';

const Notes: React.FC<INotes> = ({text, title}) => (
  <Container>
    <Title>{title}</Title>
    <Text>{text}</Text>
  </Container>
);

export default Notes;
