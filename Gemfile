source 'https://rubygems.org'

ruby '> 2.5.0'

group :development do
  gem 'rake', '13.0.1'
  gem 'jekyll', '4.1.1'
  gem 'compass', '1.0.3'
  gem 'sass-globbing', '1.1.5'
  gem 'stringex', '2.8.5'
end

group :jekyll_plugins do
  gem 'jekyll-paginate', '1.1.0'
  gem 'jekyll-redirect-from', '0.16.0'
  gem 'jekyll-sitemap', '1.4.0'
  gem 'jekyll-time-to-read', '0.1.2'
  gem 'jekyll-commonmark', '1.3.1'
end

gem 'sinatra', '2.0.8.1'
gem 'nokogiri', '1.10.9'

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem 'tzinfo', '~> 2.0'
  gem 'tzinfo-data'
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
