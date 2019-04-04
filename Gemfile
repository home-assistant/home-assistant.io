source "https://rubygems.org"

ruby "> 2.3.0"

group :development do
  gem 'rake', '~> 10.0'
  # 3.8.5 throws errors on unfinished liquid tags in excerpts
  # Wait with upgrade until release https://github.com/jekyll/jekyll/pull/7382
  gem 'jekyll', '3.8.4'
  gem 'compass', '~> 0.12'
  gem 'sass-globbing', '~> 1.0'
  gem 'stringex', '~> 1.4'
  gem 'pry'

  # See https://github.com/home-assistant/home-assistant.github.io/pull/3904
  gem 'rb-inotify', '< 0.9.9'
end

group :jekyll_plugins do
  gem 'jekyll-paginate'
  gem 'jekyll-redirect-from'
  gem 'jekyll-sitemap'
  gem 'jekyll-time-to-read'
  gem 'octopress', '~> 3.0'
  gem 'octopress-include-tag'
end

gem 'sinatra', '~> 1.4.2'
gem 'nokogiri'
