require 'cgi'
require 'safe_yaml'

module Jekyll
  class BlueprintAutomationTag < Liquid::Tag
    SYNTAX = /^(?:"|')(blueprints\/integrations\/[A-Za-z0-9_\/.\-]+\.ya?ml)(?:"|')(.*)$/
    OPTIONS_REGEX = /(\w+)=(?:"([^"]*)"|'([^']*)'|([^\s]+))/

    def initialize(tag_name, args, tokens)
      super

      raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
        Syntax error in tag 'blueprint_automation'.

        Valid syntax:
          {% blueprint_automation "blueprints/integrations/example.yaml" input_name="example value" %}
      MSG

      @path = Regexp.last_match(1)
      @options = Regexp.last_match(2).to_s
    end

    def render(context)
      site = context.registers[:site]
      source = File.expand_path(site.source)
      blueprint_root = File.join(source, 'blueprints', 'integrations')
      blueprint_path = File.expand_path(File.join(source, @path))

      unless blueprint_path.start_with?("#{blueprint_root}#{File::SEPARATOR}")
        raise Jekyll::Errors::FatalException, "Blueprint path must be inside source/blueprints/integrations"
      end

      source_yaml = File.read(blueprint_path)
      blueprint_yaml, automation_yaml = split_blueprint(source_yaml)
      blueprint = SafeYAML.load(blueprint_yaml).fetch('blueprint')
      substitutions = input_substitutions(blueprint)
      substitutions.merge!(parse_options)

      automation_yaml.gsub!(/!input\s+([A-Za-z0-9_]+)/) do
        input_name = Regexp.last_match(1)
        yaml_scalar(substitutions.fetch(input_name, "YOUR_#{input_name.upcase}"))
      end

      alias_yaml = yaml_scalar(blueprint.fetch('name'))
      automation_yaml = "alias: #{alias_yaml}\n#{automation_yaml.strip}\n"

      <<~HTML
        <pre class="language-yaml"><code class="language-yaml">#{CGI.escapeHTML(automation_yaml)}</code></pre>
      HTML
    rescue Errno::ENOENT
      raise Jekyll::Errors::FatalException, "Blueprint file not found: #{@path}"
    rescue KeyError, SafeYAML::ParseError => err
      raise Jekyll::Errors::FatalException, "Unable to render blueprint automation #{@path}: #{err.message}"
    end

    private

    def split_blueprint(source_yaml)
      lines = source_yaml.lines
      start = lines.index { |line| line.match?(/^blueprint:\s*$/) }
      raise KeyError, 'blueprint metadata not found' unless start

      finish = ((start + 1)...lines.length).find do |index|
        lines[index].match?(/^\S[^:]*:\s*(?:#.*)?$/)
      end
      raise KeyError, 'automation body not found' unless finish

      [lines[start...finish].join, lines[finish..].join]
    end

    def input_substitutions(blueprint)
      (blueprint['input'] || {}).each_with_object({}) do |(name, config), result|
        next unless config.is_a?(Hash) && config.key?('default')

        result[name] = config['default']
      end
    end

    def parse_options
      @options.scan(OPTIONS_REGEX).to_h do |name, double_quoted, single_quoted, bare|
        [name, double_quoted || single_quoted || SafeYAML.load(bare)]
      end
    end

    def yaml_scalar(value)
      value.to_yaml.sub(/\A---\s*/, '').strip
    end
  end
end

Liquid::Template.register_tag('blueprint_automation', Jekyll::BlueprintAutomationTag)
