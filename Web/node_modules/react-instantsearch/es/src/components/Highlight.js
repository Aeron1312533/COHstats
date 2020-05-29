'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Highlight;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Highlighter = require('./Highlighter');

var _Highlighter2 = _interopRequireDefault(_Highlighter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Highlight(props) {
  return _react2.default.createElement(_Highlighter2.default, _extends({ highlightProperty: '_highlightResult' }, props));
}

Highlight.propTypes = {
  hit: _propTypes2.default.object.isRequired,
  attributeName: _propTypes2.default.string.isRequired,
  highlight: _propTypes2.default.func.isRequired,
  tagName: _propTypes2.default.string
};