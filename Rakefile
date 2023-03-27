require "rubygems"
require "bundler/setup"
require "stringex"
require 'net/http'
require 'json'

## -- Misc Configs -- ##
public_dir      = "public/"   # compiled site directory
source_dir      = "source"    # source file directory

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :generate do
  # Hand off this rake task to NPM.
  # This rake tasks is here as a backward compatible command and still
  # used by Netlify as long as the old branches are still there.
  # IT also helps with the muscle memory of developers :)
  success = system "npm run build"
  abort("Generating site failed") unless success

  # TODO: Needs to move? Maybe generate it dynamically from the source?
  if ENV["CONTEXT"] != 'production'
    File.open("#{public_dir}robots.txt", 'w') do |f|
      f.write "User-agent: *\n"
      f.write "Disallow: /\n"
    end
  end

  public_dir
end

desc "Watch the site and regenerate when it changes"
task :watch do
  # Hand off this rake task to NPM.
  # This rake tasks is here as a backward compatible command and still
  # used by Netlify as long as the old branches are still there.
  # IT also helps with the muscle memory of developers :)
  jekyllPid = Process.spawn("npm run dev")
  Process.wait(jekyllPid)
end

desc "preview the site in a web browser"
task :preview, :listen do |t, args|
  # Hand off this rake task to NPM.
  # This rake tasks is here as a backward compatible command and still
  # used by Netlify as long as the old branches are still there.
  # IT also helps with the muscle memory of developers :)

  # We used to listen/bind to an host address selectively, this might need
  # to return in the future.
  # listen_addr = args[:listen] || '127.0.0.1'
  # listen_addr = '0.0.0.0' unless ENV['DEVCONTAINER'].nil?
  jekyllPid = Process.spawn("npm run dev")
  Process.wait(jekyllPid)
end

desc "Fetch meta data"
task :fetch_meta_data do
  puts "## Fetching external meta data..."

  puts "Download data from analytics.home-assistant.io..."
  success = system "rake analytics_data"
  abort("Generating analytics data failed") unless success

  puts "Download data from alerts.home-assistant.io..."
  success = system "rake alerts_data"
  abort("Generating alerts data failed") unless success

  puts "Download data from version.home-assistant.io..."
  success = system "rake version_data"
  abort("Generating version data failed") unless success

  puts "Download data from the blueprint exchange @ community.home-assistant.io..."
  success = system "rake blueprint_exchange_data"
  abort("Generating blueprint exchange data failed") unless success
  puts "Done."
end

desc "Download data from analytics.home-assistant.io"
task :analytics_data do
  uri = URI('https://analytics.home-assistant.io/data.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/analytics_data.json", "w") do |file|
    file.write(JSON.generate(remote_data['current']))
  end
end

desc "Download data from alerts.home-assistant.io"
task :alerts_data do
  uri = URI('https://alerts.home-assistant.io/alerts.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/alerts_data.json", "w") do |file|
    file.write(JSON.generate(remote_data))
  end
end


desc "Download version data from version.home-assistant.io"
task :version_data do
  uri = URI('https://version.home-assistant.io/stable.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/version_data.json", "w") do |file|
    file.write(JSON.generate(remote_data))
  end
end

desc "Download data from the blueprint exchange @ community.home-assistant.io"
task :blueprint_exchange_data do
  uri = URI('https://community.home-assistant.io/c/blueprints-exchange/53/l/top.json?period=all')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/blueprint_exchange_data.json", "w") do |file|
    file.write(JSON.generate(remote_data['topic_list']['topics']))
  end
end
