

'use strict';

var ShareOpenGraphValueContainer = function () {
  function ShareOpenGraphValueContainer(properties) {
    babelHelpers.classCallCheck(this, ShareOpenGraphValueContainer);

    this._properties = properties ? properties : {};
  }

  babelHelpers.createClass(ShareOpenGraphValueContainer, [{
    key: 'putNumber',
    value: function putNumber(key, number) {
      this._properties[key] = { type: 'number', value: number };
    }
  }, {
    key: 'putObject',
    value: function putObject(key, object) {
      this._properties[key] = { type: 'open-graph-object', value: object };
    }
  }, {
    key: 'putPhoto',
    value: function putPhoto(key, photo) {
      this._properties[key] = { type: 'photo', value: photo };
    }
  }, {
    key: 'putString',
    value: function putString(key, string) {
      this._properties[key] = { type: 'string', value: string };
    }
  }, {
    key: 'getEntry',
    value: function getEntry(key) {
      return this._properties[key];
    }
  }]);
  return ShareOpenGraphValueContainer;
}();

module.exports = ShareOpenGraphValueContainer;