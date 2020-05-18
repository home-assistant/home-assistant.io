module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      # https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
      repo_url = ENV['REPOSITORY_URL'] || 'https://github.com/home-assistant/home-assistant.io'

      # Rewrite urls if repo url is the ssh format.
      if repo_url.start_with? 'git@github.com:'
        repo_url = repo_url.sub 'git@github.com:', 'https://github.com/'
      end

      # These values will be available as {{ site.NLY_REPOSITORY_URL }}
      site.config['NLY_REPOSITORY_URL'] = repo_url
      site.config['NLY_HEAD'] = ENV['HEAD'] || 'current'
    end
  end
end
