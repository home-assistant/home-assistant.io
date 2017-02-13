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

By default, Home Assistant will try to detect your location from IP address geolocation. Home Assistant will automatically select a temperature unit and time zone based on this location. You can overwrite this by adding the following information to your `configuration.yaml`:

```yaml
homeassistant:
  # Omitted values in this section will be auto detected using freegeoip.io

  # Location required to calculate the time the sun rises and sets
  latitude: 32.87336
  longitude: 117.22743

  # Impacts weather/sunrise data (altitude above sea level in meters) 
  elevation: 430

  # 'metric' for Metric, 'imperial' for Imperial
  unit_system: metric

  # Pick yours from here:
  # http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: America/Los_Angeles

  # Name of the location where Home Assistant is running
  name: Home
```

### {% linkable_title Password protecting the web interface %}

First, you'll want to add a password for the Home Assistant web interface. Use your favourite text editor to open `configuration.yaml` and edit the `http` section:

```yaml
http:
  api_password: YOUR_PASSWORD
```

<p class='note warning'>
If you decide to expose your Home Assistant instance to the internet and forget to set a password, your installation could be accessed by everybody.
</p>

See the [HTTP component documentation](/components/http/) for more options, such as the use of HTTPS encryption.

### {% linkable_title Setting up your phone or tablet %}

Home Assistant runs as a self-hosted web application and can be pinned to your home screen (with the new W3C standard). If you're on Android, follow [the visual guide]({{site_root}}/getting-started/android/). For other devices, open Home Assistant on your mobile browser and tap the "Add to Home Screen" (or similar) option.
### {% linkable_title Remote access %}

If you're interested in logging in to Home Assistant while away, you'll have to make your instance remotely accessible.

The most common approach is to set up port forwarding from your router to port 8123 on the computer that is hosting Home Assistant. General instructions on how to do this can be found by searching `<router model> port forwarding instructions`.

A problem with making a port accessible is that some Internet Service Providers only offer dynamic IPs. This can cause you to lose access to Home Assistant while away. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

Remember: just putting a port up is not secure. You should definitely consider encrypting your traffic if you are accessing your Home Assistant installation remotely. For details please check the [set up encryption using Let's Encrypt](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) blog post.

If you want the very best security, check out [the instructions how to use Tor to access your home](/cookbook/tor_configuration/).

### [Next step: Setting up devices &raquo;](/getting-started/devices/)
