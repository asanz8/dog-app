import { useState } from "react"
import { useGetAllBreedsQuery } from "../slice/breedsApiSlice"
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  Transition,
  Button,
  Field,
  Label,
} from "@headlessui/react"
import { Breed } from "../slice/types"
import clsx from "clsx"
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid"
import { MdOutlinePets } from "react-icons/md"
import { capitalizeStr } from "../../../utils/string/capitalize-str"

const BreedsSelector = ({
  onChangeBreed,
}: {
  onChangeBreed(breed: Breed): void
}) => {
  const {
    refetch: refetchAllBreeds,
    data: breeds = [],
    isError,
    isFetching,
  } = useGetAllBreedsQuery()

  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Breed | null>(null)

  const _onChange = (breed: Breed) => {
    setSelected(breed)
    onChangeBreed(breed)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredBreeds =
    query === ""
      ? breeds
      : breeds?.filter(breed => {
          return breed.name.toLowerCase().includes(query.toLowerCase())
        })

  if (isError) {
    return (
      <div className="w-60 mx-auto flex flex-col items-center p-4">
        <MdOutlinePets className="inline-flex size-10" />
        <div className="text-lg mb-2">Something went wrong</div>
        <Button
          className={clsx(
            "bg-gray-500 text-white rounded px-3 py-1 transition-all",
            "hover:bg-gray-700",
          )}
          onClick={() => refetchAllBreeds()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        "sticky flex items-center",
        "mx-auto mb-4 w-52 h-24 top-0 left-0 right-0 z-10",
        "md:h-28",
        "bg-white/90 rounded-b-lg shadow-lg px-4",
      )}
    >
      <Field disabled={isFetching}>
        <Label
          className={clsx(
            "font-bold text-lg mb-2 flex items-center justify-between",
            "md:text-2xl",
          )}
        >
          Search breed <MdOutlinePets className="inline-flex size-6" />
        </Label>
        <Combobox
          value={selected}
          onChange={_onChange}
          onClose={() => setQuery("")}
        >
          <div className="relative">
            <ComboboxInput
              data-testid="breeds-input"
              className={clsx(
                "w-full rounded-lg border-none py-1.5 pl-3 pr-8 bg-slate-300",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
              placeholder="Poodle, Akita, ..."
              displayValue={(breed: Breed) => capitalizeStr(breed?.name)}
              onChange={event => setQuery(event.target.value)}
            />

            <ComboboxButton
              role="button"
              data-headlessui-state=""
              aria-label="show breeds list"
              className="group absolute inset-y-0 right-0 px-2.5"
            >
              <ChevronDownIcon className="size-4 fill-black/50 group-data-[hover]:fill-black" />
            </ComboboxButton>
          </div>

          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions
              anchor={{ to: "bottom" }}
              data-testid="breeds-list"
              className={clsx(
                "z-20",
                "rounded-xl border border-white/5 bg-slate-200/80 p-1",
                "w-[var(--input-width)] [--anchor-gap:var(--spacing-1)] empty:hidden",
              )}
            >
              {filteredBreeds?.map((breed, index) => (
                <ComboboxOption
                  key={index}
                  value={breed}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/80"
                >
                  <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                  <div className="text-sm/6">{capitalizeStr(breed.name)}</div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </Combobox>
      </Field>
    </div>
  )
}

export default BreedsSelector
