import styled, { css } from 'styled-components';

const AbsolutelyPosition = styled.div`
  position: absolute;
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  text-align: ${props => props.textAlign};
  padding: ${props => props.padding};
  background: ${props => props.background};
  width: ${props => props.width};
  border-radius: ${props => props.radius};
`;

export default AbsolutelyPosition;
