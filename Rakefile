require "rubygems"
require "bundler/setup"
require "stringex"
require 'net/http'
require 'json'
require 'time'
require 'fileutils'
require 'yaml'

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
  success = system "rake meetups_data"
  abort("Generating community meetups data failed") unless success
  success = system "rake newsletter_data"
  abort("Generating newsletter data failed") unless success
  success = system "jekyll build"
  abort("Generating site failed") unless success
  # The Astro build runs on every deploy (see astro/README.md). Jekyll
  # builds every route; the routes in astro/served-routes.json are then
  # replaced with Astro's pages, and the whole Astro output is also
  # browsable under the unlinked, noindexed /astro-preview/ path.
  # Previews and CI abort on failure (that is what gates merges), while
  # production deploys only warn: a failed Astro build then publishes
  # Jekyll's version of the served routes instead of blocking the site.
  # pnpm comes from the root devDependencies (npx resolves it there),
  # since Node.js 25+ no longer bundles Corepack.
  astro_env = { "ASTRO_TELEMETRY_DISABLED" => "1" }
  astro_success = system(astro_env, "npx pnpm install --frozen-lockfile", chdir: "astro") &&
                  system(astro_env, "npx pnpm run build", chdir: "astro")
  if ENV["CONTEXT"] == 'production'
    puts "## WARNING: Astro build failed, continuing" unless astro_success
  else
    abort("Generating Astro site failed") unless astro_success
  end
  if astro_success
    # Make the Astro output browsable at /astro-preview/ on every
    # deploy, production included. It is not linked from anywhere and
    # _headers marks the whole path noindex.
    FileUtils.rm_rf("#{public_dir}astro-preview")
    FileUtils.cp_r("astro/dist", "#{public_dir}astro-preview")
    # Astro pages link their bundled stylesheets, scripts and images
    # with root-absolute /_astro/ paths, which is where they belong
    # once Astro serves real routes. Publish that directory at the
    # site root too, or the preview pages lose their styles. The file
    # names are content-hashed, so nothing can clash with Jekyll's
    # output.
    FileUtils.rm_rf("#{public_dir}_astro")
    FileUtils.cp_r("astro/dist/_astro", "#{public_dir}_astro") if File.directory?("astro/dist/_astro")
    # Serve the routes listed in astro/served-routes.json from Astro:
    # their pages replace the ones Jekyll built at the same URL. If the
    # Astro build failed (production only warns), Jekyll's pages stay.
    JSON.parse(File.read("astro/served-routes.json")).each do |route|
      FileUtils.cp("astro/dist/#{route}index.html", "#{public_dir}#{route}index.html")
    end
  end
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
  system "rake meetups_data"
  system "rake newsletter_data"
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

desc "Download upcoming community meetups from web-api.openhomefoundation.org"
task :meetups_data do
  output_file = "#{source_dir}/_data/meetups_data.json"
  # Both Luma calendars end up on the same map on the community page. The
  # calendar key is kept on every event so the map can colour and filter them.
  # Community Day comes first: an event listed on both calendars is a
  # Community Day event (see the uniq below).
  calendars = {
    'ohf-community-day' => 'https://web-api.openhomefoundation.org/events/ohf-community-day',
    'home-assistant-meetups' => 'https://web-api.openhomefoundation.org/events/home-assistant-meetups',
  }
  begin
    now = Time.now.utc
    upcoming = []

    calendars.each do |calendar, url|
      remote_data = JSON.parse(Net::HTTP.get(URI(url)))
      events = remote_data['events']
      raise "#{calendar} payload does not contain an events array" unless events.is_a?(Array)

      upcoming.concat(
        events
          # Only keep web links: the URL ends up in an href on the community page,
          # so schemes such as javascript: must never make it into the data file.
          .select { |event| event['url'].is_a?(String) && event['url'].downcase.start_with?('https://', 'http://') }
          # The map shows a start time for every meetup, so an event without a
          # usable start is dropped rather than rendered as an epoch date. An
          # event that has already begun but hasn't ended yet still counts as
          # upcoming, hence the end date in the comparison.
          .select do |event|
            begin
              Time.parse(event['start'])
              Time.parse(event['end'] || event['start']).utc >= now
            rescue StandardError
              false
            end
          end
          .map do |event|
            {
              'calendar' => calendar,
              'summary' => event['summary'],
              'start' => event['start'],
              # The map expects a list of address lines; upstream occasionally
              # sends a single string instead.
              'address' => (event['address'].is_a?(Array) ? event['address'] : [event['address']])
                .map { |line| line.to_s.strip }
                .reject(&:empty?),
              'url' => event['url'],
              'latitude' => event['latitude'],
              'longitude' => event['longitude'],
            }
          end
      )
    end

    # A Luma event can be listed on both calendars. uniq keeps the first copy,
    # which comes from the Community Day calendar.
    upcoming = upcoming
      .uniq { |event| event['url'] }
      .sort_by { |event| event['start'].to_s }

    File.open(output_file, "w") do |file|
      file.write(JSON.generate(upcoming))
    end
    puts "## Wrote #{upcoming.length} upcoming community meetups"
  rescue StandardError => e
    # Never fail the build over the meetups: fall back to the existing file,
    # or an empty list if none exists yet. The map section falls back to its
    # "host a meetup" state when the list is empty.
    warn "## Downloading community meetups failed, keeping existing file. #{e}"
    File.write(output_file, "[]") unless File.exist?(output_file)
  end
