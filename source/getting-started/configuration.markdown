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

Home Assistant will create a configuration folder when it is run for the first time. The location of the folder differs between operating systems: on OS X and Linux it's `~/.homeassistant` and on Windows it's `%APPDATA%/.homeassistant`. If you want to use a different folder for configuration, run `hass --config path/to/config`.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains which components will be loaded and what their configuration is. This file contains YAML code, which is explained briefly below. [An example configuration file is located here](https://github.com/balloob/home-assistant/blob/master/config/configuration.yaml.example).

When launched for the first time, Home Assistant will write a default configuration file enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the user interface.

If you run into trouble while configuring Home Assistant, have a look at [the configuration troubleshooting page](/getting-started/troubleshooting-configuration/).


<p class='note'>
  You will have to restart Home Assistant each time you make changes in <code>configuration.yaml</code> in order for these to take effect.
</p>

### {% linkable_title YAML %}

Home Assistant uses the [YAML](http://yaml.org/) syntax for configuration. YAML might take a while to get used to but is really powerful in allowing you to express complex configurations.

For each component that you want to use in Home Assistant, you add code in your `configuraton.yaml` file to specify its settings.
The following example entry specifies that you want to use the [notify component](/components/notify) with the [pushbullet platform](/components/notify.pushbullet).


```yaml
notify:
  platform: pushbullet
  api_key: "o.1234abcd"
  name: pushbullet
```

- A **component** provides the core logic for some functionality (like `notify` provides sending notifications). 
- A **platform** makes the connection to a specific software or hardware platform (like `pushbullet` works with the service from pushbullet.com).

The basics of YAML syntax are block collections and mappings containing key-value pairs. Each item in a collection starts with a `-` while mappings have the format `key: value`. If you specify duplicate keys, the last value for a key is used.

Note that indentation is an important part of specifying relationships using YAML. Things that are indented are nested "inside" things that are one level higher. So in the above example, `platform: pushbullet` is a property of (nested inside) the `notify` component.
Getting the right indentation can be tricky if you're not using an editor with a fixed width font. Tabs are not allowed to be used for indentation. Convention is to use 2 spaces for each level of indentation.

Lines that start with **#** are comments and are ignored by the system.

The next example shows an [input_select](/components/input_select) component that uses a block collection for the options values.
The other properties (like name) are specified using mappings. Note that the second line just has `threat:` with no value on the same line. Here threat is the name of the input_select and the values for it are everything nested below it.

```yaml
input_select:
  threat:
    name: Threat level
# A collection is used for options
    options:
     - 0
     - 1
     - 2
     - 3
    initial: 0
```

The following example shows nesting a collection of mappings in a mapping. In Home Assistant, this would create two sensors that each use the MQTT platform but have different values for their `state_topic` (one of the properties used for MQTT sensors). 

```yaml
sensor:
  - platform: mqtt
    state_topic: sensor/topic
  - platform: mqtt
    state_topic: sensor2/topic
```


### {% linkable_title Setting up the basic info %}

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
