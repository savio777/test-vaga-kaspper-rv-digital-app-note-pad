import styled from 'styled-components/native';

import colors from '../../utils/colors';

export const Container = styled.TouchableOpacity`
  width: 50%;
  padding: 5px;
`;

export const Content = styled.View`
  background-color: ${colors.gray};
  min-height: 50px;
  border-radius: 8px;
  padding: 5px;
`;

export const Text = styled.Text`
  color: #fff;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 20px;
`;
