---
layout: page
title: "iTunes support"
description: "Instructions how to integrate iTunes into Home Assistant."
date: 2015-06-22 11:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/itunes.png' class='brand pull-right' />
The iTunes platform allows you to control [iTunes](http://apple.com/itunes/) via [itunes-api](https://github.com/maddox/itunes-api) from Home Assistant.

<p class='note'>
iTunes itself can not be remotely controlled. In order to control your iTunes,
you'll need to install middleware named `itunes-api`. `itunes-api` is a simple REST
server that talks to a local instance of iTunes via Applescript. It's very easy to set up
and run. You can find more about it on it's [GitHub repo](https://github.com/maddox/itunes-api).
</p>


To add iTunes to your installation, add the following to your `configuration.yaml` file:

```
# Example configuration.yaml entry
media_player:
  platform: itunes
  name: iTunes
  host: http://192.168.1.50
  port: 8181
```

Configuration variables:

- **host** *Required*: The URL of the itunes-api API, eg. http://192.168.1.50
- **port** *Optional*: The PORT that itunes-api is running on.
