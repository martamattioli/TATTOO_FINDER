import styled from 'styled-components';

const SelectedText = styled.span`
  color: ${props => props.selected ? props.theme.colors.darkerGrey : props.theme.colors.black};
  transition: all linear 0.3s;
  &:hover {
    cursor: ${props => !props.selected ? 'pointer' : 'cursor' };
    color: ${props => !props.selected ? props.theme.colors.darkGrey : 'none'};
  }
`;

export default SelectedText;
