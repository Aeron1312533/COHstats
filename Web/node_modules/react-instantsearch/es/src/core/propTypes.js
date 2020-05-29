'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withKeysPropType = exports.stateManagerPropType = exports.configManagerPropType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configManagerPropType = exports.configManagerPropType = _propTypes2.default.shape({
  register: _propTypes2.default.func.isRequired,
  swap: _propTypes2.default.func.isRequired,
  unregister: _propTypes2.default.func.isRequired
});

var stateManagerPropType = exports.stateManagerPropType = _propTypes2.default.shape({
  createURL: _propTypes2.default.func.isRequired,
  setState: _propTypes2.default.func.isRequired,
  getState: _propTypes2.default.func.isRequired,
  unlisten: _propTypes2.default.func.isRequired
});

var withKeysPropType = exports.withKeysPropType = function withKeysPropType(keys) {
  return function (props, propName, componentName) {
    var prop = props[propName];
    if (prop) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(prop)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (keys.indexOf(key) === -1) {
            return new Error('Unknown `' + propName + '` key `' + key + '`. Check the render method ' + ('of `' + componentName + '`.'));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    return undefined;
  };
};