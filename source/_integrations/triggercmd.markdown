---
title: TRIGGERcmd
description: How to integrate TRIGGERcmd with Home Assistant.
ha_category:
  - Automation
  - Switch
ha_release: '2024.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rvmey'
ha_domain: triggercmd
ha_platforms:
  - switch
ha_integration_type: hub
---

The TRIGGERcmd {% term integration %} allows you to run commands on computers via [TRIGGERcmd](https://triggercmd.com/) with Home Assistant.


## Prerequisites

To use TRIGGERcmd, you need the following:

- A [TRIGGERcmd account](https://www.triggercmd.com/user/auth/signup)
- A computer with the TRIGGERcmd agent running on it
- For instructions on installing and using TRIGGERcmd itself, refer to the [TRIGGERcmd Quick Start Guide](https://docs.triggercmd.com/#/./QuickStart).
- After adding the TRIGGERcmd integration, you will be prompted for your **user token**. This can be found at the bottom of your TRIGGERcmd profile page or the instructions page.
{% include integrations/config_flow.md %}

## Using TRIGGERcmd with Home Assistant

All of your TRIGGERcmd commands should show up as **switch** devices. You can change the rooms of your devices, or select **Finish** to leave them without rooms.

Using the switch will trigger the respective command. If you have **Allow parameters** enabled, your command will run with an "on" or "off" parameter, depending on whether you flip the switch in Home Assistant on or off.
