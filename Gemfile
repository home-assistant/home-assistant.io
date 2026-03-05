source 'https://rubygems.org'

ruby '> 2.5.0'

group :development do
  gem 'rake', '13.3.1'
  gem 'jekyll', '4.4.1'
  gem 'stringex', '2.8.6'
  gem 'sass-embedded', '1.97.3'
  gem 'rubocop', '1.85.0'
  gem 'ruby-lsp', '0.26.7'
  gem 'rackup', '2.3.1'
end

group :jekyll_plugins do
  gem 'jekyll-paginate', '1.1.0'
  gem 'jekyll-sitemap', '1.4.0'
  gem 'jekyll-commonmark', '1.4.0'
  gem 'jekyll-toc', '0.19.0'
end

gem 'sinatra', '4.2.1'
gem 'nokogiri', '1.19.1'
gem 'ostruct', '0.6.1'

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem 'tzinfo', '~> 2.0'
  gem 'tzinfo-data'
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
