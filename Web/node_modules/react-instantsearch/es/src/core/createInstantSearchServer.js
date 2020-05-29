'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstantSearch = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _algoliasearchHelper = require('algoliasearch-helper');

var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _indexUtils = require('./indexUtils');

var _createInstantSearch = require('./createInstantSearch');

var _createInstantSearch2 = _interopRequireDefault(_createInstantSearch);

var _highlightTags = require('./highlightTags.js');

var _highlightTags2 = _interopRequireDefault(_highlightTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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


var createInstantSearch = function createInstantSearch(algoliasearch) {
  var InstantSearch = (0, _createInstantSearch2.default)(algoliasearch, {
    Root: 'div',
    props: { className: 'ais-InstantSearch__root' }
  });

  var searchParameters = [];
  var client = void 0;
  var indexName = '';

  var onSearchParameters = function onSearchParameters(getSearchParameters, context, props, searchState) {
    var index = (0, _indexUtils.getIndex)(context);
    searchParameters.push({
      getSearchParameters: getSearchParameters,
      context: context,
      props: props,
      searchState: searchState,
      index: index
    });
  };

  var findResultsState = function findResultsState(App, props) {
    searchParameters = [];
    _server2.default.renderToString(_react2.default.createElement(App, props));
    var sharedSearchParameters = searchParameters.filter(function (searchParameter) {
      return !(0, _indexUtils.hasMultipleIndex)(searchParameter.context) && (searchParameter.props.indexName === indexName || !searchParameter.props.indexName);
    }).reduce(function (acc, searchParameter) {
      return searchParameter.getSearchParameters.call({ context: searchParameter.context }, acc, searchParameter.props, searchParameter.searchState);
    }, new _algoliasearchHelper.SearchParameters(_extends({ index: indexName }, _highlightTags2.default)));

    var mergedSearchParameters = searchParameters.filter(function (searchParameter) {
      return (0, _indexUtils.hasMultipleIndex)(searchParameter.context);
    }).reduce(function (acc, searchParameter) {
      var index = (0, _indexUtils.getIndex)(searchParameter.context);
      var sp = searchParameter.getSearchParameters.call({ context: searchParameter.context }, acc[index] ? acc[index] : sharedSearchParameters, searchParameter.props, searchParameter.searchState);
      acc[index] = sp;
      return acc;
    }, {});

    if ((0, _isEmpty3.default)(mergedSearchParameters)) {
      var helper = (0, _algoliasearchHelper2.default)(client, sharedSearchParameters.index);
      return helper.searchOnce(sharedSearchParameters);
    } else {
      var _helper = (0, _algoliasearchHelper2.default)(client, sharedSearchParameters.index);
      var search = [];
      if (mergedSearchParameters[indexName]) {
        search.push(_helper.searchOnce(_extends({}, sharedSearchParameters, mergedSearchParameters[sharedSearchParameters.index], {
          index: mergedSearchParameters[sharedSearchParameters.index].index
        })));
        delete mergedSearchParameters[indexName];
      } else {
        search.push(_helper.searchOnce(sharedSearchParameters));
      }
      search.push.apply(search, _toConsumableArray(Object.keys(mergedSearchParameters).map(function (key) {
        var derivedHelper = (0, _algoliasearchHelper2.default)(client, mergedSearchParameters[key].index);
        return derivedHelper.searchOnce(mergedSearchParameters[key]);
      })));

      return Promise.all(search);
    }
  };

  var decorateResults = function decorateResults(results) {
    if (!results) {
      return undefined;
    }
    return Array.isArray(results) ? results.reduce(function (acc, result) {
      acc[result.state.index] = new _algoliasearchHelper.SearchResults(new _algoliasearchHelper.SearchParameters(result.state), result._originalResponse.results);
      return acc;
    }, []) : new _algoliasearchHelper.SearchResults(new _algoliasearchHelper.SearchParameters(results.state), results._originalResponse.results);
  };

  var CreateInstantSearchServer = function (_Component) {
    _inherits(CreateInstantSearchServer, _Component);

    function CreateInstantSearchServer(props) {
      _classCallCheck(this, CreateInstantSearchServer);

      var _this = _possibleConstructorReturn(this, (CreateInstantSearchServer.__proto__ || Object.getPrototypeOf(CreateInstantSearchServer)).call(this));

      client = props.algoliaClient || algoliasearch(props.appId, props.apiKey);
      client.addAlgoliaAgent('react-instantsearch ' + version);
      indexName = props.indexName;
      return _this;
    }

    _createClass(CreateInstantSearchServer, [{
      key: 'render',
      value: function render() {
        var resultsState = decorateResults(this.props.resultsState);
        return _react2.default.createElement(InstantSearch, _extends({}, this.props, {
          resultsState: resultsState,
          onSearchParameters: onSearchParameters
        }));
      }
    }]);

    return CreateInstantSearchServer;
  }(_react.Component);

  CreateInstantSearchServer.propTypes = {
    algoliaClient: _propTypes2.default.object,
    appId: _propTypes2.default.string,
    apiKey: _propTypes2.default.string,
    indexName: _propTypes2.default.string.isRequired,
    resultsState: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])
  };


  return { InstantSearch: CreateInstantSearchServer, findResultsState: findResultsState };
};

exports.createInstantSearch = createInstantSearch;