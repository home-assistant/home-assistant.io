---
layout: page
title: "Android TV"
description: "Documentation on how to integrate any Android TV / Android device into Home-Assistant"
date: 2018-12-10 01:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Media Player
ha_release: 0.85
ha_iot_class: "Local Polling"
---

```yaml
# Example configuration.yaml entry
media_player:
  # A device that does not require ADB authentication, or uses the generated ADB keys's default location
  - platform: androidtv
    host: 192.168.1.37
    name: MIBOX3
      
  # A device using moved ADB keys
  - platform: androidtv
    host: 192.168.1.37
    name: MIBOX3
    adbkey: /config/adbkey

  # Using an external ADB server to connect to the device
  - platform: androidtv
    host: 192.168.1.37
    name: MIBOX3
    adb_server_ip: 127.0.0.1

  # Custom user-defined "known apps"
  - platform: androidtv
    host: 192.168.1.37
    name: MIBOX3
    apps:
      "amazon": "Amazon Premium Video"
```

{% configuration %}
host:
  description: The IP address of your Android TV device.
  required: true
  type: string
name:
  description: The friendly name of the device.
  required: false
  default: Android
  type: string
port:
  description: The port for your Android TV device.
  required: false
  default: 5555
  type: integer
adbkey:
  description: The path to your `adbkey` file.  Note that the file `adbkey.pub` must be in the same directory.
  required: false
  type: string
adb_server_ip:
  description: The IP of the external ADB server used to communicate to the Android device.
  required: false
  type: string
adb_server_port:
  description: The port of the external ADB server used to communicate to the Android device.
  required: false
  type: port
 apps:
  description: "Dictionary of strings containing custom known apps: if a word is contained in the current app's ID, return the known app name's (see Amazon example above)."
  required: false
  default: {}
  type: dict
{% endconfiguration %}
