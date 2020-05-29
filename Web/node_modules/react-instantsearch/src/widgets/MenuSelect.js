'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectMenu = require('../connectors/connectMenu.js');

var _connectMenu2 = _interopRequireDefault(_connectMenu);

var _MenuSelect = require('../components/MenuSelect.js');

var _MenuSelect2 = _interopRequireDefault(_MenuSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The MenuSelect component displays a select that lets the user choose a single value for a specific attribute.
 * @name MenuSelect
 * @kind widget
 * @requirements The attribute passed to the `attributeName` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 * @propType {string} attributeName - the name of the attribute in the record
 * @propType {string} [defaultRefinement] - the value of the item selected by default
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @themeKey ais-MenuSelect__select - the <select> DOM element.
 * @themeKey ais-MenuSelect__option - the <option> DOM element for a single item
 * @translationkey seeAllOption - The label of the option to select to remove the refinement
 * @example
 * import React from 'react';
 *
 * import { MenuSelect, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <MenuSelect
 *         attributeName="category"
 *       />
 *     </InstantSearch>
 *   );
 * }
 */
exports.default = (0, _connectMenu2.default)(_MenuSelect2.default);