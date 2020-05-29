'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('SortBy');

var SortBy = function (_Component) {
  _inherits(SortBy, _Component);

  function SortBy() {
    _classCallCheck(this, SortBy);

    return _possibleConstructorReturn(this, (SortBy.__proto__ || Object.getPrototypeOf(SortBy)).apply(this, arguments));
  }

  _createClass(SortBy, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          refine = _props.refine,
          items = _props.items,
          currentRefinement = _props.currentRefinement;

      return _react2.default.createElement(_Select2.default, {
        cx: cx,
        selectedItem: currentRefinement,
        onSelect: refine,
        items: items
      });
    }
  }]);

  return SortBy;
}(_react.Component);

SortBy.propTypes = {
  refine: _propTypes2.default.func.isRequired,

  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    value: _propTypes2.default.string.isRequired
  })).isRequired,

  currentRefinement: _propTypes2.default.string.isRequired,
  transformItems: _propTypes2.default.func
};
exports.default = SortBy;