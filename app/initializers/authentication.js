var SenseAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({

    serverTokenEndpoint: '/login',

    restore: function(properties) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
          if (!Ember.isEmpty(properties.auth_token) && !Ember.isEmpty(properties.auth_email)) {
            resolve(properties);
          } else {
            reject();
          }
        });
    },

    authenticate: function(credentials) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var data = {
          email:    credentials.identification,
          password: credentials.password
        };
        this.makeRequest(data).then(function(response) {
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

    makeRequest: function(data, resolve, reject) {
      if (!Ember.SimpleAuth.Utils.isSecureUrl(this.serverTokenEndpoint)) {
        Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
      }
      return Ember.$.ajax({
        url:         this.serverTokenEndpoint,
        type:        'POST',
        data:        data,
        dataType:    'json',
        contentType: 'application/x-www-form-urlencoded'
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
        authorizerFactory: 'authorizer:sense',
        crossOriginWhitelist: ['https://api.sense-os.nl']
      });
  }
};
