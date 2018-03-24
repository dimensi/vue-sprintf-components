/*!
 * vue-sprintf-components v0.8.0
 * (c) 2018-present Nikita Nafranets <eddimensi@gmail.com>
 * Released under the MIT License.
 */
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
  return /\{([a-zA-Z]+)\}/g;
};
var notEnoghtPlaceholders = function notEnoghtPlaceholders() {
  return new Error('Not enought placeholders');
};
var notSuitablePlaceholders = function notSuitablePlaceholders() {
  return new Error('Not suitable placeholders');
};
var createArgsRegexp = function createArgsRegexp() {
  return /\{(\d)\}/g;
};
/**
 * Parse text with placeholders on array
 *
 * @param {string} text
 * @param {RegExp} regExp
 */

var parseTextOnArray = function parseTextOnArray(text, regExp) {
  if (!regExp.test(text)) {
    return [text];
  }

  var result = [];
  var matches;
  regExp.lastIndex = 0;
  var lastIndex = regExp.lastIndex;
  var indexKey = 0;

  while ((matches = regExp.exec(text)) !== null) {
    var _matches = matches,
        _matches2 = _slicedToArray(_matches, 2),
        key = _matches2[1];

    var _matches3 = matches,
        index = _matches3.index;

    if (!key) {
      key = String(indexKey);
      indexKey++;
    }

    result.push(text.slice(lastIndex, index), {
      key: key
    });
    lastIndex = regExp.lastIndex;
  }

  return result;
};
/**
 * Process array with placeholders
 *
 * @param {Array[]} tokens - array with text and tokens
 * @param {any} placeholders - elements on replace
 * @param {boolean} [silent=false] - don't throw error on undefined
 * @returns [Array[]]
 */

var proccessArrayWithPlaceholders = function proccessArrayWithPlaceholders(tokens, placeholders) {
  var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return tokens.map(function (item) {
    if (typeof item === 'string') return item;
    var key = item.key;
    if (!placeholders[key] && !silent) throw notEnoghtPlaceholders();
    return placeholders[key];
  });
};
var mergePlaceholders = function mergePlaceholders(original, fallback) {
  if (!fallback) return original;

  if (Array.isArray(original)) {
    if (!Array.isArray(fallback)) throw notSuitablePlaceholders();
    return original.concat(fallback);
  }

  if (Array.isArray(fallback)) throw notSuitablePlaceholders();
  return Object.assign({}, fallback, original);
};

var index = {
  name: 'VueSprintfComponents',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        _ref$props = _ref.props,
        text = _ref$props.text,
        silent = _ref$props.silent,
        placeholders = _ref$props.placeholders,
        slots = _ref.slots;

    if (!text) {
      return '';
    }

    if (!createNamedRegexp().test(text)) {
      var _tokens = parseTextOnArray(text, createArgsRegexp());

      var _holders = mergePlaceholders(children, placeholders);

      return proccessArrayWithPlaceholders(_tokens, _holders, silent);
    }

    var tokens = parseTextOnArray(text, createNamedRegexp());
    var holders = mergePlaceholders(slots(), placeholders);
    return proccessArrayWithPlaceholders(tokens, holders, silent);
  },
  props: {
    /**
     * String with placeholders {0} or {named}
     */
    text: {
      type: String,
      required: true
    },

    /**
     * fallback placeholders
     */
    placeholders: [Array, Object],

    /**
     * Boolean for disable errors
     */
    silent: Boolean
  }
};

export default index;
