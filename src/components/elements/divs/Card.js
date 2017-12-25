import styled, { css } from 'styled-components';

const Card = styled.div`
  position: relative;
  margin-bottom: 20px;
  border: ${props => props.border || 0};
  border-radius: ${props => props.radius || 0};
  text-align: ${props => props.align || 'left'};
  min-height: 200px;
  transition: all linear 0.3s;
  padding: ${props => props.padding};
  background: ${props => props.background || 'none'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: ${props => props.moveToTop};
  &:hover {
    background-color: ${props => props.theme.colors[props.hoverColor] || 'none'};
    cursor: ${props => props.hover ? 'pointer' : 'default'};
  }
`;

export default Card;
