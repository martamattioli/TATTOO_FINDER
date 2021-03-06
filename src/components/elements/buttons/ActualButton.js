import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: ${props => props.padding || '5px'};
  margin: ${props => props.margin || '5px 0px'};
  border-radius: ${props => props.radius || '4px'};
  background-color: ${ props => props.theme.colors[props.background] };
  color: ${props => props.theme.colors[props.color] || props.theme.colors.black };
  transition: all linear 0.3s;
  font-size: ${props => props.fontSize};
  &:hover {
    color: ${props => props.hover ? props.theme.colors.black : undefined };
    text-decoration: none;
    background-color: ${ props => props.hover ? props.theme.colors.darkerGrey : undefined };
  }
  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
  }
  &:focus {
    outline: none;
  }
`;

export default Button;
