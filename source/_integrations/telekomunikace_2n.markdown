---
title: 2N Telekomunikace
description: Instructions on how to set up 2N Telekomunikace in Home Assistant.
ha_category:
  - Button
ha_release: 2023.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elektr0nisch'
ha_domain: telekomunikace_2n
ha_platforms:
  - button
ha_integration_type: device
---

The [2N Telekomunikace](https://www.2n.com) integration allows you to control your 2N devices via the local network.

## Prerequisites

To be able to manage your 2N device via Home Assistant, you need to enable the HTTP API of the device via the web interface:

First, open the `Services` tab and select `HTTP API` from the side menu. Activate here all interfaces that you want control via Home Assistant. For the integration to work, `System API` must be enabled. Then you can decide whether you want to use insecure communication via HTTP or secure communication via HTTPS. Both ways are supported by the integration. Finally, you need to specify the authentication method. Please select either `None` or `Basic` here! `Digest` authentication is *not supported* by the integration.

If you have activated authentication, you have to create a user account. Click on `Account 1` at the top and check the `Account Enabled` checkbox. Enter the desired credentials and assign the account the appropriate privileges via the checkboxes below. Now you're ready to go!

{% include integrations/config_flow.md %}

## Supported platforms

The 2N Telekomunikace integration currently supports the following device platforms within Home Assistant:

### Button

The 2N button platform allows you to restart your 2N device, or allows you to perform an audio test on the device, if supported.