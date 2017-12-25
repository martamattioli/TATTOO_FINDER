import styled from 'styled-components';

const CoverPhoto = styled.div`
  background: ${props => `url(${props.background})` || 'black'};
  height: 400px;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default CoverPhoto;
