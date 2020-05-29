'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createInstantSearch;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InstantSearch = require('./InstantSearch');

var _InstantSearch2 = _interopRequireDefault(_InstantSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _name$author$main$mod = {
  name: 'react-instantsearch',
  author: {
    name: 'Algolia, Inc.',
    url: 'https://www.algolia.com'
  },
  main: 'index.js',
  module: 'es/index.js',
  description: '\u26A1 Lightning-fast search for React and React Native apps, by Algolia',
  keywords: ['react', 'search', 'fast', 'algolia', 'instantsearch', 'components', 'react-native'],
  version: '4.2.0',
  scripts: {
    build: './scripts/build.sh',
    'build-and-publish': './scripts/build-and-publish.sh'
  },
  homepage: 'https://community.algolia.com/react-instantsearch/',
  repository: {
    type: 'git',
    url: 'https://github.com/algolia/react-instantsearch/'
  },
  dependencies: {
    algoliasearch: '^3.24.0',
    'algoliasearch-helper': '^2.21.0',
    classnames: '^2.2.5',
    lodash: '^4.17.4',
    'prop-types': '^15.5.10'
  },
  license: 'MIT',
  devDependencies: {
    enzyme: '3.1.0',
    'enzyme-adapter-react-16': '1.0.2',
    react: '16.0.0',
    'react-dom': '16.0.0',
    'react-native': '0.46.4',
    'react-test-renderer': '16.0.0'
  }
},
    version = _name$author$main$mod.version;

/**
 * Creates a specialized root InstantSearch component. It accepts
 * an algolia client and a specification of the root Element.
 * @param {function} defaultAlgoliaClient - a function that builds an Algolia client
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */

function createInstantSearch(defaultAlgoliaClient, root) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(CreateInstantSearch, _Component);

    function CreateInstantSearch(props) {
      _classCallCheck(this, CreateInstantSearch);

      var _this = _possibleConstructorReturn(this, (CreateInstantSearch.__proto__ || Object.getPrototypeOf(CreateInstantSearch)).call(this));

      _this.client = props.algoliaClient || defaultAlgoliaClient(props.appId, props.apiKey);
      _this.client.addAlgoliaAgent('react-instantsearch ' + version);
      return _this;
    }

    _createClass(CreateInstantSearch, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var props = this.props;
        if (nextProps.algoliaClient) {
          this.client = nextProps.algoliaClient;
        } else if (props.appId !== nextProps.appId || props.apiKey !== nextProps.apiKey) {
          this.client = defaultAlgoliaClient(nextProps.appId, nextProps.apiKey);
        }
        this.client.addAlgoliaAgent('react-instantsearch ' + version);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _InstantSearch2.default,
          {
            createURL: this.props.createURL,
            indexName: this.props.indexName,
            searchParameters: this.props.searchParameters,
            searchState: this.props.searchState,
            onSearchStateChange: this.props.onSearchStateChange,
            onSearchParameters: this.props.onSearchParameters,
            root: root,
            algoliaClient: this.client,
            resultsState: this.props.resultsState
          },
          this.props.children
        );
      }
    }]);

    return CreateInstantSearch;
  }(_react.Component), _class.propTypes = {
    algoliaClient: _propTypes2.default.object,
    appId: _propTypes2.default.string,
    apiKey: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    indexName: _propTypes2.default.string.isRequired,
    searchParameters: _propTypes2.default.object,
    createURL: _propTypes2.default.func,
    searchState: _propTypes2.default.object,
    onSearchStateChange: _propTypes2.default.func,
    onSearchParameters: _propTypes2.default.func,
    resultsState: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])
  }, _temp;
}