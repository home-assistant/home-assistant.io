require "rubygems"
require "bundler/setup"
require "stringex"
require 'net/http'
require 'json'

## -- Misc Configs -- ##
public_dir      = "public/"   # compiled site directory
source_dir      = "source"    # source file directory
server_port     = "4000"      # port for preview server eg. localhost:4000
sass_dir        = "sass"
sass_compile    = "sass #{sass_dir}/:#{source_dir}/stylesheets/ --style=compressed --no-source-map --load-path=#{sass_dir} --quiet-deps"

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end

#######################
# Working with Jekyll #
#######################

desc "Compile SCSS files to CSS"
task :compile_sass do
  success = system sass_compile
  abort("Compiling SCSS failed") unless success
end

desc "Generate jekyll site"
task :generate do
  raise "### You haven't set anything up yet. First run `rake install`." unless File.directory?(source_dir)
  puts "## Generating Site with Jekyll"
  success = system sass_compile
  abort("Generating CSS failed") unless success
  success = system "rake analytics_data"
  abort("Generating analytics data failed") unless success
  success = system "rake alerts_data"
  abort("Generating alerts data failed") unless success
  success = system "rake version_data"
  abort("Generating version data failed") unless success
  success = system "rake language_scores_data"
  abort("Generating language scores data failed") unless success
  success = system "rake codeowners_data"
  abort("Extracting codeowners") unless success
  success = system "rake wwha_data"
  abort("Generating WWHA device data failed") unless success
  success = system "rake allowed_referrers_data"
  abort("Generating allowed referrers data failed") unless success
  success = system "jekyll build"
  abort("Generating site failed") unless success
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
  raise "### You haven't set anything up yet. First run `rake install`." unless File.directory?(source_dir)
  puts "Starting to watch source with Jekyll and Sass."
  system sass_compile unless File.exist?("#{source_dir}/stylesheets/screen.css")
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build --watch --incremental")
  sassPid = Process.spawn("#{sass_compile} --watch")

  trap("INT") {
    [jekyllPid, sassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, sassPid].each { |pid| Process.wait(pid) }
end

desc "preview the site in a web browser"
task :preview, :listen do |t, args|
  listen_addr = args[:listen] || '127.0.0.1'
  listen_addr = '0.0.0.0' unless ENV['DEVCONTAINER'].nil?
  raise "### You haven't set anything up yet. First run `rake install`." unless File.directory?(source_dir)
  puts "Starting to watch source with Jekyll and Sass."
  puts "Now listening on http://localhost:#{server_port}"
  # Always compile all SCSS files before starting Jekyll
  system sass_compile
  system "rake analytics_data"
  system "rake version_data"
  system "rake language_scores_data"
  system "rake codeowners_data"
  system "rake alerts_data"
  system "rake wwha_data"
  system "rake allowed_referrers_data"
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build -t --watch --incremental")
  sassPid = Process.spawn("#{sass_compile} --watch")
  rackupPid = Process.spawn("rackup --port #{server_port} --host #{listen_addr}")

  trap("INT") {
    [jekyllPid, sassPid, rackupPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, sassPid, rackupPid].each { |pid| Process.wait(pid) }
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

desc "Download supported language data from ohf-voice.github.io"
task :language_scores_data do
  uri = URI('https://ohf-voice.github.io/intents/language_scores.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/language_scores.json", "w") do |file|
    file.write(JSON.generate(remote_data))
  end
end

desc "Download device data from works-with.home-assistant.io"
task :wwha_data do
  uri = URI('https://works-with.home-assistant.io/devices.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/wwha_devices.json", "w") do |file|
    file.write(JSON.generate(remote_data))
  end
end

desc "Download referrer allow list from openhomefoundation.org"
task :allowed_referrers_data do
  output_file = "#{source_dir}/_data/allowed_referrers.json"
  begin
    uri = URI('https://www.openhomefoundation.org/allowed-referrers.json')

    remote_data = JSON.parse(Net::HTTP.get(uri))
    raise "payload is not an array of strings" unless remote_data.is_a?(Array) && remote_data.all? { |d| d.is_a?(String) }

    referrers = remote_data
      .map { |d| d.strip.downcase.delete_suffix('.') }
      .reject(&:empty?)

    File.open(output_file, "w") do |file|
      file.write(JSON.generate(referrers))
    end
    puts "## Wrote #{referrers.length} allowed referrer domains"
  rescue StandardError => e
    # Never fail the build over the allow list: fall back to the existing
    # file, or an empty list if none exists yet.
    warn "## Downloading allowed referrers failed, keeping existing file. #{e}"
    File.write(output_file, "[]") unless File.exist?(output_file)
  end
end

desc "Extract CODEOWNERS and output to _data/codeowners.json"
task :codeowners_data do
  codeowners = []
  File.readlines("CODEOWNERS").each do |line|
    next if line.start_with?("#") || line.strip.empty?
    parts = line.split
    next if parts.length < 2
    owners = parts[1..-1]
    owners.each do |owner|
      owner = owner.delete_prefix('@')
      next if owner.include?('/')
      codeowners << owner unless codeowners.include?(owner)
    end
  end

  codeowners.sort!

  File.open("#{source_dir}/_data/codeowners.json", "w") do |file|
    file.write(JSON.generate(codeowners))
  end
end