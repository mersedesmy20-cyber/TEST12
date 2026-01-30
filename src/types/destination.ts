export interface Attraction {
  name: string
  description?: string
  image?: string
  icon?: string
}

export interface Destination {
  id: string
  name: string
  season: string
  seasonIcon: string
  image: string
  flag: string
  icon: string
  desc: string
  price: string
  highlights: string[]
  tags: string[]
  whatToSee: string[]
  attractions?: Attraction[]
  whatToBuy: string[]
  souvenirs?: Attraction[]
  gridClass?: string
  region: 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Australia'
  tips?: string[]
}
