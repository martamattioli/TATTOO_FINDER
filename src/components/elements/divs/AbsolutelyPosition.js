import styled, { css } from 'styled-components';

const AbsolutelyPosition = styled.div`
  position: absolute;
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  text-align: ${props => props.textAlign};
`;

export default AbsolutelyPosition;
