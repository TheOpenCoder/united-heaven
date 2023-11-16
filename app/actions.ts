'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateFeed() {
  revalidateTag('feed')
}

export async function revalidateGoalFollow() {
  revalidateTag('goalFollow')
}
