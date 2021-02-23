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
            `
            #{args}

            Valid syntax:
              {% my <redirect> [title="Link name"] [badge] [icon[="icon-puzzle-piece"]] [addon="core_ssh"] [blueprint_url=""] [domain="hue"] %}
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
        unless query.empty?
            uri.query = URI.encode_www_form(query)
        end

        if options[:badge]
          title = options[:title] ? options[:title].gsub(/\ /, '_') : @redirect
          "<a href='#{uri}' class='my badge' target='_blank'>"\
          "<img src='https://img.shields.io/badge/#{title}-my?style=for-the-badge&label=MY&logo=home-assistant&color=41BDF5&logoColor=white' />"\
          "</a>"
        else
          title = options[:title] ? options[:title] : @redirect.gsub(/_/, ' ').titlecase
          icon = ""
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

      DEFAULT_ICONS = {
        "config_flow_start" => "icon-plus-sign",
        "integrations" => "icon-puzzle-piece",
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
