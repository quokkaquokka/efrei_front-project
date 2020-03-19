import omit from 'lodash/omit'
import extend from 'lodash/extend'
import Bcrypt from 'bcrypt'
import mongodb from '../services/mongodb'
import { getRecoveryToken, removeRecoveryToken } from './recoveryPassword.mjs'

const COLLECTION_NAME = 'users'
const MODEL = {
  username: null,
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  roles: [], // string array
  groups: [], // string array
  isActive: true,
  deleted: false,
  deletedDate: null,
  createdDate: null,
  lastModifiedDate: null,
  activeAfterDate: null,
  expirationDate: null
}

const validateCredential = async (username, password) => {
  const user = await getUserByUsername(username)

  if (!user) {
    throw new Error('INVALID_CREDENTIAL')
  }

  // inactive account
  if (user.isActive !== undefined && !user.isActive) {
    throw new Error('INACTIVE_USER')
  }

  // account has validation date
  if (user.activeAfterDate || user.expirationDate) {
    const currentDate = Date.now()
    if (user.activeAfterDate < currentDate) {
      throw new ApiError('NOT_YET_AVAILABLE_USER')
    }
    if (user.expirationDate > currentDate) {
      throw new ApiError('EXPIRED_USER')
    }
  }

  if (user && (await Bcrypt.compare(password, user.password))) {
    return omit(user, ["password"]);
  }

  throw new Error('INVALID_CREDENTIAL')
}

const getUsers = async (filters = undefined) => {
  const users = await mongodb.fetch(COLLECTION_NAME, filters)

  return users.map(user => omit(user, ["password"]))
}

const getUsersByGroups = async (groups) => {
  return await getUsers({ groups })
}

const getUserByEmail = async email => {
  const users = await mongodb.fetch(COLLECTION_NAME, { email })

  if (users.length === 0) return
  if (users.length !== 1) throw new Error('MULTIPLE_USER_FOR_EMAIL')

  console.log('users[0]', users[0])
  return users[0]
}

const getUserByUsername = async username => {
  const users = await mongodb.fetch(COLLECTION_NAME, { username })

  if (users.length === 0) return
  if (users.length !== 1) throw new Error('DUPLICATE_USERNAME')

  return users[0]
}

const updatePasswordFromEmail = async (email, password) => {
  try {
    await getUserByEmail(email)
    await mongodb.update(COLLECTION_NAME, { email }, { $set: { password } })
  } catch (err) {
    throw err
  }
}

const insertUser = async user => {
  const userObj = extend({}, MODEL, user)
  return await mongodb.insert(COLLECTION_NAME, userObj)
}

const addUserIfNotExists = async user => {
  const { username } = user
  await mongodb.transaction(async () => {
    const data = await getUserByUsername(username)
    console.log('Users', data)
    if (data) {
      throw new Error('USER_ALREADY_EXISTS')
    }
    await insertUser(user)
  })
}

const resetPassword = async ({ token, password }) => {
  await mongodb.transaction(async () => {
    const data = await getRecoveryToken(token)
    const passwd = await Bcrypt.hash(password, 10)

    if (!data) {
      throw new Error('NO_TOKEN_FOUND')
    }
    await updatePasswordFromEmail(data.email, passwd)
    await removeRecoveryToken(token)
  })
}

export {
  validateCredential,
  addUserIfNotExists,
  getUserByEmail,
  updatePasswordFromEmail,
  getUserByUsername,
  insertUser,
  resetPassword,
  getUsers,
  getUsersByGroups
}
