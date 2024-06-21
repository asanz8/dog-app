import { http, HttpResponse } from "msw"
import breedsListAllJson from "./fixtures/breeds-list-all.json"
import breedAkitaImagesJson from "./fixtures/breed-akita-images.json"

export const handlers = [
  http.get("https://dog.ceo/api/breeds/list/all", () => {
    return HttpResponse.json(breedsListAllJson)
  }),

  http.get("https://dog.ceo/api/breed/akita/images", () => {
    return HttpResponse.json(breedAkitaImagesJson)
  }),
]
