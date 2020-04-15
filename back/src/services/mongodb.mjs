'use strict'

import mongodb  from 'mongodb'
import config from 'config'

const internals = {
  client: new mongodb.MongoClient(config.mongodb.uri, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  db: undefined
}

const connect = async () => {
  await internals.client.connect()
  internals.db = internals.client.db(config.mongodb.dbname)
  return internals.db
}

const fetch = async (collectionName, query = {}) => {
  return internals.db
    .collection(collectionName)
    .find(query)
    .toArray()
}

const insert = async (collectionName, data) => {
  const collection = internals.db.collection(collectionName)
  if (Array.isArray(data)) {
    const resultMany = await collection.insertMany(data)
    return resultMany.ops
  }
  const result = await collection.insertOne(data)
  return result.ops[0]
}

const update = async (collectionName, query, options = {}) => {
  const collection = await internals.db.collection(collectionName)
  const result = await collection.updateMany(query, options)
  return { modifiedCount: result.modifiedCount }
  // return collection.updateOne(query, options)
}

const remove = async (collectionName, query, options = {}) => {
  const collection = await internals.db.collection(collectionName)
  const result = await collection.deleteMany(query, options)
  return { deleteCount: result.deletedCount }
  // return collection.deleteOne(query, options)
}

const transaction = async (operationsFunc, transactionOptions = {}) => {
  const session = internals.client.startSession()
  try {
    await session.withTransaction(operationsFunc, transactionOptions)
  } finally {
    session.endSession()
  }
}

export default {
  connect,
  getDb: () => internals.db,
  fetch,
  insert,
  update,
  remove,
  disconnect: () => internals.client.close(),
  transaction,
  ObjectID: mongodb.ObjectID
}
