'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _indexUtils = require('../core/indexUtils');

var _createConnector = require('../core/createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var namespace = 'refinementList';

function getId(props) {
  return props.attributeName;
}

function getCurrentRefinement(props, searchState, context) {
  return (0, _indexUtils.getCurrentRefinementValue)(props, searchState, context, namespace + '.' + getId(props), [], function (currentRefinement) {
    if (typeof currentRefinement === 'string') {
      // All items were unselected
      if (currentRefinement === '') {
        return [];
      }

      // Only one item was in the searchState but we know it should be an array
      return [currentRefinement];
    }
    return currentRefinement;
  });
}

function getValue(name, props, searchState, context) {
  var currentRefinement = getCurrentRefinement(props, searchState, context);
  var isAnewValue = currentRefinement.indexOf(name) === -1;
  var nextRefinement = isAnewValue ? currentRefinement.concat([name]) // cannot use .push(), it mutates
  : currentRefinement.filter(function (selectedValue) {
    return selectedValue !== name;
  }); // cannot use .splice(), it mutates
  return nextRefinement;
}

function _refine(props, searchState, nextRefinement, context) {
  var id = getId(props);
  // Setting the value to an empty string ensures that it is persisted in
  // the URL as an empty value.
  // This is necessary in the case where `defaultRefinement` contains one
  // item and we try to deselect it. `nextSelected` would be an empty array,
  // which would not be persisted to the URL.
  // {foo: ['bar']} => "foo[0]=bar"
  // {foo: []} => ""
  var nextValue = _defineProperty({}, id, nextRefinement.length > 0 ? nextRefinement : '');
  var resetPage = true;
  return (0, _indexUtils.refineValue)(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return (0, _indexUtils.cleanUpValue)(searchState, context, namespace + '.' + getId(props));
}
/**
 * connectRefinementList connector provides the logic to build a widget that will
 * give the user the ability to choose multiple values for a specific facet.
 * @name connectRefinementList
 * @kind connector
 * @requirements The attribute passed to the `attributeName` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 * @propType {string} attributeName - the name of the attribute in the record
 * @propType {boolean} [withSearchBox=false] - allow search inside values
 * @propType {string} [operator=or] - How to apply the refinements. Possible values: 'or' or 'and'.
 * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
 * @propType {number} [limitMin=10] - the minimum number of displayed items
 * @propType {number} [limitMax=20] - the maximun number of displayed items. Only used when showMore is set to `true`
 * @propType {string[]} defaultRefinement - the values of the items selected by default. The searchState of this widget takes the form of a list of `string`s, which correspond to the values of all selected refinements. However, when there are no refinements selected, the value of the searchState is an empty string.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string[]} currentRefinement - the refinement currently applied
 * @providedPropType {array.<{count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the RefinementList can display.
 * @providedPropType {function} searchForItems - a function to toggle a search inside items values
 * @providedPropType {boolean} isFromSearch - a boolean that says if the `items` props contains facet values from the global search or from the search inside items.
 */

var sortBy = ['isRefined', 'count:desc', 'name:asc'];
exports.default = (0, _createConnector2.default)({
  displayName: 'AlgoliaRefinementList',

  propTypes: {
    id: _propTypes2.default.string,
    attributeName: _propTypes2.default.string.isRequired,
    operator: _propTypes2.default.oneOf(['and', 'or']),
    showMore: _propTypes2.default.bool,
    limitMin: _propTypes2.default.number,
    limitMax: _propTypes2.default.number,
    defaultRefinement: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
    withSearchBox: _propTypes2.default.bool,
    searchForFacetValues: _propTypes2.default.bool, // @deprecated
    transformItems: _propTypes2.default.func
  },

  defaultProps: {
    operator: 'or',
    showMore: false,
    limitMin: 10,
    limitMax: 20
  },

  getProvidedProps: function getProvidedProps(props, searchState, searchResults, metadata, searchForFacetValuesResults) {
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
        canRefine: canRefine,
        isFromSearch: isFromSearch,
        withSearchBox: withSearchBox
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

    var transformedItems = props.transformItems ? props.transformItems(items) : items;

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
        operator = props.operator,
        showMore = props.showMore,
        limitMin = props.limitMin,
        limitMax = props.limitMax;

    var limit = showMore ? limitMax : limitMin;

    var addKey = operator === 'and' ? 'addFacet' : 'addDisjunctiveFacet';
    var addRefinementKey = addKey + 'Refinement';

    searchParameters = searchParameters.setQueryParameters({
      maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, limit)
    });

    searchParameters = searchParameters[addKey](attributeName);

    return getCurrentRefinement(props, searchState, this.context).reduce(function (res, val) {
      return res[addRefinementKey](attributeName, val);
    }, searchParameters);
  },
  getMetadata: function getMetadata(props, searchState) {
    var id = getId(props);
    var context = this.context;
    return {
      id: id,
      index: (0, _indexUtils.getIndex)(this.context),
      items: getCurrentRefinement(props, searchState, context).length > 0 ? [{
        attributeName: props.attributeName,
        label: props.attributeName + ': ',
        currentRefinement: getCurrentRefinement(props, searchState, context),
        value: function value(nextState) {
          return _refine(props, nextState, [], context);
        },
        items: getCurrentRefinement(props, searchState, context).map(function (item) {
          return {
            label: '' + item,
            value: function value(nextState) {
              var nextSelectedItems = getCurrentRefinement(props, nextState, context).filter(function (other) {
                return other !== item;
              });
              return _refine(props, searchState, nextSelectedItems, context);
            }
          };
        })
      }] : []
    };
  }
});