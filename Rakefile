require "rubygems"
require "bundler/setup"
require "stringex"
require 'net/http'
require 'json'


## -- Misc Configs -- ##
public_dir      = "public/"   # compiled site directory
source_dir      = "source"    # source file directory
blog_index_dir  = 'source/blog'    # directory for your blog's index page (if you put your index in source/blog/index.html, set this to 'source/blog')
stash_dir       = "_stash"    # directory to stash posts for speedy generation
integrations_dir  = "_integrations"    #  directory for component files
posts_dir       = "_posts"    # directory for blog files
new_post_ext    = "markdown"  # default new post file extension when using the new_post task
new_page_ext    = "markdown"  # default new page file extension when using the new_page task
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
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
  puts "## Generating Site with Jekyll"
  success = system "compass compile --css-dir #{source_dir}/stylesheets"
  abort("Generating CSS failed") unless success
  success = system "rake analytics_data"
  abort("Generating analytics data failed") unless success
  success = system "rake version_data"
  abort("Generating version data failed") unless success
  success = system "rake blueprint_exchange_data"
  abort("Generating blueprint exchange data failed") unless success
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
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
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
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
  puts "Starting to watch source with Jekyll and Compass."
  puts "Now listening on http://localhost:#{server_port}"
  system "compass compile --css-dir #{source_dir}/stylesheets" unless File.exist?("#{source_dir}/stylesheets/screen.css")
  system "rake analytics_data"
  system "rake version_data"
  system "rake blueprint_exchange_data"
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build -t --watch --incremental")
  compassPid = Process.spawn("compass watch")
  rackupPid = Process.spawn("rackup --port #{server_port} --host #{listen_addr}")

  trap("INT") {
    [jekyllPid, compassPid, rackupPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, compassPid, rackupPid].each { |pid| Process.wait(pid) }
end

# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (defaults to "new-post")
desc "Begin a new post in #{source_dir}/#{posts_dir}"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
  mkdir_p "#{source_dir}/#{posts_dir}"
  filename = "#{source_dir}/#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
    post.puts "comments: true"
    post.puts "categories: "
    post.puts "---"
  end
end

# usage rake new_page[my-new-page] or rake new_page[my-new-page.html] or rake new_page (defaults to "new-page.markdown")
desc "Create a new page in #{source_dir}/(filename)/index.#{new_page_ext}"
task :new_page, :filename do |t, args|
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
  args.with_defaults(:filename => 'new-page')
  page_dir = [source_dir]
  if args.filename.downcase =~ /(^.+\/)?(.+)/
    filename, dot, extension = $2.rpartition('.').reject(&:empty?)         # Get filename and extension
    title = filename
    page_dir.concat($1.downcase.sub(/^\//, '').split('/')) unless $1.nil?  # Add path to page_dir Array
    if extension.nil?
      page_dir << filename
      filename = "index"
    end
    extension ||= new_page_ext
    page_dir = page_dir.map! { |d| d = d.to_url }.join('/')                # Sanitize path
    filename = filename.downcase.to_url

    mkdir_p page_dir
    file = "#{page_dir}/#{filename}.#{extension}"
    if File.exist?(file)
      abort("rake aborted!") if ask("#{file} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
    end
    puts "Creating new page: #{file}"
    open(file, 'w') do |page|
      page.puts "---"
      page.puts "layout: page"
      page.puts "title: \"#{title}\""
      page.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
      page.puts "comments: true"
      page.puts "sharing: true"
      page.puts "footer: true"
      page.puts "---"
    end
  else
    puts "Syntax error: #{args.filename} contains unsupported characters"
  end
end

# usage rake isolate[my-post]
desc "Move all other components and posts than the one currently being worked on to a temporary stash location (stash) so regenerating the site happens much more quickly."
task :isolate, :filename do |t, args|
  stash_dir = "#{source_dir}/#{stash_dir}"
  s_posts_dir = "#{stash_dir}/#{posts_dir}"
  s_integrations_dir = "#{stash_dir}/#{integrations_dir}"
  FileUtils.mkdir(stash_dir) unless File.exist?(stash_dir)
  FileUtils.mkdir(s_posts_dir) unless File.exist?(s_posts_dir)
  FileUtils.mkdir(s_integrations_dir) unless File.exist?(s_integrations_dir)
  Dir.glob("#{source_dir}/#{posts_dir}/*.*") do |post|
    FileUtils.mv post, s_posts_dir unless post.include?(args.filename)
  end
  Dir.glob("#{source_dir}/#{integrations_dir}/*.*") do |component|
    FileUtils.mv component, s_integrations_dir unless component.include?(args.filename)
  end
end

desc "Move all stashed posts back into the posts directory, ready for site generation."
task :integrate do
  FileUtils.mv Dir.glob("#{source_dir}/#{stash_dir}/#{posts_dir}/*.*"), "#{source_dir}/#{posts_dir}/"
  FileUtils.mv Dir.glob("#{source_dir}/#{stash_dir}/#{integrations_dir}/*.*"), "#{source_dir}/#{integrations_dir}/"
end

desc "Clean out caches: .pygments-cache, .gist-cache, .sass-cache"
task :clean do
  rm_rf [Dir.glob(".pygments-cache/**"), Dir.glob(".gist-cache/**"), Dir.glob(".sass-cache/**"), "source/stylesheets/screen.css"]
end

desc "Download data from analytics.home-assistant.io"
task :analytics_data do
  uri = URI('https://analytics.home-assistant.io/data.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/analytics_data.json", "w") do |file|
    file.write(JSON.generate(remote_data['current']))
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
  uri = URI('https://community.home-assistant.io/c/blueprints-exchange/53/l/top/all.json')

  remote_data = JSON.parse(Net::HTTP.get(uri))

  File.open("#{source_dir}/_data/blueprint_exchange_data.json", "w") do |file|
    file.write(JSON.generate(remote_data['topic_list']['topics']))
  end
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def blog_url(user, project)
  url = if File.exists?('source/CNAME')
    "http://#{IO.read('source/CNAME').strip}"
  else
    "http://#{user.downcase}.github.io"
  end
  url += "/#{project}" unless project == ''
  url
end

desc "list tasks"
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts "(type rake -T for more detail)\n\n"
end
