---
layout: page
title: "Configuring Home Assistant"
description: "Configuring Home Assistant."
date: 2015-03-23 12:50
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant will create a configuration folder when it is run for the first time. The location of the folder depends on operating system: on OS X/Linux it's `~/.homeassistant` and on Windows it's `%APPDATA%/.homeassistant`. If you want to use a different folder for configuration, run `hass --config path/to/config`.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains which components will be loaded and what their configuration is. An example configuration file is located [here](https://github.com/balloob/home-assistant/blob/master/config/configuration.yaml.example).

When launched for the first time, Home Assistant will write a default configuration enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the interface.

If you are running into trouble while configuring Home Assistant, have a look at [the configuration troubleshoot page](/getting-started/troubleshooting-configuration/).

<p class='note'>
  You will have to restart Home Assistant for changes in <code>configuration.yaml</code> to take effect.
</p>

### {% linkable_title Setting up the basic info %}

By default Home Assistant will try to detect your location and will automatically select a temperature unit and time zone based on your location. You can overwrite this by adding the following information to your `configuration.yaml`:

```yaml
homeassistant:
  # Omitted values in this section will be auto detected using freegeoip.net

  # Location required to calculate the time the sun rises and sets
  latitude: 32.87336
  longitude: 117.22743

  # C for Celsius, F for Fahrenheit
  temperature_unit: C

  # Pick yours from here:
  # http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: America/Los_Angeles

  # Name of the location where Home Assistant is running
  name: Home
```

### {% linkable_title Password protecting the web interface %}

The first thing you want to add is a password for the web interface. Use your favourite text editor to open the file `/config/configuration.yaml` and add the following to the bottom:

```yaml
http:
  api_password: YOUR_PASSWORD
```

_See the [documentation for the HTTP component][http] for more options like HTTPS encryption._

[http]: /components/http/

### {% linkable_title Setting up your phone or tablet %}

Home Assistant runs as a self hosted web application and contains support to be added to your homescreen. If you're on Android you can follow [the visual guide]({{site_root}}/getting-started/android/). For other devices, open Home Assistant on your mobile browser and tap on the add to homescreen option.

### {% linkable_title Remote access %}

To make Home Assistant accessible while away from home, you will have to setup port forwarding from your router to port 8123 on the computer that is hosting Home Assistant. Instructions on how to do this can be found by searching `<Router model> port forwarding instructions`.

Some internet service providers will only offer dynamic IPs. This can cause you to be unable to access Home Assistant while being remote. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

### [Next step: Setting up devices &raquo;](/getting-started/devices/)
