'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

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

var cx = (0, _classNames2.default)('StarRating');

var StarRating = function (_Component) {
  _inherits(StarRating, _Component);

  function StarRating() {
    _classCallCheck(this, StarRating);

    return _possibleConstructorReturn(this, (StarRating.__proto__ || Object.getPrototypeOf(StarRating)).apply(this, arguments));
  }

  _createClass(StarRating, [{
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
    key: 'onClick',
    value: function onClick(min, max, e) {
      e.preventDefault();
      e.stopPropagation();
      if (min === this.props.currentRefinement.min && max === this.props.currentRefinement.max) {
        this.props.refine({ min: this.props.min, max: this.props.max });
      } else {
        this.props.refine({ min: min, max: max });
      }
    }
  }, {
    key: 'buildItem',
    value: function buildItem(_ref) {
      var max = _ref.max,
          lowerBound = _ref.lowerBound,
          count = _ref.count,
          translate = _ref.translate,
          createURL = _ref.createURL,
          isLastSelectableItem = _ref.isLastSelectableItem;

      var disabled = !count;
      var isCurrentMinLower = this.props.currentRefinement.min < lowerBound;
      var selected = isLastSelectableItem && isCurrentMinLower || !disabled && lowerBound === this.props.currentRefinement.min && max === this.props.currentRefinement.max;

      var icons = [];
      for (var icon = 0; icon < max; icon++) {
        var iconTheme = icon >= lowerBound ? 'ratingIconEmpty' : 'ratingIcon';
        icons.push(_react2.default.createElement('span', _extends({
          key: icon
        }, cx(iconTheme, selected && iconTheme + 'Selected', disabled && iconTheme + 'Disabled'))));
      }

      // The last item of the list (the default item), should not
      // be clickable if it is selected.
      var isLastAndSelect = isLastSelectableItem && selected;
      var StarsWrapper = isLastAndSelect ? 'div' : 'a';
      var onClickHandler = isLastAndSelect ? {} : {
        href: createURL({ min: lowerBound, max: max }),
        onClick: this.onClick.bind(this, lowerBound, max)
      };

      return _react2.default.createElement(
        StarsWrapper,
        _extends({}, cx('ratingLink', selected && 'ratingLinkSelected', disabled && 'ratingLinkDisabled'), {
          disabled: disabled,
          key: lowerBound
        }, onClickHandler),
        icons,
        _react2.default.createElement(
          'span',
          cx('ratingLabel', selected && 'ratingLabelSelected', disabled && 'ratingLabelDisabled'),
          translate('ratingLabel')
        ),
        _react2.default.createElement(
          'span',
          null,
          ' '
        ),
        _react2.default.createElement(
          'span',
          cx('ratingCount', selected && 'ratingCountSelected', disabled && 'ratingCountDisabled'),
          count
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          translate = _props.translate,
          refine = _props.refine,
          min = _props.min,
          max = _props.max,
          count = _props.count,
          createURL = _props.createURL,
          canRefine = _props.canRefine;

      var items = [];

      var _loop = function _loop(i) {
        var hasCount = !(0, _isEmpty3.default)(count.filter(function (item) {
          return Number(item.value) === i;
        }));
        var lastSelectableItem = count.reduce(function (acc, item) {
          return item.value < acc.value || !acc.value && hasCount ? item : acc;
        }, {});
        var itemCount = count.reduce(function (acc, item) {
          return item.value >= i && hasCount ? acc + item.count : acc;
        }, 0);
        items.push(_this2.buildItem({
          lowerBound: i,
          max: max,
          refine: refine,
          count: itemCount,
          translate: translate,
          createURL: createURL,
          isLastSelectableItem: i === Number(lastSelectableItem.value)
        }));
      };

      for (var i = max; i >= min; i--) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        cx('root', !canRefine && 'noRefinement'),
        items
      );
    }
  }]);

  return StarRating;
}(_react.Component);

StarRating.propTypes = {
  translate: _propTypes2.default.func.isRequired,
  refine: _propTypes2.default.func.isRequired,
  createURL: _propTypes2.default.func.isRequired,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  currentRefinement: _propTypes2.default.shape({
    min: _propTypes2.default.number,
    max: _propTypes2.default.number
  }),
  count: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.string,
    count: _propTypes2.default.number
  })),
  canRefine: _propTypes2.default.bool.isRequired
};
StarRating.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  ratingLabel: ' & Up'
})(StarRating);