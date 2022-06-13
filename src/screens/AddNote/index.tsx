import React, {useState, useRef, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

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
  const {addNote, deleteNote, editNote, getNote} = useNotes();
  const {goBack} = useNavigation();
  const {params} = useRoute();

  const [id, setId] = useState<null | string | undefined>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const refTextRefInput = useRef(null);

  useEffect(() => {
    const {id: idParam}: {id: string | null | undefined} = params;

    if (idParam) {
      setId(idParam);
      const note = getNote(idParam);
      if (note?.text) {
        setText(note?.text);
      }
      if (note?.title) {
        setTitle(note?.title);
      }
    }
  }, [params, getNote]);

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
          onPress={() =>
            Alert.alert('Aviso', 'Deseja realmente apagar a nota?', [
              {
                text: 'Cancelar',
                onPress: () => {},
              },
              {
                text: 'Confirmar',
                onPress: () => {
                  deleteNote(id);
                  goBack();
                },
              },
            ])
          }>
          <Icon name="delete-outline" size={25} color="white" />
        </ButtonCircle>
        <ButtonCircle
          onPress={() => {
            if (id) {
              editNote({text, title, id});
            } else {
              addNote({text, title});
            }
            goBack();
          }}>
          <Icon name="content-save-outline" size={25} color="white" />
        </ButtonCircle>
      </ContainerButtons>
    </Container>
  );
};
