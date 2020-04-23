import config from 'config'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

const mailer = {}

const mailgunConfig = {
  auth: {
    api_key: config.mailgun.apiKey,
    domain: config.mailgun.domain,
  },
  host: config.mailgun.host
}

const nodemailerMailgun = nodemailer.createTransport(mg(mailgunConfig));

/*
const data = {
  from: "myemail@example.com",
  to: "recipient@domain.com", // An array if you have multiple recipients.
  cc: "second@domain.com",
  bcc: "secretagent@company.gov",
  subject: "Hey you, awesome!",
  "h:Reply-To": "reply2this@company.com",
  //You can use "html:" to send HTML email content. It's magic!
  html: "<b>Wow Big powerful letters</b>",
  //You can use "text:" to send plain-text content. It's oldschool!
  text: "Mailgun rocks, pow pow!"
};
*/

mailer.send = async data => {
  return nodemailerMailgun.sendMail(data)
}


mailer.mail = class Mail {
  data = {}

  from = from => {
    this.data.from = from
    return this
  }

  to = to => {
    this.data.to = to
    return this
  }

  cc = cc => {
    this.data.cc = cc
    return this
  }

  bcc = bcc => {
    this.data.bcc = bcc
    return this
  }

  subject = subject => {
    this.data.subject = subject
    return this
  }

  html = html => {
    this.data.html = html
    return this
  }

  text = text => {
    this.data.text = text
    return this
  }

  send = async () => {
    return nodemailerMailgun.sendMail(this.data)
  }
}

export default mailer
