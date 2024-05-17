import { SDK, Config, ViemUtils } from '@dappykit/sdk'
import {
  kvGetMnemonic,
  kvPutDelegatedAddress,
  kvPutProof
} from './utils/kv.ts'

const {generateMnemonic, english} = ViemUtils

export interface ICallbackResult {
  success: boolean
  requestId: number
  userMainAddress: string
  userDelegatedAddress: string
  applicationAddress: string
  proof: string
}

export default {
  // @ts-ignore
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'POST') {
      const dappyKit = new SDK(Config.optimismMainnetConfig, generateMnemonic(english))
      // @ts-ignore
      const appAddress = env.APP_ADDRESS
      // @ts-ignore
      const authServiceAddress = env.AUTH_SERVICE_ADDRESS

      try {
        const body = (await request.json()) as ICallbackResult
        if (!body?.success) {
          // after implementation of error signature move this condition below of `checkCallbackData` to perform kv removing
          // in the case of not implement do not remove these kvs because anybody can send data
          // await kvDeleteMainToDelegated(env, body.userMainAddress)
          // await kvDeleteDelegatedToPk(env, body.userDelegatedAddress)
          throw new Error('Callback is not successful')
        }

        await dappyKit.farcasterClient.checkCallbackData(body, appAddress, authServiceAddress)

        // if mnemonic is already stored than we can create a connection between main and delegated addresses
        if (await kvGetMnemonic(env, body.userDelegatedAddress)) {
          await kvPutDelegatedAddress(env, body.userMainAddress, body.userDelegatedAddress)
          await kvPutProof(env, body.userDelegatedAddress, body.proof)
        }

        return new Response(JSON.stringify({result: true}), {
          headers: {'Content-Type': 'application/json'},
          status: 200
        })
      } catch (e) {
        return new Response('Invalid JSON or bad request.', {status: 400, statusText: (e as Error).message})
      }
    } else {
      return new Response('Method Not Allowed', {status: 405})
    }
  },
}
