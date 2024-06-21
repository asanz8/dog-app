import { useState } from "react"
import { Breed } from "./slice/types"
import BreedImageList from "./components/BreedImageList"
import BreedsSelector from "./components/BreedsSelector"
import { MdOutlinePets } from "react-icons/md"

const Breeds = () => {
  const [selected, setSelected] = useState<Breed | null>(null)

  return (
    <div className="container mx-auto relative pb-10">
      <BreedsSelector onChangeBreed={breed => setSelected(breed)} />

      {selected == null ? (
        <div className="flex justify-center items-center mt-12">
          <MdOutlinePets className="size-24 fill-gray-300 animate-bounce" />
        </div>
      ) : (
        <BreedImageList breedName={selected?.name} />
      )}
    </div>
  )
}

export default Breeds
