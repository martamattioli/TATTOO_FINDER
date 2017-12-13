import styled, { css } from 'styled-components';

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px;
  border: solid 2px black;
  background: black;
  color: white;
  border-radius: 4px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

export default SubmitButton;
