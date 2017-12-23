import styled from 'styled-components';

const Form = styled.form`
  position: ${props => props.modal ? 'fixed' : 'none'};
  top: ${props => props.modal ? '50%' : 'none'};
  left: ${props => props.modal ? '50%' : 'none'};
  transform: ${props => props.modal ? 'translate(-50%, -50%)' : 'none'};
  width: ${props => props.modal ? '80%' : 'auto'};
  text-align: ${props => props.modal ? 'center' : 'left'};
  z-index: 2;
  max-width: 500px;
  margin-bottom: 30px;
`;

export default Form;
