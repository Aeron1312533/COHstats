'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = parseAlgoliaHit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find an highlighted attribute given an `attributeName` and an `highlightProperty`, parses it,
 * and provided an array of objects with the string value and a boolean if this
 * value is highlighted.
 *
 * In order to use this feature, highlight must be activated in the configuration of
 * the index. The `preTag` and `postTag` attributes are respectively highlightPreTag and
 * highligtPostTag in Algolia configuration.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightProperty - the property that contains the highlight structure in the results
 * @param {string} attributeName - the highlighted attribute to look for
 * @param {object} hit - the actual hit returned by Algolia.
 * @return {object[]} - An array of {value: string, isDefined: boolean}.
 */
function parseAlgoliaHit(_ref) {
  var _ref$preTag = _ref.preTag,
      preTag = _ref$preTag === undefined ? '<em>' : _ref$preTag,
      _ref$postTag = _ref.postTag,
      postTag = _ref$postTag === undefined ? '</em>' : _ref$postTag,
      highlightProperty = _ref.highlightProperty,
      attributeName = _ref.attributeName,
      hit = _ref.hit;

  if (!hit) throw new Error('`hit`, the matching record, must be provided');

  var highlightObject = (0, _get3.default)(hit[highlightProperty], attributeName);
  var highlightedValue = !highlightObject ? '' : highlightObject.value;

  return parseHighlightedAttribute({ preTag: preTag, postTag: postTag, highlightedValue: highlightedValue });
}

/**
 * Parses an highlighted attribute into an array of objects with the string value, and
 * a boolean that indicated if this part is highlighted.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightedValue - highlighted attribute as returned by Algolia highlight feature
 * @return {object[]} - An array of {value: string, isDefined: boolean}.
 */
function parseHighlightedAttribute(_ref2) {
  var preTag = _ref2.preTag,
      postTag = _ref2.postTag,
      highlightedValue = _ref2.highlightedValue;

  var splitByPreTag = highlightedValue.split(preTag);
  var firstValue = splitByPreTag.shift();
  var elements = firstValue === '' ? [] : [{ value: firstValue, isHighlighted: false }];

  if (postTag === preTag) {
    var isHighlighted = true;
    splitByPreTag.forEach(function (split) {
      elements.push({ value: split, isHighlighted: isHighlighted });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach(function (split) {
      var splitByPostTag = split.split(postTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false
        });
      }
    });
  }

  return elements;
}