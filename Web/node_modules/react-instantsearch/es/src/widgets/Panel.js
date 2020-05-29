'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Panel = require('../components/Panel.js');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Panel widget wraps other widgets in a consistent panel design.
 *
 * It also reacts, indicates and set CSS classes when widgets are no more
 * relevant for refining. E.g. when a RefinementList becomes empty because of
 * the current search results.
 * @name Panel
 * @kind widget
 * @propType {string} title - The panel title
 * @themeKey ais-Panel__root - Container of the widget
 * @themeKey ais-Panel__title - The panel title
 * @themeKey ais-Panel__noRefinement - Present if the panel content is empty
 * @example
 * import React from 'react';
 * 
 * import { Panel, RefinementList, InstantSearch } from 'react-instantsearch/dom';
 * 
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Panel title="category">
 *         <RefinementList attributeName="category" />
 *       </Panel>
 *     </InstantSearch>
 *   );
 * }
 */
exports.default = _Panel2.default;