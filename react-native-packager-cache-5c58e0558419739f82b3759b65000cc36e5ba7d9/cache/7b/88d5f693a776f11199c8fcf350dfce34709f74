

'use strict';

var AccessToken = require('react-native').NativeModules.FBAccessToken;

var FBAccessToken = function () {
  function FBAccessToken(tokenMap) {
    babelHelpers.classCallCheck(this, FBAccessToken);

    this.accessToken = tokenMap.accessToken;
    this.permissions = tokenMap.permissions;
    this.declinedPermissions = tokenMap.declinedPermissions;
    this.applicationID = tokenMap.applicationID;
    this.accessTokenSource = tokenMap.accessTokenSource;
    this.userID = tokenMap.userID;
    this.expirationTime = tokenMap.expirationTime;
    this.lastRefreshTime = tokenMap.lastRefreshTime;
    Object.freeze(this);
  }

  babelHelpers.createClass(FBAccessToken, [{
    key: 'getExpires',
    value: function getExpires() {
      return this.expirationTime;
    }
  }, {
    key: 'getPermissions',
    value: function getPermissions() {
      return this.permissions;
    }
  }, {
    key: 'getDeclinedPermissions',
    value: function getDeclinedPermissions() {
      return this.declinedPermissions;
    }
  }, {
    key: 'getLastRefresh',
    value: function getLastRefresh() {
      return this.lastRefreshTime;
    }
  }, {
    key: 'getApplicationId',
    value: function getApplicationId() {
      return this.applicationID;
    }
  }, {
    key: 'getUserId',
    value: function getUserId() {
      return this.userID;
    }
  }], [{
    key: 'getCurrentAccessToken',
    value: function getCurrentAccessToken() {
      return new Promise(function (resolve, reject) {
        AccessToken.getCurrentAccessToken(function (tokenMap) {
          if (tokenMap) {
            resolve(new FBAccessToken(tokenMap));
          } else {
            resolve(null);
          }
        });
      });
    }
  }, {
    key: 'setCurrentAccessToken',
    value: function setCurrentAccessToken(accessToken) {
      AccessToken.setCurrentAccessToken(accessToken);
    }
  }, {
    key: 'refreshCurrentAccessTokenAsync',
    value: function refreshCurrentAccessTokenAsync() {
      return AccessToken.refreshCurrentAccessTokenAsync();
    }
  }]);
  return FBAccessToken;
}();

module.exports = FBAccessToken;