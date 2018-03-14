# Jekyll Auto Nofollow Plugin
# Automatically adds rel='external nofollow' to outgoing links.

require 'jekyll'
require 'nokogiri'

module Jekyll
    module NoFollow
        def nofollow(content)
            dom = Nokogiri::HTML.fragment(content)

            # Find all links
            dom.css('a').each do |link|

                # All external links start with 'http', skip when this one does not
                next unless link.get_attribute('href') =~ /\Ahttp/i

                # Play nice with links that already have a rel attribute set, skip it
                next if link.get_attribute('rel')

                # Play nice with our own links
                next if link.get_attribute('href') =~ /\Ahttps?:\/\/\w*.?home-assistant.io/i

                # Add rel attribute to link
                link.set_attribute('rel', 'external nofollow')
            end
            dom.to_s
        end
    end
end

Liquid::Template.register_filter(Jekyll::NoFollow)
