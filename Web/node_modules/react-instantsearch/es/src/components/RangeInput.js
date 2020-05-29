'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawRangeInput = undefined;

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

var cx = (0, _classNames2.default)('RangeInput');

var RawRangeInput = exports.RawRangeInput = function (_Component) {
  _inherits(RawRangeInput, _Component);

  function RawRangeInput(props) {
    _classCallCheck(this, RawRangeInput);

    var _this = _possibleConstructorReturn(this, (RawRangeInput.__proto__ || Object.getPrototypeOf(RawRangeInput)).call(this, props));

    _this.onSubmit = function (e) {
      e.preventDefault();

      _this.props.refine({
        min: _this.state.from,
        max: _this.state.to
      });
    };

    _this.state = _this.normalizeStateForRendering(props);
    return _this;
  }

  _createClass(RawRangeInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.context.canRefine) {
        this.context.canRefine(this.props.canRefine);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // In react@16.0.0 the call to setState on the inputs trigger this lifecycle hook
      // because the context has changed (for react). I don't think that the bug is related
      // to react because I failed to reproduce it with a simple hierarchy of components.
      // The workaround here is to check the differences between previous & next props in order
      // to avoid to override current state when values are not yet refined. In the react documentation,
      // they DON'T categorically say that setState never run componentWillReceiveProps.
      // see: https://reactjs.org/docs/react-component.html#componentwillreceiveprops

      if (nextProps.canRefine && (this.props.canRefine !== nextProps.canRefine || this.props.currentRefinement.min !== nextProps.currentRefinement.min || this.props.currentRefinement.max !== nextProps.currentRefinement.max)) {
        this.setState(this.normalizeStateForRendering(nextProps));
      }

      if (this.context.canRefine && this.props.canRefine !== nextProps.canRefine) {
        this.context.canRefine(nextProps.canRefine);
      }
    }
  }, {
    key: 'normalizeStateForRendering',
    value: function normalizeStateForRendering(props) {
      var canRefine = props.canRefine,
          rangeMin = props.min,
          rangeMax = props.max;
      var _props$currentRefinem = props.currentRefinement,
          valueMin = _props$currentRefinem.min,
          valueMax = _props$currentRefinem.max;


      return {
        from: canRefine && valueMin !== undefined && valueMin !== rangeMin ? valueMin : '',
        to: canRefine && valueMax !== undefined && valueMax !== rangeMax ? valueMax : ''
      };
    }
  }, {
    key: 'normalizeRangeForRendering',
    value: function normalizeRangeForRendering(_ref) {
      var canRefine = _ref.canRefine,
          min = _ref.min,
          max = _ref.max;

      var hasMin = min !== undefined;
      var hasMax = max !== undefined;

      return {
        min: canRefine && hasMin && hasMax ? min : '',
        max: canRefine && hasMin && hasMax ? max : ''
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          from = _state.from,
          to = _state.to;
      var _props = this.props,
          precision = _props.precision,
          translate = _props.translate,
          canRefine = _props.canRefine;

      var _normalizeRangeForRen = this.normalizeRangeForRendering(this.props),
          min = _normalizeRangeForRen.min,
          max = _normalizeRangeForRen.max;

      var step = 1 / Math.pow(10, precision);

      return _react2.default.createElement(
        'form',
        _extends({}, cx('root', !canRefine && 'noRefinement'), {
          onSubmit: this.onSubmit
        }),
        _react2.default.createElement(
          'fieldset',
          _extends({ disabled: !canRefine }, cx('fieldset')),
          _react2.default.createElement(
            'label',
            cx('labelMin'),
            _react2.default.createElement('input', _extends({}, cx('inputMin'), {
              type: 'number',
              min: min,
              max: max,
              value: from,
              step: step,
              placeholder: min,
              onChange: function onChange(e) {
                return _this2.setState({ from: e.currentTarget.value });
              }
            }))
          ),
          _react2.default.createElement(
            'span',
            cx('separator'),
            translate('separator')
          ),
          _react2.default.createElement(
            'label',
            cx('labelMax'),
            _react2.default.createElement('input', _extends({}, cx('inputMax'), {
              type: 'number',
              min: min,
              max: max,
              value: to,
              step: step,
              placeholder: max,
              onChange: function onChange(e) {
                return _this2.setState({ to: e.currentTarget.value });
              }
            }))
          ),
          _react2.default.createElement(
            'button',
            _extends({}, cx('submit'), { type: 'submit' }),
            translate('submit')
          )
        )
      );
    }
  }]);

  return RawRangeInput;
}(_react.Component);

RawRangeInput.propTypes = {
  canRefine: _propTypes2.default.bool.isRequired,
  precision: _propTypes2.default.number.isRequired,
  translate: _propTypes2.default.func.isRequired,
  refine: _propTypes2.default.func.isRequired,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  currentRefinement: _propTypes2.default.shape({
    min: _propTypes2.default.number,
    max: _propTypes2.default.number
  })
};
RawRangeInput.defaultProps = {
  currentRefinement: {}
};
RawRangeInput.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  submit: 'ok',
  separator: 'to'
})(RawRangeInput);