/* Make template function/filter/parameter names in code blocks hoverable/clickable */
(function() {
  var funcs = window.__templateFunctions;
  if (!funcs) return;

  var TEMPLATE_LANGS = ['template', 'django', 'jinja2', 'yaml'];

  // Link function and filter tokens to their documentation pages
  function linkFunctions(codeEl) {
    codeEl.querySelectorAll('.token.function, .token.filter').forEach(function(token) {
      if (token.classList.contains('tf-linked')) return;
      var name = token.textContent.trim();
      if (funcs[name]) {
        token.setAttribute('data-tf-url', funcs[name].u);
        token.setAttribute('data-tf-desc', funcs[name].d);
        token.classList.add('tf-linked');
      }
    });
  }

  // Find the parent function for a keyword argument by walking backwards
  // through sibling tokens to find the matching opening parenthesis
  function findParentFunction(varToken) {
    var depth = 0;
    var el = varToken.previousElementSibling;

    while (el) {
      if (el.classList.contains('token')) {
        var text = el.textContent.trim();
        if (text === ')') depth++;
        if (text === '(') {
          if (depth === 0) {
            var prev = el.previousElementSibling;
            if (prev && (prev.classList.contains('function') || prev.classList.contains('filter'))) {
              return prev.textContent.trim();
            }
            return null;
          }
          depth--;
        }
      }
      el = el.previousElementSibling;
    }
    return null;
  }

  // Link keyword argument names (variable tokens before =) to their
  // parent function's parameter documentation
  function linkParameters(codeEl) {
    var variables = codeEl.querySelectorAll('.token.variable');

    variables.forEach(function(varToken) {
      if (varToken.classList.contains('tf-linked')) return;

      // Check if next sibling token is the = operator (not == or !=)
      var next = varToken.nextElementSibling;
      if (!next || !next.classList.contains('operator') || next.textContent.trim() !== '=') return;

      var paramName = varToken.textContent.trim();
      var funcName = findParentFunction(varToken);
      if (!funcName || !funcs[funcName]) return;

      var funcData = funcs[funcName];
      var paramDesc = funcData.p && funcData.p[paramName];
      var url = funcData.u + '#' + paramName;
      var desc = paramDesc || ('Parameter of ' + funcName + '()');

      varToken.setAttribute('data-tf-url', url);
      varToken.setAttribute('data-tf-desc', desc);
      varToken.classList.add('tf-linked', 'tf-param');
    });
  }

  // Process a code element for both function and parameter linking
  function processCodeBlock(codeEl) {
    linkFunctions(codeEl);
    linkParameters(codeEl);
  }

  // Hook into Prism for elements highlighted after this script loads
  Prism.hooks.add('after-highlight', function(env) {
    if (TEMPLATE_LANGS.indexOf(env.language) === -1) return;
    processCodeBlock(env.element);
  });

  // Also process elements already highlighted before hooks were registered
  document.addEventListener('DOMContentLoaded', function() {
    var selectors = TEMPLATE_LANGS.map(function(l) {
      return 'code.language-' + l;
    }).join(', ');
    document.querySelectorAll(selectors).forEach(processCodeBlock);
  });

  // Track the last input type so touch and mouse behave differently.
  // Also dismiss any active tooltip when the user taps outside a linked token.
  var lastPointerType = 'mouse';
  document.addEventListener('pointerdown', function(e) {
    lastPointerType = e.pointerType;
    if (primedElement && !e.target.closest('.tf-linked')) {
      primedElement = null;
      currentHovered = null;
      hideTooltip();
    }
  }, { passive: true });

  // Dismiss tooltip when scrolling — the anchored position becomes stale
  // and the user is no longer reading it.
  window.addEventListener('scroll', function() {
    if (primedElement || currentHovered) {
      primedElement = null;
      currentHovered = null;
      hideTooltip();
    }
  }, { passive: true });

  function isTouchInput() {
    return lastPointerType === 'touch' || lastPointerType === 'pen';
  }

  // Navigate to the linked URL, honoring modifier keys for new-tab behavior
  function navigate(url, event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button === 1) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }

  // On touch input, first tap primes the element and shows the tooltip;
  // a second tap on the same element navigates.
  var primedElement = null;

  // Click handler: left-click with or without modifier keys
  document.addEventListener('click', function(e) {
    var el = e.target.closest('.tf-linked');

    // Tap outside any linked token: dismiss tooltip and clear primed state
    if (!el) {
      if (primedElement) {
        primedElement = null;
        hideTooltip();
        currentHovered = null;
      }
      return;
    }

    var url = el.getAttribute('data-tf-url');
    if (!url) return;
    e.preventDefault();

    // On touch, require two taps: first shows tooltip, second navigates
    if (isTouchInput() && primedElement !== el) {
      if (primedElement) hideTooltip();
      primedElement = el;
      currentHovered = el;
      showTooltip(el);
      return;
    }

    // Desktop, or second tap on touch — navigate
    primedElement = null;
    navigate(url, e);
  });

  // Middle-click opens in a new tab
  document.addEventListener('auxclick', function(e) {
    if (e.button !== 1) return;
    var el = e.target.closest('.tf-linked');
    if (!el) return;
    var url = el.getAttribute('data-tf-url');
    if (!url) return;
    e.preventDefault();
    window.open(url, '_blank');
  });

  // Tooltip on hover — delegated mouseover/mouseout with enter/leave semantics
  // to avoid repositioning while moving within the same token. Touch input
  // uses the click-based flow above, so mouse handlers bail out on touch.
  var tooltip = document.createElement('div');
  tooltip.className = 'tf-code-tooltip';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  var currentHovered = null;

  function showTooltip(el) {
    var desc = el.getAttribute('data-tf-desc');
    if (!desc) return;

    tooltip.textContent = desc;
    tooltip.style.display = 'block';

    // Batch reads, then writes: measure target and tooltip once,
    // compute final position, then apply both style changes together
    var rect = el.getBoundingClientRect();
    var tooltipRect = tooltip.getBoundingClientRect();
    var viewportWidth = window.innerWidth;

    var top = rect.top - tooltipRect.height - 8;
    if (top < 60) top = rect.bottom + 8;

    var left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    if (left < 10) left = 10;
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  document.addEventListener('mouseover', function(e) {
    if (isTouchInput()) return;
    var el = e.target.closest('.tf-linked');
    if (el === currentHovered) return;
    if (currentHovered) hideTooltip();
    currentHovered = el || null;
    if (el) showTooltip(el);
  });

  document.addEventListener('mouseout', function(e) {
    if (isTouchInput()) return;
    if (!currentHovered) return;
    var next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.tf-linked');
    if (!next) {
      hideTooltip();
      currentHovered = null;
    }
  });
})();
