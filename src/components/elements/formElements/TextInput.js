import styled, { css } from 'styled-components';

const TextInput = styled.input`
  display: block;
  width: 100%;
  padding: 5px;
  border: solid 2px black;
  border-radius: 4px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

export default TextInput;
