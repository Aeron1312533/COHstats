'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classNames;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = 'ais';

function classNames(block) {
  return function () {
    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    return {
      className: (0, _classnames2.default)(elements.filter(function (element) {
        return element !== undefined && element !== false;
      }).map(function (element) {
        return prefix + '-' + block + '__' + element;
      }))
    };
  };
}