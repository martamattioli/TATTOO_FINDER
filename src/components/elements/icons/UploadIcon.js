import styled, { css } from 'styled-components';

const UploadIcon = styled.i`
  position: absolute;
  font-size: ${props => props.fontSize};
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default UploadIcon;
