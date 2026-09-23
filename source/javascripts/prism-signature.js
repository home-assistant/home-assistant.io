/* Custom Prism language for template function signatures */
Prism.languages.signature = {
  'return-type': {
    pattern: /->.*$/m,
    inside: {
      'operator': /->/,
      'builtin': /\b(?:Any|bool|str|int|float|list|dict|set|tuple|datetime|timedelta|Iterable|None)\b/,
      'punctuation': /[[\]|,]/
    }
  },
  'function': /^[a-zA-Z_]\w*(?=\s*\()/m,
  'param-line': {
    pattern: /^\s+\*{0,2}[a-zA-Z_]\w*.*$/m,
    inside: {
      'default-value': {
        pattern: /=\s*.+?(?=,\s*$|$)/m,
        inside: {
          'operator': /=/,
          'boolean': /\b(?:True|False|None)\b/,
          'number': /\b\d+(?:\.\d+)?\b/,
          'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/
        }
      },
      'type': {
        pattern: /:\s*[^=,]+/,
        inside: {
          'builtin': /\b(?:Any|bool|str|int|float|list|dict|set|tuple|datetime|timedelta|Iterable|None)\b/,
          'operator': /\|/,
          'punctuation': /[:\[\]]/
        }
      },
      'parameter': /\*{0,2}[a-zA-Z_]\w*/
    }
  },
  'punctuation': /[(),]/
};

/* Set display name and re-highlight signature blocks */
Prism.hooks.add('before-highlight', function(env) {
  if (env.language === 'signature') {
    var pre = env.element.parentNode;
    if (pre && pre.nodeName === 'PRE') {
      pre.setAttribute('data-language', 'Signature');
    }
  }
});

document.querySelectorAll('code.language-signature').forEach(function(el) {
  Prism.highlightElement(el);
});
