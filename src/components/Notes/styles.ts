import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 50%;
  padding: 5px;
`;

export const Content = styled.View`
  background-color: #575757;
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
