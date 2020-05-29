'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('Panel');

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  _createClass(Panel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { canRefine: this.canRefine };
    }
  }]);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.canRefine = function (canRefine) {
      _this.setState({ canRefine: canRefine });
    };

    _this.state = {
      canRefine: true
    };
    return _this;
  }

  _createClass(Panel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        cx('root', !this.state.canRefine && 'noRefinement'),
        _react2.default.createElement(
          'h5',
          cx('title'),
          this.props.title
        ),
        this.props.children
      );
    }
  }]);

  return Panel;
}(_react.Component);

Panel.propTypes = {
  title: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node
};
Panel.childContextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = Panel;