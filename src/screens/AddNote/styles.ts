import styled from 'styled-components/native';

import colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.pink};
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 2px 5px 5px;
`;

export const Content = styled.View`
  min-height: 90%;
  max-height: 90%;
`;

export const TitleInput = styled.TextInput`
  font-weight: bold;
  font-size: 18px;
`;

export const TextInput = styled.TextInput`
  max-height: 80%;
`;
