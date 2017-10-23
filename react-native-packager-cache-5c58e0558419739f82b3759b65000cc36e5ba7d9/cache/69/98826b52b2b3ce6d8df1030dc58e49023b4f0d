

'use strict';

var FBGraphRequest = function () {
  function FBGraphRequest(graphPath, config, callback) {
    babelHelpers.classCallCheck(this, FBGraphRequest);

    this.graphPath = graphPath;
    this.config = config ? config : {};
    this.callback = callback ? callback : function () {};
  }

  babelHelpers.createClass(FBGraphRequest, [{
    key: 'addStringParameter',
    value: function addStringParameter(paramString, key) {
      if (this.config != null && this.config.parameters != null) {
        this.config.parameters[key] = { string: paramString };
      }
    }
  }]);
  return FBGraphRequest;
}();

module.exports = FBGraphRequest;