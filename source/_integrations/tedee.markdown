---
title: Tedee
description: Instructions on how to integrate your Tedee lock with Home Assistant.
ha_release: 2024.2
ha_category:
  - Lock
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: tedee
ha_platforms:
  - lock
ha_codeowners:
  - '@zweckj'
  - '@patrickhilker'
ha_integration_type: integration
---

This integration interacts with your [Tedee](https://tedee.com) locks by communicating with the Tedee bridge through HTTP. The integration will communicate with your lock locally.

## Pre-requisites

- You will need the bridge for adding your locks using this integration.
- You need to have the local API enabled.

If you do not own the bridge, you can still add your locks to Home Assistant through the [HomeKit Integration](./_integrations/homekit.markdown). Still, communication will happen over Bluetooth in that case, and features will be limited.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your router or in the Tedee app under \"Bridge Settings\" -> \"Local API\"."
  required: false
  type: string
Local Access Token:
  description: "The local access token for your bridge. You can find it in the Tedee app under \"Bridge Settings\" -> \"Local API\"."
  required: false
  type: string
{% endconfiguration_basic %}

## Sensors
The integration currently offers two sensors: A battery sensor, indicated the charge of your lock and a "pullspring duration" sensor, indicating how long (in seconds) your latch will stay pulled after a pull operation (if supported). 
