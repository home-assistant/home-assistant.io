module Jekyll
  class SitePagesGenerator < Jekyll::Generator
    def generate(site)
      all_pages = Array.new

      site.collections.each do |name, collection|
        all_pages.concat(collection.docs)
      end

      site.data["site_pages"] = all_pages
        .concat(site.pages)
        .concat(site.documents)
        .map { |entry| 
          [
            entry.url.to_s,
            {
              "title" => entry["title"],
              "description" => entry["description"],
              "url" => entry.url,
              "relative_path" => entry.relative_path
            }
          ] 
        }
        .to_h
    end
  end
end