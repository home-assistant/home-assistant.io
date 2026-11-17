require 'uri'

module Jekyll
  module HomeAssistant
    # Crossposts link out to an article hosted on another site. So their social
    # preview matches the source, this generator derives the Open Graph image
    # from the external URL using the Open Home Foundation dynamic Open Graph
    # endpoint. That way we don't have to copy the source article's image into
    # this repository, the image shows even before the source article is live,
    # and it auto-updates once the article publishes, all without a rebuild.
    #
    # An explicitly set `og_image` in the post front matter always wins.
    class CrosspostOpenGraph < Generator
      safe false
      priority :low

      OG_ENDPOINT = 'https://assets.openhomefoundation.org/opengraph'.freeze

      def generate(site)
        site.posts.docs.each do |post|
          external_url = post.data['external_url']
          next if external_url.nil? || external_url.to_s.empty?

          # Respect an image that was set by hand in the front matter.
          next unless post.data['og_image'].nil? || post.data['og_image'].to_s.empty?

          post.data['og_image'] = og_image_for(external_url)
        end
      end

      private

      # Build the dynamic Open Graph image URL for a crosspost from its source
      # article URL, for example:
      #   https://assets.openhomefoundation.org/opengraph?url=https://www.openhomefoundation.org/blog/slug/
      def og_image_for(external_url)
        "#{OG_ENDPOINT}?url=#{external_url}"
      end
    end
  end
end

