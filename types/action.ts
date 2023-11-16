export type actionData = {
  id: string
  title: string
  description: string
  image: string
  location?: string
  startDate: string
  endDate: string
  SDGs: string[]
  isParticipatory: boolean
  isDonatable: boolean
  creator: creator
  participants: participants[]
  followers: followers[]
  donations: donations[]
  withdrawals: withdrawals[]
  progress: progress[]
  createdAt: string
  updatedAt: string
  currentContractValue: number
  totalDonationAmount: number
  totalParticipantCount: number
  totalFollowerCount: number
  isFollowing: boolean
  isParticipating: boolean
  isDonated: boolean
  contractId: string
  onlineUrl?: string
  isCreator: boolean
}

export type creator = {
  id: string
  username: string
}

type participants = {
  id: string
  username: string
}

type followers = {
  id: string
  username: string
}

type donations = {
  amount: number
  donator: {
    id: string
    username: string
  }
  date: string
}

export type withdrawals = {
  amount: number
  message: string
  date: string
}

export type progress = {
  message: string
  date: string
}
