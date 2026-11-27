# Outgoing links open in a new tab, on every page the site builds:
# header, footer, homepage and landing pages included. The Astro build
# applies the same rules to its pages (astro/src/lib/external-links.mjs).
#
# A link is outgoing when its href starts with "http" and does not lead
# to home-assistant.io or one of its subdomains. An outgoing link gets
# target="_blank" unless it already has a target, and
# rel="external nofollow" (after any rel it has) unless it leads to one
# of the Open Home Foundation's own sites or partners below.
#
# Only the <a> start tags change, so the rest of each page is left
# exactly as rendered. Links in scripts and styles are left alone: they
# are code or data, not markup.
module Jekyll
  module ExternalLinks
    OWN = %r{\Ahttps?://(?:\w+\.)?home-assistant\.io(?:[/:?#]|\z)}i
    TRUSTED = %r{\Ahttps?://(?:\w+\.)?(?:home-assistant\.io|esphome\.io|nabucasa\.com|openhomefoundation\.org|music-assistant\.io|apolloautomation\.com)(?:[/:?#]|\z)}i
    TAGS = %r{<(script|style)\b[^>]*>.*?</\1>|<a\b[^>]*>}im

    def self.attribute(tag, name)
      tag.match(/\s#{name}\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
    end

    def self.value(match)
      match && (match[1] || match[2] || match[3])
    end

    # Rewrites one <a …> start tag.
    def self.link(tag)
      href = value(attribute(tag, "href"))
      return tag if href.nil? || href !~ /\Ahttp/i || href =~ OWN

      result = tag.dup
      result.sub!(/\A<a\b/i, '<a target="_blank"') unless attribute(result, "target")
      unless href =~ TRUSTED
        rel = attribute(result, "rel")
        wanted = [value(rel), "external", "nofollow"].join(" ").split.uniq.join(" ")
        if rel
          result.sub!(rel[0], %( rel="#{wanted}"))
        else
          result.sub!(/\A<a\b/i, %(<a rel="#{wanted}"))
        end
      end
      result
    end

    # Rewrites every link in a page's HTML.
    def self.rewrite(html)
      html.gsub(TAGS) { |match| Regexp.last_match(1) ? match : link(match) }
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == ".html" && doc.output

  doc.output = Jekyll::ExternalLinks.rewrite(doc.output)
end
