export interface Instructor {
  id: string
  name: string
  avatar?: string
  title?: string
  bio?: string
}

export interface Course {
  id: string
  slug?: string
  title: string
  category?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  shortDescription?: string
  description?: string
  lessonsCount?: number
  duration?: string
  image?: string
  rating?: number
  students?: number
  enrolled?: number
  price?: number | 'Free'
  badges?: string[]
  instructor?: Instructor
  tags?: string[]
}
