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
      'https://www.home-assistant.io'
    end

    # Prepend a url with the full site url
    #
    # input - a url
    #
    # Returns input with all urls expanded to include the full site url
    # e.g., /images/awesome.gif => http://example.com/images/awesome.gif
    #
    def full_url(input)
      expand_url(input, site_url)
    end

    # Prepends input with a url fragment
    #
    # input - An absolute url, e.g., /images/awesome.gif
    # url   - The fragment to prepend the input, e.g., /blog
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

    # Sort an array of semvers
    def group_components_by_release(input)
      input.group_by { |v|
        raise ArgumentError, "ha_release must be set in #{v.basename}" if v["ha_release"].nil?
        release_str = v["ha_release"].to_s
        if release_str == "pre 0.7"
          release_str = "0.7"
        end
        release_str
      }.map{ |v|
        version = v[0]

        begin
          gem_ver = Gem::Version.new(version).to_s
        rescue
          raise ArgumentError, "Error when parsing ha_release #{version} in #{v.path}."
        end

        { "label" => version, "new_components_count" => v[1].count, "sort_key" => gem_ver }
      }.sort_by { |v| Gem::Version.new(v["sort_key"]) }.reverse.group_by { |v|
        version = v["label"]

        split_ver = version.split('.')
        major = split_ver[0]
        minor = split_ver[1]

        if major.length == 4 || minor.length == 1
          "#{major}.X"
        else
          "#{major}.#{minor.chop}X"
        end
      }.map { |v|
        sort_key = v[1][-1]["sort_key"]

        total_new_components = 0

        v[1].each do |vers|
          total_new_components += vers["new_components_count"]
        end

        { "label" => v[0], "versions" => v[1], "new_components_count" => total_new_components, "sort_key" => sort_key }
      }.sort_by { |v| Gem::Version.new(v["sort_key"]) }.reverse
    end

    # Get version N behind current
    # input is output of group_components_by_release
    def version_behind(input, n)
      input.each do |group|
        if group["versions"].length > n
          return group["versions"][n]
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
