'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createInstantSearchManager;

var _algoliasearchHelper = require('algoliasearch-helper');

var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);

var _createWidgetsManager = require('./createWidgetsManager');

var _createWidgetsManager2 = _interopRequireDefault(_createWidgetsManager);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _highlightTags = require('./highlightTags.js');

var _highlightTags2 = _interopRequireDefault(_highlightTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Creates a new instance of the InstantSearchManager which controls the widgets and
 * trigger the search when the widgets are updated.
 * @param {string} indexName - the main index name
 * @param {object} initialState - initial widget state
 * @param {object} SearchParameters - optional additional parameters to send to the algolia API
 * @return {InstantSearchManager} a new instance of InstantSearchManager
 */
function createInstantSearchManager(_ref) {
  var indexName = _ref.indexName,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === undefined ? {} : _ref$initialState,
      algoliaClient = _ref.algoliaClient,
      _ref$searchParameters = _ref.searchParameters,
      searchParameters = _ref$searchParameters === undefined ? {} : _ref$searchParameters,
      resultsState = _ref.resultsState;

  var baseSP = new _algoliasearchHelper.SearchParameters(_extends({}, searchParameters, {
    index: indexName
  }, _highlightTags2.default));

  var helper = (0, _algoliasearchHelper2.default)(algoliaClient, indexName, baseSP);
  helper.on('result', handleSearchSuccess);
  helper.on('error', handleSearchError);

  var derivedHelpers = {};
  var indexMapping = {}; // keep track of the original index where the parameters applied when sortBy is used.

  var initialSearchParameters = helper.state;

  var widgetsManager = (0, _createWidgetsManager2.default)(onWidgetsUpdate);

  var store = (0, _createStore2.default)({
    widgets: initialState,
    metadata: [],
    results: resultsState || null,
    error: null,
    searching: false,
    searchingForFacetValues: false
  });

  var skip = false;

  function skipSearch() {
    skip = true;
  }

  function updateClient(client) {
    helper.setClient(client);
    search();
  }

  function getMetadata(state) {
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getMetadata);
    }).map(function (widget) {
      return widget.getMetadata(state);
    });
  }

  function getSearchParameters() {
    indexMapping = {};
    var sharedParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      return !widget.context.multiIndexContext && (widget.props.indexName === indexName || !widget.props.indexName);
    }).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, initialSearchParameters);
    indexMapping[sharedParameters.index] = indexName;

    var derivatedWidgets = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      return widget.context.multiIndexContext && widget.context.multiIndexContext.targetedIndex !== indexName || widget.props.indexName && widget.props.indexName !== indexName;
    }).reduce(function (indices, widget) {
      var targetedIndex = widget.context.multiIndexContext ? widget.context.multiIndexContext.targetedIndex : widget.props.indexName;
      var index = indices.find(function (i) {
        return i.targetedIndex === targetedIndex;
      });
      if (index) {
        index.widgets.push(widget);
      } else {
        indices.push({ targetedIndex: targetedIndex, widgets: [widget] });
      }
      return indices;
    }, []);

    var mainIndexParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      return widget.context.multiIndexContext && widget.context.multiIndexContext.targetedIndex === indexName || widget.props.indexName && widget.props.indexName === indexName;
    }).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, sharedParameters);

    return { sharedParameters: sharedParameters, mainIndexParameters: mainIndexParameters, derivatedWidgets: derivatedWidgets };
  }

  function search() {
    if (!skip) {
      var _getSearchParameters = getSearchParameters(helper.state),
          sharedParameters = _getSearchParameters.sharedParameters,
          mainIndexParameters = _getSearchParameters.mainIndexParameters,
          derivatedWidgets = _getSearchParameters.derivatedWidgets;

      Object.keys(derivedHelpers).forEach(function (key) {
        return derivedHelpers[key].detach();
      });
      derivedHelpers = {};

      helper.setState(sharedParameters);

      derivatedWidgets.forEach(function (derivatedSearchParameters) {
        var index = derivatedSearchParameters.targetedIndex;
        var derivedHelper = helper.derive(function () {
          var parameters = derivatedSearchParameters.widgets.reduce(function (res, widget) {
            return widget.getSearchParameters(res);
          }, sharedParameters);
          indexMapping[parameters.index] = index;
          return parameters;
        });
        derivedHelper.on('result', handleSearchSuccess);
        derivedHelper.on('error', handleSearchError);
        derivedHelpers[index] = derivedHelper;
      });

      helper.setState(mainIndexParameters);

      helper.search();
    }
  }

  function handleSearchSuccess(content) {
    var state = store.getState();
    var results = state.results ? state.results : {};

    /* if switching from mono index to multi index and vice versa, 
    results needs to reset to {}*/
    results = !(0, _isEmpty3.default)(derivedHelpers) && results.getFacetByName ? {} : results;

    if (!(0, _isEmpty3.default)(derivedHelpers)) {
      results[indexMapping[content.index]] = content;
    } else {
      results = content;
    }

    var nextState = (0, _omit3.default)(_extends({}, store.getState(), {
      results: results,
      searching: false,
      error: null
    }), 'resultsFacetValues');
    store.setState(nextState);
  }

  function handleSearchError(error) {
    var nextState = (0, _omit3.default)(_extends({}, store.getState(), {
      error: error,
      searching: false
    }), 'resultsFacetValues');
    store.setState(nextState);
  }

  // Called whenever a widget has been rendered with new props.
  function onWidgetsUpdate() {
    var metadata = getMetadata(store.getState().widgets);

    store.setState(_extends({}, store.getState(), {
      metadata: metadata,
      searching: true
    }));

    // Since the `getSearchParameters` method of widgets also depends on props,
    // the result search parameters might have changed.
    search();
  }

  function transitionState(nextSearchState) {
    var searchState = store.getState().widgets;
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.transitionState);
    }).reduce(function (res, widget) {
      return widget.transitionState(searchState, res);
    }, nextSearchState);
  }

  function onExternalStateUpdate(nextSearchState) {
    var metadata = getMetadata(nextSearchState);

    store.setState(_extends({}, store.getState(), {
      widgets: nextSearchState,
      metadata: metadata,
      searching: true
    }));

    search();
  }

  function onSearchForFacetValues(nextSearchState) {
    store.setState(_extends({}, store.getState(), {
      searchingForFacetValues: true
    }));

    helper.searchForFacetValues(nextSearchState.facetName, nextSearchState.query).then(function (content) {
      var _extends2;

      store.setState(_extends({}, store.getState(), {
        resultsFacetValues: _extends({}, store.getState().resultsFacetValues, (_extends2 = {}, _defineProperty(_extends2, nextSearchState.facetName, content.facetHits), _defineProperty(_extends2, 'query', nextSearchState.query), _extends2)),
        searchingForFacetValues: false
      }));
    }, function (error) {
      store.setState(_extends({}, store.getState(), {
        error: error,
        searchingForFacetValues: false
      }));
    }).catch(function (error) {
      // Since setState is synchronous, any error that occurs in the render of a
      // component will be swallowed by this promise.
      // This is a trick to make the error show up correctly in the console.
      // See http://stackoverflow.com/a/30741722/969302
      setTimeout(function () {
        throw error;
      });
    });
  }

  function updateIndex(newIndex) {
    initialSearchParameters = initialSearchParameters.setIndex(newIndex);
    search();
  }

  function getWidgetsIds() {
    return store.getState().metadata.reduce(function (res, meta) {
      return typeof meta.id !== 'undefined' ? res.concat(meta.id) : res;
    }, []);
  }

  return {
    store: store,
    widgetsManager: widgetsManager,
    getWidgetsIds: getWidgetsIds,
    onExternalStateUpdate: onExternalStateUpdate,
    transitionState: transitionState,
    onSearchForFacetValues: onSearchForFacetValues,
    updateClient: updateClient,
    updateIndex: updateIndex,
    skipSearch: skipSearch
  };
}