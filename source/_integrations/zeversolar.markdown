---
title: Zeversolar
description: Instructions on how to configure the Zeversolar integration within Home Assistant
ha_category:
  - Environment
ha_release: 2023.2
ha_iot_class: Local Polling
ha_domain: zeversolar
ha_platforms:
  - diagnostics
  - number
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: device
ha_codeowners:
  - '@kvanzuijlen'
  - '@mhuiskes'
---

The **Zeversolar** {% term integration %} uses the local device IP to get information like the current power and today's total energy production. This {% term integration %} allows you to collect and save data providing a historical overview of your Zeversolar production.

## Prerequisites

You need a Zeversolar inverter connected to your solar panels and Wi-Fi. Furthermore, you need to get the Zeversolar IP address.

{% include integrations/config_flow.md %}

## Entities

### Sensors

| Entity | Description |
|--------|-------------|
| Power | Current AC output power (W) |
| Energy today | Energy produced today (kWh) |
| Power limit | Current active power limit (%). Only available on inverters that support the power limit API. |

### Switch

| Entity | Description |
|--------|-------------|
| Output | Enables or disables inverter output by ramping the power limit to 100% (on) or the minimum safe value (off). Only available on inverters that support the power limit API. |

### Number

| Entity | Description |
|--------|-------------|
| Output power limit | Sets the active power limit as a percentage (5–100%). Moving the slider triggers a gradual ramp to avoid abrupt power transitions. Only available on inverters that support the power limit API. |

## Power limit control

Some Zeversolar inverters expose a local power limit API that allows Home Assistant to control how much power the inverter produces.

When the integration loads, it probes this API to check whether your inverter supports it. If the probe succeeds, the **Output** switch, **Output power limit** slider, and **Power limit** sensor become available.

If the probe fails, those entities will be unavailable and a repair notification will appear in Home Assistant explaining the cause. Common reasons:

- The inverter was temporarily offline when Home Assistant started. Reload the integration to retry.
- Power limiting is disabled in the inverter's own web interface. Enable it there, then reload the integration.
- Your inverter firmware does not support the power limit API. The integration will still work for monitoring (power and energy sensors).

### How output control works

The **Output** switch and **Output power limit** slider both work by sending a target power limit to the inverter. Rather than jumping directly to the target value, Home Assistant steps gradually in 10% increments, pausing between each step. This avoids abrupt power transitions that can cause voltage fluctuations on the local grid.

While a ramp is in progress, the switch and slider show as unavailable. The slider updates in real time as each step completes.

{% note %}
The minimum power limit is 5%. Turning the **Output** switch off ramps to 5%, not 0%. This is intentional — completely cutting inverter output can cause issues on some installations.
{% endnote %}
