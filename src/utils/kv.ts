import { prepareEthAddress } from './eth.ts'
import { FrameContext } from 'frog'

export type KvContext = Env | FrameContext

/**
 * Get correct KV context
 * @param c KV context
 */
function getEnv(c: KvContext): Env {
  // @ts-ignore
  if (c.env) {
    // @ts-ignore
    return c.env
  } else {
    // @ts-ignore
    return c
  }
}

/**
 * Put data to MainToDelegated KV
 * @param c KV context
 * @param key Key
 * @param value Value
 */
export async function kvPutMainToDelegated(c: KvContext, key: string, value: string): Promise<void> {
  // @ts-ignore
  await getEnv(c).dappy_main_to_delegated.put(key, value)
}

/**
 * Delete data from MainToDelegated KV
 * @param c KV context
 * @param key Key
 */
export async function kvDeleteMainToDelegated(c: KvContext, key: string): Promise<void> {
  // @ts-ignore
  await getEnv(c).dappy_main_to_delegated.delete(key)
}

/**
 * Put data to DelegatedToPk KV
 * @param c KV context
 * @param key Key
 * @param value Value
 */
export async function kvPutDelegatedToPk(c: KvContext, key: string, value: string): Promise<void> {
  // @ts-ignore
  await getEnv(c).dappy_delegated_to_pk.put(key, value)
}

/**
 * Delete data from DelegatedToPk KV
 * @param c KV context
 * @param key Key
 */
export async function kvDeleteDelegatedToPk(c: KvContext, key: string): Promise<void> {
  // @ts-ignore
  await getEnv(c).dappy_delegated_to_pk.delete(key)
}

/**
 * Get data from MainToDelegated KV
 * @param c KV context
 * @param key Key
 */
export async function kvGetMainToDelegated(c: KvContext, key: string): Promise<string> {
  // @ts-ignore
  return await getEnv(c).dappy_main_to_delegated.get(key)
}

/**
 * Get data from DelegatedToPk KV
 * @param c KV context
 * @param key Key
 */
export async function kvGetDelegatedToPk(c: KvContext, key: string): Promise<string> {
  // @ts-ignore
  return await getEnv(c).dappy_delegated_to_pk.get(key)
}

/**
 * Put mnemonic to DelegatedToPk KV tied to user delegated address
 * @param c KV context
 * @param userDelegatedAddress User delegated address
 * @param mnemonic Mnemonic
 */
export async function kvPutMnemonic(c: KvContext, userDelegatedAddress: string, mnemonic: string): Promise<void> {
  await kvPutDelegatedToPk(c, prepareEthAddress(userDelegatedAddress), mnemonic)
}

/**
 * Get mnemonic from DelegatedToPk KV tied to user delegated address
 * @param c KV context
 * @param userDelegatedAddress User delegated address
 */
export async function kvGetMnemonic(c: KvContext, userDelegatedAddress: string): Promise<string> {
  return await kvGetDelegatedToPk(c, prepareEthAddress(userDelegatedAddress))
}

/**
 * Put proof to MainToDelegated KV tied to user delegated address
 * @param c KV context
 * @param userDelegatedAddress User delegated address
 * @param proof Proof
 */
export async function kvPutProof(c: KvContext, userDelegatedAddress: string, proof: string): Promise<void> {
  await kvPutDelegatedToPk(c, `${prepareEthAddress(userDelegatedAddress)}_proof`, proof)
}

/**
 * Get proof from MainToDelegated KV tied to user delegated address
 * @param c KV context
 * @param userDelegatedAddress User delegated address
 */
export async function kvGetProof(c: KvContext, userDelegatedAddress: string): Promise<string> {
  return await kvGetDelegatedToPk(c, `${prepareEthAddress(userDelegatedAddress)}_proof`)
}

/**
 * Delete proof from MainToDelegated KV tied to user delegated address
 * @param c KV context
 * @param userDelegatedAddress User delegated address
 */
export async function kvDeleteProof(c: KvContext, userDelegatedAddress: string): Promise<void> {
  await kvDeleteDelegatedToPk(c, `${prepareEthAddress(userDelegatedAddress)}_proof`)
}

/**
 * Get actual delegated address by main address
 * @param c KV context
 * @param userMainAddress User main address
 */
export async function kvGetDelegatedAddress(c: KvContext, userMainAddress: string): Promise<string> {
  return await kvGetMainToDelegated(c, prepareEthAddress(userMainAddress))
}

/**
 * Put the link between main and delegated addresses.
 *
 * Use it on the webhook side to connect the user's main address with the delegated address.
 * @param c KV context
 * @param userMainAddress User main address
 * @param userDelegatedAddress User delegated address
 */
export async function kvPutDelegatedAddress(c: KvContext, userMainAddress: string, userDelegatedAddress: string): Promise<void> {
  await kvPutMainToDelegated(c, prepareEthAddress(userMainAddress), userDelegatedAddress ? prepareEthAddress(userDelegatedAddress) : userDelegatedAddress)
}
