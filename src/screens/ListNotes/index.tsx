import React from 'react';
import {FlatList} from 'react-native';

import {Container} from './styles';
import {useNotes} from '../../NotesHooks/Notes';
import {Notes} from '../../components';

export default () => {
  const {notes} = useNotes();

  return (
    <Container>
      <FlatList
        keyExtractor={(_, index) => String(index)}
        data={notes}
        renderItem={({item}) => <Notes title={item.title} text={item.text} />}
        numColumns={2}
      />
    </Container>
  );
};
