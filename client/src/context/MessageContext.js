import { createContext, useReducer, useEffect } from "react"

export const MessageContext = createContext()

export const authReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET':
            return { number: action.payload }
        case 'MINUSONE':
            return { number: state.number - 1 }
        default:
            return state
    }
}

export const MessageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        number: 0
    })



    console.log('AuthContext state: ', state)

    return (
        <MessageContext.Provider value={{...state, dispatch}}>
            { children }
        </MessageContext.Provider>
    )
}