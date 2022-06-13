import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {ButtonCircle} from '../../components';
import {useNotes} from '../../NotesHooks/Notes';
import colors from '../../utils/colors';
import {
  Container,
  Content,
  TextInput,
  TitleInput,
  ContainerButtons,
} from './styles';

export default () => {
  const {notes, addNote} = useNotes();
  const {goBack} = useNavigation();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const refTextRefInput = useRef(null);

  return (
    <Container>
      <Content>
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          numberOfLines={1}
          placeholderTextColor={colors.gray}
          onSubmitEditing={() => refTextRefInput.current?.focus()}
        />
        <TextInput
          ref={refTextRefInput}
          value={text}
          onChangeText={setText}
          placeholder="Texto"
          multiline
          placeholderTextColor={colors.gray}
        />
      </Content>
      <ContainerButtons>
        <ButtonCircle
          onPress={() => {
            addNote({text, title});
            goBack();
          }}>
          <Icon name="content-save-outline" size={25} color="white" />
        </ButtonCircle>
      </ContainerButtons>
    </Container>
  );
};
