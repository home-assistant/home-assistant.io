require 'cgi'
require 'safe_yaml'

module Jekyll
  class BlueprintExampleTag < Liquid::Tag
    SYNTAX = /^blueprint=(?:"([^"]+)"|'([^']+)')$/
    LOCAL_BLUEPRINT_BASE_URL = 'https://www.home-assistant.io/blueprints/integrations/'
    LOCAL_BLUEPRINT_PATH = /\A[A-Za-z0-9_\/.\-]+\.ya?ml\z/
    DOMAIN_LABELS = {
      'automation' => ['automation', 'Automation YAML'],
      'script' => ['script', 'Script YAML'],
      'template' => ['template entity', 'Template entity YAML'],
    }.freeze

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

      blueprint, body = load_blueprint(context, local_path)
      domain = blueprint.fetch('domain')
      noun, details_title = DOMAIN_LABELS.fetch(domain) do
        raise Jekyll::Errors::FatalException, "Unsupported blueprint domain: #{domain}"
      end

      configuration_yaml = render_configuration_yaml(blueprint, body, domain)

      <<~HTML
        <p>Use the blueprint to create this #{noun}, or use the YAML below to configure it manually.</p>
        #{import_badge}
        #{render_configuration_details(context, details_title, configuration_yaml)}
      HTML
    rescue Errno::ENOENT
      raise Jekyll::Errors::FatalException, "Blueprint file not found: #{local_path}"
    rescue KeyError, Psych::SyntaxError => err
      raise Jekyll::Errors::FatalException, "Unable to render blueprint example #{local_path}: #{err.message}"
    end

    private

    def local_blueprint_path
      return unless @blueprint.match?(LOCAL_BLUEPRINT_PATH)

      "blueprints/integrations/#{@blueprint}"
    end

    def load_blueprint(context, path)
      site = context.registers[:site]
      source = File.realpath(site.source)
      blueprint_root = File.realpath(File.join(source, 'blueprints', 'integrations'))
      blueprint_path = File.realpath(File.join(source, path))

      unless blueprint_path.start_with?("#{blueprint_root}#{File::SEPARATOR}")
        raise Jekyll::Errors::FatalException, 'Blueprint path must be inside source/blueprints/integrations'
      end

      source_yaml = File.read(blueprint_path)
      blueprint_yaml, body = split_blueprint(source_yaml)
      [SafeYAML.load(blueprint_yaml).fetch('blueprint'), body]
    end

    def render_configuration_yaml(blueprint, body, domain)
      substitutions = input_substitutions(blueprint)

      body = body.gsub(/!input\s+([A-Za-z0-9_]+)/) do
        input_name = Regexp.last_match(1)
        yaml_scalar(substitutions.fetch(input_name, "YOUR_#{input_name.upcase}"))
      end

      case domain
      when 'automation', 'script'
        "alias: #{yaml_scalar(blueprint.fetch('name'))}\n#{body.strip}\n"
      when 'template'
        body.strip + "\n"
      end
    end

    def render_configuration_details(context, title, configuration_yaml)
      yaml_html = <<~HTML
        <pre class="language-yaml"><code class="language-yaml">#{CGI.escapeHTML(configuration_yaml)}</code></pre>
      HTML

      render_liquid(
        context,
        <<~LIQUID
          {% details "#{title}" %}

          Replace the placeholder values with values from your Home Assistant instance.

          #{yaml_html}

          {% enddetails %}
        LIQUID
      )
    end

    def split_blueprint(source_yaml)
      lines = source_yaml.lines
      start = lines.index { |line| line.match?(/^blueprint:\s*$/) }
      raise KeyError, 'blueprint metadata not found' unless start

      finish = ((start + 1)...lines.length).find do |index|
        lines[index].match?(/^\S[^:]*:\s*(?:#.*)?$/)
      end
      raise KeyError, 'blueprint domain schema not found' unless finish

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

    def render_liquid(context, source)
      Liquid::Template.parse(source).render!(
        context.environments.first || {},
        registers: context.registers
      )
    end
  end
end

Liquid::Template.register_tag('blueprint_example', Jekyll::BlueprintExampleTag)
