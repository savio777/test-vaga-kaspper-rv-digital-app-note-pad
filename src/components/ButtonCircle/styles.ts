import styled from 'styled-components/native';

import colors from '../../utils/colors';

export const Container = styled.TouchableOpacity`
  background-color: ${colors.black};
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  margin-left: 10px;
`;
