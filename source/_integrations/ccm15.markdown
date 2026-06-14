---
title: Midea ccm15 AC Controller
description: Instructions on how to integrate a Midea CCM15 module into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: ccm15
ha_platforms:
  - climate
  - diagnostics
ha_integration_type: hub
---

The **CCM15** {% term integration %} allows you to integrate [Midea CCM15](https://mbt.midea.com/hvac-goods/midea-products-category/vrfs/vrf-controller/central-controller-ccm-15) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Climate](#climate)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device password:
    description: "Optional. Only needed if your CCM15 firmware requires a password for control commands. Status polling stays unauthenticated, so this is only consulted when Home Assistant writes to the controller. The value to enter is the obfuscated number the controller's web UI sends, not the plain number from its settings page. See [Finding the device password](#finding-the-device-password)."
{% endconfiguration_basic %}

### Finding the device password

If your CCM15 firmware rejects control commands without a `pwd` parameter, you can read the obfuscated value off the controller's own web interface:

1. Open the CCM15 web interface in your browser.
2. Press F12 to open the browser developer tools.
3. Switch to the **Network** tab.
4. Change any setting in the web UI (for example the fan speed).
5. Select the new `ctrl.xml` request.
6. Copy the value of the `pwd` parameter from the request URL. It is a 6-digit number.

## Climate

Each data controller can support up to 64 `climate` devices.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
