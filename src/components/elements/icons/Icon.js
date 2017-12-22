import styled, { css } from 'styled-components';

const Icon = styled.i`
  font-size: ${props => props.fontSize};
  color: ${props => props.color || props.theme.colors.black};
  margin-left: ${props => props.addMarginLeft || 0};

${'' /* IF ICON IS CENTERED */}
  position: ${props => props.centerPosition ? 'absolute' : 'none'};
  left: ${props => props.centerPosition ? '50%' : 0};
  top: ${props => props.centerPosition ? '50%' : 0};
  transform: ${props => props.centerPosition ? 'translate(-50%, -50%)' : 'none'};
${'' /* END */}

  &:hover {
    cursor: ${props => props.hover ? 'pointer' : 'default'};
    color: ${props => props.hover ? props.theme.colors.darkGrey : 'inherit'};
  }
`;

export default Icon;
