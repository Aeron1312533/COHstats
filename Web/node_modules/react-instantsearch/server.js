'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstantSearch = undefined;

var _createInstantSearchServer = require('./src/core/createInstantSearchServer');

var _lite = require('algoliasearch/lite');

var _lite2 = _interopRequireDefault(_lite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cis = function cis() {
  return (0, _createInstantSearchServer.createInstantSearch)(_lite2.default);
};

exports.createInstantSearch = cis;
