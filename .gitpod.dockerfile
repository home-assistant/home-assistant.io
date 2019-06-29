FROM gitpod/workspace-full:latest
RUN gem install bundler -v 2.0.1
RUN bundle install
