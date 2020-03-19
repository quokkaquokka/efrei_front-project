import config from 'config'
import moment from 'moment'
import uuid from 'uuid'
import mongodb from '../services/mongodb.mjs'

const COLLECTION_NAME = 'recovery-password'
const MODEL = {
  email: undefined,
  token: undefined,
  expiration: undefined
}

const getRecoveryTokens = async () => {
  return await mongodb.fetch(COLLECTION_NAME)
}

const addRecoveryToken = async email => {
  const token = uuid.v4() + '-' + uuid.v1()
  const expiration = moment().add(config.recoveryPasswordToken.duration, 'm').valueOf()

  await mongodb.remove(COLLECTION_NAME, { email })
  await mongodb.insert(COLLECTION_NAME, { email, token, expiration })
  return token
}

const getRecoveryToken = async token => {
  const datas = await mongodb.fetch(COLLECTION_NAME, { token })

  if (datas.length === 0)  return
  if (datas.length !== 1) {
    await mongodb.remove(COLLECTION_NAME, { token })
    throw new Error('Duplicate recovery token. Tokens has been deleted')
  }
  return datas[0]
}

const removeRecoveryToken = async token => {
  await mongodb.remove(COLLECTION_NAME, { token })
}

const tokenRecoveryCleaner = async () => {
  const currentTimestamp = moment().valueOf()

  await mongodb.remove(COLLECTION_NAME, {expiration: {$lt: currentTimestamp} })

  setTimeout(tokenRecoveryCleaner, config.recoveryPasswordToken.cleanInterval)
  console.log('Token cleaned')
}

export {
  getRecoveryTokens,
  addRecoveryToken,
  getRecoveryToken,
  removeRecoveryToken,
  tokenRecoveryCleaner
}
