---
layout: page
title: "Sony PlayStation 4"
description: "Instructions on how to integrate a Sony PlayStation 4 into Home Assistant."
date: 2019-01-10 11:37
sidebar: true
comments: false
sharing: true
footer: true
logo: ps4.png
ha_category: Media Player
ha_release: 0.85
ha_iot_class: "Local Polling"
---

The `ps4` component allows you to control a
[Sony PlayStation 4 console](httpswww.playstation.com/en-us/explore/ps4/).

- This component supports controlling a single PlayStation 4 for your instance. Additional consoles may work although it has not been tested.

Requirements:
- Android or iOS device
- [PS4 Second Screen App](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) installed on device.

## {% linkable_title Setup %}
1. Download the Second Screen App and make sure that you can find and control your PlayStation 4 normally.

2. Add the PS4 component to configuration.yaml, then restart Home Assistant.

- **Important:** Read section "Granting Port Access" below before continuing.

3. Start the configuration using the configurator.

4. Follow instructions displayed to generate user credentials. You will know this step is completed when the configuration disappears and a configuration entity named "Pair PS4" appears.

5. Pair Home Assistant to your PlayStation 4 by following the instructions. The pairing process is complete if a notification popup appears on your PS4 and the configuration window disappears.

- **Note:** If there are any errors while setting up the component, you will have to navigate to your `/config` directory for your instance. This will be the same directory which your `configuration.yaml` is stored. Next you will have to delete the file named `.ps4.conf` if it is present. Now you will have to restart your Home Assistant instance and repeat Steps 3-5 again.

## {% linkable_title Granting Port Access %}

The PS4 component requires the use of privileged ports to work correctly. Depending on your OS of your Home Assistant instance you may need to manually allow usage of privileged ports.
Home Assistant installed on a Debian-type OS for example, such as `Hassbian`, `Rassbian`, and `Armbian` may require configuration.
There are varying methods to perform this, dependent on your OS running Home Assistant.

- **Note:** Hass.io on HassOS does not require additional configuration.

- Example for Debian:
`sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.5`
Replace "/usr/bin/python3.5" with your path to Python that is running Home Assistant.


## {% linkable_title Configuration %}

Add the following to your configuration.yaml file to add the PS4 component.

```yaml
# Example configuration.yaml entry
media_player:
  platform: ps4
    host: 192.168.0.11
```
{% configuration %}
host: 
  description: IP of the PS4, e.g., `192.168.0.11`.
  required: true
  type: string
name:
  description: Name for PS4 entity.
  required: false
  type: string
  default: PlayStation 4
{% endconfiguration %}
