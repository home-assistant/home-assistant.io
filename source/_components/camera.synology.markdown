---
layout: page
title: "Synology Camera"
description: "Instructions on how to integrate Synology Surveillance Station cameras within Home Assistant."
date: 2016-10-13 08:01
sidebar: true
comments: false
sharing: true
footer: true
logo: synology.png
ha_category: Camera
ha_release: 0.31
ha_iot_class: "Local Polling"
---

　
The `synology` camera platform allows you to watch the live streams of your [Synology](https://www.synology.com/) Surveillance Station based IP cameras in Home Assistant.

To enable your Surveillance Station cameras in your installation, add the following to your `configuration.yaml` file:

```yaml
# Minimum configuration.yaml entry
camera:
  - platform: synology
    url: IP_ADDRESS_OF_SYNOLOGY_NAS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **url** (*Required*): The URL to your synology, including port.
- **username** (*Required*): The username for accessing surveillance station.
- **password** (*Required*): The password for accessing surveillance station.
- **timeout** (*Optional*): The timeout in seconds used when connecting to the Surveillance Station. Defaults to 5.
- **whitelist** (*Optional*): A list of which cameras you want to add, the names must be the same as in Surveillance Station.  If omitted all cameras are added.
- **verify_ssl** (*Optional*): True to require a valid certificate, False to disable certificate checking. Defaults to `True`.

A full sample configuration for the `synology` platform is shown below:

```yaml
# Example configuration.yaml entry
camera:
  - platform: synology
    url: https://192.168.1.120:5001
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    timeout: 15
    verify_ssl: False
```

<p class='note'>
Most users will need to set `verify_ssl` to false unless they have installed a valid SSL certificate in place of the built in self-signed certificate.
</p>
