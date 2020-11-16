---
title: Control4
description: Instructions on adding a Control4 system to Home Assistant.
ha_release: '0.114'
ha_category: Light
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lawtancool'
ha_domain: control4
---

The Control4 integration allows you to control and monitor lights from your local Control4 system. Your Control4 controller must be running OS 3.0+.

## Configuration

Before setting up, you should assign a static IP address/DHCP reservation on your router to your Control4 controller. Home Assistant must be able to communicate with the controller over the local network; 4Sight remote access is not supported.

Setup the Control4 integration by going to **Configuration** -> **Integrations** -> **Control4**.

Enter the IP address of your controller and your Control4 username and password, then continue. Home Assistant will automatically add all lights it discovers in your Control4 system.

## Options

The Control4 integration offers additional options in **Configuration** -> **Integrations** -> **Control4** -> **Options**:

{% configuration %}
Seconds between updates:
  description: How often Home Assistant will poll the Control4 controller for state updates. Very frequent polling could cause the controller to lag, especially with many devices.
  required: false
  type: integer
  default: 5
{% endconfiguration %}
