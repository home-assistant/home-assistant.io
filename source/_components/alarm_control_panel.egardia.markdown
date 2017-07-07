---
layout: page
title: "Egardia / Woonveilig Alarm Control Panel"
description: "Instructions how to integrate Egardia / Woonveilig into Home Assistant."
date: 2016-07-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: egardia.png
ha_release: 0.24
ha_category: Alarm
---

The `egardia` platform enables the ability to control a Egardia / Woonveilig control panel. [egardia.com](http://egardia.com/).
These alarm panels are known under different brand names across the world, including Woonveilig in the Netherlands.

You will need to know the IP of your alarm panel on your local network. Test if you can login to the panel by browsing to the IP address and log in in using your Egardia / Woonveilig account.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: egardia
  host: YOUR_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Required*): the local IP address of the Egardia / Woonveilig alarm panel
- **username** (*Required*): Username for the Egardia / Woonveilig account.
- **password** (*Required*): Password for Egardia / Woonveilig account.
- **port** (*Optional*): The port of the alarm panel (defaults to 80).
