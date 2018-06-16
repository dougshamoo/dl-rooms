import styled from "react-emotion"
import { absoluteFill, headerHeight } from "../../../utils/styling"

export const Container = styled.div`
  ${absoluteFill};
  overflow: hidden;
`

export const Body = styled.div`
  position: absolute;
  overflow-y: scroll;
  top: ${headerHeight}px;
  right: 0;
  bottom: 0px;
  left: 0px;
  padding: 30px;
`
