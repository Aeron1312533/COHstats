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

var _SearchBox = require('../components/SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var itemsPropType = _propTypes2.default.arrayOf(_propTypes2.default.shape({
  value: _propTypes2.default.any,
  label: _propTypes2.default.node.isRequired,
  items: function items() {
    return itemsPropType.apply(undefined, arguments);
  }
}));

var List = function (_Component) {
  _inherits(List, _Component);

  function List() {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

    _this.onShowMoreClick = function () {
      _this.setState(function (state) {
        return {
          extended: !state.extended
        };
      });
    };

    _this.getLimit = function () {
      var _this$props = _this.props,
          limitMin = _this$props.limitMin,
          limitMax = _this$props.limitMax;
      var extended = _this.state.extended;

      return extended ? limitMax : limitMin;
    };

    _this.resetQuery = function () {
      _this.setState({ query: '' });
    };

    _this.renderItem = function (item, resetQuery) {
      var items = item.items && _react2.default.createElement(
        'div',
        _this.props.cx('itemItems'),
        item.items.slice(0, _this.getLimit()).map(function (child) {
          return _this.renderItem(child, item);
        })
      );

      return _react2.default.createElement(
        'div',
        _extends({
          key: item.key || item.label
        }, _this.props.cx('item', item.isRefined && 'itemSelected', item.noRefinement && 'itemNoRefinement', items && 'itemParent', items && item.isRefined && 'itemSelectedParent')),
        _this.props.renderItem(item, resetQuery),
        items
      );
    };

    _this.state = {
      extended: false,
      query: ''
    };
    return _this;
  }

  _createClass(List, [{
    key: 'renderShowMore',
    value: function renderShowMore() {
      var _props = this.props,
          showMore = _props.showMore,
          translate = _props.translate,
          cx = _props.cx;
      var extended = this.state.extended;

      var disabled = this.props.limitMin >= this.props.items.length;
      if (!showMore) {
        return null;
      }

      return _react2.default.createElement(
        'button',
        _extends({
          disabled: disabled
        }, cx('showMore', disabled && 'showMoreDisabled'), {
          onClick: this.onShowMoreClick
        }),
        translate('showMore', extended)
      );
    }
  }, {
    key: 'renderSearchBox',
    value: function renderSearchBox() {
      var _this2 = this;

      var _props2 = this.props,
          cx = _props2.cx,
          searchForItems = _props2.searchForItems,
          isFromSearch = _props2.isFromSearch,
          translate = _props2.translate,
          items = _props2.items,
          selectItem = _props2.selectItem;


      var noResults = items.length === 0 && this.state.query !== '' ? _react2.default.createElement(
        'div',
        cx('noResults'),
        translate('noResults')
      ) : null;
      return _react2.default.createElement(
        'div',
        cx('SearchBox'),
        _react2.default.createElement(_SearchBox2.default, {
          currentRefinement: this.state.query,
          refine: function refine(value) {
            _this2.setState({ query: value });
            searchForItems(value);
          },
          focusShortcuts: [],
          translate: translate,
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            e.stopPropagation();
            if (isFromSearch) {
              selectItem(items[0], _this2.resetQuery);
            }
          }
        }),
        noResults
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          cx = _props3.cx,
          items = _props3.items,
          withSearchBox = _props3.withSearchBox,
          canRefine = _props3.canRefine;

      var searchBox = withSearchBox ? this.renderSearchBox() : null;
      if (items.length === 0) {
        return _react2.default.createElement(
          'div',
          cx('root', !canRefine && 'noRefinement'),
          searchBox
        );
      }

      // Always limit the number of items we show on screen, since the actual
      // number of retrieved items might vary with the `maxValuesPerFacet` config
      // option.
      var limit = this.getLimit();
      return _react2.default.createElement(
        'div',
        cx('root', !this.props.canRefine && 'noRefinement'),
        searchBox,
        _react2.default.createElement(
          'div',
          cx('items'),
          items.slice(0, limit).map(function (item) {
            return _this3.renderItem(item, _this3.resetQuery);
          })
        ),
        this.renderShowMore()
      );
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  cx: _propTypes2.default.func.isRequired,
  // Only required with showMore.
  translate: _propTypes2.default.func,
  items: itemsPropType,
  renderItem: _propTypes2.default.func.isRequired,
  selectItem: _propTypes2.default.func,
  showMore: _propTypes2.default.bool,
  limitMin: _propTypes2.default.number,
  limitMax: _propTypes2.default.number,
  limit: _propTypes2.default.number,
  show: _propTypes2.default.func,
  searchForItems: _propTypes2.default.func,
  withSearchBox: _propTypes2.default.bool,
  isFromSearch: _propTypes2.default.bool,
  canRefine: _propTypes2.default.bool
};
List.defaultProps = {
  isFromSearch: false
};
exports.default = List;