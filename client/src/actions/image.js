import { action } from "../utils/redux"

export function uploadImage(imageFile) {
  return async function(dispatch) {
    const formData = new FormData()
    formData.append("image", imageFile)
    dispatch(
      uploadImageRequest({ name: imageFile.name, preview: imageFile.preview })
    )
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      })
      const json = await res.json()
      dispatch(uploadImageSuccess(json))
    } catch (err) {
      console.error(err)
      dispatch(uploadImageFailure())
    }
  }
}

export const uploadImageRequest = payload =>
  action("UPLOAD_IMAGE_REQUEST", payload)
export const uploadImageSuccess = payload =>
  action("UPLOAD_IMAGE_SUCCESS", payload)
export const uploadImageFailure = payload =>
  action("UPLOAD_IMAGE_FAILURE", payload)
