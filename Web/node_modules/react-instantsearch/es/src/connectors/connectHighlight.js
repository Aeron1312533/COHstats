'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createConnector = require('../core/createConnector');

var _createConnector2 = _interopRequireDefault(_createConnector);

var _highlight = require('../core/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _highlightTags = require('../core/highlightTags.js');

var _highlightTags2 = _interopRequireDefault(_highlightTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var highlight = function highlight(_ref) {
  var attributeName = _ref.attributeName,
      hit = _ref.hit,
      highlightProperty = _ref.highlightProperty;
  return (0, _highlight2.default)({
    attributeName: attributeName,
    hit: hit,
    preTag: _highlightTags2.default.highlightPreTag,
    postTag: _highlightTags2.default.highlightPostTag,
    highlightProperty: highlightProperty
  });
};

/**
 * connectHighlight connector provides the logic to create an highlighter
 * component that will retrieve, parse and render an highlighted attribute
 * from an Algolia hit.
 * @name connectHighlight
 * @kind connector
 * @category connector
 * @providedPropType {function} highlight - the function to retrieve and parse an attribute from a hit. It takes a configuration object with 3 attribute: `highlightProperty` which is the property that contains the highlight structure from the records, `attributeName` which is the name of the attribute to look for and `hit` which is the hit from Algolia. It returns an array of object `{value: string, isHighlighted: boolean}`.
 * @example
* import React from 'react';
* import { connectHighlight } from 'react-instantsearch/connectors';
* import { InstantSearch, Hits } from 'react-instantsearch/dom';
* 
* const CustomHighlight = connectHighlight(
*   ({ highlight, attributeName, hit, highlightProperty }) => {
*     const parsedHit = highlight({ attributeName, hit, highlightProperty: '_highlightResult' });
*     const highlightedHits = parsedHit.map(part => {
*       if (part.isHighlighted) return <mark>{part.value}</mark>;
*       return part.value;
*     });
*     return <div>{highlightedHits}</div>;
*   }
* );
* 
* const Hit = ({hit}) =>
* <p>
*   <CustomHighlight attributeName="description" hit={hit} />
* </p>;
* 
* export default function App() {
*   return (
*     <InstantSearch
*        appId="latency"
*        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
*        indexName="ikea">
*       <Hits hitComponent={Hit} />
*     </InstantSearch>
*   );
* }
*/
exports.default = (0, _createConnector2.default)({
  displayName: 'AlgoliaHighlighter',

  propTypes: {},

  getProvidedProps: function getProvidedProps() {
    return { highlight: highlight };
  }
});