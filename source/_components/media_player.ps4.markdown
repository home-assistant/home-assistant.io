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
- [PS4 Second Screen App](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) 

## {% linkable_title Setup %}
1. Download the Second Screen App and make sure that you can find and control your PlayStation 4 normally.
2. Add the PS4 component to configuration.yaml, then restart Home Assistant.
- Important: Read section "Granting Port Access" below before continuing.
3. Retrieve access credentials.
  a. A configuration entity notification will be added to the frontend. This will fetch the credentials needed to allow Home Assistant to control the PS4. You will need to use the Second Screen app to do this. Click the notification and then the "Start" button in the configurator window. Then press refresh in the Second Screen App. 
  b. A device named 'Home-Assistant' will appear in the list. Select the above device and the app will attempt to connect with your Home Assistant instance. The connection process in the app will not complete. This is normal and you can now exit the app. If your credentials are retrieved successfully, the configurator will close in your frontend and a second configuration entity will be shown.
4. Pair Home Assistant to your PlayStation 4.
  a. After completing Step 3, A second configuration entity will appear in your frontend, which allows you to pair Home Assistant to your PS4. Click on the notification as in Step 3.
  b. On your PlayStation 4 console, navigate to Settings > Mobile App Connection Settings > Add Device.
  c. Enter the PIN that is displayed on your PlayStation 4 into the configurator. If successful, the configurator in your frontend will close and you will see a notification popup in your PlayStation 4 which will say that you have logged in with your mobile app.
- Note: If there are any errors while setting up the component, you will have to navigate to your `/config` directory for your instance. This will be the same directory which your `configuration.yaml` is stored. Next you will have to delete the file named `.ps4.conf` if it is present. Now you will have to repeat Steps 3 and 4 again.

## {% linkable_title Granting Port Access %}

The PS4 component requires the use of privileged ports to work correctly. Depending on your OS of your Home Assistant instance you may need to manually allow usage of privileged ports.
Home Assistant installed on a Debian-type OS for example, such as Hassbian, Rassbian, and Armbian may require configuration.
There are varying methods to perform this, dependent on your OS running Home Assistant.

- Note: Hass.io on HassOS does not require additional configuration.

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
