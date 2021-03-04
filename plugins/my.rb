require 'uri'

module Jekyll
  module HomeAssistant
    class My < Liquid::Tag

      def initialize(tag_name, args, tokens)
        super
        if args.strip =~ SYNTAX
          @redirect = Regexp.last_match(1).downcase
          @options = Regexp.last_match(2)
        else
          raise SyntaxError, <<~MSG
            Syntax error in tag 'my' while parsing the following options:

            #{args}

            Valid syntax:
              {% my <redirect> [title="Link name"] [badge] [icon[="icon-puzzle-piece"]] [addon="core_ssh"] [blueprint_url="http://example.com/blueprint.yaml"] [domain="hue"] [service="light.turn_on"] %}
          MSG
        end
      end
  
      def render(context)
        # We parse on render, as we now have context
        options = parse_options(@options, context)
  
        # Base URI
        uri =  URI.join("https://my.home-assistant.io/redirect/", @redirect)

        # Build query string
        query = []
        query += [["addon", options[:addon]]] if options.include? :addon
        query += [["blueprint_url", options[:blueprint_url]]] if options.include? :blueprint_url
        query += [["domain", options[:domain]]] if options.include? :domain
        query += [["service", options[:service]]] if options.include? :service
        unless query.empty?
            uri.query = URI.encode_www_form(query)
        end

        if options[:badge]
          raise ArgumentError, "Badges cannot have custom titles" if options[:title]
          "<a href='#{uri}' class='my badge' target='_blank'>"\
          "<img src='https://my.home-assistant.io/badges/#{@redirect}.svg' />"\
          "</a>"
        else
          title = @redirect.gsub(/_/, ' ').titlecase
          icon = ""

          if options[:title]
            # Custom title
            title = options[:title]
          elsif @redirect == "developer_call_service"
            # Developer service call
            title = "Call Service"
            title = "`#{options[:service]}`" if options.include? :service
          elsif DEFAULT_TITLES.include?(@redirect)
            # Lookup defaults
            title = DEFAULT_TITLES[@redirect]
          end

          if options[:icon]
            raise ArgumentError, "No default icon for redirect #{@redirect}" \
            if !!options[:icon] == options[:icon] and ! DEFAULT_ICONS.include?(@redirect)
              icon = !!options[:icon] == options[:icon] ? DEFAULT_ICONS[@redirect] : @options[:icon]
            icon = "<i class='#{icon}' /> "
          end

          "#{icon}<a href='#{uri}' class='my' target='_blank'>#{title}</a>"
        end
      end

      private

      SYNTAX = %r!^([a-z_]+)((\s+\w+(=([\w\.]+?|".+?"))?)*)$!.freeze
      OPTIONS_REGEX = %r!(?:\w="[^"]*"|\w=[\w\.]+|\w)+!.freeze

      # Default icons when used in in-line text
      DEFAULT_ICONS = {
        "config_flow_start" => "icon-plus-sign",
        "config" => "icon-cog",
        "integrations" => "icon-puzzle-piece",
      }

      # Default title used for in-line text
      DEFAULT_TITLES = {
        "blueprint_import" => "Import Blueprint",
        "cloud" => "Home Assistant Cloud",
        "config_flow_start" => "Add Integration",
        "config_mqtt" => "MQTT Configuration",
        "config_zha" => "ZHA Configuration", 
        "config_zwave_js" => "Z-Wave JS Configuration",
        "config" => "Configuration",
        "developer_events" => "Events",
        "developer_services" => "Services",
        "developer_states" => "States",
        "developer_template" => "Templates",
        "general" => "General Settings",
        "info" => "Information",
        "supervisor_info" => "Supervisor Information",
        "supervisor_snapshots" => "Snapshots",
      }

      def parse_options(input, context)
        options = {}
        return options if input.empty?
        # Split along 3 possible forms: key="value", key=value, or just key
        input.scan(OPTIONS_REGEX) do |opt|
          key, value = opt.split("=")
          if !value.nil? 
            if value&.include?('"')
              value.delete!('"')
            else
              value = context[value]
            end
          end
          options[key.to_sym] = value || true
        end
        options
      end
    end
  end
end

Liquid::Template.register_tag('my', Jekyll::HomeAssistant::My)
