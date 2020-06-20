const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-978374.okta.com',
  token: '00n18gsX6E4TMY-7k8FFTSsp4Q0oOPEmWpByZSkAvC'
});

module.exports = client;