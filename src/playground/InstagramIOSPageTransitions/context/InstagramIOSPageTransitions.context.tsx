import { ReactNode, createContext, useState } from 'react'

export type DetailScreenContextType = {
  imageDetailsList: any
  setImageDetailsList: any
}

// @ts-ignore
export const DetailScreenContext = createContext<DetailScreenContextType>()

type Props = {
  children: ReactNode
}

export const InstagramIOSPageTransitionsContextProvider = ({ children }: Props) => {
  const [imageDetailsList, setImageDetailsList] = useState([])

  return (
    <DetailScreenContext.Provider
      value={{
        imageDetailsList,
        setImageDetailsList,
      }}
    >
      {children}
    </DetailScreenContext.Provider>
  )
}
