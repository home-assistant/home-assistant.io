---
layout: page
title: "Setup basic information"
description: "Setting up the basic info of Home Assistant."
date: 2015-03-23 12:50
sidebar: true
comments: false
sharing: true
footer: true
---

By default Home Assistant will try to detect your location and will automatically select a temperature unit and time zone based on your location. You can overwrite this by adding the following information to your `configuration.yaml`:

```yaml
homeassistant:
  # Omitted values in this section will be auto detected using freegeoip.io

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

The first thing you will want to add is a password for the web interface. Use your favourite text editor to open `configuration.yaml` and edit the `http` section:

```yaml
http:
  api_password: YOUR_PASSWORD
```

See the [HTTP component documentation](/components/http/) for more options like HTTPS encryption.

### {% linkable_title Setting up your phone or tablet %}

Home Assistant runs as a self-hosted web application and contains support to be added to your home screen. If you're on Android you can follow [the visual guide]({{site_root}}/getting-started/android/). For other devices, open Home Assistant on your mobile browser and tap the add to home screen option.

### {% linkable_title Remote access %}

To make Home Assistant accessible while away from home, you will have to setup port forwarding from your router to port 8123 on the computer that is hosting Home Assistant. Instructions on how to do this can be found by searching `<Router model> port forwarding instructions`.

Some Internet service providers will only offer dynamic IPs. This can cause you to be unable to access Home Assistant while away. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

You should definitely consider to encrypt your traffic if you are accessing your Home Assistant installation from abroad. For details please check the [Set up encryption using Let's Encrypt](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) blog post.

### [Next step: Setting up devices &raquo;](/getting-started/devices/)

