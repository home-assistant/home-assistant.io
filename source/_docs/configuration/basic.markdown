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

