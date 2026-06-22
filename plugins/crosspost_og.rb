require 'net/http'
require 'uri'
require 'nokogiri'

module Jekyll
  module HomeAssistant
    # Crossposts link out to an article hosted on another site. So their social
    # preview matches the source, this generator fetches the Open Graph image
    # from the external URL at build time. That way we don't have to copy the
    # source article's image into this repository.
    #
    # An explicitly set `og_image` in the post front matter always wins, and a
    # failed fetch never breaks the build, it just falls back to the default
    # social image like any other page.
    class CrosspostOpenGraph < Generator
      safe false
      priority :low

      def generate(site)
        cache = {}
        site.posts.docs.each do |post|
          external_url = post.data['external_url']
          next if external_url.nil? || external_url.to_s.empty?

          # Respect an image that was set by hand in the front matter.
          next unless post.data['og_image'].nil? || post.data['og_image'].to_s.empty?

          image = cache.fetch(external_url) do
            cache[external_url] = fetch_og_image(site, external_url)
          end
          post.data['og_image'] = image if image
        end
      end

      private

      def fetch_og_image(_site, url, redirects_left = 5)
        uri = URI.parse(url)
        return nil unless uri.is_a?(URI::HTTPS)
        response = Net::HTTP.start(
          uri.host, uri.port,
          use_ssl: uri.scheme == 'https',
          open_timeout: 10, read_timeout: 15
        ) do |http|
          http.get(uri.request_uri, 'User-Agent' => 'home-assistant.io build bot')
        end

        case response
        when Net::HTTPRedirection
          return nil if redirects_left <= 0

          location = URI.join(url, response['location']).to_s
          fetch_og_image(site, location, redirects_left - 1)
        when Net::HTTPSuccess
          extract_og_image(url, response.body)
        else
          Jekyll.logger.warn 'Crosspost:', "#{url} returned #{response.code}"
          nil
        end
      rescue StandardError => e
        Jekyll.logger.warn 'Crosspost:', "Could not fetch og:image from #{url} (#{e.message})"
        nil
      end

      def extract_og_image(url, body)
        doc = Nokogiri::HTML(body)
        node = doc.at('meta[property="og:image"]') || doc.at('meta[name="og:image"]')
        image = node && node['content']
        return nil if image.nil? || image.empty?

        # Resolve protocol-relative or path-relative images against the source.
        URI.join(url, image).to_s
      end
    end
  end
end
