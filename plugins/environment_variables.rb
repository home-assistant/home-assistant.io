module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      # https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
      # These values will be available as {{ site.NLY_IS_PROD }}
      site.config['NLY_REPOSITORY_URL'] = ENV['REPOSITORY_URL'] || 'https://github.com/home-assistant/home-assistant.github.io'
      site.config['NLY_BRANCH'] = ENV['BRANCH'] || 'current'
      site.config['NLY_CONTEXT'] = ENV['CONTEXT'] || 'production'
      site.config['NLY_IS_PROD'] = site.config['NLY_CONTEXT'] == 'production'
    end
  end
end
