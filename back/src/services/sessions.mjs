import extend  from 'lodash/extend.js'
import remove from 'lodash/remove.js'
import config from 'config'
import moment from 'moment'

const sessions = []

const findSession = async sessionId => {
  const currentTimestamp = moment().valueOf()

  return sessions.find(([id, expiration]) => id === sessionId && expiration > currentTimestamp)
}

const removeSession = sessionId => {
  remove(sessions, session => session.id === sessionId)
}

const addSession = async session => {
  const expiration = moment()
    .add(config.session.duration, 'm')
    .valueOf()
  const internalSession = extend(session, { expiration })

  sessions.push(internalSession)
}

const sessionCleaner = () => {
  const currentTimestamp = moment().valueOf()

  remove(sessions, elt => elt.expiration <= currentTimestamp)

  setTimeout(sessionCleaner, config.session.cleanInterval)
  console.log('Session cleaned')
}

export {
  addSession,
  removeSession,
  findSession,
  sessionCleaner
}
