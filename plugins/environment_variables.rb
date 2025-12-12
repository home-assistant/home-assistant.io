module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)

      # https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
      repository_url = ENV['REPOSITORY_URL'] || 'https://github.com/home-assistant/home-assistant.io'

      # Rewrite urls if repo url is the ssh format.
      if repository_url.start_with? 'git@github.com:'
        repository_url = repository_url.sub 'git@github.com:', 'https://github.com/'
      end

      # Figure out deployment URL
      url = site.config['url']
      if ENV['context'].eql?('production')
        url = ENV['URL'] || url
      elsif ENV['context'].eql?('branch-deploy')
        url = ENV['DEPLOY_URL'] || url
      end
      url = url.chomp('/')

      # These values will be available as {{ site.netlify.* }}
      site.config['netlify'] = {
        'repository_url' => repository_url,
        'branch' => ENV['BRANCH'] || 'current',
        'commit' => ENV['COMMIT_REF'] || '',
        'head' => ENV['HEAD'] || 'current',
        'url' => url,
        'pull_request' => ENV['PULL_REQUEST'].eql?('true'),
      }
    end
  end
end
