import React, {useState} from 'react';
import {TouchableOpacityProps} from 'react-native';

import INotes from '../../interfaces/INotes';
import {Container, Text, Title, Content} from './styles';

type Props = INotes & TouchableOpacityProps;

const Notes: React.FC<Props> = ({text, title, ...props}) => {
  const [hideText, setHideText] = useState(true);

  return (
    <Container onPress={() => setHideText(!hideText)} {...props}>
      <Content>
        <Title>{title}</Title>
        <Text numberOfLines={hideText ? 3 : undefined}>{text}</Text>
      </Content>
    </Container>
  );
};

export default Notes;
