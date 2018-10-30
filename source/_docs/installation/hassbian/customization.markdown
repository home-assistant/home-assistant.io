---
layout: page
title: "Customization"
description: "Instructions to flash the Home Assistant Hassbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /docs/hassbian/customization/
---

To allow you to customize your installation further, we have included a tool called `hassbian-config`. This tool comes with a set of suites that can easily be installed or upgraded for easier customization of your Home Assistant installation.
The tool is available by running `hassbian-config`.

### Install scripts
To view the available suites run `hassbian-config show` or have a look at the [hassbian-scripts repository][hassbian-repo].  
These are some of the available suites:  
 - [AppDaemon](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/appdaemon.md)
 - [Duck DNS](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/duckdns.md) _This can also be configured to generate Let's Encrypt SSL certificates_
 - [Homebridge](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/homebridge.md)
 - [Mosquitto](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/mosquitto.md)
 - [Samba](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/samba.md)
 - [Webterminal](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/webterminal.md)
 - Various database engines.
   - [MariaDB](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/mariadb.md)
   - [PostgreSQL](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/postgresql.md)
   - [MS SQL](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/mssql.md)

 To install any of them simply run `sudo hassbian-config install SUITE`.

### Upgrade scripts
To view the available suites run `hassbian-config show` or have a look at the [hassbian-scripts repository][hassbian-repo].  
These are some of the available suites:  
- [AppDaemon](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/appdaemon.md)
- [Hassbian](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/hassbian.md)
- [Home Assistant](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/homeassistant.md)
- [hassbian-config (hassbian-scripts)](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/hassbian_config.md)

To upgrade any of them simply run `sudo hassbian-config upgrade SUITE`.

For more information about this tool have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[cec]: /components/hdmi_cec/
