import clsx from "clsx"

const BreedImageItem = ({ src, alt = "" }: { src: string; alt?: string }) => {
  return (
    <a target="_blank" href={src}>
      <img
        src={src}
        alt={alt}
        role="breed-img"
        className={clsx(
          "object-cover object-center w-full max-h-50 h-50 rounded-md transition-all",
          "hover:scale-105 hover:shadow-md hover:rounded-xl hover:ring-1 hover:ring-gray-700",
          "md:max-h-80 h-80",
        )}
      />
    </a>
  )
}

export default BreedImageItem
