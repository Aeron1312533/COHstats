'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderBy2 = require('lodash/orderBy');

var _orderBy3 = _interopRequireDefault(_orderBy2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createConnector = require('../core/createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

var _indexUtils = require('../core/indexUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var namespace = 'menu';

function getId(props) {
  return props.attributeName;
}

function getCurrentRefinement(props, searchState, context) {
  return (0, _indexUtils.getCurrentRefinementValue)(props, searchState, context, namespace + '.' + getId(props), null, function (currentRefinement) {
    if (currentRefinement === '') {
      return null;
    }
    return currentRefinement;
  });
}

function getValue(name, props, searchState, context) {
  var currentRefinement = getCurrentRefinement(props, searchState, context);
  return name === currentRefinement ? '' : name;
}

function _refine(props, searchState, nextRefinement, context) {
  var id = getId(props);
  var nextValue = _defineProperty({}, id, nextRefinement ? nextRefinement : '');
  var resetPage = true;
  return (0, _indexUtils.refineValue)(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return (0, _indexUtils.cleanUpValue)(searchState, context, namespace + '.' + getId(props));
}

var sortBy = ['count:desc', 'name:asc'];

/**
 * connectMenu connector provides the logic to build a widget that will
 * give the user the ability to choose a single value for a specific facet.
 * @name connectMenu
 * @requirements The attribute passed to the `attributeName` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 * @kind connector
 * @propType {string} attributeName - the name of the attribute in the record
 * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
 * @propType {number} [limitMin=10] - the minimum number of diplayed items
 * @propType {number} [limitMax=20] - the maximun number of displayed items. Only used when showMore is set to `true`
 * @propType {string} [defaultRefinement] - the value of the item selected by default
 * @propType {boolean} [withSearchBox=false] - allow search inside values
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 * @providedPropType {array.<{count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the Menu can display.
 * @providedPropType {function} searchForItems - a function to toggle a search inside items values
 * @providedPropType {boolean} isFromSearch - a boolean that says if the `items` props contains facet values from the global search or from the search inside items.
 */
exports.default = (0, _createConnector2.default)({
  displayName: 'AlgoliaMenu',

  propTypes: {
    attributeName: _propTypes2.default.string.isRequired,
    showMore: _propTypes2.default.bool,
    limitMin: _propTypes2.default.number,
    limitMax: _propTypes2.default.number,
    defaultRefinement: _propTypes2.default.string,
    transformItems: _propTypes2.default.func,
    withSearchBox: _propTypes2.default.bool,
    searchForFacetValues: _propTypes2.default.bool // @deprecated
  },

  defaultProps: {
    showMore: false,
    limitMin: 10,
    limitMax: 20
  },

  getProvidedProps: function getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    var _this = this;

    var attributeName = props.attributeName,
        showMore = props.showMore,
        limitMin = props.limitMin,
        limitMax = props.limitMax;

    var limit = showMore ? limitMax : limitMin;
    var results = (0, _indexUtils.getResults)(searchResults, this.context);

    var canRefine = Boolean(results) && Boolean(results.getFacetByName(attributeName));

    var isFromSearch = Boolean(searchForFacetValuesResults && searchForFacetValuesResults[attributeName] && searchForFacetValuesResults.query !== '');
    var withSearchBox = props.withSearchBox || props.searchForFacetValues;
    if (process.env.NODE_ENV === 'development' && props.searchForFacetValues) {
      // eslint-disable-next-line no-console
      console.warn('react-instantsearch: `searchForFacetValues` has been renamed to' + '`withSearchBox`, this will break in the next major version.');
    }
    // Search For Facet Values is not available with derived helper (used for multi index search)
    if (props.withSearchBox && this.context.multiIndexContext) {
      throw new Error('react-instantsearch: searching in *List is not available when used inside a' + ' multi index context');
    }

    if (!canRefine) {
      return {
        items: [],
        currentRefinement: getCurrentRefinement(props, searchState, this.context),
        isFromSearch: isFromSearch,
        withSearchBox: withSearchBox,
        canRefine: canRefine
      };
    }

    var items = isFromSearch ? searchForFacetValuesResults[attributeName].map(function (v) {
      return {
        label: v.value,
        value: getValue(v.value, props, searchState, _this.context),
        _highlightResult: { label: { value: v.highlighted } },
        count: v.count,
        isRefined: v.isRefined
      };
    }) : results.getFacetValues(attributeName, { sortBy: sortBy }).map(function (v) {
      return {
        label: v.name,
        value: getValue(v.name, props, searchState, _this.context),
        count: v.count,
        isRefined: v.isRefined
      };
    });

    var sortedItems = withSearchBox && !isFromSearch ? (0, _orderBy3.default)(items, ['isRefined', 'count', 'label'], ['desc', 'desc', 'asc']) : items;
    var transformedItems = props.transformItems ? props.transformItems(sortedItems) : sortedItems;
    return {
      items: transformedItems.slice(0, limit),
      currentRefinement: getCurrentRefinement(props, searchState, this.context),
      isFromSearch: isFromSearch,
      withSearchBox: withSearchBox,
      canRefine: items.length > 0
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this.context);
  },
  searchForFacetValues: function searchForFacetValues(props, searchState, nextRefinement) {
    return { facetName: props.attributeName, query: nextRefinement };
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    var attributeName = props.attributeName,
        showMore = props.showMore,
        limitMin = props.limitMin,
        limitMax = props.limitMax;

    var limit = showMore ? limitMax : limitMin;

    searchParameters = searchParameters.setQueryParameters({
      maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, limit)
    });

    searchParameters = searchParameters.addDisjunctiveFacet(attributeName);

    var currentRefinement = getCurrentRefinement(props, searchState, this.context);
    if (currentRefinement !== null) {
      searchParameters = searchParameters.addDisjunctiveFacetRefinement(attributeName, currentRefinement);
    }

    return searchParameters;
  },
  getMetadata: function getMetadata(props, searchState) {
    var _this2 = this;

    var id = getId(props);
    var currentRefinement = getCurrentRefinement(props, searchState, this.context);
    return {
      id: id,
      index: (0, _indexUtils.getIndex)(this.context),
      items: currentRefinement === null ? [] : [{
        label: props.attributeName + ': ' + currentRefinement,
        attributeName: props.attributeName,
        value: function value(nextState) {
          return _refine(props, nextState, '', _this2.context);
        },
        currentRefinement: currentRefinement
      }]
    };
  }
});