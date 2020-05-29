"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.default = makeAsyncScript;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCRIPT_MAP = new _map2.default();

// A counter used to generate a unique id for each component that uses the function
var idCount = 0;

function makeAsyncScript(Component, scriptURL, options) {
  options = options || {};
  var wrappedComponentName = Component.displayName || Component.name || "Component";

  var AsyncScriptLoader = function (_React$Component) {
    (0, _inherits3.default)(AsyncScriptLoader, _React$Component);

    function AsyncScriptLoader() {
      (0, _classCallCheck3.default)(this, AsyncScriptLoader);

      var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));

      _this.state = {};
      return _this;
    }

    AsyncScriptLoader.prototype.asyncScriptLoaderGetScriptLoaderID = function asyncScriptLoaderGetScriptLoaderID() {
      if (!this.__scriptLoaderID) {
        this.__scriptLoaderID = "async-script-loader-" + idCount++;
      }
      return this.__scriptLoaderID;
    };

    AsyncScriptLoader.prototype.getComponent = function getComponent() {
      return this.childComponent;
    };

    AsyncScriptLoader.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      var key = this.asyncScriptLoaderGetScriptLoaderID();
      var _options = options,
          globalName = _options.globalName,
          callbackName = _options.callbackName;

      if (globalName && typeof window[globalName] !== "undefined") {
        SCRIPT_MAP.set(scriptURL, { loaded: true, observers: new _map2.default() });
      }

      if (SCRIPT_MAP.has(scriptURL)) {
        var entry = SCRIPT_MAP.get(scriptURL);
        if (entry && (entry.loaded || entry.errored)) {
          this.asyncScriptLoaderHandleLoad(entry);
          return;
        }
        entry.observers.set(key, function (entry) {
          return _this2.asyncScriptLoaderHandleLoad(entry);
        });
        return;
      }

      var observers = new _map2.default();
      observers.set(key, function (entry) {
        return _this2.asyncScriptLoaderHandleLoad(entry);
      });
      SCRIPT_MAP.set(scriptURL, {
        loaded: false,
        observers: observers
      });

      var script = document.createElement("script");

      script.src = scriptURL;
      script.async = 1;

      var callObserverFuncAndRemoveObserver = function callObserverFuncAndRemoveObserver(func) {
        if (SCRIPT_MAP.has(scriptURL)) {
          var mapEntry = SCRIPT_MAP.get(scriptURL);
          var observersMap = mapEntry.observers;

          for (var _iterator = observersMap, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var _ref2 = _ref,
                obsKey = _ref2[0],
                observer = _ref2[1];

            if (func(observer)) {
              observersMap.delete(obsKey);
            }
          }
        }
      };

      if (callbackName && typeof window !== "undefined") {
        window[callbackName] = AsyncScriptLoader.asyncScriptLoaderTriggerOnScriptLoaded;
      }

      script.onload = function () {
        var mapEntry = SCRIPT_MAP.get(scriptURL);
        if (mapEntry) {
          mapEntry.loaded = true;
          callObserverFuncAndRemoveObserver(function (observer) {
            if (callbackName) {
              return false;
            }
            observer(mapEntry);
            return true;
          });
        }
      };
      script.onerror = function (event) {
        var mapEntry = SCRIPT_MAP.get(scriptURL);
        if (mapEntry) {
          mapEntry.errored = true;
          callObserverFuncAndRemoveObserver(function (observer) {
            observer(mapEntry);
            return true;
          });
        }
      };

      // (old) MSIE browsers may call "onreadystatechange" instead of "onload"
      script.onreadystatechange = function () {
        if (_this2.readyState === "loaded") {
          // wait for other events, then call onload if default onload hadn't been called
          window.setTimeout(function () {
            var mapEntry = SCRIPT_MAP.get(scriptURL);
            if (mapEntry && mapEntry.loaded !== true) {
              script.onload();
            }
          }, 0);
        }
      };

      document.body.appendChild(script);
    };

    AsyncScriptLoader.prototype.asyncScriptLoaderHandleLoad = function asyncScriptLoaderHandleLoad(state) {
      this.setState(state, this.props.asyncScriptOnLoad);
    };

    AsyncScriptLoader.prototype.componentWillUnmount = function componentWillUnmount() {
      // Remove tag script
      if (options.removeOnUnmount === true) {
        var allScripts = document.getElementsByTagName("script");
        for (var i = 0; i < allScripts.length; i += 1) {
          if (allScripts[i].src.indexOf(scriptURL) > -1) {
            if (allScripts[i].parentNode) {
              allScripts[i].parentNode.removeChild(allScripts[i]);
            }
          }
        }
      }
      // Clean the observer entry
      var mapEntry = SCRIPT_MAP.get(scriptURL);
      if (mapEntry) {
        mapEntry.observers.delete(this.asyncScriptLoaderGetScriptLoaderID());
        if (options.removeOnUnmount === true) {
          SCRIPT_MAP.delete(scriptURL);
        }
      }
    };

    AsyncScriptLoader.prototype.render = function render() {
      var _this3 = this;

      var globalName = options.globalName;
      var _props = this.props,
          asyncScriptOnLoad = _props.asyncScriptOnLoad,
          childProps = (0, _objectWithoutProperties3.default)(_props, ["asyncScriptOnLoad"]);

      if (globalName && typeof window !== "undefined") {
        childProps[globalName] = typeof window[globalName] !== "undefined" ? window[globalName] : undefined;
      }
      return _react2.default.createElement(Component, (0, _extends3.default)({ ref: function ref(comp) {
          _this3.childComponent = comp;
        } }, childProps));
    };

    return AsyncScriptLoader;
  }(_react2.default.Component);

  AsyncScriptLoader.displayName = "AsyncScriptLoader(" + wrappedComponentName + ")";
  AsyncScriptLoader.propTypes = {
    asyncScriptOnLoad: _propTypes2.default.func
  };
  AsyncScriptLoader.asyncScriptLoaderTriggerOnScriptLoaded = function () {
    var mapEntry = SCRIPT_MAP.get(scriptURL);
    if (!mapEntry || !mapEntry.loaded) {
      throw new Error("Script is not loaded.");
    }
    for (var _iterator2 = mapEntry.observers.values(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var observer = _ref3;

      observer(mapEntry);
    }
    delete window[options.callbackName];
  };

  if (options.exposeFuncs) {
    var _loop = function _loop() {
      if (_isArray3) {
        if (_i3 >= _iterator3.length) return "break";
        _ref4 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) return "break";
        _ref4 = _i3.value;
      }

      var funcToExpose = _ref4;

      /* eslint-disable no-loop-func */
      AsyncScriptLoader.prototype[funcToExpose] = function () {
        var _getComponent;

        return (_getComponent = this.getComponent())[funcToExpose].apply(_getComponent, arguments);
      };
      /* eslint-enable no-loop-func */
    };

    for (var _iterator3 = options.exposeFuncs, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref4;

      var _ret = _loop();

      if (_ret === "break") break;
    }
  }
  return AsyncScriptLoader;
}