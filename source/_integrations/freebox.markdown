---
title: Freebox
description: Instructions on how to integrate Freebox routers into Home Assistant.
ha_category:
  - Network
  - Presence Detection
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
  - device_tracker
  - sensor
  - switch
---

The `freebox` integration allows you to observe and control [Freebox router](https://www.free.fr/).

There is currently support for the following device types within Home Assistant:

* [Sensor](#sensor) with traffic and temperature metrics
* [Device tracker](#presence-detection) for connected devices
* [Switch](#switch) to control Wi-Fi

{% include integrations/config_flow.md %}

You can find out your Freebox host and port by opening this address <http://mafreebox.freebox.fr/api_version> in your browser.
The returned JSON should contain an `api_domain` (`host`) and a `https_port` (`port`).
Please consult the [API documentation](https://dev.freebox.fr/sdk/os/) for more information.

### Via the frontend

Menu: **Configuration** -> **Integrations**. Search for "Freebox", add your host and port, click submit.

If you add the integration for the first time, follow the instructions in the [Initial setup](#initial-setup) section.

### Via the configuration file

```yaml
freebox:
  host: foobar.fbxos.fr
  port: 1234
```

{% configuration %}
host:
  description: The URL of the Freebox.
  required: true
  type: string
port:
  description: The HTTPS port the Freebox is listening on.
  required: true
  type: string
{% endconfiguration %}

<div class='note warning'>
  
  If you change your Freebox router for a new one, go into your Home Assistant configuration `.storage` folder and delete the "freebox" folder, then add the integration again.

</div>

### Initial setup

<div class='note warning'>

  You must have set a password for your Freebox router web administration page. Enable the option "Permettre les nouvelles demandes d'associations" and check that the option "Accès à distance sécurisé à Freebox OS" is active in "Gestion des ports" > "Connexions entrantes".

</div>

The first time Home Assistant will connect to your Freebox, you will need to authorize it by pressing the right arrow on the facade of the Freebox when prompted to do so.

To make the Wi-Fi switch and the reboot service working you will have to add "Modification des réglages de la Freebox" permission to Home Assistant application in "Paramètres de la Freebox" > "Gestion des accès" > "Applications".

### Supported routers

Only the routers with Freebox OS are supported:

* Freebox V8 also known as Freebox Pop
* Freebox V7 also known as Freebox Delta
* Freebox V6 also known as Freebox Revolution
* Freebox mini 4k

## Presence Detection

This platform offers presence detection by keeping track of the devices connected to a [Freebox](https://www.free.fr/) router.

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
The monitored conditions are internal temperature and upload and download rates in KB/s.

## Service

### Service `freebox.reboot`

This service will reboot your Freebox router. It does not take any parameter. Be aware there is no confirmation.

## Switch

This platform offers you a switch to toggle the Wi-Fi on or off. This will toggle all Wi-Fi interfaces of the router (all SSID and all bands).
