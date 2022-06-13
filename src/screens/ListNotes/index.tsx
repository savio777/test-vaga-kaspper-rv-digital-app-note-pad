import React from 'react';
import {FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, ContainerButtons} from './styles';
import {useNotes} from '../../NotesHooks/Notes';
import {Notes, ButtonCircle} from '../../components';

export default () => {
  const {notes, clean} = useNotes();

  return (
    <Container>
      <FlatList
        keyExtractor={(_, index) => String(index)}
        data={notes}
        renderItem={({item}) => <Notes title={item.title} text={item.text} />}
        numColumns={2}
        // style={{borderWidth: 1, borderColor: 'red'}}
      />
      <ContainerButtons>
        <ButtonCircle
          onPress={() =>
            Alert.alert('Aviso', 'Deseja realmente apagar tudo?', [
              {text: 'Cancelar', onPress: () => {}},
              {text: 'Confirmar', onPress: () => clean()},
            ])
          }>
          <Icon name="delete-outline" size={25} color="white" />
        </ButtonCircle>
        <ButtonCircle>
          <Icon name="pencil" size={25} color="white" />
        </ButtonCircle>
      </ContainerButtons>
    </Container>
  );
};
