# Jekyll Out Modder - Allows for mangling/modding the HTML output
#
# This is combined in a single plugin/filter to reduce the NokoGiri dom
# parsing to just once per page/content.
#
# - Automatically make headers linkable
#
# Outgoing links are handled for whole pages by external_links.rb.
#
require 'jekyll'
require 'nokogiri'

module Jekyll
  module OutputModder
    def output_modder(content)
      dom = Nokogiri::HTML.fragment(content)

      # Find all headers, make them linkable with unique slug names
      used_slugs = {}

      dom.css('h2,h3,h4,h5,h6,h7,h8').each do |header|
        # Skip linked headers
        next if header.at_css('a')

        title = header.inner_html
        title_text = header.content

        # Clean the title to create a slug
        base_slug = title_text.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

        # Make slug unique by adding counter if needed
        if used_slugs[base_slug]
          used_slugs[base_slug] += 1
          slug = "#{base_slug}-#{used_slugs[base_slug] - 1}"
        else
          used_slugs[base_slug] = 1
          slug = base_slug
        end

        header.children = "#{title} <a class='title-link' name='#{slug}' href='\##{slug}'></a>"
      end

      dom.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::OutputModder)
