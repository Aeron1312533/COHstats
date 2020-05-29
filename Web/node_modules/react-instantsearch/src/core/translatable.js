'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = translatable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _propTypes = require('./propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function translatable(defaultTranslations) {
  return function (Composed) {
    function Translatable(props) {
      var translations = props.translations,
          otherProps = _objectWithoutProperties(props, ['translations']);

      var translate = function translate(key) {
        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        var translation = translations && (0, _has3.default)(translations, key) ? translations[key] : defaultTranslations[key];
        if (typeof translation === 'function') {
          return translation.apply(undefined, params);
        }
        return translation;
      };

      return _react2.default.createElement(Composed, _extends({ translate: translate }, otherProps));
    }

    Translatable.displayName = 'Translatable(' + (0, _utils.getDisplayName)(Composed) + ')';

    Translatable.propTypes = {
      translations: (0, _propTypes.withKeysPropType)(Object.keys(defaultTranslations))
    };

    return Translatable;
  };
}