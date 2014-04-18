var SenseAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({

    serverTokenEndpoint: Ember.ENV.Sense.apiserver,

    authenticate: function(credentials) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var data = {
          username : credentials.identification,
          /* global CryptoJS */
          password : CryptoJS.MD5(credentials.password).toString()
        };
        this.makeRequest('login.json', data).then(function(response) {
          Ember.run(function() {
            resolve({token: response.session_id});
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

    restore: function(data) {
      var _this = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        if (!Ember.isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
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
    authorize: function(jqXHR, requestOptions) {
      var accessToken = this.get('session.token');
      if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
        if (!Ember.SimpleAuth.Utils.isSecureUrl(requestOptions.url)) {
          Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
        }
        jqXHR.setRequestHeader('X-SESSION_ID', accessToken);
      }
    }
  });

export default {
  name: "authentication",
  after: "store",

  initialize: function(container, application) {
    container.register('authorizer:sense', SenseAuthorizer);
    container.register('authenticator:sense', SenseAuthenticator);
    Ember.SimpleAuth.setup(container, application, {
        storeFactory         : 'session-store:cookie',
        authorizerFactory    : 'authorizer:sense',
        crossOriginWhitelist : [ Ember.ENV.Sense.apiserver ]
      });
  }
};
