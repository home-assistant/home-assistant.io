---
title: Tedee
description: Instructions on how to integrate your Tedee lock with Home Assistant.
ha_release: 2024.2
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: tedee
ha_platforms:
  - binary_sensor
  - diagnostics
  - lock
  - sensor
ha_codeowners:
  - '@patrickhilker'
  - '@zweckj'
ha_integration_type: integration
ha_quality_scale: platinum
---

This integration interacts with your [Tedee](https://tedee.com) locks by communicating with the Tedee bridge through HTTP. The integration will communicate with your lock locally.

## Pre-requisites

- You will need the bridge to add your locks using this integration.
- You need to have the local API enabled.
- The bridge firmware needs to be at least version `2.2.18086` for push updates to work without errors.

If you do not own the bridge, you can still add your locks to Home Assistant through the [HomeKit device integration](/integrations/homekit_controller/). Communication will happen over Bluetooth in that case, and features will be limited.

{% note %}
The integration will try to configure callbacks to receive near-real-time push updates from your bridge about your lock state changes. For this to work properly, the bridge must be able to reach your Home Assistant instance. It will prefer the configured `internal_url`, so ensure this address is reachable from your bridge on your network.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your router or in the Tedee app under **Bridge Settings** -> **Local API**."
  required: false
  type: string
Local Access Token:
  description: "The local access token for your bridge. You can find it in the Tedee app under **Bridge Settings** -> **Local API**."
  required: false
  type: string
{% endconfiguration_basic %}

## Binary sensors

We have three binary sensors: One that indicates whether the battery is currently charging, one indicating if the pull spring is enabled, and one indicating whether the lock is in a "semi-locked" position, meaning the lock has been turned manually and between its normal end positions.

## Sensors

The integration currently offers two sensors: A battery sensor, indicating the charge of your lock, and a "pull spring duration" sensor, indicating how long (in seconds) your latch will stay pulled after a pull operation (if supported).
