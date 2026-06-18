export enum Roles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export interface UserRegistration {
  username: string
  login: string
  password: string
  email: string
  phoneNumber: string
}

export interface Profile {
  id: number
  username: string
  email: string
  date: string
  isBlocked: boolean
  roles: Roles[]
  phoneNumber: string
}

export interface AuthData {
  login: string
  password: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface RefreshToken {
  refreshToken: string
}
