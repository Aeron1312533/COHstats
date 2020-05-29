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

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('InfiniteHits');

var InfiniteHits = function (_Component) {
  _inherits(InfiniteHits, _Component);

  function InfiniteHits() {
    _classCallCheck(this, InfiniteHits);

    return _possibleConstructorReturn(this, (InfiniteHits.__proto__ || Object.getPrototypeOf(InfiniteHits)).apply(this, arguments));
  }

  _createClass(InfiniteHits, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ItemComponent = _props.hitComponent,
          hits = _props.hits,
          hasMore = _props.hasMore,
          refine = _props.refine,
          translate = _props.translate;

      var renderedHits = hits.map(function (hit) {
        return _react2.default.createElement(ItemComponent, { key: hit.objectID, hit: hit });
      });
      var loadMoreButton = hasMore ? _react2.default.createElement(
        'button',
        _extends({}, cx('loadMore'), { onClick: function onClick() {
            return refine();
          } }),
        translate('loadMore')
      ) : _react2.default.createElement(
        'button',
        _extends({}, cx('loadMore'), { disabled: true }),
        translate('loadMore')
      );

      return _react2.default.createElement(
        'div',
        cx('root'),
        renderedHits,
        loadMoreButton
      );
    }
  }]);

  return InfiniteHits;
}(_react.Component);

InfiniteHits.propTypes = {
  hits: _propTypes2.default.array,
  hitComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
  hasMore: _propTypes2.default.bool.isRequired,
  refine: _propTypes2.default.func.isRequired,
  translate: _propTypes2.default.func.isRequired
};

/* eslint-disable react/display-name */
InfiniteHits.defaultProps = {
  hitComponent: function hitComponent(hit) {
    return _react2.default.createElement(
      'div',
      {
        style: {
          borderBottom: '1px solid #bbb',
          paddingBottom: '5px',
          marginBottom: '5px'
        }
      },
      JSON.stringify(hit).slice(0, 100),
      '...'
    );
  }
};
/* eslint-enable react/display-name */

exports.default = (0, _translatable2.default)({
  loadMore: 'Load more'
})(InfiniteHits);