const senderMail = process.env.SENDER_MAIL;
const secretKey = process.env.SECRET_KEY;
const appSpecificPass = process.env.APP_SPECIFI_PASS

module.exports = {
  senderMail,
  secretKey,
  appSpecificPass
};
