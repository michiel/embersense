var SenseAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({

    serverTokenEndpoint: 'https://api.sense-os.nl/',

    restore: function(properties) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
          if (
            !Ember.isEmpty(properties.auth_token) && 
            !Ember.isEmpty(properties.auth_email)
          ) {
            resolve(properties);
          } else {
            reject();
          }
        });
    },

    authenticate: function(credentials) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var data = {
          username : credentials.identification,
          /* global CryptoJS */
          password : CryptoJS.MD5(credentials.password).toString()
        };
        this.makeRequest('login.json', data).then(function(response) {
          Ember.run(function() {
            resolve(response);
          });
        }, function(xhr, status, error) {
          Ember.run(function() {
            reject(xhr.responseJSON || xhr.responseText);
          });
        });
      }.bind(this));
    },

    invalidate: function() {
      return Ember.RSVP.resolve();
    },

    makeRequest: function(path, data, resolve, reject) {
      var url = this.serverTokenEndpoint + path;
      if (!Ember.SimpleAuth.Utils.isSecureUrl(url)) {
        Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
      }
      return Ember.$.ajax({
        url         : url,
        type        : 'POST',
        data        : JSON.stringify(data),
        dataType    : 'json',
        contentType : 'application/json; charset=UTF-8'
      });
    }

  });

var SenseAuthorizer = Ember.SimpleAuth.Authorizers.Base.extend({
  });

export default {
  name: "authentication",
  after: "store",

  initialize: function(container, application) {
    container.register('authorizer:sense', SenseAuthorizer);
    container.register('authenticator:sense', SenseAuthenticator);
    Ember.SimpleAuth.setup(container, application, {
        storeFactory         : 'session-store:local-storage',
        authorizerFactory    : 'authorizer:sense',
        crossOriginWhitelist : ['https://api.sense-os.nl']
      });
  }
};
