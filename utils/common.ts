import { convertMicroalgosToAlgos } from './convert'

export function ellipseAddress(address = ``, width = 6): string {
  return address ? `${address.slice(0, width)}...${address.slice(-width)}` : address
}

export const formatPrice = (price: number, isAlgos?: boolean, options?: Intl.NumberFormatOptions | undefined) => {
  const algos = isAlgos ? price : convertMicroalgosToAlgos(price)
  return new Intl.NumberFormat(undefined, options).format(algos)
}
