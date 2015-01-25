---
layout: page
title: "Getting Started"
description: "Step by step guide to get started with Home Assistant."
date: 2014-12-18 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

Installing and running Home Assistant is easy. Make sure you have [Python 3.4](https://www.python.org/downloads/) and [git](http://git-scm.com/downloads) installed and execute the following code in a console:

```bash
git clone --recursive https://github.com/balloob/home-assistant.git
cd home-assistant
python3 -m pip install -r requirements.txt
python3 -m homeassistant --open-ui
```

Running these commands will:

1. Download Home Assistant
2. Navigate to downloaded files
3. Install the dependencies
4. Launch Home Assistant and serve web interface on [http://localhost:8123](http://localhost:8123)

If you run into any issues, please see the [troubleshooting page]({{site_root}}/getting-started/troubleshooting.html).

<p class='note'>
  You can run Home Assistant in demo mode by appending <code>--demo-mode</code> to line 4.
</p>

<p class='note'>
  If you want to update to the latest version in the future, run: <code>scripts/update</code>.
</p>

If you're using Docker, you can use
```bash
docker run -d --name="home-assistant" -v /path/to/homeassistant/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

## Configuring Home Assistant

The configuration for Home Assistant lives by default in the `config` folder. The file `home-assistant.conf` is the main file that contains which components will be loaded and what their configuration is. An example configuration file is located at [`config/home-assistant.conf.example`](https://github.com/balloob/home-assistant/blob/master/config/home-assistant.conf.example).

When launched for the first time, Home Assistant will write a default configuration enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the interface.

<p class='note'>
  You will have to restart Home Assistant for changes in <code>home-assistant.conf</code> to take effect.
</p>

### Password protecting the web interface

The first thing you want to add is a password for the web interface. Use your favourite text editor to open the file `/config/home-assistant.conf`. Look for the line that says `[http]` and add the line `api_password=YOUR_PASSWORD` below. Your configuration should now look like this:

```
[http]
api_password=YOUR_PASSWORD

[discovery]
```

<p class='note'>
You can append <code>?api_password=YOUR_PASSWORD</code> to any url to log in automatically.
</p>

### Adding devices and services

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Belkin WeMo switches and Philips Hue bridges in your network if you have [the discovery component]({{site_root}}/components/discovery.html) enabled (which is by default).

Not all devices can be discovered, so if you hae any of the following devices or services, please see their respective pages for installation instructions:

 * [Nest thermostat]({{site_root}}/components/thermostat.html)
 * [Wink hub]({{site_root}}/components/wink.html)
 * [PushBullet]({{site_root}}/components/notify.html)
 * [Device tracking]({{site_root}}/components/device_tracker.html)
 * [Sun]({{site_root}}/components/sun.html)
 * [Add support for your own device or service]({{site_root}}/developers/add_new_platform.html)

### Setting up Home Automation

When all your devices are set up it's time to put the cherry on the pie: automation. There are many ways to automate your home with Home Assistant so we have divided it into a couple of topics:

 * [Automatic light control based on the sun and if people are home]({{site_root}}/components/device_sun_light_trigger.html) (built-in component)
 * [Intruder alerts]({{site_root}}/components/simple_alarm.html) (built-in component)
 * [Setup your own automation rules]({{site_root}}/components/automation.html) (using configuration file)
 * [Create your own automation component]({{site_root}}/developers/creating_components.html) (writing Python code)
