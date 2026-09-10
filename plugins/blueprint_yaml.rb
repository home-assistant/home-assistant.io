require 'cgi'

module Jekyll
  class BlueprintYamlTag < Liquid::Tag
    SYNTAX = /^(?:"|')(blueprints\/integrations\/[A-Za-z0-9_\/.\-]+\.ya?ml)(?:"|')$/

    def initialize(tag_name, args, tokens)
      super

      raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
        Syntax error in tag 'blueprint_yaml'.

        Valid syntax:
          {% blueprint_yaml "blueprints/integrations/example.yaml" %}
      MSG

      @path = Regexp.last_match(1)
    end

    def render(context)
      site = context.registers[:site]
      source = File.expand_path(site.source)
      blueprint_root = File.join(source, 'blueprints', 'integrations')
      blueprint_path = File.expand_path(File.join(source, @path))

      unless blueprint_path.start_with?("#{blueprint_root}#{File::SEPARATOR}")
        raise Jekyll::Errors::FatalException, "Blueprint path must be inside source/blueprints/integrations"
      end

      yaml = File.read(blueprint_path)

      <<~HTML
        <pre class="language-yaml"><code class="language-yaml">#{CGI.escapeHTML(yaml)}</code></pre>
      HTML
    rescue Errno::ENOENT
      raise Jekyll::Errors::FatalException, "Blueprint file not found: #{@path}"
    end
  end
end

Liquid::Template.register_tag('blueprint_yaml', Jekyll::BlueprintYamlTag)
