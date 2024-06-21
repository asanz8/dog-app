import { useGetBreedImagesQuery } from "../slice/breedsApiSlice"
import clsx from "clsx"
import BreedImageItem from "./BreedImageItem"

const BreedImageList = ({ breedName = "" }: { breedName: string }) => {
  const { data: images = [] } = useGetBreedImagesQuery(breedName)

  return (
    <div
      className={clsx("grid grid-cols-1 gap-4 px-4", "md:grid-cols-3 md:gap-8")}
    >
      {images.map((image, index) => (
        <BreedImageItem key={index} src={image} />
      ))}
    </div>
  )
}

export default BreedImageList
