module Jekyll
  class DetailsBlock < Liquid::Block

    def initialize(tag_name, args, tokens)
      super
      @details_idx = 1

      raise SyntaxError, <<~MSG unless args.strip =~ SYNTAX
        Syntax error in tag 'details' while parsing the following options:

        #{args}

        Valid syntax:
          {% details <title> [icon="iconify icon identifier"] %}
      MSG

      @title = Regexp.last_match(1)
      @options = Regexp.last_match(2)
    end

    def render(context)
      # We parse on render, as we now have context
      options = parse_options(@options, context)

      contents = super(context)
      title = if @title.nil? || @title.empty? then
        "More information"
      else
        @title
      end
      title = title.to_s.delete("\"")

      idx = context["details_idx"]
      idx = 0 if idx.nil?
      context["details_idx"] = idx + 1

      icon = ""
      if options.include? :icon
        icon = "<iconify-icon inline icon='#{options[:icon]}'></iconify-icon> "
      end

      <<~MARKUP
        <div class="details-block">
          <details class='details-block-item'>
            <summary class='details-block-title'>
              <span>#{icon}#{title}</span>
              <div class='details-block-arrow'>
              <svg class="down" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
              <svg class="up" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
              </div>
            </summary>
            <div class='details-block-content' id="content_#{idx}">#{contents}</div>
          </details>
        </div>
      MARKUP
    end

    private

    SYNTAX = /^(".+?")((\s+\w+(=([\w\.]+?|".+?"))?)*)$/
    OPTIONS_REGEX = /(?:\w="[^"]*"|\w=[\w\.]+|\w)+/

    def parse_options(input, context)
      options = {}
      return options if input.empty?

      # Split along 3 possible forms: key="value", key=value, or just key
      input.scan(OPTIONS_REGEX) do |opt|
        key, value = opt.split("=")
        unless value.nil?
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

Liquid::Template.register_tag('details', Jekyll::DetailsBlock)