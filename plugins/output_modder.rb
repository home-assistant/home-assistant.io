# Jekyll Out Modder - Allows for mangling/modding the HTML output
#
# This is combined in a single plugin/filter to reduce the NokoGiri dom
# parsing to just once per page/content.
#
# - Automatically adds rel='external nofollow' to outgoing links.
# - Automatically make headers linkable
#
require 'jekyll'
require 'nokogiri'

module Jekyll
    module OutputModder
        def output_modder(content)
            dom = Nokogiri::HTML.fragment(content)

            # Find all links, make all external links rel='external nofollow'
            dom.css('a').each do |link|
                rel = ['external', 'nofollow']

                # All external links start with 'http', skip when this one does not
                next unless link.get_attribute('href') =~ /\Ahttp/i

                # Append an external link icon, if there isn't an icon already
                next if link.get_attribute('href') =~ /\Ahttps?:\/\/\w*.?home-assistant.io/i
                next if link.css('iconify-icon').any?

                icon = Nokogiri::XML::Node.new('iconify-icon', dom)
                icon['inline'] = true
                icon['icon'] = 'tabler:external-link'
                icon['class'] = 'external-link'
                link.add_child(icon)

                # Play nice with our own links
                next if link.get_attribute('href') =~ /\Ahttps?:\/\/(?:\w+\.)?(?:home-assistant\.io|esphome\.io|nabucasa\.com|openhomefoundation\.org)/i

                # Play nice with links that already have a rel attribute set
                rel.unshift(link.get_attribute('rel'))

                # Add rel attribute to link
                link.set_attribute('rel', rel.join(' ').strip)
            end

            # Find all headers, make them linkable
            dom.css('h2,h3,h4,h5,h6,h7,h8').each do |header|

                # Skip linked headers
                next if header.at_css('a')

                title = header.content
                slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
                header.children = "#{title} <a class='title-link' name='#{slug}' href='\##{slug}'></a>"
            end

            dom.to_s
        end
    end
end

Liquid::Template.register_filter(Jekyll::OutputModder)
