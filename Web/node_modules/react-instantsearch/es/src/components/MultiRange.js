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

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('MultiRange');

var MultiRange = function (_Component) {
  _inherits(MultiRange, _Component);

  function MultiRange() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiRange);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiRange.__proto__ || Object.getPrototypeOf(MultiRange)).call.apply(_ref, [this].concat(args))), _this), _this.renderItem = function (item) {
      var _this$props = _this.props,
          refine = _this$props.refine,
          translate = _this$props.translate;

      var label = item.value === '' ? translate('all') : item.label;
      return _react2.default.createElement(
        'label',
        cx(item.value === '' && 'itemAll'),
        _react2.default.createElement('input', _extends({}, cx('itemRadio', item.isRefined && 'itemRadioSelected'), {
          type: 'radio',
          checked: item.isRefined,
          disabled: item.noRefinement,
          onChange: refine.bind(null, item.value)
        })),
        _react2.default.createElement('span', cx('itemBox', 'itemBox', item.isRefined && 'itemBoxSelected')),
        _react2.default.createElement(
          'span',
          cx('itemLabel', 'itemLabel', item.isRefined && 'itemLabelSelected'),
          label
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MultiRange, [{
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
          canRefine = _props.canRefine;


      return _react2.default.createElement(_List2.default, {
        renderItem: this.renderItem,
        showMore: false,
        canRefine: canRefine,
        cx: cx,
        items: items.map(function (item) {
          return _extends({}, item, { key: item.value });
        })
      });
    }
  }]);

  return MultiRange;
}(_react.Component);

MultiRange.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.string.isRequired,
    isRefined: _propTypes2.default.bool.isRequired,
    noRefinement: _propTypes2.default.bool.isRequired
  })).isRequired,
  refine: _propTypes2.default.func.isRequired,
  transformItems: _propTypes2.default.func,
  canRefine: _propTypes2.default.bool.isRequired,
  translate: _propTypes2.default.func.isRequired
};
MultiRange.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  all: 'All'
})(MultiRange);