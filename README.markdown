# Home Assistant website

This is the source for the [Home Assistant](https://github.com/balloob/home-assistant) website available at [Home-Assistant.io](https://home-assistant.io).

## Jekyll project to generate and deploy 

| Command | Action |
|---|---|
| `rake preview` | Preview site on [http://127.0.0.1:4000](http://127.0.0.1:4000)
| `rake generate` | Generate new version of the site
| `rake deploy` | Deploy a new version of the site

## Setup local environment for the preview

_You need to have Ruby installed._

```bash
$ git clone --recursive https://github.com/balloob/home-assistant.io.git
$ cd home-assistant.io
$ bundle
$ rake preview
```

## Steps for the deployment of the site 

All developers with write access to the repositories are able to deploy the website-

```bash
$ cd _deploy
$ git pull
$ cd ..
$ rake generate && rake deploy
$ 
```

### Preparation on Fedora and CentOS
On Fedora 22 or CentOS 7.1.1503 Ruby is not available by default. Please take the notes here as a little guide for the Ruby installation process. 

```bash
$ curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
$ curl -L get.rvm.io | bash -s stable
$ source ~/.profile
$ rvm requirements
$ rvm install ruby-2.2.2
$ rvm use ruby-2.2.2 --default
$ ruby -v
```

The last command will give you something like this `ruby 2.2.2p95 (2015-04-13 revision 50295) [x86_64-linux]`. Then install `bundler`.

```bash
$ gem install bundler
```

Now please follow the instruction above.
