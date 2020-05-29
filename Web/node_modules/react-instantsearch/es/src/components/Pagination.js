'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../core/utils');

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

var _LinkList = require('./LinkList');

var _LinkList2 = _interopRequireDefault(_LinkList);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('Pagination');

// Determines the size of the widget (the number of pages displayed - that the user can directly click on)
function calculateSize(padding, maxPages) {
  return Math.min(2 * padding + 1, maxPages);
}

function calculatePaddingLeft(currentPage, padding, maxPages, size) {
  if (currentPage <= padding) {
    return currentPage;
  }

  if (currentPage >= maxPages - padding) {
    return size - (maxPages - currentPage);
  }

  return padding + 1;
}

// Retrieve the correct page range to populate the widget
function getPages(currentPage, maxPages, padding) {
  var size = calculateSize(padding, maxPages);
  // If the widget size is equal to the max number of pages, return the entire page range
  if (size === maxPages) return (0, _range3.default)(1, maxPages + 1);

  var paddingLeft = calculatePaddingLeft(currentPage, padding, maxPages, size);
  var paddingRight = size - paddingLeft;

  var first = currentPage - paddingLeft;
  var last = currentPage + paddingRight;
  return (0, _range3.default)(first + 1, last + 1);
}

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
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
    key: 'getItem',
    value: function getItem(modifier, translationKey, value) {
      var _props = this.props,
          nbPages = _props.nbPages,
          maxPages = _props.maxPages,
          translate = _props.translate;

      return {
        key: modifier + '.' + value,
        modifier: modifier,
        disabled: value < 1 || value >= Math.min(maxPages, nbPages),
        label: translate(translationKey, value),
        value: value,
        ariaLabel: translate('aria' + (0, _utils.capitalize)(translationKey), value)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          nbPages = _props2.nbPages,
          maxPages = _props2.maxPages,
          currentRefinement = _props2.currentRefinement,
          pagesPadding = _props2.pagesPadding,
          showFirst = _props2.showFirst,
          showPrevious = _props2.showPrevious,
          showNext = _props2.showNext,
          showLast = _props2.showLast,
          refine = _props2.refine,
          createURL = _props2.createURL,
          translate = _props2.translate,
          ListComponent = _props2.listComponent,
          otherProps = _objectWithoutProperties(_props2, ['nbPages', 'maxPages', 'currentRefinement', 'pagesPadding', 'showFirst', 'showPrevious', 'showNext', 'showLast', 'refine', 'createURL', 'translate', 'listComponent']);

      var totalPages = Math.min(nbPages, maxPages);
      var lastPage = totalPages;

      var items = [];
      if (showFirst) {
        items.push({
          key: 'first',
          modifier: 'itemFirst',
          disabled: currentRefinement === 1,
          label: translate('first'),
          value: 1,
          ariaLabel: translate('ariaFirst')
        });
      }
      if (showPrevious) {
        items.push({
          key: 'previous',
          modifier: 'itemPrevious',
          disabled: currentRefinement === 1,
          label: translate('previous'),
          value: currentRefinement - 1,
          ariaLabel: translate('ariaPrevious')
        });
      }

      items = items.concat(getPages(currentRefinement, totalPages, pagesPadding).map(function (value) {
        return {
          key: value,
          modifier: 'itemPage',
          label: translate('page', value),
          value: value,
          selected: value === currentRefinement,
          ariaLabel: translate('ariaPage', value)
        };
      }));
      if (showNext) {
        items.push({
          key: 'next',
          modifier: 'itemNext',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('next'),
          value: currentRefinement + 1,
          ariaLabel: translate('ariaNext')
        });
      }
      if (showLast) {
        items.push({
          key: 'last',
          modifier: 'itemLast',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('last'),
          value: lastPage,
          ariaLabel: translate('ariaLast')
        });
      }

      return _react2.default.createElement(ListComponent, _extends({}, otherProps, {
        cx: cx,
        items: items,
        onSelect: refine,
        createURL: createURL
      }));
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  nbPages: _propTypes2.default.number.isRequired,
  currentRefinement: _propTypes2.default.number.isRequired,
  refine: _propTypes2.default.func.isRequired,
  createURL: _propTypes2.default.func.isRequired,
  canRefine: _propTypes2.default.bool.isRequired,

  translate: _propTypes2.default.func.isRequired,
  listComponent: _propTypes2.default.func,

  showFirst: _propTypes2.default.bool,
  showPrevious: _propTypes2.default.bool,
  showNext: _propTypes2.default.bool,
  showLast: _propTypes2.default.bool,
  pagesPadding: _propTypes2.default.number,
  maxPages: _propTypes2.default.number
};
Pagination.defaultProps = {
  listComponent: _LinkList2.default,
  showFirst: true,
  showPrevious: true,
  showNext: true,
  showLast: false,
  pagesPadding: 3,
  maxPages: Infinity
};
Pagination.contextTypes = {
  canRefine: _propTypes2.default.func
};
exports.default = (0, _translatable2.default)({
  previous: '‹',
  next: '›',
  first: '«',
  last: '»',
  page: function page(currentRefinement) {
    return currentRefinement.toString();
  },
  ariaPrevious: 'Previous page',
  ariaNext: 'Next page',
  ariaFirst: 'First page',
  ariaLast: 'Last page',
  ariaPage: function ariaPage(currentRefinement) {
    return 'Page ' + currentRefinement.toString();
  }
})(Pagination);