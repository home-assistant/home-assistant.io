---
title: "WalkingPad Treadmill"
description: "Instructions on how to integrate WalkingPad Treadmill into Home Assistant."
ha_category: 
  - Remote
ha_release: 2021.11
ha_iot_class: "Local Polling"
ha_domain: walkingpad
ha_config_flow: true
ha_platforms:
  - remote
---

The `walkingpad` integration allows you to control your WalkingPad treadmill with Home Assistant. Both "Chinese" and "International" versions are supported, with WiFi and Bluetooth connection types correspondingly.
### Supported devices
- A1
- A1 Pro

## "International" version with Bluetooth connection

Before configuring "International" version of WalkingPad you need a Bluetooth backend. Depending on your operating system, you may have to configure the proper Bluetooth backend for your system:

- On [Home Assistant](/hassio/installation/): WalkingPad will work out of the box.
- On [Home Assistant Container](/docs/installation/docker/): Works out of the box with `--net=host` and properly configured Bluetooth on the host.
- On other Linux systems:
  - Preferred solution: Install the `bluepy` library (via pip). When using a virtual environment, make sure to install the library in the right one.
  - Fallback solution: Install `gatttool` via your package manager. Depending on the distribution, the package name might be: `bluez`, `bluetooth`, `bluez-deprecated`

Integration will automatically discover available devices bia Bluetooth.

## "Chinese" version with WiFi connection

To add device you need to configure it with Mi Home App first and find IP address and token. IP address can be found in router settings. To obtain token, please, follow instructions on this page https://python-miio.readthedocs.io/en/latest/discovery.html.  

{% include integrations/config_flow.md %}
