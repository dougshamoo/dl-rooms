import styled from "react-emotion"
import { defaultBorderRadius } from "../../../utils/styling"
import {
  greyMedium,
  greyLight,
  greyLighter,
  greyLightest,
  blueMedium
} from "../../../utils/colors"

export const Container = styled.button`
  border-radius: ${defaultBorderRadius}px;
  box-shadow: ${({ type }) => `0px 2px 0px ${shadowColor(type)}`};
  background-color: ${({ type }) => backgroundColor(type)};
  color: ${({ type }) => fontColor(type)};
  display: inline-block;
  vertical-align: top;
  padding: 0px 20px;
  cursor: pointer;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  &:hover {
    background-color: ${({ type }) => hoverColor(type)};
  }
`

function backgroundColor(type) {
  return {
    primary: blueMedium,
    secondary: greyLighter,
    danger: "#C63233"
  }[type]
}

function hoverColor(type) {
  return {
    primary: "#409EFF",
    secondary: greyLightest,
    danger: "#D65453"
  }[type]
}

function shadowColor(type) {
  return {
    primary: "#076FCD",
    secondary: greyLight,
    danger: "#A0282C"
  }[type]
}

function fontColor(type) {
  return {
    primary: "white",
    secondary: greyMedium,
    danger: "white"
  }[type]
}
