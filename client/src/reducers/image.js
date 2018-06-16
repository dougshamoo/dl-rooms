const initialState = {
  name: "",
  predictedClass: "",
  probsByClass: {},
  url: "",
  fetching: false,
  uploaded: false
}

const image = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGE_REQUEST":
      return { ...state, fetching: true }
    case "UPLOAD_IMAGE_SUCCESS":
      return { ...state, ...action.payload, fetching: false, uploaded: true }
    case "UPLOAD_IMAGE_FAILURE":
      return { ...state, fetching: false }
    case "RESET_IMAGE":
      return initialState
    default:
      return state
  }
}

export default image
