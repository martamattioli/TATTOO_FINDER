import styled, { css } from 'styled-components';

const ColoredSection = styled.section`
  background-color: ${props => props.theme.colors[props.background] || 'none'};
  padding: ${props => props.padding || '20px'};
`;

export default ColoredSection;