end

desc "Download the latest Open Home Foundation newsletter editions"
task :newsletter_data do
  output_file = "#{source_dir}/_data/newsletter_data.json"
  begin
    require 'rexml/document'

    uri = URI('https://newsletter.openhomefoundation.org/rss/')
    feed = REXML::Document.new(Net::HTTP.get(uri))
    items = REXML::XPath.match(feed, '//channel/item')
    raise "feed does not contain any items" if items.empty?

    # The feed lists the editions newest first; keep that order in the file.
    editions = items.filter_map do |item|
      title = item.elements['title']&.text.to_s.strip
      image = item.elements['media:content']&.attributes&.[]('url').to_s.strip
      # The image URL ends up in the community page markup, so an edition
      # without a web link for its cover is dropped rather than rendered.
      next unless image.start_with?('https://')

      # Ghost serves the original artwork from its storage domain. The resized
      # variants are only available through the newsletter site itself, so
      # point the image at the w960 variant there, which is plenty for the
      # stacked covers on the community page.
      if image.include?('/content/images/')
        image = 'https://newsletter.openhomefoundation.org/content/images/size/w960/' +
                image.split('/content/images/', 2).last
      end

      # The bio page (source/_data/bio.yml) links to the latest edition, so
      # keep its address and date too. The community page ignores them.
      published = item.elements['pubDate']&.text
      {
        'title' => title,
        'image' => image,
        'url' => item.elements['link']&.text.to_s.strip,
        'date' => published && Time.parse(published).utc.iso8601,
      }
    end.first(3)
    raise "feed does not contain any usable editions" if editions.empty?

    File.open(output_file, "w") do |file|
      file.write(JSON.generate(editions))
    end
    puts "## Wrote #{editions.length} newsletter editions"
  rescue StandardError => e
    # Never fail the build over the newsletter: fall back to the existing file,
    # or to the editions that were current when this task was written, so the
    # community page always has artwork to show.
    warn "## Downloading newsletter editions failed, keeping existing file. #{e}"
    unless File.exist?(output_file)
      fallback = [
        {
          'title' => 'Thirteen years of Home Assistant: Leading the way back home',
          'image' => 'https://newsletter.openhomefoundation.org/content/images/size/w960/2026/09/OHF_Newsletter2609_1200x630.png',
        },
        {
          'title' => 'We sow the seeds, you grow the (open) home',
          'image' => 'https://newsletter.openhomefoundation.org/content/images/size/w960/2026/08/OHF_Newsletter2608_1200x630.png',
        },
        {
          'title' => 'The walled garden that’s breaking down barriers',
          'image' => 'https://newsletter.openhomefoundation.org/content/images/size/w960/2026/07/OHF_Newsletter2607_1200x630.png',
        },
      ]
      File.write(output_file, JSON.generate(fallback))
    end
  end
end

desc "Sync integration metadata from a Home Assistant core checkout, like: rake integrations_data CORE=../core"
task :integrations_data do
  core_dir = ENV["CORE"] or abort("Set CORE to the path of a Home Assistant core checkout")
  components_dir = File.join(core_dir, "homeassistant", "components")
  abort("No integrations found in #{components_dir}") unless File.directory?(components_dir)

  # Only the entity platforms core knows about count as platforms, plus
  # diagnostics, so helper modules like `const.py` are never listed.
  platforms = File.read(File.join(core_dir, "homeassistant", "generated", "entity_platforms.py"))
    .scan(/^\s+\w+ = "(\w+)"$/).flatten
  platforms << "diagnostics"

  discovery_methods = %w[bluetooth dhcp homekit mqtt ssdp usb zeroconf]

  output_dir = "#{source_dir}/_data/integrations"
  FileUtils.rm_rf(output_dir)
  FileUtils.mkdir_p(output_dir)

  manifests = Dir[File.join(components_dir, "*", "manifest.json")].sort
  manifests.each do |manifest_file|
    manifest = JSON.parse(File.read(manifest_file))
    integration_dir = File.dirname(manifest_file)

    # Discovery keys hold matchers, an empty list means there are none.
    discovery = discovery_methods.select do |method|
      value = manifest[method]
      value.respond_to?(:empty?) ? !value.empty? : value
    end

    integration_platforms = platforms.select do |platform|
      File.exist?(File.join(integration_dir, "#{platform}.py")) ||
        File.exist?(File.join(integration_dir, platform, "__init__.py"))
    end

    integration = {
      "domain" => manifest["domain"],
      "name" => manifest["name"],
      "integration_type" => manifest["integration_type"],
      "supported_by" => manifest["supported_by"],
      "codeowners" => manifest["codeowners"],
      "config_flow" => manifest["config_flow"],
      "iot_class" => manifest["iot_class"],
      "quality_scale" => manifest["quality_scale"],
      "categories" => manifest["categories"],
      "iot_standards" => manifest["iot_standards"],
      "platforms" => integration_platforms.sort,
      "discovery" => discovery,
    }.reject { |_key, value| value.nil? || value == [] || value == false }

    File.write(File.join(output_dir, "#{manifest['domain']}.json"), JSON.pretty_generate(integration) + "\n")
  end

  FileUtils.cp(
    File.join(core_dir, "homeassistant", "generated", "integration_categories.json"),
    "#{source_dir}/_data/integration_categories.json"
  )

  puts "## Wrote metadata for #{manifests.length} integrations to #{output_dir}"

  Rake::Task[:integration_front_matter].invoke
  Rake::Task[:codeowners].invoke
