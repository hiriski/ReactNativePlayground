import { useContext } from 'react'
import { DetailScreenContext } from '../context/InstagramIOSPageTransitions.context'

export const useDetailScreen = () => useContext(DetailScreenContext)
