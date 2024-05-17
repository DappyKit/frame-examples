import { FrameContext, Frog } from 'frog'
import { Config, SDK } from '@dappykit/sdk'
import { clickcasterLog } from './clickcaster.ts'

export interface IClickData {
  appTitle: string
  userMainAddress: string
  fid: number
  url: string
  messageBytes: string
  dappyKit: SDK
  appAddress: string
  appPk: `0x${string}`
  appAuthUrl: string
}

export function addMetaTags(ownerFID: number) {
  return {
    unstable_metaTags: [
      {property: `frame:owner`, content: ownerFID.toString()},
    ],
  }
}

export async function configureApp(app: Frog, c: FrameContext): Promise<IClickData> {
  // dummy mnemonic used
  const dappyKit = new SDK(Config.optimismMainnetConfig, 'focus drama print win destroy venue term alter cheese retreat office cannon')
  const appTitle = c?.env?.APP_TITLE as string
  const appOwnerFID = Number(c?.env?.APP_OWNER_FID)
  const pageRedirectUrl = c?.env?.PAGE_REDIRECT_URL as string
  const appAddress = c?.env?.APP_ADDRESS as string
  const appPk = c?.env?.APP_PK as `0x${string}`
  const appAuthUrl = c?.env?.APP_AUTH_URL as string

  if (!appTitle || !appOwnerFID || Number.isNaN(appOwnerFID) || !pageRedirectUrl || !appAddress || !appPk || !appAuthUrl) {
    throw new Error('Required environment variables are not defined')
  }

  app.metaTags = addMetaTags(appOwnerFID).unstable_metaTags
  app.browserLocation = pageRedirectUrl

  const result: IClickData = {
    dappyKit,
    appTitle,
    userMainAddress: '',
    fid: 0,
    url: '',
    messageBytes: '',
    appAddress,
    appPk,
    appAuthUrl,
  }

  try {
    const data = await c.req.json()
    const {
      trustedData: {messageBytes},
      untrustedData: {fid, url}
    } = data
    const userMainAddress = await dappyKit.farcasterClient.getCustodyAddress(fid)
    clickcasterLog(c, appPk).then().catch()
    result.fid = fid
    result.url = url
    result.messageBytes = messageBytes
    result.userMainAddress = userMainAddress
  } catch (e) {
  }

  return result
}
