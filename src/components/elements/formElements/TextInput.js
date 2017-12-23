import styled, { css } from 'styled-components';

const TextInput = styled.input`
  display: ${props => props.display || 'block'};
  width: 100%;
  padding: 5px;
  border: solid 2px black;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  &:focus {
    outline: none;
  }
`;

export default TextInput;
