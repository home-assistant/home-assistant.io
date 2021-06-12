---
title: Deluge
description: Instructions on how to integrate Deluge within Home Assistant.
ha_category:
  - Downloading
  - Sensor
  - Switch
ha_release: 0.57
ha_iot_class: Local Polling
ha_domain: deluge
ha_platforms:
  - sensor
  - switch
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Sensor

The `deluge` platform allows you to monitor your downloads with [Deluge](https://deluge-torrent.org/) from within Home Assistant and setup automation based on the information.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: deluge
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
```

{% configuration %}
host:
  required: true
  type: string
  description: This is the IP address of your Deluge daemon, e.g., 192.168.1.32.
port:
  required: false
  type: integer
  description: The port your Deluge daemon uses. Warning, this is not the port of the WebUI.
  default: 58846
name:
  required: false
  type: string
  default: Deluge
  description: The name to use when displaying this Deluge instance.
username:
  required: true
  type: string
  description: Your Deluge daemon username.
password:
  required: true
  type: string
  description: Your Deluge daemon password.
monitored_variables:
  required: true
  type: list
  description: Conditions to display in the frontend.
  keys:
    current_status:
      description: The status of your Deluge daemon.
    download_speed:
      description: The current download speed.
    upload_speed:
      description: The current upload speed.
  {% endconfiguration %}

## Switch

The `deluge` switch platform allows you to control your [Deluge](https://deluge-torrent.org/) client from within Home Assistant. The platform enables you switch all your torrents in pause, and then unpause them all.

To add Deluge to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: deluge
  host: IP_ADDRESS
  username : USERNAME
  password : PASSWORD
```

{% configuration %}
host:
  required: true
  type: string
  description: This is the IP address of your Deluge daemon, e.g., 192.168.1.32.
username:
  required: true
  type: string
  description: Your Deluge username, if you use authentication.
password:
  required: true
  type: string
  description: Your Deluge password, if you use authentication.
port:
  required: false
  type: integer
  default: 58846
  description: "The port your Deluge daemon uses. (Warning: This is not the port of the WebUI.)"
name:
  required: false
  type: string
  default: Deluge Switch
  description: The name to use when displaying this Deluge instance.
{% endconfiguration %}
