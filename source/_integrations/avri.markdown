---
title: Avri
description: Instructions on how to set up Avri Waste sensor within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.107
ha_codeowners:
  - '@timvancann'
ha_domain: avri
---

The `Avri Waste` platform allows you to track the next scheduled waste pickup and the type of waste from [Avri](https://www.avri.nl/).

## Configuration

To add the `avri` sensor to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Avri**.

The default frequency for pulling data from the Avri API is once every 4 hours. If the Avri API does not return any pickup days the state of the sensor is set to `unknown`.

<p class='note warning'>
The Avri sensor uses an unofficial API to obtain data. Use it at your own risk.
</p>
