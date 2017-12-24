import styled, { css } from 'styled-components';

const FlagIcon = styled.span`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => `url(${props.background})`};
  background-position: center;
  background-size: cover;
  background-repeat: repeat;

  &:hover {
    cursor: ${props => props.hover ? 'pointer' : 'default'};
    color: ${props => props.hover ? props.theme.colors.darkGrey : props.theme.colors[props.color]};
  }
`;

export default FlagIcon;
