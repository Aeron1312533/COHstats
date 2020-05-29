'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configure = exports.Index = exports.InstantSearch = undefined;

var _Configure = require('./src/widgets/Configure.js');

Object.defineProperty(exports, 'Configure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Configure).default;
  }
});

var _reactnative = require('algoliasearch/reactnative');

var _reactnative2 = _interopRequireDefault(_reactnative);

var _createInstantSearch = require('./src/core/createInstantSearch');

var _createInstantSearch2 = _interopRequireDefault(_createInstantSearch);

var _createIndex = require('./src/core/createIndex');

var _createIndex2 = _interopRequireDefault(_createIndex);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstantSearch = (0, _createInstantSearch2.default)(_reactnative2.default, {
  Root: _reactNative.View
});
exports.InstantSearch = InstantSearch;

var Index = (0, _createIndex2.default)({
  Root: _reactNative.View
});
exports.Index = Index;
