import React, {useState} from 'react';

import INotes from '../../interfaces/INotes';
import {Container, Text, Title, Content} from './styles';

const Notes: React.FC<INotes> = ({text, title}) => {
  const [hideText, setHideText] = useState(true);

  return (
    <Container onPress={() => setHideText(!hideText)}>
      <Content>
        <Title>{title}</Title>
        <Text numberOfLines={hideText ? 3 : undefined}>{text}</Text>
      </Content>
    </Container>
  );
};

export default Notes;
