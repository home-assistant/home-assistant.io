---
title: Salus
description: Instructions on how to integrate your IT500 Salus thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 2021.4
ha_iot_class: Cloud Polling
ha_domain: salus
ha_config_flow: true
ha_codeowners:
  - '@cipacda'
---

The Salus integration lets control your connected [IT500 Salus](https://salus-it500.com/public/login.php) thermostat to control your home temperature.

There is currently support for the following device types within Home Assistant:

- Climate

{% include integrations/config_flow.md %}

As a first step, you will need to enter your credentials to login into the [Salus account](https://salus-it500.com/public/login.php) and on the second step, you will be able to select the device you want to configure from a list of all devices in that account.

## Concepts

The Salus Thermostat supports the following key concepts.

The `target temperature` is the temperature that the device attempts to achieve. The target temperature is either determined by the schedule programmed into the thermostat (`auto mode`) or may be overridden. When the target temperature is set by Home Assistant, the thermostat will hold this temperature until the next configured scheduled checkpoint.

If the thermostat is set in `manual mode` from Salus, the target temperature will just reconfigure the target temperature for the manual mode and will not be reset. 

