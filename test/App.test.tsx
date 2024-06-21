import { server } from "./mocks/server"
import { renderWithProviders } from "../src/utils/test-utils"
import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../src/App"
import { act } from "react"
import userEvent from "@testing-library/user-event"

import ResizeObserver from "resize-observer-polyfill"
global.ResizeObserver = ResizeObserver

const fn = vi.fn()

global.scrollTo = fn

beforeEach(() => {
  const portalRoot = document.createElement("div")
  portalRoot.setAttribute("id", "headlessui-portal-root")
  document.body.appendChild(portalRoot)
})

beforeAll(() => server.listen())

afterEach(() => {
  const portalRoot = document.getElementById("headlessui-portal-root")
  if (portalRoot) {
    document.body.removeChild(portalRoot)
  }

  server.resetHandlers()
})

afterAll(() => server.close())

describe("App component", async () => {
  it("should render the app", async () => {
    await act(() => renderWithProviders(<App />))

    expect(screen.getByLabelText(/Search breed/i)).toBeInTheDocument()
  })

  it("should render one(1) option when typing 'akita' in the input", async () => {
    await act(() => renderWithProviders(<App />))

    const comboboxButton = screen.getByRole("button", {
      name: /show breeds list/i,
    })
    const breedsInput = screen.getByTestId("breeds-input")

    await act(() => userEvent.click(comboboxButton))
    await act(() => userEvent.type(breedsInput, "akita"))

    const breeds = await screen.findAllByRole("option")
    expect(breeds).toHaveLength(1)
  })

  it("should render the breed images when selecting a breed", async () => {
    await act(() => renderWithProviders(<App />))

    const comboboxButton = screen.getByRole("button", {
      name: /show breeds list/i,
    })
    const breedsInput = screen.getByTestId("breeds-input")

    await act(() => userEvent.click(comboboxButton))
    await act(() => userEvent.type(breedsInput, "akita"))

    const breeds = await screen.findAllByRole("option")
    await act(() => userEvent.click(breeds[0]))

    const breedImages = await screen.findAllByRole("breed-img")
    expect(breedImages).toHaveLength(7)
  })
})
