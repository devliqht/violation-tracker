import { createContext, useReducer } from 'react'

export const ViolationsContext = createContext()

export const violationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIOLATIONS':
      return { 
        violations: action.payload 
      }
    case 'CREATE_VIOLATION':
      return { 
        violations: [action.payload, ...state.violations] 
      }
    case 'DELETE_VIOLATION':
      return { 
        violations: state.violations.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const ViolationsContextProvider = ({ children }) => {
  const [state, dispatchViolations] = useReducer(violationsReducer, { 
    violations: null
  })
  
  return (
    <ViolationsContext.Provider value={{ ...state, dispatchViolations }}>
      { children }
    </ViolationsContext.Provider>
  )
}