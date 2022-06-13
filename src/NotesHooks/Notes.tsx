import {useEffect} from 'react';
import React, {createContext, useCallback, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Notes from '../interfaces/INotes';

interface NotesContextData {
  notes: Notes[];
  loading: boolean;
  addNote(note: Notes): Promise<void>;
  clean(): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const textLoremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const NotesProvider: React.FC = ({children}) => {
  const [data, setData] = useState<Notes[]>([
    {text: 'teste', title: 'titulo'},
    {text: 'teste1', title: 'titulo1'},
    {text: textLoremIpsum, title: 'titulo2'},
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const notesString = await AsyncStorage.getItem('@NotePad:notes');
      if (notesString) {
        const notes: Notes[] = JSON.parse(notesString);

        if (notes.length > 0) {
          setData(notes);
        }
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const addNote = useCallback(
    async ({title, text}: Notes) => {
      if (title && text) {
        const newData: Notes[] = [...data, {title, text}];

        setData(newData);
        await AsyncStorage.setItem('@NotePad:notes', JSON.stringify(newData));
      }
    },
    [data],
  );

  const clean = useCallback(async () => {
    await AsyncStorage.removeItem('@NotePad:notes');

    setData([]);
  }, []);

  return (
    <NotesContext.Provider value={{notes: data, addNote, clean, loading}}>
      {children}
    </NotesContext.Provider>
  );
};

export function useNotes(): NotesContextData {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes must be used within an NotesProvider');
  }

  return context;
}
