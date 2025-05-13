interface IPexelImageSource {
  portrait: string
  small: string
  medium: string
}

export interface IPexelImageItem {
  id: number
  src: IPexelImageSource
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
}
