'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite3 = require('lodash/isFinite');

var _isFinite4 = _interopRequireDefault(_isFinite3);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _indexUtils = require('../core/indexUtils');

var _createConnector = require('../core/createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * connectRange connector provides the logic to create connected
 * components that will give the ability for a user to refine results using
 * a numeric range.
 * @name connectRange
 * @kind connector
 * @requirements The attribute passed to the `attributeName` prop must be holding numerical values.
 * @propType {string} attributeName - Name of the attribute for faceting
 * @propType {{min: number, max: number}} [defaultRefinement] - Default searchState of the widget containing the start and the end of the range.
 * @propType {number} [min] - Minimum value. When this isn't set, the minimum value will be automatically computed by Algolia using the data in the index.
 * @propType {number} [max] - Maximum value. When this isn't set, the maximum value will be automatically computed by Algolia using the data in the index.
 * @propType {number} [precision=2] - Number of digits after decimal point to use.
 * @providedPropType {function} refine - a function to select a range.
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 */

function getId(props) {
  return props.attributeName;
}

var namespace = 'range';

function getCurrentRange(boundaries, stats, precision) {
  var pow = Math.pow(10, precision);

  var min = void 0;
  if ((0, _isFinite4.default)(boundaries.min)) {
    min = boundaries.min;
  } else if ((0, _isFinite4.default)(stats.min)) {
    min = stats.min;
  } else {
    min = undefined;
  }

  var max = void 0;
  if ((0, _isFinite4.default)(boundaries.max)) {
    max = boundaries.max;
  } else if ((0, _isFinite4.default)(stats.max)) {
    max = stats.max;
  } else {
    max = undefined;
  }

  return {
    min: min !== undefined ? Math.floor(min * pow) / pow : min,
    max: max !== undefined ? Math.ceil(max * pow) / pow : max
  };
}

function getCurrentRefinement(props, searchState, currentRange, context) {
  var refinement = (0, _indexUtils.getCurrentRefinementValue)(props, searchState, context, namespace + '.' + getId(props), {}, function (currentRefinement) {
    var min = currentRefinement.min,
        max = currentRefinement.max;

    if (typeof min === 'string') {
      min = parseInt(min, 10);
    }
    if (typeof max === 'string') {
      max = parseInt(max, 10);
    }
    return { min: min, max: max };
  });

  var hasMinBound = props.min !== undefined;
  var hasMaxBound = props.max !== undefined;

  var hasMinRefinment = refinement.min !== undefined;
  var hasMaxRefinment = refinement.max !== undefined;

  if (hasMinBound && hasMinRefinment && refinement.min < currentRange.min) {
    throw Error("You can't provide min value lower than range.");
  }

  if (hasMaxBound && hasMaxRefinment && refinement.max > currentRange.max) {
    throw Error("You can't provide max value greater than range.");
  }

  if (hasMinBound && !hasMinRefinment) {
    refinement.min = currentRange.min;
  }

  if (hasMaxBound && !hasMaxRefinment) {
    refinement.max = currentRange.max;
  }

  return refinement;
}

function nextValueForRefinement(hasBound, isReset, range, value) {
  var next = void 0;
  if (!hasBound && range === value) {
    next = undefined;
  } else if (hasBound && isReset) {
    next = range;
  } else {
    next = value;
  }

  return next;
}

function _refine(props, searchState, nextRefinement, currentRange, context) {
  var nextMin = nextRefinement.min,
      nextMax = nextRefinement.max;
  var currentMinRange = currentRange.min,
      currentMaxRange = currentRange.max;


  var isMinReset = nextMin === undefined || nextMin === '';
  var isMaxReset = nextMax === undefined || nextMax === '';

  var nextMinAsNumber = !isMinReset ? parseFloat(nextMin) : undefined;
  var nextMaxAsNumber = !isMaxReset ? parseFloat(nextMax) : undefined;

  var isNextMinValid = isMinReset || (0, _isFinite4.default)(nextMinAsNumber);
  var isNextMaxValid = isMaxReset || (0, _isFinite4.default)(nextMaxAsNumber);

  if (!isNextMinValid || !isNextMaxValid) {
    throw Error("You can't provide non finite values to the range connector.");
  }

  if (nextMinAsNumber < currentMinRange) {
    throw Error("You can't provide min value lower than range.");
  }

  if (nextMaxAsNumber > currentMaxRange) {
    throw Error("You can't provide max value greater than range.");
  }

  var id = getId(props);
  var resetPage = true;
  var nextValue = _defineProperty({}, id, {
    min: nextValueForRefinement(props.min !== undefined, isMinReset, currentMinRange, nextMinAsNumber),
    max: nextValueForRefinement(props.max !== undefined, isMaxReset, currentMaxRange, nextMaxAsNumber)
  });

  return (0, _indexUtils.refineValue)(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return (0, _indexUtils.cleanUpValue)(searchState, context, namespace + '.' + getId(props));
}

exports.default = (0, _createConnector2.default)({
  displayName: 'AlgoliaRange',

  propTypes: {
    id: _propTypes2.default.string,
    attributeName: _propTypes2.default.string.isRequired,
    defaultRefinement: _propTypes2.default.shape({
      min: _propTypes2.default.number.isRequired,
      max: _propTypes2.default.number.isRequired
    }),
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    precision: _propTypes2.default.number
  },

  defaultProps: {
    precision: 2
  },

  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var attributeName = props.attributeName,
        precision = props.precision,
        minBound = props.min,
        maxBound = props.max;

    var results = (0, _indexUtils.getResults)(searchResults, this.context);
    var stats = results ? results.getFacetStats(attributeName) || {} : {};
    var count = results ? results.getFacetValues(attributeName).map(function (v) {
      return {
        value: v.name,
        count: v.count
      };
    }) : [];

    var _getCurrentRange = getCurrentRange({ min: minBound, max: maxBound }, stats, precision),
        rangeMin = _getCurrentRange.min,
        rangeMax = _getCurrentRange.max;

    // The searchState is not always in sync with the helper state. For example
    // when we set boundaries on the first render the searchState don't have
    // the correct refinement. If this behaviour change in the upcoming version
    // we could store the range inside the searchState instead of rely on `this`.


    this._currentRange = {
      min: rangeMin,
      max: rangeMax
    };

    var _getCurrentRefinement = getCurrentRefinement(props, searchState, this._currentRange, this.context),
        valueMin = _getCurrentRefinement.min,
        valueMax = _getCurrentRefinement.max;

    return {
      min: rangeMin,
      max: rangeMax,
      canRefine: count.length > 0,
      currentRefinement: {
        min: valueMin === undefined ? rangeMin : valueMin,
        max: valueMax === undefined ? rangeMax : valueMax
      },
      count: count,
      precision: precision
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this._currentRange, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },
  getSearchParameters: function getSearchParameters(params, props, searchState) {
    var attributeName = props.attributeName;

    var _getCurrentRefinement2 = getCurrentRefinement(props, searchState, this._currentRange, this.context),
        min = _getCurrentRefinement2.min,
        max = _getCurrentRefinement2.max;

    params = params.addDisjunctiveFacet(attributeName);

    if (min !== undefined) {
      params = params.addNumericRefinement(attributeName, '>=', min);
    }

    if (max !== undefined) {
      params = params.addNumericRefinement(attributeName, '<=', max);
    }

    return params;
  },
  getMetadata: function getMetadata(props, searchState) {
    var _this = this;

    var _currentRange = this._currentRange,
        minRange = _currentRange.min,
        maxRange = _currentRange.max;

    var _getCurrentRefinement3 = getCurrentRefinement(props, searchState, this._currentRange, this.context),
        minValue = _getCurrentRefinement3.min,
        maxValue = _getCurrentRefinement3.max;

    var items = [];
    var hasMin = minValue !== undefined;
    var hasMax = maxValue !== undefined;
    var shouldDisplayMinLabel = hasMin && minValue !== minRange;
    var shouldDisplayMaxLabel = hasMax && maxValue !== maxRange;

    if (shouldDisplayMinLabel || shouldDisplayMaxLabel) {
      var fragments = [hasMin ? minValue + ' <= ' : '', props.attributeName, hasMax ? ' <= ' + maxValue : ''];

      items.push({
        label: fragments.join(''),
        attributeName: props.attributeName,
        value: function value(nextState) {
          return _refine(props, nextState, {}, _this._currentRange, _this.context);
        },
        currentRefinement: {
          min: minValue,
          max: maxValue
        }
      });
    }

    return {
      id: getId(props),
      index: (0, _indexUtils.getIndex)(this.context),
      items: items
    };
  }
});