import { ActionClient } from '@/contracts/action'
import algodClient from './algodClient'

export function getActionClient(appID?: number | bigint) {
  return new ActionClient(
    {
      resolveBy: 'id',
      id: appID || 0,
    },
    algodClient
  )
}
