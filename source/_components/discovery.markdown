---
layout: page
title: "Discovery"
description: "Instructions how to setup Home Assistant to discover new devices."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---


Home Assistant can discover and automatically configure zeroconf/mDNS and uPnP devices on your network. Currently the `discovery` component can detect:

 * Google Chromecast
 * Belkin WeMo switches
 * Philips Hue
 * Netgear routers
 * Plex Media Server

It will be able to add Google Chromecasts and Belkin WeMo switches automatically, for Philips Hue it will require some configuration from the user.

To load this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
discovery:
```

<p class='note'>
The home-assistant server must be on the same network as the devices for uPnP discovery to work. 
If running home-assistant in a docker container use switch `--net=host` to put it on the host's network.
</p>

If you are developing a new platform, please read [how to make your platform discoverable]({{site_root}}/developers/add_new_platform/#discovery).

<p class='note warning'>
There is currently a <a href='https://bitbucket.org/al45tair/netifaces/issues/17/dll-fails-to-load-windows-81-64bit'>known issue</a> with running this platform on a 64-bit version of Python and Windows.
</p>

<p class='note'>
If you are on Windows and you're using Python 3.5, download the Netifaces dependency <a href='http://www.lfd.uci.edu/~gohlke/pythonlibs/#netifaces'>here</a>.
</p>

<p class='note'>
If you see `Not initializing discovery because could not install dependency netdisco==0.6.1` in the logs, you will need to install the `python3-dev` or `python3-devel` package on your system manually (eg. `sudo apt-get install python3-dev` or `sudo dnf -y install python3-devel`). On the next restart of home-assistant, discovery should work. If you still get an error, check if you have a compiler (`gcc`) available on your system.
</p>
