# Validate the `ha_categories` front matter of integration pages against
# the integration categories in source/_data/integration_categories.json,
# with the same rules hassfest applies to the `categories` manifest key.
# The old `ha_category` is not allowed anymore.
# All problems are collected first, so one build shows every one of them.
module Jekyll
  class IntegrationCategoriesValidator < Generator
    safe true
    priority :highest

    MAX_CATEGORIES = 3
    CATEGORIES_FILE = 'source/_data/integration_categories.json'.freeze

    def generate(site)
      known = known_categories(site.data['integration_categories'] || [])

      errors = []
      site.collections['integrations']&.docs&.each do |doc|
        if doc.data.key?('ha_category')
          errors << "#{doc.relative_path}: `ha_category` is replaced by `ha_categories`, see #{CATEGORIES_FILE}"
        end

        categories = doc.data['ha_categories']
        next if categories.nil?

        validate(categories, known).each do |error|
          errors << "#{doc.relative_path}: #{error}"
        end
      end

      return if errors.empty?

      raise ArgumentError, "Invalid ha_categories:\n#{errors.join("\n")}"
    end

    private

    def known_categories(categories)
      categories.each_with_object(Set.new) do |category, known|
        known << category['slug']
        category['subcategories'].each do |subcategory|
          known << "#{category['slug']}.#{subcategory['slug']}"
        end
      end
    end

    def validate(categories, known)
      unless categories.is_a?(Array) && categories.length.between?(1, MAX_CATEGORIES)
        return ['`ha_categories` needs one to three categories']
      end

      errors = []

      categories.tally.each do |category, count|
        errors << "Duplicate category `#{category}`" if count > 1
      end

      categories.uniq.each do |category|
        unless known.include?(category)
          errors << "Unknown category `#{category}`, see #{CATEGORIES_FILE} for the known categories"
        end

        parent, subcategory = category.to_s.split('.', 2)
        if subcategory && categories.include?(parent)
          errors << "Category `#{parent}` is implied by its subcategory `#{category}`, remove `#{parent}`"
        end
      end

      errors
    end
  end
end
