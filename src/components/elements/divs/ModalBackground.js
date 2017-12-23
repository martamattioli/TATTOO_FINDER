import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  z-index: 1;
`;

export default ModalBackground;
