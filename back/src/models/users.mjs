import omit from 'lodash/omit.js';
import extend from 'lodash/extend.js';
import Bcrypt from 'bcrypt';
import mongodb from '../services/mongodb.mjs';
import { getRecoveryToken, removeRecoveryToken } from './recoveryPassword.mjs';
import Boom from '@hapi/boom';

const COLLECTION_NAME = 'users';
const MODEL = {
  _id: null,
  firstname: null,
  lastname: null,
  email: null,
  scope: [], // string array
  groups: [], // string array
  providers: {},
  isActive: true,
  deleted: false,
  deletedDate: null,
  createdDate: null,
  lastModifiedDate: null,
  activeAfterDate: null,
  expirationDate: null,
};

const getUserByProvider = async (provider, { email, userId }) => {
  console.log('getUserByProvider');
  if (!provider || (!email && !userId)) {
    throw new Error('Invalid data to find user for this provider');
  }

  const filters = {
    [`providers.${provider}.name`]: provider,
  };
  if (email) filters[`providers.${provider}.email`] = email;
  if (userId) filters[`providers.${provider}.userId`] = userId;

  console.log('Filters by provider', filters);
  const users = await mongodb.fetch(COLLECTION_NAME, filters);

  console.log('Mongodb ', users);
  if (users.length === 0) throw Boom.unauthorized('INVALID_CREDENTIAL');
  if (users.length !== 1) throw new Error('MULTIPLE_USER_FOR_EMAIL');

  const user = users[0];
  if (user.isActive !== undefined && !user.isActive) {
    return Boom.unauthorized('INACTIVE_USER');
  }

  // account has validation date
  const currentDate = Date.now();
  if (user.activeAfterDate && user.activeAfterDate < currentDate) {
    return Boom.unauthorized('NOT_YET_AVAILABLE_USER');
  }
  if (user.expirationDate && user.expirationDate > currentDate) {
    return Boom.unauthorized('EXPIRED_USER');
  }

  return user;
};

const checkIfProviderIdentityAlreadyUsed = async (
  provider,
  { email, userId }
) => {
  console.log('getUserByProvider');
  if (!email && !userId) {
    throw new Error('Invalid data to find user for this provider');
  }

  const filters = {
    [`providers.${provider}.name`]: provider,
  };
  if (email) filters[`providers.${provider}.email`] = email;
  if (userId) filters[`providers.${provider}.userId`] = userId;

  console.log('Filters by provider', filters);
  const users = await mongodb.fetch(COLLECTION_NAME, filters);

  console.log('## Mongodb ', users);
  if (users.length === 0) return false;
  return true;
};

const resetPassword = async (resetToken, password) => {
  await mongodb.transaction(async () => {
    console.log('resetPassword #1');
    console.log('resetPassword #1 - params', resetToken, password);
    const data = await getRecoveryToken(resetToken);
    console.log('resetPassword #2');
    let passwd
    try {
      passwd = await Bcrypt.hash(password, 10);
    } catch (e) {
      console.log('EEROR',e)
    }
    console.log('resetPassword #3', passwd);

    if (!data) {
      console.log('ResetPassword #4.1');
      throw new Error('NO_TOKEN_FOUND');
    }

    console.log('resetPassword #4.2');
    console.log('resetPassword #4.2 - data', data);
    await updatePasswordFromEmail(data.email, passwd);
    console.log('resetPassword #5');
    await removeRecoveryToken(resetToken);
    console.log('resetPassword #6');
  });
};

// { firstname, lastname, email, scope: ['user'], providers: { internal: {name: 'internal', email, password: passwd }} }
const addUserIfNotExists = async (user) => {
  console.log('addUserIfNotExists');
  const { providers } = user;

  await mongodb.transaction(async () => {
    if (
      await checkIfProviderIdentityAlreadyUsed('internal', {
        email: providers.internal.email,
      })
    ) {
      console.log('User already exists');
      throw new Error('USER_ALREADY_EXISTS');
    }
    console.log('Insert new user');
    await insertUser(user);
  });
};

const insertUser = async (user) => {
  const userObj = extend({ createDate: Date.now() }, MODEL, user);
  return await mongodb.insert(COLLECTION_NAME, userObj);
};

const attachProvider = async (id, provider, { email, userId }) => {
  console.log('attachProvider');

  const filter = { _id: new mongodb.ObjectID(id) };
  const updateQuery = {
    $set: {
      [`providers.${provider}.name`]: provider,
      [`providers.${provider}.email`]: email,
      [`providers.${provider}.userId`]: userId,
    },
  };
  const res = await mongodb.update(COLLECTION_NAME, filter, updateQuery);
  console.log('res', res);
};





const getUsers = async (filters = undefined) => {
  const users = await mongodb.fetch(COLLECTION_NAME, filters);

  return users.map((user) => omit(user, ['providers.internal.password']));
};

const getUserByEmail = async (email, withPassword = false) => {
  console.log('getUserByEmail');
  const users = await mongodb.fetch(COLLECTION_NAME, { email });

  if (users.length === 0) return;
  if (users.length !== 1) throw new Error('MULTIPLE_USER_FOR_EMAIL');

  if (withPassword) {
    return users[0];
  }

  return omit(user, ['providers.internal.password']);
};


const validateCredential = async (email, password) => {
  const user = await getUserByEmail(email)
  console.log('user', user)
  if (!user) {
    throw new Error('INVALID_CREDENTIAL')
  }

  // inactive account500Internal S500Internal Server Errorerver Error
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

  if (user && password === user.password) {
    // if (user && (await Bcrypt.compare(password, user.password))) {
    return omit(user, ['password']);
  }

  throw new Error('INVALID_CREDENTIAL')
}

const updatePasswordFromEmail = async (email, password) => {
  try {
    console.log('updatePasswordFromEmail');
    await getUserDataForJwtFromProvider('internal', { email });
    const res = await mongodb.update(
      COLLECTION_NAME,
      { 'providers.internal.email': email },
      { $set: { 'providers.internal.password': password } }
    );
    console.log('res', res);
  } catch (err) {
    throw err;
  }
};

const getUserDataForJwtFromProvider = async (provider, data = {}) => {
  console.log('getUserDataForJwtFromProvider');
  console.log('getUserDataForJwtFromProvider - params', provider, data);
  const { email, userId } = data;
  const filter = {};

  const providerPrefixFilter = 'providers.' + provider;
  filter[providerPrefixFilter + '.name'] = provider;
  if (email) {
    filter[providerPrefixFilter + '.email'] = email;
  }
  if (userId) {
    filter[providerPrefixFilter + '.userId'] = userId;
  }

  console.log('getUserDataForJwtFromProvider - filter', filter);
  const users = await mongodb.fetch(COLLECTION_NAME, filter);

  if (users.length === 0) return;
  if (users.length !== 1) throw new Error('MULTIPLE_USER_FOR_PROVIDER_DATA');

  return omit(users[0], ['providers.internal.password']);
};

export {
  attachProvider,
  getUserByProvider,
  checkIfProviderIdentityAlreadyUsed,
  addUserIfNotExists,
  resetPassword,

  getUsers,
  getUserByEmail,
  validateCredential,
  updatePasswordFromEmail
};
