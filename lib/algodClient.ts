import algosdk from 'algosdk'
import { getAlgodConfigFromEnvironment } from '@/utils/network'

const algodConfig = getAlgodConfigFromEnvironment()

const algodClient = new algosdk.Algodv2(algodConfig.token, algodConfig.server, algodConfig.port)

export default algodClient
