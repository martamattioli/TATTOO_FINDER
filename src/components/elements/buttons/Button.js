import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Button = styled(Link)`
  display: inline-block;
  padding: 5px;
  margin: 5px 0px;
  border-radius: 4px;
  background-color: ${ props => props.theme.colors.darkGrey };
  color: ${props => props.theme.colors.black };
  transition: all linear 0.3s;
  &:hover {
    color: ${props => props.theme.colors.black };
    text-decoration: none;
    background-color: ${ props => props.theme.colors.darkerGrey };
  }
`;

export default Button;
