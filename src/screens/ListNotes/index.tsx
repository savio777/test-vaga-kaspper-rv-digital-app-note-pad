import React from 'react';
import {Text} from 'react-native';

import {Container} from './styles';
import {useNotes} from '../../NotesHooks/Notes';
import {Notes} from '../../components';

export default () => {
  const {notes} = useNotes();

  return (
    <Container>
      <Text>oi</Text>
      {notes.map((note, index) => (
        <Notes key={String(index)} text={note.text} title={note.title} />
      ))}
    </Container>
  );
};
