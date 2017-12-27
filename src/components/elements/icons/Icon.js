import styled, { css } from 'styled-components';

const Icon = styled.i`
  font-size: ${props => props.fontSize};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.black};
  margin-left: ${props => props.addMarginLeft};
  margin-right: ${props => props.addMarginRight};
  margin-bottom: ${props => props.marginBottom};
  vertical-align: ${props => !props.verticalAlign ? null : '20px'};
  transition: all 0.3s linear;

${'' /* IF ICON IS CENTERED */}
  position: ${props => props.centerPosition ? 'absolute' : props.position};
  top: ${props => props.centerPosition ? '50%' : 0};
  right: ${props => props.right};
  transform: ${props => props.centerPosition ? 'translate(-50%, -50%)' : 'none'};
${'' /* END */}

  &:hover {
    cursor: ${props => props.hover ? 'pointer' : 'default'};
    color: ${props => props.hover ? props.theme.colors[props.hoverColor] : props.theme.colors[props.color]};
  }
`;

export default Icon;
