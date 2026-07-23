/* Prism.js Jinja2/Django language component with Home Assistant template function highlighting */

/* markup-templating dependency (Prism 1.16.0) */
!function(h){function v(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(h.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,r,e,o){if(a.language===r){var c=a.tokenStack=[];a.code=a.code.replace(e,function(e){if("function"==typeof o&&!o(e))return e;for(var n,t=c.length;-1!==a.code.indexOf(n=v(r,t));)++t;return c[t]=e,n}),a.grammar=h.languages.markup}}},tokenizePlaceholders:{value:function(p,k){if(p.language===k&&p.tokenStack){p.grammar=h.languages[k];var m=0,d=Object.keys(p.tokenStack);!function e(n){for(var t=0;t<n.length&&!(m>=d.length);t++){var a=n[t];if("string"==typeof a||a.content&&"string"==typeof a.content){var r=d[m],o=p.tokenStack[r],c="string"==typeof a?a:a.content,i=v(k,r),u=c.indexOf(i);if(-1<u){++m;var g=c.substring(0,u),l=new h.Token(k,h.tokenize(o,p.grammar),"language-"+k,o),s=c.substring(u+i.length),f=[];g&&f.push.apply(f,e([g])),f.push(l),s&&f.push.apply(f,e([s])),"string"==typeof a?n.splice.apply(n,[t,1].concat(f)):a.content=f}}else a.content&&e(a.content)}return n}(p.tokens)}}}})}(Prism);

/* Django/Jinja2 language definition (Prism 1.16.0) */
!function(e){e.languages.django={comment:/^{#[\s\S]*?#}$/,tag:{pattern:/(^{%[+-]?\s*)\w+/,lookbehind:!0,alias:"keyword"},delimiter:{pattern:/^{[{%][+-]?|[+-]?[}%]}$/,alias:"punctuation"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},filter:{pattern:/(\|\s*)\w+/,lookbehind:!0,alias:"function"},test:{pattern:/(\bis\s+(?:not\s+)?)(?!not\b)\w+/,lookbehind:!0,alias:"function"},function:/\b[a-z_]\w+(?=\s*\()/i,keyword:/\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,operator:/[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,number:/\b\d+(?:\.\d+)?\b/,boolean:/[Tt]rue|[Ff]alse|[Nn]one/,variable:/\b\w+?\b/,punctuation:/[{}[\](),.:;]/};var n=/{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,o=e.languages["markup-templating"];e.hooks.add("before-tokenize",function(e){o.buildPlaceholders(e,"django",n)}),e.hooks.add("after-tokenize",function(e){o.tokenizePlaceholders(e,"django")}),e.languages.jinja2=e.languages.django,e.hooks.add("before-tokenize",function(e){o.buildPlaceholders(e,"jinja2",n)}),e.hooks.add("after-tokenize",function(e){o.tokenizePlaceholders(e,"jinja2")})}(Prism);

/* Highlight Jinja2 blocks inside YAML code blocks */
!function(e) {
  var jinjaPattern = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/g;

  function tokenizeJinjaInTokens(tokens) {
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      // Process string tokens or plain strings that contain Jinja2 patterns
      var content = typeof token === 'string' ? token :
                    (token.content && typeof token.content === 'string') ? token.content : null;

      if (content && jinjaPattern.test(content)) {
        jinjaPattern.lastIndex = 0;
        var parts = [];
        var lastIndex = 0;
        var match;

        jinjaPattern.lastIndex = 0;
        while ((match = jinjaPattern.exec(content)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(content.substring(lastIndex, match.index));
          }
          // Add tokenized Jinja2 block
          parts.push(new e.Token(
            'jinja2',
            e.tokenize(match[0], e.languages.django),
            'language-jinja2',
            match[0]
          ));
          lastIndex = jinjaPattern.lastIndex;
        }
        // Add remaining text after last match
        if (lastIndex < content.length) {
          parts.push(content.substring(lastIndex));
        }

        if (parts.length > 1) {
          if (typeof token === 'string') {
            Array.prototype.splice.apply(tokens, [i, 1].concat(parts));
            i += parts.length - 1;
          } else {
            token.content = parts;
          }
        }
      } else if (token.content && Array.isArray(token.content)) {
        tokenizeJinjaInTokens(token.content);
      }
    }
  }

  e.hooks.add('after-tokenize', function(env) {
    if (env.language === 'yaml') {
      tokenizeJinjaInTokens(env.tokens);
    }
  });
}(Prism);

/* Register "template" as an alias for Jinja2 */
Prism.languages.template = Prism.languages.django;
Prism.hooks.add("before-tokenize", function(e) {
  Prism.languages["markup-templating"].buildPlaceholders(e, "template", /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g);
});
Prism.hooks.add("after-tokenize", function(e) {
  Prism.languages["markup-templating"].tokenizePlaceholders(e, "template");
});

/* Override displayed language name */
Prism.hooks.add('before-highlight', function(env) {
  if (env.language === 'django' || env.language === 'jinja2' || env.language === 'template') {
    var pre = env.element.parentNode;
    if (pre && pre.nodeName === 'PRE') {
      pre.setAttribute('data-language', 'Template');
    }
  }
});



