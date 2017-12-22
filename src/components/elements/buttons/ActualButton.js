import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 5px;
  margin: 5px 0px;
  border-radius: 4px;
  background-color: ${ props => props.theme.colors[props.background] };
  color: ${props => props.theme.colors.black };
  transition: all linear 0.3s;
  &:hover {
    color: ${props => props.theme.colors.black };
    text-decoration: none;
    background-color: ${ props => props.theme.colors.darkerGrey };
  }
`;

export default Button;
