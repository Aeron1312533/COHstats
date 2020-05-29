'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Highlighter;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Highlighter(_ref) {
  var hit = _ref.hit,
      attributeName = _ref.attributeName,
      highlight = _ref.highlight,
      highlightProperty = _ref.highlightProperty,
      tagName = _ref.tagName;

  var parsedHighlightedValue = highlight({
    hit: hit,
    attributeName: attributeName,
    highlightProperty: highlightProperty
  });
  var reactHighlighted = parsedHighlightedValue.map(function (v, i) {
    var key = 'split-' + i + '-' + v.value;
    if (!v.isHighlighted) {
      return _react2.default.createElement(
        'span',
        { key: key, className: 'ais-Highlight__nonHighlighted' },
        v.value
      );
    }
    var HighlightedTag = tagName ? tagName : 'em';
    return _react2.default.createElement(
      HighlightedTag,
      { key: key, className: 'ais-Highlight__highlighted' },
      v.value
    );
  });
  return _react2.default.createElement(
    'span',
    { className: 'ais-Highlight' },
    reactHighlighted
  );
}

Highlighter.propTypes = {
  hit: _propTypes2.default.object.isRequired,
  attributeName: _propTypes2.default.string.isRequired,
  highlight: _propTypes2.default.func.isRequired,
  highlightProperty: _propTypes2.default.string.isRequired,
  tagName: _propTypes2.default.string
};