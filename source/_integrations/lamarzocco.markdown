---
title: La Marzocco
description: Instructions on how to integrate your La Marzocco coffee machine with Home Assistant.
ha_release: 2024.2
ha_category:
  - Switch
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: lamarzocco
ha_platforms:
  - switch
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
---

This integration interacts with [La Marzocco coffee machines](https://lamarzocco.com/it/en/) through calls to the LaMarzocco cloud API and (optionally) local API calls, which include a WebSocket connections for (near) real-time updates. 

To be able to configure your machine in Home Assistant, your machine needs to be added to your account using the official La Marzocco app first. Currently only login with username & password is supported, if you are currently using a social login, you need to create a new LaMarzocco account and transfer your machine to be able to use this integration.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username you use to log into the La Marzocco app."
  required: true
  type: string
Password:
  description: "Password you use to log into the La Marzocco app."
  required: true
  type: string
Host:
  description: "IP address of your machine in your local network. If not set, no local connections will be used."
  required: false
  type: boolean
{% endconfiguration_basic %}

## Switches
| Switch Name | Description | Available for machines |
|-------------|-------------| ---------------------- |
| Main        | Allows to turn machines on-/off | all |
| Auto on/off | Allows to enable/disable the auto on/off schedule | all |
| Steam boiler | Allows to enable/disable the steam boiler | all |
