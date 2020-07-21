var graph = require('@microsoft/microsoft-graph-client');
const save = require('./save.js');
require('isomorphic-fetch');
require('./save.js');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getUserPhoto: async function(accessToken, user = "me") {
    const client = getAuthenticatedClient(accessToken);

    if (user != 'me') {
        user = 'users/' + user;
    }

    const photo = await client
        .api('/' + user + '/photo/$value')
        .responseType('blob')
        .getStream()
        .then((stream) => {
            save.saveFile(stream, user);
        })
        .catch((error) => {
            throw error;
        });

    return 'Photo for ' + user + ' saved successfully';
  },
 
  getEvents: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);
  
    const events = await client
      .api('/me/events')
      .select('subject,organizer,start,end')
      .orderby('createdDateTime DESC')
      .get();
  
    return events;
  }
};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}