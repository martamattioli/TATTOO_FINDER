import styled, { css } from 'styled-components';

const Circle = styled.div`
  position: relative;
  width: ${props => props.size === 'large' ? '150px' : '90px'};
  height: ${props => props.size === 'large' ? '150px' : '90px'};
  border-radius: 50%;
  background: ${props => props.profilePic ?
    `url(${props.profilePic})` :
    props.theme.colors.darkGrey};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  margin-top: ${props => props.moveToTop}
`;

export default Circle;
