import styled, { css } from 'styled-components';

const Circle = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  background: ${props => props.profilePic ?
    `url(${props.profilePic})` :
    props.theme.colors.lightGrey};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
`;

export default Circle;
