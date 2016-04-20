# Home Assistant website

This is the source for the [Home-Assistant.io website](https://home-assistant.io) for the [Home Assistant project](https://github.com/home-assistant/home-assistant)

## Setup

Setting up to contribute to documentation and the process for submitting pull requests is [explained here](https://home-assistant.io/developers/website/).

## Create a new blog post

```bash
$ rake new_post["title"]
```

## Site preview

```bash
$ rake preview
```

This makes the preview available on [http://127.0.0.1:4000](http://127.0.0.1:4000).


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

Now you can follow the [setup instructions](https://home-assistant.io/developers/website/).
