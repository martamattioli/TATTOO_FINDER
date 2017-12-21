import styled, { css } from 'styled-components';

const RoundedDiv = styled.div`
  margin: 20px 0;
  padding: 5px;
  border-radius: 4px;
  background-color: ${ props => props.theme.colors.lightGrey};
`;

export default RoundedDiv;
