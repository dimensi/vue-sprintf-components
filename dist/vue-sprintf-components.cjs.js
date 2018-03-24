/*!
 * vue-sprintf-components v0.8.0
 * (c) 2018-present Nikita Nafranets <eddimensi@gmail.com>
 * Released under the MIT License.
 */
'use strict';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var createNamedRegexp = function createNamedRegexp() {
  return /%\((\w+)\)c/g;
};
var notEnoghtSlots = function notEnoghtSlots() {
  return new Error('Not enought slots for placeholders');
};
var createArgsRegexp = function createArgsRegexp() {
  return /%c/g;
};
/**
 * Function create arr for render from text with placeholders and components
 *
 * @param {string} text string with args placeholders `%c`
 * @param {RegExp} regExp - pattern for search placeholders
 * @param {[]Object} placeholders array with components
 * @param {Boolean} silent boolean for disable throw errors
 * @returns {[][]string}
 */

var arrSprintf = function arrSprintf(text, regExp, placeholders, silent) {
  var splittedText = text.split(regExp);
  return splittedText.map(function (part, index) {
    if (index + 1 === splittedText.length) {
      return [part];
    }

    if (!placeholders[index] && !silent) {
      throw notEnoghtSlots();
    }

    return [part, placeholders[index] || ''];
  });
};
/**
 * Function create arr for render from text with placeholders and components
 *
 * @param {string} text string with named placeholders `%(named)c`
 * @param {RegExp} regExp - pattern for search placeholders
 * @param {Object<string, any>} placeholders object with components
 * @param {Boolean} silent boolean for disable throw errors
 * @returns {[][]string}
 */

var arrSprintfNamed = function arrSprintfNamed(text, regExp, placeholders, silent) {
  var result = [];
  var matches;
  var lastIndex = 0;

  while ((matches = regExp.exec(text)) !== null) {
    var _matches = matches,
        _matches2 = _slicedToArray(_matches, 2),
        slotKey = _matches2[1];

    var _matches3 = matches,
        index = _matches3.index;

    if (!placeholders[slotKey] && !silent) {
      throw notEnoghtSlots();
    }

    result.push(text.slice(lastIndex, index), placeholders[slotKey]);
    lastIndex = regExp.lastIndex;
  }

  return result;
};

var index = {
  name: 'VueSprintfComponents',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        _ref$props = _ref.props,
        text = _ref$props.text,
        silent = _ref$props.silent,
        slots = _ref.slots;

    if (!text) {
      return '';
    }

    if (!createNamedRegexp().test(text)) {
      return arrSprintf(text, createArgsRegexp(), children, silent);
    }

    return arrSprintfNamed(text, createNamedRegexp(), slots(), silent);
  },
  props: {
    /**
     * String with placeholders %c or %(named)c
     */
    text: {
      type: String,
      required: true
    },

    /**
     * Boolean for disable errors
     */
    silent: Boolean
  }
};

module.exports = index;
