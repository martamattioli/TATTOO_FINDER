import styled from 'styled-components';

const CoverPhoto = styled.div`
  background: ${props => `url(${props.background})` || 'black'};
  height: 400px;
  position: relative;
`;

export default CoverPhoto;
