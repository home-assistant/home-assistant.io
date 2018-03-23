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
                rel = ['external', 'nofollow']

                # All external links start with 'http', skip when this one does not
                next unless link.get_attribute('href') =~ /\Ahttp/i

                # Play nice with our own links
                next if link.get_attribute('href') =~ /\Ahttps?:\/\/\w*.?home-assistant.io/i

                # Play nice with links that already have a rel attribute set
                rel.unshift(link.get_attribute('rel'))

                # Add rel attribute to link
                link.set_attribute('rel', rel.join(' ').strip)
            end
            dom.to_s
        end
    end
end

Liquid::Template.register_filter(Jekyll::NoFollow)
