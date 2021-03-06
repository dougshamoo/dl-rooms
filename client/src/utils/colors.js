export const red = "#EC5252"
export const teal = "#00C9C7"
export const green = "#00CA72"
export const yellow = "#F6A807"
export const purple = "#9B52EC"
export const magenta = "#E352EC"
export const blueLight = "#5494d8"
export const bluePowder = "#ECF3FC"
export const blueMedium = "#2684E8"
export const blueDeep = "#5265EC"
export const blueDark = "#3A7ABE"
export const blueVeryDark = "#23527C"
export const greyDark = "#233040"
export const greyMedium = "#566373"
export const greyMidLight = "#929498"
export const greyLight = "#C5C9D1"
export const greyLighter = "#E1E5E9"
export const greyLightest = "#FAFAFA"

export function getColorForRoom(room) {
  return {
    bathroom: red,
    bedroom: teal,
    dining_room: green,
    kitchen: yellow,
    living_room: magenta,
    office: blueDeep
  }[room]
}
