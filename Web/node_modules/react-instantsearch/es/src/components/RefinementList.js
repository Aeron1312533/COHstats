'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

var _Highlight = require('../widgets/Highlight');

var _Highlight2 = _interopRequireDefault(_Highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('RefinementList');

var RefinementList = function (_Component) {
  _inherits(RefinementList, _Component);

  function RefinementList(props) {
    _classCallCheck(this, RefinementList);

    var _this = _possibleConstructorReturn(this, (RefinementList.__proto__ || Object.getPrototypeOf(RefinementList)).call(this, props));

    _this.selectItem = function (item, resetQuery) {
      resetQuery();
      _this.props.refine(item.value);
    };

    _this.renderItem = function (item, resetQuery) {
      var label = _this.props.isFromSearch ? _react2.default.createElement(_Highlight2.default, { attributeName: 'label', hit: item }) : item.label;

      return _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement('input', _extends({}, cx('itemCheckbox', item.isRefined && 'itemCheckboxSelected'), {
          type: 'checkbox',
          checked: item.isRefined,
          onChange: function onChange() {
            return _this.selectItem(item, resetQuery);
          }
        })),
        _react2.default.createElement('span', cx('itemBox', 'itemBox', item.isRefined && 'itemBoxSelected')),
        _react2.default.createElement(
          'span',
          cx('itemLabel', 'itemLabel', item.isRefined && 'itemLabelSelected'),
          label
        ),
        ' ',
        _react2.default.createElement(
          'span',
          cx('itemCount', item.isRefined && 'itemCountSelected'),
          item.count.toLocaleString()
        )
      );
    };

    _this.state = { query: '' };
    return _this;
  }

  _createClass(RefinementList, [{
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
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_List2.default, _extends({
          renderItem: this.renderItem,
          selectItem: this.selectItem,
          cx: cx
        }, (0, _pick3.default)(this.props, ['translate', 'items', 'showMore', 'limitMin', 'limitMax', 'isFromSearch', 'searchForItems', 'withSearchBox', 'canRefine']), {
          query: this.state.query
        }))
      );
    }
  }]);

  return RefinementList;
}(_react.Component);

RefinementList.propTypes = {
  translate: _propTypes2.default.func.isRequired,
  refine: _propTypes2.default.func.isRequired,
  searchForItems: _propTypes2.default.func.isRequired,
  withSearchBox: _propTypes2.default.bool,
  createURL: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    count: _propTypes2.default.number.isRequired,
    isRefined: _propTypes2.default.bool.isRequired
  })),
  isFromSearch: _propTypes2.default.bool.isRequired,
  canRefine: _propTypes2.default.bool.isRequired,
  showMore: _propTypes2.default.bool,
  limitMin: _propTypes2.default.number,
  limitMax: _propTypes2.default.number,
  transformItems: _propTypes2.default.func
};
RefinementList.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  showMore: function showMore(extended) {
    return extended ? 'Show less' : 'Show more';
  },
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…'
})(RefinementList);