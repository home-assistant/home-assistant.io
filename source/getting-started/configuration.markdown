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

Home Assistant will create a configuration folder when it is run for the first time. Depending on your operating system this is `~/.homeassistant` (OS X/Linux) or `%APPDATA%/.homeassistant` (Windows). If you want to use a different folder for configuration, run `hass --config path/to/config`.</p>

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains which components will be loaded and what their configuration is. An example configuration file is located at [`here`](https://github.com/balloob/home-assistant/blob/master/config/configuration.yaml.example).

When launched for the first time, Home Assistant will write a default configuration enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the interface.

If you are running into troubles while configuring Home Assistant, have a look at [the configuration troubleshoot page](/getting-started/troubleshooting-configuration.html).

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

```
http:
  api_password: YOUR_PASSWORD
```

### {% linkable_title Adding devices and services %}

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Netgear routers,
Belkin WeMo switches and Philips Hue bridges in your network if you have
[the discovery component]({{site_root}}/components/discovery.html) enabled (which is by default).

Not all devices can be discovered, so if you have any of the following devices or services, please see their respective pages for installation instructions:

 * [Device tracking]({{site_root}}/components/device_tracker.html)
 * [ISY994 controller]({{site_root}}/components/isy994.html)
 * [Nest thermostat]({{site_root}}/components/thermostat.html)
 * [Notifications]({{site_root}}/components/notify.html)
 * [SABnzbd](/blog/2015/03/22/release-notes/#sabnzbd)
 * [TellStick](/components/tellstick.html)
 * [Wink hub]({{site_root}}/components/wink.html)
 * [Add support for your own device or service]({{site_root}}/developers/add_new_platform.html)

See the [components overview page](/components/) for a complete list of supported devices.

### {% linkable_title Grouping devices %}

Once you get a bunch of devices set up, it is time to organize them. This can be done using groups.
Each group exists of a name and a list of entity IDs. Entity IDs can be retrieved from the web interface
by using the Set State page in the Developer Tools (one in the middle).


```yaml
group:
  living_room: light.table_lamp, switch.ac
  bedroom:
    - light.bedroom
    - media_player.nexus_player
```

### {% linkable_title Customizing devices and services %}

By default, most of your devices will be visible on the Home Assistant States
page and have a default icon determined by their domain. You may find it
desireable to customize the look and feel of your front page by altering some
of these parameters.

By adding the following parameters to the `homeassistant:` section of your
`configuration.yaml`, you can customize the attributes of any state on
your front page.

```yaml
homeassistant:

    # Add this to your existing configuration

    customize:
        some.entity_id:
            hidden: true
            entity_picture: http://URL.TO/PICTURE
            friendly_name: SOME CUSTOM NAME
```

<p class='note'>Customizations are currently unavailable for device tracker entities.</p>

### {% linkable_title Setting up Home Automation %}

When all your devices are set up it's time to put the cherry on the pie: automation. There are many ways to automate your home with Home Assistant so we have divided it into a couple of topics:

 * [Automatic light control based on the sun and if people are home]({{site_root}}/components/device_sun_light_trigger.html) (built-in component)
 * [Intruder alerts]({{site_root}}/components/simple_alarm.html) (built-in component)
 * [Setup your own automation rules]({{site_root}}/components/automation.html) (using configuration file)
 * [Create your own automation component]({{site_root}}/developers/creating_components.html) (writing Python code)

### {% linkable_title Setting up your phone or tablet %}

Home Assistant runs as a self hosted web application. Home Assistant contains support to be added to your homescreen. If you're on Android you can follow [the visual guide]({{site_root}}/getting-started/android.html). For other devices, open Home Assistant on your mobile browser and click on the add to homescreen option.
