'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumb = exports.Panel = exports.Toggle = exports.Stats = exports.SortBy = exports.SearchBox = exports.ScrollTo = exports.ClearAll = exports.RefinementList = exports.StarRating = exports.RangeSlider = exports.RangeInput = exports.PoweredBy = exports.Pagination = exports.MultiRange = exports.MenuSelect = exports.Menu = exports.InfiniteHits = exports.HitsPerPage = exports.Hits = exports.Snippet = exports.Highlight = exports.HierarchicalMenu = exports.CurrentRefinements = exports.Configure = exports.Index = exports.InstantSearch = undefined;

var _Configure = require('./src/widgets/Configure.js');

Object.defineProperty(exports, 'Configure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Configure).default;
  }
});

var _CurrentRefinements = require('./src/widgets/CurrentRefinements.js');

Object.defineProperty(exports, 'CurrentRefinements', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CurrentRefinements).default;
  }
});

var _HierarchicalMenu = require('./src/widgets/HierarchicalMenu.js');

Object.defineProperty(exports, 'HierarchicalMenu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HierarchicalMenu).default;
  }
});

var _Highlight = require('./src/widgets/Highlight.js');

Object.defineProperty(exports, 'Highlight', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Highlight).default;
  }
});

var _Snippet = require('./src/widgets/Snippet.js');

Object.defineProperty(exports, 'Snippet', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Snippet).default;
  }
});

var _Hits = require('./src/widgets/Hits.js');

Object.defineProperty(exports, 'Hits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Hits).default;
  }
});

var _HitsPerPage = require('./src/widgets/HitsPerPage.js');

Object.defineProperty(exports, 'HitsPerPage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HitsPerPage).default;
  }
});

var _InfiniteHits = require('./src/widgets/InfiniteHits.js');

Object.defineProperty(exports, 'InfiniteHits', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InfiniteHits).default;
  }
});

var _Menu = require('./src/widgets/Menu.js');

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Menu).default;
  }
});

var _MenuSelect = require('./src/widgets/MenuSelect.js');

Object.defineProperty(exports, 'MenuSelect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MenuSelect).default;
  }
});

var _MultiRange = require('./src/widgets/MultiRange.js');

Object.defineProperty(exports, 'MultiRange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MultiRange).default;
  }
});

var _Pagination = require('./src/widgets/Pagination.js');

Object.defineProperty(exports, 'Pagination', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Pagination).default;
  }
});

var _PoweredBy = require('./src/widgets/PoweredBy.js');

Object.defineProperty(exports, 'PoweredBy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PoweredBy).default;
  }
});

var _RangeInput = require('./src/widgets/RangeInput.js');

Object.defineProperty(exports, 'RangeInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RangeInput).default;
  }
});

var _RangeSlider = require('./src/widgets/RangeSlider.js');

Object.defineProperty(exports, 'RangeSlider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RangeSlider).default;
  }
});

var _StarRating = require('./src/widgets/StarRating.js');

Object.defineProperty(exports, 'StarRating', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StarRating).default;
  }
});

var _RefinementList = require('./src/widgets/RefinementList.js');

Object.defineProperty(exports, 'RefinementList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RefinementList).default;
  }
});

var _ClearAll = require('./src/widgets/ClearAll.js');

Object.defineProperty(exports, 'ClearAll', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ClearAll).default;
  }
});

var _ScrollTo = require('./src/widgets/ScrollTo.js');

Object.defineProperty(exports, 'ScrollTo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ScrollTo).default;
  }
});

var _SearchBox = require('./src/widgets/SearchBox.js');

Object.defineProperty(exports, 'SearchBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SearchBox).default;
  }
});

var _SortBy = require('./src/widgets/SortBy.js');

Object.defineProperty(exports, 'SortBy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SortBy).default;
  }
});

var _Stats = require('./src/widgets/Stats.js');

Object.defineProperty(exports, 'Stats', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Stats).default;
  }
});

var _Toggle = require('./src/widgets/Toggle.js');

Object.defineProperty(exports, 'Toggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Toggle).default;
  }
});

var _Panel = require('./src/widgets/Panel.js');

Object.defineProperty(exports, 'Panel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Panel).default;
  }
});

var _Breadcrumb = require('./src/widgets/Breadcrumb');

Object.defineProperty(exports, 'Breadcrumb', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Breadcrumb).default;
  }
});

var _createInstantSearch = require('./src/core/createInstantSearch');

var _createInstantSearch2 = _interopRequireDefault(_createInstantSearch);

var _createIndex = require('./src/core/createIndex');

var _createIndex2 = _interopRequireDefault(_createIndex);

var _lite = require('algoliasearch/lite');

var _lite2 = _interopRequireDefault(_lite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstantSearch = (0, _createInstantSearch2.default)(_lite2.default, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' }
});
exports.InstantSearch = InstantSearch;

var Index = (0, _createIndex2.default)({
  Root: 'div',
  props: { className: 'ais-MultiIndex__root' }
});
exports.Index = Index;
