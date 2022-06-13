import {useEffect} from 'react';
import React, {createContext, useCallback, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Notes from '../interfaces/Notes';

interface NotesContextData {
  notes: Notes[];
  loading: boolean;
  addNote(note: Notes): Promise<void>;
  clean(): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider: React.FC = ({children}) => {
  const [data, setData] = useState<Notes[]>([{text: 'teste', title: 'teste'}]);
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
