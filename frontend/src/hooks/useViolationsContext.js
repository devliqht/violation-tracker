import { ViolationsContext } from "../context/ViolationsContext"
import { useContext } from "react"

export const useViolationsContext = () => {
  const context = useContext(ViolationsContext)

  if(!context) {
    throw Error('useViolationsContext must be used inside a ViolationsContextProvider')
  }

  return context
}