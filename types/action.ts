export type actionData = {
  id: string
  title: string
  description: string
  image: string
  location: {
    lat: string
    lng: string
  }
  startDate: string
  endDate: string
  SDGs: string[]
  isParticipatory: boolean
  isDonatable: boolean
  creator: {
    id: string
    username: string
  }
  participants: any[]
  followers: any[]
  donations: any[]
  withdrawals: any[]
  progress: any[]
  createdAt: string
  updatedAt: string
  currentContractValue: number
  totalDonationAmount: number
  totalParticipantCount: number
  totalFollowerCount: number
  isFollowing: boolean
  isParticipating: boolean
  isDonated: boolean
}
