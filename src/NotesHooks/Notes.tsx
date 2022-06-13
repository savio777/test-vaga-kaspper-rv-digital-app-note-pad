import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import Notes from '../interfaces/INotes';
import randomId from '../utils/randomId';
import IGeolocation from '../interfaces/IGeolocation';

interface NotesContextData {
  notes: Notes[];
  location: IGeolocation;
  loading: boolean;
  addNote(note: Notes): Promise<void>;
  getNote(id: string | null | undefined): Notes | undefined;
  deleteNote(id: string | null | undefined): Promise<void>;
  editNote(note: Notes): Promise<void>;
  clean(): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const textLoremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const dataMockup = [
  {id: randomId(), text: 'texto teste', title: 'titulo1'},
  {
    id: randomId(),
    text: 'Segure em uma nota para editar ou deletar',
    title: 'titulo2',
  },
  {id: randomId(), text: textLoremIpsum, title: 'titulo3'},
];

export const NotesProvider: React.FC = ({children}) => {
  const [data, setData] = useState<Notes[]>(dataMockup);
  const [location, setLocation] = useState<IGeolocation>({
    latitude: undefined,
    longitude: undefined,
  });
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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      err => console.log('err location', err),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, [data]);

  const addNote = useCallback(
    async ({title, text}: Notes) => {
      if (title && text) {
        const newData: Notes[] = [...data, {id: randomId(), title, text}];

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

  const deleteNote = useCallback(
    async (id: string) => {
      if (id) {
        const newData = data.filter(note => note.id !== id);
        setData(newData);
      }
    },
    [data],
  );

  const editNote = useCallback(
    async (notesParam: Notes) => {
      const {id, text, title} = notesParam;
      if (id) {
        const idFind = data.findIndex(note => note.id === id);

        if ((idFind === 0 || idFind > 0) && text && title) {
          const newData = data;
          newData[idFind].text = text;
          newData[idFind].title = title;

          setData([...newData]);
        }
      }
    },
    [data],
  );

  const getNote = useCallback(
    (id: string) => {
      if (id) {
        const idFind = data.findIndex(note => note.id === id);

        return data[idFind];
      }
    },
    [data],
  );

  return (
    <NotesContext.Provider
      value={{
        notes: data,
        addNote,
        clean,
        loading,
        deleteNote,
        editNote,
        getNote,
        location,
      }}>
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
