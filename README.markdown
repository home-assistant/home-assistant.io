# Home Assistant website

This is the source for the [Home Assistant](https://github.com/balloob/home-assistant) website available at [Home-Assistant.io](https://home-assistant.io). All commits made to the `master` branch will be automatically pushed to production.

Please point your Pull Request (PR) at the `next` branch.

## Preview Jekyll website locally

| Command | Action |
|---|---|
| `rake preview` | Preview site on [http://127.0.0.1:4000](http://127.0.0.1:4000)

## Setup

_You need to have Ruby installed._

- [Ruby installation instructions](https://www.ruby-lang.org/en/documentation/installation/)
- For Fedora and CentOS check the last section of this file.

```bash
$ git clone --recursive https://github.com/balloob/home-assistant.io.git
$ cd home-assistant.io
$ bundle
```

### Setup on Fedora and CentOS
On Fedora > 22 or CentOS 7.1.1503 Ruby is not available by default. Please take the notes here as a little guide for the Ruby installation process. 

```bash
$ curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
$ curl -L get.rvm.io | bash -s stable
$ source ~/.profile
$ rvm requirements
$ rvm install ruby-2.2.3
$ rvm use ruby-2.2.3 --default
$ ruby -v
```

The last command will give you something like this `ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-linux]`. Then install `bundler`.

```bash
$ gem install bundler
```

Now please follow the Setup instructions above.
