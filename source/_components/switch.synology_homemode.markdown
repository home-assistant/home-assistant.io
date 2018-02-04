---
layout: page
title: "Synology Homemode Switch"
description: "Instructions how to integrate Synology Homemode Switch"
date: 2018-01-31 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: Synology.png
ha_category: Switch
ha_release: 0.60
ha_iot_class: "Local Polling"
---


The `synology_homemode` platform allows you to switch the home mode of your [Synology](https://www.synology.com/) Surveillance Station in Home Assistant.

To enable your Surveillance Station Home Mode in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: synology_homemode
    url: http://yousyno:5000
    username: xxxxxxxx
    password: xxxxxxxx
```

Configuration variables:

- **url** (*Required*): The URL to your synology, including port.
- **username** (*Required*): The username for accessing surveillance station.
- **password** (*Required*): The password for accessing surveillance station.
- **timeout** (*Optional*): The timeout in seconds used when connecting to the Surveillance Station. Defaults to 10.