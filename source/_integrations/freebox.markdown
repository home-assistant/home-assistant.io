---
title: Freebox
description: Instructions on how to integrate Freebox routers into Home Assistant.
ha_category:
  - Alarm
  - Camera
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Polling
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
ha_config_flow: true
ha_domain: freebox
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - device_tracker
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: integration
---

The `freebox` integration allows you to observe and control [Freebox router](https://www.free.fr/freebox/).

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor) with metrics for connection speed, internal temperature, free partition space and missed calls
- [Binary sensor](#binary-sensor) for monitoring Raid arrays health
- [Device tracker](#presence-detection) for connected devices
- [Switch](#switch) to control Wi-Fi
- [Camera](#camera)
- [Binary sensors](#binary)
- [Alarm_control_panel](#alarm-control-panel)
  
{% include integrations/config_flow.md %}

You can find out your Freebox host and port by opening this address <http://mafreebox.freebox.fr/api_version> in your browser.
The returned JSON should contain an `api_domain` (`host`) and a `https_port` (`port`).
Please consult the [API documentation](https://dev.freebox.fr/sdk/os/) for more information.

{% tip %}

The `host` (ex: xxxxxxxx.fbxos.fr) and `port` given by <http://mafreebox.freebox.fr/api_version> refers to your Freebox public IP address and may not work if your Home Assistant server is located inside your local LAN. For local API access, you can alternatively use `host` = *mafreebox.freebox.fr* and `port` = *443*.

{% endtip %}

### Initial setup

{% important %}

You must have set a password for your Freebox router web administration page. Enable the option "Permettre les nouvelles demandes d'associations" and check that the option "Accès à distance sécurisé à Freebox OS" is active in "Gestion des ports" > "Connexions entrantes".

{% endimportant %}

The first time Home Assistant will connect to your Freebox, you will need to authorize it by pressing the right arrow on the facade of the Freebox when prompted to do so.

To make the Wi-Fi switch and the reboot action working, you will have to add "Modification des réglages de la Freebox" permission to Home Assistant application in "Paramètres de la Freebox" > "Gestion des accès" > "Applications".

To use cameras from the Freebox Delta, you will have to add "Gestion de l'alarme et maison connectée" permission to Home Assistant application in "Paramètres de la Freebox" > "Gestion des accès" > "Applications".

### Supported routers

Only the routers with Freebox OS are supported:

- Freebox V8 also known as Freebox Pop
- Freebox V7 also known as Freebox Delta
- Freebox V6 also known as Freebox Revolution
- Freebox mini 4k

## Presence detection

This platform offers presence detection by keeping track of the devices connected to a [Freebox](https://www.free.fr/freebox/) router.

### Notes

Note that the Freebox waits for some time before marking a device as
inactive, meaning that there will be a small delay (1 or 2 minutes)
between the time you disconnect a device and the time it will appear
as "away" in Home Assistant. You should take this into account when specifying
the `consider_home` parameter.
On the contrary, the Freebox immediately reports devices newly connected, so
they should appear as "home" almost instantly, as soon as Home Assistant
refreshes the devices states.

## Sensor

This platform offers you sensors to monitor a Freebox router.
The monitored metrics are:
- Internal temperature
- Upload and download rates (in KB/s)
- Free partition space of used disks
- Number of missed calls

## Binary sensor

The health status of each RAID array can be monitored with a diagnostics binary sensor reflecting the `degraded` state (OK means not degraded, PROBLEM means degraded).

## Camera

Cameras are only available in Freebox V7 (also known as Freebox Delta).

## Binary
This platform offers you sensors to monitor:
- motion sensor
- door opener 
- plastic cover

## Alarm control panel

This integration allows you to view and control the Freebox alarm control panel.



## Action

### Action `freebox.reboot`

This action will reboot your Freebox router. It does not take any parameter. Be aware there is no confirmation.

## Switch

This platform offers you a switch to toggle the Wi-Fi on or off. This will toggle all Wi-Fi interfaces of the router (all SSID and all bands).
