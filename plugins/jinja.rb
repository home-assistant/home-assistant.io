require 'cgi'

module Jekyll
  class JinjaInlineTag < Liquid::Raw
    # Renders inline Jinja2 code with syntax highlighting.
    # Usage: {% jinja %}{{ now() }}{% endjinja %}
    # Content is treated as raw (no Liquid processing).
    def render(_context)
      content = @body.strip
      escaped = CGI.escapeHTML(content)
      %(<code class="language-template">#{escaped}</code>)
    end
  end
end

Liquid::Template.register_tag('jinja', Jekyll::JinjaInlineTag)
