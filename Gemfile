source 'https://rubygems.org'

ruby '> 2.5.0'

group :development do
  gem 'rake', '13.1.0'
  gem 'jekyll', '4.3.3'
  gem 'compass', '1.0.3'
  gem 'sass-globbing', '1.1.5'
  gem 'stringex', '2.8.6'
  # > 2.1.0 causes slowdowns https://github.com/sass/sassc-ruby/issues/189
  gem 'sassc', '2.1.0'
  gem 'rubocop', '1.61.0'
  gem 'ruby-lsp', '0.14.4'
  gem 'rackup', '2.1.0'
end

group :jekyll_plugins do
  gem 'jekyll-paginate', '1.1.0'
  gem 'jekyll-sitemap', '1.4.0'
  gem 'jekyll-commonmark', '1.4.0'
  gem 'jekyll-toc', '0.18.0'
end

gem 'sinatra', '4.0.0'
gem 'nokogiri', '1.16.2'

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem 'tzinfo', '~> 2.0'
  gem 'tzinfo-data'
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
