'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('ClearAll');

var ClearAll = function (_Component) {
  _inherits(ClearAll, _Component);

  function ClearAll() {
    _classCallCheck(this, ClearAll);

    return _possibleConstructorReturn(this, (ClearAll.__proto__ || Object.getPrototypeOf(ClearAll)).apply(this, arguments));
  }

  _createClass(ClearAll, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          translate = _props.translate,
          items = _props.items,
          refine = _props.refine;

      var isDisabled = items.length === 0;
      if (isDisabled) {
        return _react2.default.createElement(
          'button',
          _extends({}, cx('root'), { disabled: true }),
          translate('reset')
        );
      }

      return _react2.default.createElement(
        'button',
        _extends({}, cx('root'), { onClick: refine.bind(null, items) }),
        translate('reset')
      );
    }
  }]);

  return ClearAll;
}(_react.Component);

ClearAll.propTypes = {
  translate: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  refine: _propTypes2.default.func.isRequired
};
exports.default = (0, _translatable2.default)({
  reset: 'Clear all filters'
})(ClearAll);