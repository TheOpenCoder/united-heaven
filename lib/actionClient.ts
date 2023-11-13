import { ActionClient } from '@/contracts/action'
import algodClient from './algodClient'
import { SendTransactionFrom } from '@algorandfoundation/algokit-utils/types/transaction'

export function getActionClient({ appId, sender }: { appId?: number | bigint; sender?: SendTransactionFrom }) {
  return new ActionClient(
    {
      resolveBy: 'id',
      id: appId || 0,
      sender: sender,
    },
    algodClient
  )
}
