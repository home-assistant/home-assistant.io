module Jekyll
  module AssetFilter
    # Octopress filters
    # Copyright (c) 2014 Brandon Mathis

    # MIT License

    # Permission is hereby granted, free of charge, to any person obtaining
    # a copy of this software and associated documentation files (the
    # "Software"), to deal in the Software without restriction, including
    # without limitation the rights to use, copy, modify, merge, publish,
    # distribute, sublicense, and/or sell copies of the Software, and to
    # permit persons to whom the Software is furnished to do so, subject to
    # the following conditions:

    # The above copyright notice and this permission notice shall be
    # included in all copies or substantial portions of the Software.

    # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    # EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    # MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    # NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    # LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    # OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION

    def site_url
      'https://home-assistant.io'
    end

    # Prepend a url with the full site url
    #
    # input - a url
    #
    # Returns input with all urls expanded to include the full site url
    # e.g. /images/awesome.gif => http://example.com/images/awesome.gif
    #
    def full_url(input)
      expand_url(input, site_url)
    end

    # Prepends input with a url fragment
    #
    # input - An absolute url, e.g. /images/awesome.gif
    # url   - The fragment to prepend the input, e.g. /blog
    #
    # Returns the modified url, e.g /blog
    #
    def expand_url(input, url=nil)
      url ||= root

      url = if input.start_with?("http", url)
        input
      else
        File.join(url, input)
      end

      smart_slash(url)
    end

    # Ensure a trailing slash if a url ends with a directory
    def smart_slash(input)
      if !(input =~ /\.\w+$/)
        input = File.join(input, '/')
      end
      input
    end

    # Convert url input into a standard canonical url by expanding urls and
    # removing url fragments ending with `index.[ext]`
    def canonical_url(input)
      full_url(input).sub(/index\.\w+$/i, '')
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
