---
title: TRIGGERcmd
description: Instructions on how to integrate TRIGGERcmd with Home Assistant.
ha_category:
  - Switch
ha_release: '2024.6'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rvmey'
ha_domain: triggercmd
ha_platforms:
  - switch
ha_zeroconf: false
ha_integration_type: integration
---

This integration allows you to run commands on computers via the [TRIGGERcmd](https://triggercmd.com/) with Home Assistant. 

Instruction on how to install and use TRIGGERcmd itself can be found [here](https://docs.triggercmd.com/#/./QuickStart).

{% include integrations/config_flow.md %}

## Prerequisites

Inorder to use TRIGGERcmd you need the following:
 - A [TRIGGERcmd account](https://www.triggercmd.com/user/auth/signup)
 - A device with the TRIGGERcmd agent running on it

## Using TRIGGERcmd with Home Assistant

Upon adding the TRIGGERcmd integration to your Home Assistant device, you will be prompted for your **user token,** this can be found at the bottom of your TRIGGERcmd profile page.

If you have devices with triggers connected to your account, they should all show up as **switch** devices. You can change the rooms of your devices or press **finish** to leave them without rooms.

Using the switch will then trigger the respective command. If you have parameters enabled on your triggers, you can pass whether the switch is turning on the on or off through your switches.