end

desc "Remove the front matter keys that come from core from the integration pages"
task :integration_front_matter do
  require "jekyll"
  require_relative "plugins/integration_metadata"

  integrations = Dir["#{source_dir}/_data/integrations/*.json"].to_h do |file|
    [File.basename(file, ".json"), JSON.parse(File.read(file))]
  end
  abort("No integration metadata found, run `rake integrations_data` first") if integrations.empty?

  cleaned = 0
  Dir["#{source_dir}/_integrations/*.markdown"].sort.each do |file|
    integration = integrations[File.basename(file, ".markdown")]
    next unless integration

    keys = Jekyll::IntegrationMetadata.synced_keys(integration, integrations)
    _, front_matter, body = File.read(file).split(/^---[ \t]*\n/, 3)

    # Line based, so the rest of the front matter keeps its formatting. A
    # key owns the indented and list lines below it.
    skipping = false
    kept = front_matter.lines.reject do |line|
      skipping = keys.include?(line[/\A([\w-]+):/, 1]) if line.match?(/\A[^\s#-]/)
      skipping
    end
    next if kept.length == front_matter.lines.length

    File.write(file, "---\n#{kept.join}---\n#{body}")
    cleaned += 1
  end

  puts "## Removed front matter that comes from core from #{cleaned} integration pages"
end

CODEOWNERS_HEADER = <<~HEADER
  # This file is generated by `rake codeowners`, do not edit it by hand.
  #
  # People marked here will be automatically requested for a review
  # when the documentation that they own is touched.
  #
  # It is synced with the codebase, so if you own the integration,
  # you will own the docs as well.
  # https://github.com/blog/2392-introducing-code-owners

  # Pages
HEADER

desc "Generate CODEOWNERS from the integration metadata in _data/integrations"
task :codeowners do
  require "jekyll"
  require_relative "plugins/integration_metadata"

  integrations = Dir["#{source_dir}/_data/integrations/*.json"].to_h do |file|
    [File.basename(file, ".json"), JSON.parse(File.read(file))]
  end
  abort("No integration metadata found, run `rake integrations_data` first") if integrations.empty?

  pages = Dir["#{source_dir}/_integrations/*.markdown"].sort.map do |file|
    front_matter = YAML.safe_load(File.read(file).split(/^---\s*$/)[1], permitted_classes: [Date, Time])
    domain = File.basename(file, ".markdown")

    # Core owns the codeowners of its integrations. Pages for integrations
    # that only exist in the docs, like brands, keep their own.
    owners =
      if integrations[domain]
        Jekyll::IntegrationMetadata.resolve(integrations[domain], integrations)["codeowners"]
      else
        front_matter["ha_codeowners"]
      end

    { file: file, domain: front_matter["ha_domain"], main: domain == front_matter["ha_domain"], owners: owners || [] }
  end

  # The main page of an integration decides the owners of its domain.
  owners_by_domain = {}
  pages.sort_by { |page| page[:main] ? 0 : 1 }.each do |page|
    owners_by_domain[page[:domain]] ||= page[:owners] unless page[:owners].empty?
  end

  lines = []

  # Extra pages of an integration, like `sensor.mqtt`, belong to the
  # integration in their `ha_domain`. The filename is no help here:
  # `sensor.mqtt` is about mqtt, while `notify.tts` is about notify.
  pages.each do |page|
    owners = page[:owners].empty? ? owners_by_domain[page[:domain]] : page[:owners]
    lines << "#{page[:file]} #{owners.join(' ')}" if owners
  end

  # Action, trigger and condition pages are named `<domain>.<name>.markdown`.
  %w[_actions _triggers _conditions].each do |folder|
    Dir["#{source_dir}/#{folder}/*.markdown"].sort.each do |file|
      owners = owners_by_domain[File.basename(file).split(".", 2).first]
      lines << "#{file} #{owners.join(' ')}" if owners
    end
  end

  File.write("CODEOWNERS", CODEOWNERS_HEADER + lines.join("\n") + "\n")
  puts "## Wrote CODEOWNERS for #{lines.length} pages"
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