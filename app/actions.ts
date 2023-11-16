'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function revalidateFeed() {
  revalidateTag('feed')
}

export async function revalidateGoalFollow() {
  revalidateTag('goalFollow')
}

export async function revalidateActionById(id: string) {
  revalidatePath(`/(app)/(home)/action/${id}`, 'page')
}
