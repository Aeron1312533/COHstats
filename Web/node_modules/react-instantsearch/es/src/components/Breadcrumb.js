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

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('Breadcrumb');

var itemsPropType = _propTypes2.default.arrayOf(_propTypes2.default.shape({
  label: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string.isRequired
}));

var Breadcrumb = function (_Component) {
  _inherits(Breadcrumb, _Component);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
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
          canRefine = _props.canRefine,
          createURL = _props.createURL,
          items = _props.items,
          refine = _props.refine,
          rootURL = _props.rootURL,
          separator = _props.separator,
          translate = _props.translate;

      var rootPath = canRefine ? _react2.default.createElement(
        'span',
        cx('item'),
        _react2.default.createElement(
          _Link2.default,
          _extends({}, cx('itemLink', 'itemLinkRoot'), {
            onClick: function onClick() {
              return !rootURL ? refine() : null;
            },
            href: rootURL ? rootURL : createURL()
          }),
          _react2.default.createElement(
            'span',
            cx('rootLabel'),
            translate('rootLabel')
          )
        ),
        _react2.default.createElement(
          'span',
          cx('separator'),
          separator
        )
      ) : null;

      var breadcrumb = items.map(function (item, idx) {
        var isLast = idx === items.length - 1;
        return !isLast ? _react2.default.createElement(
          'span',
          _extends({}, cx('item'), { key: idx }),
          _react2.default.createElement(
            _Link2.default,
            _extends({}, cx('itemLink'), {
              onClick: function onClick() {
                return refine(item.value);
              },
              href: createURL(item.value),
              key: idx
            }),
            _react2.default.createElement(
              'span',
              cx('itemLabel'),
              item.label
            )
          ),
          _react2.default.createElement(
            'span',
            cx('separator'),
            isLast ? '' : separator
          )
        ) : _react2.default.createElement(
          'span',
          _extends({}, cx('itemLink', 'itemDisabled', 'item'), { key: idx }),
          _react2.default.createElement(
            'span',
            cx('itemLabel'),
            item.label
          )
        );
      });

      return _react2.default.createElement(
        'div',
        cx('root', !canRefine && 'noRefinement'),
        rootPath,
        breadcrumb
      );
    }
  }]);

  return Breadcrumb;
}(_react.Component);

Breadcrumb.propTypes = {
  canRefine: _propTypes2.default.bool.isRequired,
  createURL: _propTypes2.default.func.isRequired,
  items: itemsPropType,
  refine: _propTypes2.default.func.isRequired,
  rootURL: _propTypes2.default.string,
  separator: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  translate: _propTypes2.default.func.isRequired
};
Breadcrumb.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  rootLabel: 'Home'
})(Breadcrumb);