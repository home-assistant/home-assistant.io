# Automatically protect code fence contents from Liquid processing
# by replacing {{ }} and {% %} with placeholders before Liquid runs,
# then restoring them after rendering.

module Jekyll
  module RawCodeFences
    OPEN_VAR = "___CODEVAR_OPEN___"
    CLOSE_VAR = "___CODEVAR_CLOSE___"
    OPEN_TAG = "___CODETAG_OPEN___"
    CLOSE_TAG = "___CODETAG_CLOSE___"
    OPEN_COMMENT = "___CODECOMMENT_OPEN___"
    CLOSE_COMMENT = "___CODECOMMENT_CLOSE___"
  end
end

# Before Liquid: replace Liquid-like syntax inside code fences and inline
# backtick code with placeholders
Jekyll::Hooks.register [:documents, :pages], :pre_render do |doc|
  # First: protect code fences (``` blocks)
  doc.content = doc.content.gsub(/(^[ \t]*)(`{3,})([^\n]*)\n(.*?)\n\1\2[ \t]*$/m) do
    indent = $1
    fence = $2
    info = $3
    inner = $4
    fence_open = "#{indent}#{fence}#{info}\n"
    fence_close = "#{indent}#{fence}"

    # Skip fences that don't contain any Liquid-like syntax
    next "#{fence_open}#{inner}\n#{fence_close}" unless inner.match?(/\{\{|\{%|\{#/)

    # Replace Liquid syntax with placeholders, but preserve {% raw %} and {% endraw %} tags
    inner = inner.gsub(/\{%-?\s*raw\s*-?%\}/) { |m| "___PRESERVE_RAW_#{m.hash.abs}___" }
    inner = inner.gsub(/\{%-?\s*endraw\s*-?%\}/) { |m| "___PRESERVE_ENDRAW_#{m.hash.abs}___" }

    inner = inner
      .gsub("{{", Jekyll::RawCodeFences::OPEN_VAR)
      .gsub("}}", Jekyll::RawCodeFences::CLOSE_VAR)
      .gsub("{%", Jekyll::RawCodeFences::OPEN_TAG)
      .gsub("%}", Jekyll::RawCodeFences::CLOSE_TAG)
      .gsub("{#", Jekyll::RawCodeFences::OPEN_COMMENT)
      .gsub("#}", Jekyll::RawCodeFences::CLOSE_COMMENT)

    # Restore preserved raw/endraw tags so Liquid can process them
    inner = inner.gsub(/___PRESERVE_RAW_\d+___/) { "{% raw %}" }
    inner = inner.gsub(/___PRESERVE_ENDRAW_\d+___/) { "{% endraw %}" }

    "#{fence_open}#{inner}\n#{fence_close}"
  end

  # Second: protect inline backtick code (`code` and ``code``)
  doc.content = doc.content.gsub(/(`{1,2})([^`\n]+?)\1/) do
    ticks = $1
    inner = $2

    next "#{ticks}#{inner}#{ticks}" unless inner.match?(/\{\{|\{%|\{#/)

    inner = inner
      .gsub("{{", Jekyll::RawCodeFences::OPEN_VAR)
      .gsub("}}", Jekyll::RawCodeFences::CLOSE_VAR)
      .gsub("{%", Jekyll::RawCodeFences::OPEN_TAG)
      .gsub("%}", Jekyll::RawCodeFences::CLOSE_TAG)
      .gsub("{#", Jekyll::RawCodeFences::OPEN_COMMENT)
      .gsub("#}", Jekyll::RawCodeFences::CLOSE_COMMENT)

    "#{ticks}#{inner}#{ticks}"
  end
end

# After rendering: restore the placeholders in the final HTML
Jekyll::Hooks.register [:documents, :pages], :post_render do |doc|
  doc.output = doc.output
    .gsub(Jekyll::RawCodeFences::OPEN_VAR, "{{")
    .gsub(Jekyll::RawCodeFences::CLOSE_VAR, "}}")
    .gsub(Jekyll::RawCodeFences::OPEN_TAG, "{%")
    .gsub(Jekyll::RawCodeFences::CLOSE_TAG, "%}")
    .gsub(Jekyll::RawCodeFences::OPEN_COMMENT, "{#")
    .gsub(Jekyll::RawCodeFences::CLOSE_COMMENT, "#}")
end
