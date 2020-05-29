'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = undefined;

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

exports.shallowEqual = shallowEqual;
exports.isSpecialClick = isSpecialClick;
exports.capitalize = capitalize;
exports.assertFacetDefined = assertFacetDefined;
exports.getDisplayName = getDisplayName;
exports.removeEmptyKey = removeEmptyKey;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
}

function capitalize(key) {
  return key.length === 0 ? '' : '' + key[0].toUpperCase() + key.slice(1);
}

function assertFacetDefined(searchParameters, searchResults, facet) {
  var wasRequested = searchParameters.isConjunctiveFacet(facet) || searchParameters.isDisjunctiveFacet(facet);
  var wasReceived = Boolean(searchResults.getFacetByName(facet));
  if (searchResults.nbHits > 0 && wasRequested && !wasReceived) {
    // eslint-disable-next-line no-console
    console.warn('A component requested values for facet "' + facet + '", but no facet ' + 'values were retrieved from the API. This means that you should add ' + ('the attribute "' + facet + '" to the list of attributes for faceting in ') + 'your index settings.');
  }
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'UnknownComponent';
}

var resolved = Promise.resolve();
var defer = exports.defer = function defer(f) {
  resolved.then(f);
};

function removeEmptyKey(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    if ((0, _isEmpty3.default)(value) && (0, _isPlainObject3.default)(value)) {
      delete obj[key];
    } else if ((0, _isPlainObject3.default)(value)) {
      removeEmptyKey(value);
    }
  });
  return obj;
}