'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('MenuSelect');

var MenuSelect = function (_Component) {
  _inherits(MenuSelect, _Component);

  function MenuSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuSelect.__proto__ || Object.getPrototypeOf(MenuSelect)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectChange = function (_ref2) {
      var value = _ref2.target.value;

      _this.props.refine(value === 'ais__see__all__option' ? '' : value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuSelect, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.context.canRefine) this.context.canRefine(this.props.canRefine);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.context.canRefine) this.context.canRefine(props.canRefine);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          items = _props.items,
          translate = _props.translate;


      return _react2.default.createElement(
        'select',
        _extends({
          value: this.selectedValue,
          onChange: this.handleSelectChange
        }, cx('select')),
        _react2.default.createElement(
          'option',
          _extends({ value: 'ais__see__all__option' }, cx('option')),
          translate('seeAllOption')
        ),
        items.map(function (item) {
          return _react2.default.createElement(
            'option',
            _extends({ key: item.value, value: item.value }, cx('option')),
            item.label,
            ' (',
            item.count,
            ')'
          );
        })
      );
    }
  }, {
    key: 'selectedValue',
    get: function get() {
      var _ref3 = (0, _find3.default)(this.props.items, { isRefined: true }) || {
        value: 'ais__see__all__option'
      },
          value = _ref3.value;

      return value;
    }
  }]);

  return MenuSelect;
}(_react.Component);

MenuSelect.propTypes = {
  canRefine: _propTypes2.default.bool.isRequired,
  refine: _propTypes2.default.func.isRequired,
  translate: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string.isRequired,
    count: _propTypes2.default.number.isRequired,
    isRefined: _propTypes2.default.bool.isRequired
  }))
};
MenuSelect.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  seeAllOption: 'See all'
})(MenuSelect);