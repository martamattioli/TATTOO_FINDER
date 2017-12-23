import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Button = styled(Link)`
  display: inline-block;
  padding: 5px;
  margin: ${props => props.margin || '5px 0px'};
  border-radius: 4px;
  color: ${props => props.color ?
    props.theme.colors[props.color] :
    props.theme.colors.black};
  background-color: ${props => props.background ?
    props.theme.colors[props.background] :
    props.theme.colors.darkGrey};
  font-size: ${props => props.fontSize};
  transition: all linear 0.3s;
  &:hover {
    color: ${props => props.theme.colors.black };
    text-decoration: none;
    background-color: ${ props => props.theme.colors.darkerGrey };
  }
`;

export default Button;
