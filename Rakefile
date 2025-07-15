require "rubygems"
require "bundler/setup"
require "stringex"
require 'net/http'
require 'json'

## -- Misc Configs -- ##
public_dir      = "public/"   # compiled site directory
source_dir      = "source"    # source file directory
server_port     = "4000"      # port for preview server eg. localhost:4000

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end

#######################
# Working with Jekyll #
#######################

desc "Generate jekyll site"
task :generate do
  raise "### You haven't set anything up yet. First run `rake install`." unless File.directory?(source_dir)
  puts "## Generating Site with Jekyll"
  success = system "compass compile --css-dir #{source_dir}/stylesheets"
  abort("Generating CSS failed") unless success
  success = system "rake analytics_data"
  abort("Generating analytics data failed") unless success
  success = system "rake alerts_data"
  abort("Generating alerts data failed") unless success
  success = system "rake version_data"
  abort("Generating version data failed") unless success
  success = system "rake language_scores_data"
  abort("Generating language scores data failed") unless success
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
  puts "Starting to watch source with Jekyll and Compass."
  system "compass compile --css-dir #{source_dir}/stylesheets" unless File.exist?("#{source_dir}/stylesheets/screen.css")
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build --watch --incremental")
  compassPid = Process.spawn("compass watch")

  trap("INT") {
    [jekyllPid, compassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, compassPid].each { |pid| Process.wait(pid) }
end

desc "preview the site in a web browser"
task :preview, :listen do |t, args|
  listen_addr = args[:listen] || '127.0.0.1'
  listen_addr = '0.0.0.0' unless ENV['DEVCONTAINER'].nil?
  raise "### You haven't set anything up yet. First run `rake install`." unless File.directory?(source_dir)
  puts "Starting to watch source with Jekyll and Compass."
  puts "Now listening on http://localhost:#{server_port}"
  # Always compile all SCSS files before starting Jekyll
  system "compass compile --css-dir #{source_dir}/stylesheets"
  system "rake analytics_data"
  system "rake version_data"
  system "rake language_scores_data"
  system "rake alerts_data"
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build -t --watch --incremental --limit_posts 0")
  compassPid = Process.spawn("compass watch")
  rackupPid = Process.spawn("rackup --port #{server_port} --host #{listen_addr}")

  trap("INT") {
    [jekyllPid, compassPid, rackupPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, compassPid, rackupPid].each { |pid| Process.wait(pid) }
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

desc "Extract frames from webm videos and save as individual webp images (supports multi-part videos)"
task :extract_video_frames do
  require 'fileutils'
  require 'shellwords'
  source_dir = File.expand_path('source/connect/zwa-2/source-video', Dir.pwd)
  output_dir = File.expand_path('source/connect/zwa-2/video-frames', Dir.pwd)
  FileUtils.mkdir_p(output_dir)

  # Find all base filenames (without -2, -3, etc.)
  video_files = Dir.glob(File.join(source_dir, '*.webm'))
  base_map = Hash.new { |h, k| h[k] = [] }
  video_files.each do |file|
    base = File.basename(file, '.webm').sub(/-\d+$/, '')
    base_map[base] << file
  end

  base_map.each do |base, files|
    files.sort_by! do |f|
      # Sort by suffix number, so base, base-2, base-3, ...
      m = f.match(/-(\d+)\.webm$/)
      m ? m[1].to_i : 0
    end
    frame_idx = 1
    files.each do |webm_file|
      # Get frame count for this video
      probe_cmd = "ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 #{Shellwords.escape(webm_file)}"
      frame_count = `#{probe_cmd}`.to_i
      # Extract frames to temp dir
      temp_dir = File.join(output_dir, "tmp_#{base}")
      FileUtils.mkdir_p(temp_dir)
      system("ffmpeg -c:v libvpx-vp9 -i #{Shellwords.escape(webm_file)} -lossless 1 -c:v libwebp -y #{temp_dir}/frame-%03d.webp")
      # Move and rename frames to output dir
      Dir.glob(File.join(temp_dir, 'frame-*.webp')).sort.each do |frame_file|
        new_name = sprintf("%s-%03d.webp", base, frame_idx)
        FileUtils.mv(frame_file, File.join(output_dir, new_name))
        frame_idx += 1
      end
      FileUtils.rm_rf(temp_dir)
    end
  end
end

# Add extract_video_frames to the build process
desc "Generate jekyll site and extract video frames"
