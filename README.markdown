# Home Assistant website

This is the source for the [Home-Assistant.io website](https://home-assistant.io).

## Setup

Setting up to contribute to documentation and the process for submitting pull requests is [explained here](https://home-assistant.io/developers/website/).

## Site preview

In order to make the preview available on [http://127.0.0.1:4000](http://127.0.0.1:4000), use the command as follows:

```bash
$ rake preview
```

### Setup on Fedora and CentOS
On Fedora 22 and later or CentOS 7.1.1503, Ruby is not available by default. Please take the notes here as a little guide for the Ruby installation process. 

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
