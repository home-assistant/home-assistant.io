require 'cgi'
require 'safe_yaml'

module Jekyll
  class BlueprintExampleTag < Liquid::Tag
    SYNTAX = /^blueprint=(?:"([^"]+)"|'([^']+)')$/
    LOCAL_BLUEPRINT_BASE_URL = 'https://www.home-assistant.io/blueprints/integrations/'
    LOCAL_BLUEPRINT_PATH = /\A[A-Za-z0-9_\/.\-]+\.ya?ml\z/

    def initialize(tag_name, args, tokens)
      super

      raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
        Syntax error in tag 'blueprint_example'.

        Valid syntax:
          {% blueprint_example blueprint="example.yaml" %}
          {% blueprint_example blueprint="https://community.home-assistant.io/t/example/123" %}
      MSG

      @blueprint = Regexp.last_match(1) || Regexp.last_match(2)
    end

    def render(context)
      local_path = local_blueprint_path
      blueprint_url = local_path ? "#{LOCAL_BLUEPRINT_BASE_URL}#{@blueprint}" : @blueprint
      import_badge = render_liquid(
        context,
        %({% my blueprint_import badge blueprint_url="#{blueprint_url}" %})
      )

      return import_badge unless local_path

      <<~HTML
        <p>Use the blueprint to create this automation in Home Assistant. If you prefer to configure it manually, you can also use the automation YAML below.</p>
        #{import_badge}
        #{render_automation_details(context, local_path)}
      HTML
    end

    private

    def local_blueprint_path
      return unless @blueprint.match?(LOCAL_BLUEPRINT_PATH)

      "blueprints/integrations/#{@blueprint}"
    end

    def render_automation_details(context, path)
      render_liquid(
        context,
        <<~LIQUID
          {% details "Automation YAML" %}

          Replace the placeholder values with entities from your Home Assistant instance.

          {% blueprint_automation "#{path}" %}

          {% enddetails %}
        LIQUID
      )
    end

    def render_liquid(context, source)
      Liquid::Template.parse(source).render!(
        context.environments.first || {},
        registers: context.registers
      )
    end
  end

  class BlueprintAutomationTag < Liquid::Tag
    SYNTAX = /^(?:"|')(blueprints\/integrations\/[A-Za-z0-9_\/.\-]+\.ya?ml)(?:"|')$/

    def initialize(tag_name, args, tokens)
      super

      raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
        Syntax error in tag 'blueprint_automation'.

        Valid syntax:
          {% blueprint_automation "blueprints/integrations/example.yaml" %}
      MSG

      @path = Regexp.last_match(1)
    end

    def render(context)
      site = context.registers[:site]
      source = File.expand_path(site.source)
      blueprint_root = File.join(source, 'blueprints', 'integrations')
      blueprint_path = File.expand_path(File.join(source, @path))

      unless blueprint_path.start_with?("#{blueprint_root}#{File::SEPARATOR}")
        raise Jekyll::Errors::FatalException, 'Blueprint path must be inside source/blueprints/integrations'
      end

      source_yaml = File.read(blueprint_path)
      blueprint_yaml, automation_yaml = split_blueprint(source_yaml)
      blueprint = SafeYAML.load(blueprint_yaml).fetch('blueprint')
      substitutions = input_substitutions(blueprint)

      automation_yaml.gsub!(/!input\s+([A-Za-z0-9_]+)/) do
        input_name = Regexp.last_match(1)
        yaml_scalar(substitutions.fetch(input_name, "YOUR_#{input_name.upcase}"))
      end

      automation_yaml = "alias: #{yaml_scalar(blueprint.fetch('name'))}\n#{automation_yaml.strip}\n"

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

    def yaml_scalar(value)
      value.to_yaml.sub(/\A---\s*/, '').strip
    end
  end
end

Liquid::Template.register_tag('blueprint_example', Jekyll::BlueprintExampleTag)
Liquid::Template.register_tag('blueprint_automation', Jekyll::BlueprintAutomationTag)
