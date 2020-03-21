'use strict'

import config from 'config'
import { addRecoveryToken } from '../../models/recoveryPassword.mjs'
import { getUserByEmail } from '../../models/users.mjs'
import mailer from '../../services/mailer.mjs'

export default {
  method: 'GET',
  path: '/forgotten-password',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const { email } = request.query
    const user = await getUserByEmail(email)

    if (!user) {
      return h.response({ status: 'KO', code: 'EMAIL_NOT_FOUND'}).code(400)
    }

    const token = await addRecoveryToken(email)
    const urlTarget = config.domainFront + '/reset-password?token=' + token

    await mailer.send({
      from: 'no-reply@chooseyourself.fr',
      to: email,
      subject: 'Récupération de mot de passe',
      text:
        "Une demande de réinitialisation de mot de passe a été faite pour cette adresse email. Si vous ne l'avez pas fait, nous vous conseillons de changer votre mot de passe, sinon cliquer sur le lien suivant " +
        urlTarget
    })

    return h.response({ status: 'OK' })
  }
}
