/* Make action, trigger, and condition names in YAML code blocks hoverable
   and clickable, linking to their documentation page. Also wraps data
   field keys inside a `data:` block with a link to the field's anchor on
   the page and a short description tooltip.

   Reuses the .tf-linked and .tf-param classes from prism-template-links.js
   so the existing tooltip, click, middle click, and touch handlers apply
   automatically. */
(function () {
  var actions = window.__actions || {};
  var triggers = window.__triggers || {};
  var conditions = window.__conditions || {};

  if (Object.keys(actions).length === 0 &&
      Object.keys(triggers).length === 0 &&
      Object.keys(conditions).length === 0) {
    return;
  }

  // Each "kind" of documentation item maps a YAML key name (what the user
  // writes in YAML) to the dictionary where we look up the identifier.
  var KIND_DICT = {
    'action': actions,
    'trigger': triggers,
    'condition': conditions
  };

  // Match "<domain>.<name>" identifiers. We validate against the
  // dictionaries so false positives like "version.info" are ignored.
  var NAME_RE = /\b[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*\b/g;

  // Look up a name across all three dictionaries in a fixed order.
  // Name collisions across kinds are not expected in practice because
  // actions, triggers, and conditions use different verb patterns.
  function lookupName(name) {
    return actions[name] || triggers[name] || conditions[name] || null;
  }

  function isAlreadyLinked(node) {
    var el = node.parentNode;
    while (el && el.nodeType === 1) {
      if (el.tagName === 'A') return true;
      if (el.classList && el.classList.contains('tf-linked')) return true;
      el = el.parentNode;
    }
    return false;
  }

  function findNameMatches(text) {
    var results = [];
    var iter = text.matchAll(NAME_RE);
    var step = iter.next();
    while (!step.done) {
      var match = step.value;
      var entry = lookupName(match[0]);
      if (entry) {
        results.push({ start: match.index, end: match.index + match[0].length, name: match[0], entry: entry });
      }
      step = iter.next();
    }
    return results;
  }

  function wrapNamesInBlock(codeEl) {
    var walker = document.createTreeWalker(codeEl, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    var node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach(function (textNode) {
      if (isAlreadyLinked(textNode)) return;

      var text = textNode.nodeValue;
      var matches = findNameMatches(text);
      if (matches.length === 0) return;

      var frag = document.createDocumentFragment();
      var cursor = 0;
      matches.forEach(function (m) {
        if (m.start > cursor) {
          frag.appendChild(document.createTextNode(text.slice(cursor, m.start)));
        }
        var span = document.createElement('span');
        span.className = 'tf-linked doc-linked';
        span.setAttribute('data-tf-url', m.entry.u);
        var desc = m.entry.d || m.entry.t || m.name;
        span.setAttribute('data-tf-desc', desc);
        span.textContent = text.slice(m.start, m.end);
        frag.appendChild(span);
        cursor = m.end;
      });
      if (cursor < text.length) {
        frag.appendChild(document.createTextNode(text.slice(cursor)));
      }
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  // Compute the indent where the first YAML key on a line starts, ignoring
  // any `- ` sequence prefix. For `  - action: X`, returns 4. For
  // `  target:`, returns 2.
  function keyIndentOf(line) {
    var match = line.match(/^(\s*)(-\s+)?/);
    if (!match) return 0;
    return match[1].length + (match[2] ? match[2].length : 0);
  }

  // Parse the code block text line by line and collect positions of data
  // field keys that belong to a known action, trigger, or condition.
  // Returns `{ start, end, kind, itemName, fieldName }` entries.
  function collectDataFieldPositions(text) {
    var lines = text.split('\n');
    var positions = [];

    var currentItem = null;          // { kind, name, entry }
    var itemIndent = -1;
    var inData = false;
    var dataIndent = -1;

    var lineStartOffset = 0;

    var KIND_LINE_RE = /^\s*(?:-\s+)?(action|trigger|condition):\s*([a-z][a-z0-9_]*\.[a-z][a-z0-9_]*)/;
    // Actions carry their fields under `data:`. Triggers and conditions carry
    // them under `options:`. Both count as the "fields container" that
    // introduces a scope whose immediate children we link.
    var DATA_LINE_RE = /^\s*(?:-\s+)?(?:data|options):\s*$/;
    var FIELD_LINE_RE = /^(\s*)([a-z][a-z0-9_]*)\s*:/;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trimmed = line.replace(/\s+$/, '');
      if (trimmed !== '') {
        var indent = keyIndentOf(line);

        if (currentItem && indent < itemIndent) {
          currentItem = null;
          inData = false;
        }

        var kindMatch = line.match(KIND_LINE_RE);
        if (kindMatch) {
          var kind = kindMatch[1];
          var itemName = kindMatch[2];
          var dict = KIND_DICT[kind];
          if (dict && dict[itemName]) {
            currentItem = { kind: kind, name: itemName, entry: dict[itemName] };
            itemIndent = indent;
            inData = false;
          }
        } else if (currentItem) {
          if (DATA_LINE_RE.test(line) && indent === itemIndent) {
            inData = true;
            dataIndent = indent;
          } else if (inData && indent <= dataIndent) {
            inData = false;
          }

          if (inData && indent > dataIndent) {
            var fieldMatch = line.match(FIELD_LINE_RE);
            if (fieldMatch) {
              var fieldName = fieldMatch[2];
              if (currentItem.entry.p && currentItem.entry.p[fieldName]) {
                var firstNestedIndent = fieldMatch[1].length;
                if (firstNestedIndent > dataIndent &&
                    (positions.length === 0 ||
                     positions[positions.length - 1].dataIndent !== dataIndent ||
                     firstNestedIndent <= positions[positions.length - 1].childIndent)) {
                  var keyStart = line.indexOf(fieldName, firstNestedIndent);
                  if (keyStart !== -1) {
                    positions.push({
                      start: lineStartOffset + keyStart,
                      end: lineStartOffset + keyStart + fieldName.length,
                      kind: currentItem.kind,
                      itemName: currentItem.name,
                      entry: currentItem.entry,
                      fieldName: fieldName,
                      dataIndent: dataIndent,
                      childIndent: firstNestedIndent
                    });
                  }
                }
              }
            }
          }
        }
      }
      lineStartOffset += line.length + 1;
    }

    return positions;
  }

  function wrapDataFieldsInBlock(codeEl) {
    var text = codeEl.textContent;
    var positions = collectDataFieldPositions(text);
    if (positions.length === 0) return;

    var walker = document.createTreeWalker(codeEl, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var offset = 0;
    var node;
    while ((node = walker.nextNode())) {
      nodes.push({ node: node, start: offset, end: offset + node.nodeValue.length });
      offset += node.nodeValue.length;
    }

    // Process positions in reverse so earlier wraps don't shift later ones.
    positions.sort(function (a, b) { return b.start - a.start; });

    positions.forEach(function (pos) {
      var target = null;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].start <= pos.start && pos.start < nodes[i].end) {
          target = nodes[i];
          break;
        }
      }
      if (!target) return;
      if (pos.end > target.end) return;
      if (!target.node.parentNode) return;
      if (isAlreadyLinked(target.node)) return;

      var nodeText = target.node.nodeValue;
      var localStart = pos.start - target.start;
      var localEnd = pos.end - target.start;

      var before = nodeText.slice(0, localStart);
      var fieldText = nodeText.slice(localStart, localEnd);
      var after = nodeText.slice(localEnd);

      var url = pos.entry.u + '#' + pos.fieldName;
      var desc = (pos.entry.p && pos.entry.p[pos.fieldName]) || (pos.fieldName + ' field');

      var span = document.createElement('span');
      span.className = 'tf-linked tf-param doc-field-linked';
      span.setAttribute('data-tf-url', url);
      span.setAttribute('data-tf-desc', desc);
      span.textContent = fieldText;

      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(span);
      if (after) frag.appendChild(document.createTextNode(after));

      target.node.parentNode.replaceChild(frag, target.node);
    });
  }

  function processCodeBlock(codeEl) {
    wrapNamesInBlock(codeEl);
    wrapDataFieldsInBlock(codeEl);
  }

  if (typeof Prism !== 'undefined' && Prism.hooks) {
    Prism.hooks.add('after-highlight', function (env) {
      if (env.language !== 'yaml') return;
      processCodeBlock(env.element);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('code.language-yaml').forEach(processCodeBlock);
  });
})();
