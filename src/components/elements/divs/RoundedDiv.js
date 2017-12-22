import styled, { css } from 'styled-components';

const RoundedDiv = styled.div`
  display: ${props => props.display};
  margin: ${props => props.margin};
  padding: 5px;
  border-radius: 4px;
  background-color: ${ props => props.theme.colors.lightGrey};
  font-size: ${props => props.fontSize};
`;

export default RoundedDiv;
