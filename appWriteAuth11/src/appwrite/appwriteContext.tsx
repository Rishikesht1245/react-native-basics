// context snippets
import { Text, View } from 'react-native'
import React, { createContext, FC, PropsWithChildren, useState } from 'react'

import AppwriteService from './service'

type AppContextType = {
    appwrite : AppwriteService,
    isLoggedIn : boolean,
    setIsLoggedIn : (isLoggedIn : boolean) => void
}

// context intial values
// providing values here is a good practice, it will avoid values being undefined if we access before the intialization or provider
export const appWriteContext = createContext<AppContextType>({
    appwrite : new AppwriteService(),
    isLoggedIn : false,
    setIsLoggedIn : (isLoggedIn) => {}
})

export const AppwriteProvider : FC<PropsWithChildren> =  ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    const defaultValue = {
        appwrite : new AppwriteService(),
        isLoggedIn ,
        setIsLoggedIn
    };


  return (
    <appWriteContext.Provider value={defaultValue}>
      {children}
    </appWriteContext.Provider>
  )
}
