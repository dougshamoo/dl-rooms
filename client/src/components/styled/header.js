import styled from 'react-emotion'
import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom'
import { absoluteFill, headerHeight } from '../../utils/styling'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  height: ${headerHeight}px;
  background-color: blue;
`;

export const RouteLink = styled(RouterNavLink)`
  color: white;
  margin-left: 20px;
  text-decoration: none;
  &.active {
    color: red;
  }
`

export const HomeLink = styled(RouterLink)`
  color: white;
  position: absolute;
  left: 20px;
  font-size: 36px;
  text-decoration: none;
`