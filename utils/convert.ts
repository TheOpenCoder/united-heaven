import Big from 'big.js'

export type RoundingMode = 'roundDown' | 'roundUp' | 'roundHalfUp' | 'roundHalfEven'

/**
 * Converts an amount in microalgos to Algos:
 * ```
 * microalgos / (10 ^ 6)
 * ```
 * @example
 * // returns 420.69
 * convertMicroalgosToAlgos(420690000)
 *
 * @param microalgos
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `microalgos` converted to Algos
 */
export const convertMicroalgosToAlgos = (microalgos: number, rm: RoundingMode = 'roundDown') => {
  const divisor = new Big(10).pow(6)
  return new Big(microalgos).div(divisor).round(6, Big[rm]).toNumber()
}

/**
 * Converts an amount in Algos to microalgos:
 * ```
 * algos * (10 ^ 6)
 * ```
 * @example
 * // returns 420690000
 * convertAlgosToMicroalgos(420.69)
 *
 * @param algos
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `algos` converted to microalgos
 */
export const convertAlgosToMicroalgos = (algos: number, rm: RoundingMode = 'roundDown') => {
  const multiplier = new Big(10).pow(6)
  return new Big(algos).times(multiplier).round(0, Big[rm]).toNumber()
}

/**
 * Converts an amount in USD to microalgos:
 * ```
 * (usd / algoUsd) * (10 ^ 6)
 * ```
 * @example
 * // returns 420690000
 * convertUsdToMicroalgos(89.60, 0.213)
 *
 * @param usd
 * @param algoUsd current ALGO/USD price
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `usd` converted to microalgos
 */
export const convertUsdToMicroalgos = (usd: number, algoUsd: number, rm: RoundingMode = 'roundDown') => {
  const algos = new Big(usd).div(algoUsd).round(6, Big[rm]).toNumber()
  return convertAlgosToMicroalgos(algos)
}

/**
 * Converts an amount in microalgos to USD:
 * ```
 * (microalgos / (10 ^ 6)) * algoUsd
 * ```
 * @example
 * // returns 89.60
 * convertMicroalgosToUsd(420690000, 0.213)
 *
 * @param microalgos
 * @param algoUsd current ALGO/USD price
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `microalgos` converted to USD
 */
export const convertMicroalgosToUsd = (microalgos: number, algoUsd: number, rm: RoundingMode = 'roundDown') => {
  const algos = convertMicroalgosToAlgos(microalgos)
  return new Big(algos).times(algoUsd).round(2, Big[rm]).toNumber()
}
