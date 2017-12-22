import styled, { css } from 'styled-components';

const Message = styled.p`
  margin: ${props => props.margin || 0};
  padding: 5px;
  background-color: ${props => props.theme.colors[props.background] || 'none'};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.black}
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.radius || 0};
  -webkit-transition: all .5s linear;
`;

export default Message;

// padding: 5px;
// border: solid 2px black;
// background: green;
// color: white;
// border-radius: 4px;
// margin: 10px;
