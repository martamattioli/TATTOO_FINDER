import styled, { css } from 'styled-components';

const Circle = styled.div`
  position: relative;
  width: ${props => props.size === 'large' ? '150px' : '100px'};
  height: ${props => props.size === 'large' ? '150px' : '100px'};
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
