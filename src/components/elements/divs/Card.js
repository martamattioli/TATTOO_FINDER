import styled, { css } from 'styled-components';

const Card = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 20px;
  margin-top: ${props => props.moveToTop};
  border: ${props => props.border || 0};
  border-radius: ${props => props.radius || 0};
  text-align: ${props => props.align || 'left'};
  min-height: ${props => props.minHeight || '200px'};
  max-width: ${props => props.maxWidth};
  transition: all linear 0.3s;
  padding: ${props => props.padding};
  background: ${props => props.background || 'none'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    background-color: ${props => props.theme.colors[props.hoverColor] || 'none'};
    cursor: ${props => props.hover ? 'pointer' : 'default'};
    box-shadow: ${props => props.hover ? `0 0 13px 0px ${props.theme.colors.disabled}` : 'none'}
  }
`;

export default Card;
