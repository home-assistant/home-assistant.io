---
title: "Customization"
description: "Instructions to flash the Home Assistant Hassbian image on a Raspberry Pi."
redirect_from: /docs/hassbian/customization/
---

To allow you to customize your installation further, we have included a tool called `hassbian-config`. This tool comes with a set of suites that can easily be installed or upgraded for easier customization of your Home Assistant installation.
The tool is available by running `hassbian-config`.

### Install scripts

To view the available suites run `hassbian-config show` or have a look at the [hassbian-scripts repository][hassbian-repo].
These are some of the available suites:

- [AppDaemon](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/appdaemon.md)
- [Cloud9](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/cloud9.md)
- [Custom Component Store](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/custom-component-store.md)
- [Fail2Ban](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/fail2ban.md) **This suite can't be installed on Raspberry Pi Zero**
- [Duck DNS](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/duckdns.md) _This can also be configured to generate Let's Encrypt SSL certificates_
- [Hue](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/hue.md)
- [Hassbian Manager](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/manager.md) is a web UI tool that can help you manage your suites.
- [Mosquitto](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/mosquitto.md)
- [Pi-hole](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/pihole.md)
- [Razberry](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/razberry.md)
- [Samba](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/samba.md)
- [Trådfri](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/tradfri.md)
- [Webterminal](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/webterminal.md)
- [Zigbee2mqtt](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/zigbee2mqtt.md)
- Various database engines.
  - [MariaDB](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/mariadb.md)
  - [PostgreSQL](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/postgresql.md)
  - [MS SQL](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/mssql.md)

To install any of them simply run `sudo hassbian-config install SUITE`.

### Upgrade scripts

To view the available suites run `hassbian-config show` or have a look at the [hassbian-scripts repository][hassbian-repo].
These are some of the available suites:

- [AppDaemon](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/appdaemon.md)
- [Cloud9](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/cloud9.md)
- [Custom Component Store](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/custom-component-store.md)
- [Hassbian](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/hassbian.md)
- [Hassbian Manager](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/manager.md)
- [Home Assistant](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/homeassistant.md)
- [hassbian-config (hassbian-scripts)](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/hassbian_config.md)
- [Python](https://github.com/home-assistant/hassbian-scripts/blob/master/docs/suites/python.md)

To upgrade any of them simply run `sudo hassbian-config upgrade SUITE`.

For more information about this tool have a look at the [hassbian-scripts repository][hassbian-repo].

[hassbian-repo]: https://github.com/home-assistant/hassbian-scripts
[cec]: /integrations/hdmi_cec/
