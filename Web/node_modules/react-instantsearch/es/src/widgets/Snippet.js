'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectHighlight = require('../connectors/connectHighlight.js');

var _connectHighlight2 = _interopRequireDefault(_connectHighlight);

var _Snippet = require('../components/Snippet.js');

var _Snippet2 = _interopRequireDefault(_Snippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders any attribute from an hit into its highlighted snippet form when relevant.
 *
 * Read more about it in the [Highlighting results](guide/Highlighting_results.html) guide.
 * @name Snippet
 * @kind widget
 * @requirements To use this widget, the attribute name passed to the `attributeName` prop must be 
 * present in "Attributes to snippet" on the Algolia dashboard or configured as `attributesToSnippet` 
 * via a set settings call to the Algolia API.
 * @propType {string} attributeName - the location of the highlighted snippet attribute in the hit
 * @propType {object} hit - the hit object containing the highlighted snippet attribute
 * @propType {string} [tagName='em'] - the tag to be used for highlighted parts of the attribute
 * @example
 * import React from 'react';
 *
 * import { connectHits, Snippet, InstantSearch } from 'react-instantsearch/dom';
 *
 * const CustomHits = connectHits(({ hits }) =>
 * <div>
 *   {hits.map(hit =>
 *     <p key={hit.objectID}>
 *       <Snippet attributeName="description" hit={hit} />
 *     </p>
 *   )}
 * </div>
 * );
 *
 * export default function App() {
 *  return (
 *    <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <CustomHits />
 *     </InstantSearch>
 *  );
 * }
 */
exports.default = (0, _connectHighlight2.default)(_Snippet2.default);