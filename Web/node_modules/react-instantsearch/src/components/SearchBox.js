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

var _translatable = require('../core/translatable');

var _translatable2 = _interopRequireDefault(_translatable);

var _classNames = require('./classNames.js');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = (0, _classNames2.default)('SearchBox');

var SearchBox = function (_Component) {
  _inherits(SearchBox, _Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this));

    _this.getQuery = function () {
      return _this.props.searchAsYouType ? _this.props.currentRefinement : _this.state.query;
    };

    _this.setQuery = function (val) {
      var _this$props = _this.props,
          refine = _this$props.refine,
          searchAsYouType = _this$props.searchAsYouType;

      if (searchAsYouType) {
        refine(val);
      } else {
        _this.setState({
          query: val
        });
      }
    };

    _this.onInputMount = function (input) {
      _this.input = input;
      if (_this.props.__inputRef) {
        _this.props.__inputRef(input);
      }
    };

    _this.onKeyDown = function (e) {
      if (!_this.props.focusShortcuts) {
        return;
      }

      var shortcuts = _this.props.focusShortcuts.map(function (key) {
        return typeof key === 'string' ? key.toUpperCase().charCodeAt(0) : key;
      });

      var elt = e.target || e.srcElement;
      var tagName = elt.tagName;
      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        // already in an input
        return;
      }

      var which = e.which || e.keyCode;
      if (shortcuts.indexOf(which) === -1) {
        // not the right shortcut
        return;
      }

      _this.input.focus();
      e.stopPropagation();
      e.preventDefault();
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.input.blur();

      var _this$props2 = _this.props,
          refine = _this$props2.refine,
          searchAsYouType = _this$props2.searchAsYouType;

      if (!searchAsYouType) {
        refine(_this.getQuery());
      }
      return false;
    };

    _this.onChange = function (e) {
      _this.setQuery(e.target.value);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this.onReset = function () {
      _this.setQuery('');
      _this.input.focus();

      if (_this.props.onReset) {
        _this.props.onReset();
      }
    };

    _this.state = {
      query: props.searchAsYouType ? null : props.currentRefinement
    };
    return _this;
  }

  _createClass(SearchBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Reset query when the searchParameters query has changed.
      // This is kind of an anti-pattern (props in state), but it works here
      // since we know for sure that searchParameters having changed means a
      // new search has been triggered.
      if (!nextProps.searchAsYouType && nextProps.currentRefinement !== this.props.currentRefinement) {
        this.setState({
          query: nextProps.currentRefinement
        });
      }
    }

    // From https://github.com/algolia/autocomplete.js/pull/86

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          translate = _props.translate,
          autoFocus = _props.autoFocus;

      var query = this.getQuery();

      var submitComponent = this.props.submitComponent ? this.props.submitComponent : _react2.default.createElement(
        'svg',
        { role: 'img', width: '1em', height: '1em' },
        _react2.default.createElement('use', { xlinkHref: '#sbx-icon-search-13' })
      );

      var resetComponent = this.props.resetComponent ? this.props.resetComponent : _react2.default.createElement(
        'svg',
        { role: 'img', width: '1em', height: '1em' },
        _react2.default.createElement('use', { xlinkHref: '#sbx-icon-clear-3' })
      );

      var searchInputEvents = Object.keys(this.props).reduce(function (props, prop) {
        if (['onsubmit', 'onreset', 'onchange'].indexOf(prop.toLowerCase()) === -1 && prop.indexOf('on') === 0) {
          return _extends({}, props, _defineProperty({}, prop, _this2.props[prop]));
        }

        return props;
      }, {});

      /* eslint-disable max-len */
      return _react2.default.createElement(
        'form',
        _extends({
          noValidate: true,
          onSubmit: this.props.onSubmit ? this.props.onSubmit : this.onSubmit,
          onReset: this.onReset
        }, cx('root'), {
          action: '',
          role: 'search'
        }),
        _react2.default.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', style: { display: 'none' } },
          _react2.default.createElement(
            'symbol',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              id: 'sbx-icon-search-13',
              viewBox: '0 0 40 40'
            },
            _react2.default.createElement('path', {
              d: 'M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z',
              fillRule: 'evenodd'
            })
          ),
          _react2.default.createElement(
            'symbol',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              id: 'sbx-icon-clear-3',
              viewBox: '0 0 20 20'
            },
            _react2.default.createElement('path', {
              d: 'M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z',
              fillRule: 'evenodd'
            })
          )
        ),
        _react2.default.createElement(
          'div',
          _extends({ role: 'search' }, cx('wrapper')),
          _react2.default.createElement('input', _extends({
            ref: this.onInputMount,
            type: 'search',
            placeholder: translate('placeholder'),
            autoFocus: autoFocus,
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            required: true,
            maxLength: '512',
            value: query,
            onChange: this.onChange
          }, searchInputEvents, cx('input'))),
          _react2.default.createElement(
            'button',
            _extends({
              type: 'submit',
              title: translate('submitTitle')
            }, cx('submit')),
            submitComponent
          ),
          _react2.default.createElement(
            'button',
            _extends({
              type: 'reset',
              title: translate('resetTitle')
            }, cx('reset'), {
              onClick: this.onReset
            }),
            resetComponent
          )
        )
      );
      /* eslint-enable */
    }
  }]);

  return SearchBox;
}(_react.Component);

SearchBox.propTypes = {
  currentRefinement: _propTypes2.default.string,
  refine: _propTypes2.default.func.isRequired,
  translate: _propTypes2.default.func.isRequired,

  resetComponent: _propTypes2.default.element,
  submitComponent: _propTypes2.default.element,

  focusShortcuts: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  autoFocus: _propTypes2.default.bool,

  searchAsYouType: _propTypes2.default.bool,
  onSubmit: _propTypes2.default.func,
  onReset: _propTypes2.default.func,
  onChange: _propTypes2.default.func,

  // For testing purposes
  __inputRef: _propTypes2.default.func
};
SearchBox.defaultProps = {
  currentRefinement: '',
  focusShortcuts: ['s', '/'],
  autoFocus: false,
  searchAsYouType: true
};
exports.default = (0, _translatable2.default)({
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…'
})(SearchBox);