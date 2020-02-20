---
title: Ubiquiti airCube
description: Instructions on how to integrate Ubiquiti airCube routers into Home Assistant.
logo: ubiquiti.png
ha_category:
  - Presence Detection
ha_release: 0.106
---


This platform allows you to detect presence by looking at devices connected to a [Ubiquiti airCube](https://www.ui.com/accessories/aircube/). This device tracker only allows tracking of wireless clients.

To use this device tracker in your installation, add the following to your `configuration.yaml` file (please see note on SSL below):

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aircube
    host: YOUR_AP_IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP address of your Ubiquiti airCube.
  required: true
  type: string
username:
  description: The web portal device username used to connect to your Ubiquiti airCube.
  required: true
  type: string
password:
  description: The web portal device password used to connect to your Ubiquiti airCube.
  required: true
  type: string
verify_ssl:
  description: If SSL/TLS verification for HTTPS resources needs to be turned off (for self-signed certs, etc.)
  required: false
  type: boolean
  default: true
{% endconfiguration %}

Note on SSL: The verify_ssl flag must currently be set to `False` as the certificate on the device cannot easily be updated. The device runs a modified version of OpenWrt with SSH disabled. While certificates can be managed in OpenWrt, Ubiquiti, in violation of the GPL, has not released the source code for the airCube.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
