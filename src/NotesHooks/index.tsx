import React from 'react';

import {NotesProvider} from './Notes';

const AppProvider: React.FC = ({children}) => (
  <NotesProvider>{children}</NotesProvider>
);

export default AppProvider;
