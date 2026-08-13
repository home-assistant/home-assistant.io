require 'digest/md5'

# Write the generated template function, action, trigger, and condition
# lookup data to a single static JavaScript file instead of inlining it
# into every page.
#
# The four JSON blobs together are roughly 500 KB. Inlined through
# scripts.html they were repeated in every generated page, which added
# gigabytes to the build output and made every visitor download the data
# again on each page view. As a static file it is generated once and
# cached by the browser.
#
# The file name carries a content hash, so browsers can cache it forever
# and still pick up new data immediately after a deploy. scripts.html
# reads the URL from site.data['doc_data_js_path'].
#
# Runs at priority :lowest so it executes after the :low generators that
# produce the JSON (doc_collections_data.rb and template_functions_data.rb).
module Jekyll
  class DocDataFileGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      content = <<~JS
        window.__templateFunctions = #{site.data['template_functions_json']};
        window.__actions = #{site.data['actions_json']};
        window.__triggers = #{site.data['triggers_json']};
        window.__conditions = #{site.data['conditions_json']};
      JS

      digest = Digest::MD5.hexdigest(content)[0, 12]
      file_name = "doc-data-#{digest}.js"

      page = PageWithoutAFile.new(site, site.source, 'static', file_name)
      page.content = content
      page.data['layout'] = nil
      page.data['render_with_liquid'] = false
      page.data['sitemap'] = false
      site.pages << page

      site.data['doc_data_js_path'] = "/static/#{file_name}"
    end
  end
end
