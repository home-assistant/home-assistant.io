---
title: Mitsubishi WF-RAC
description: Instructions on how to integrate Mitsubishi Heavy Industries air conditioners with a WF-RAC module into Home Assistant.
ha_category:
  - Climate
ha_release: 2026.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@blues-sechseck'
ha_domain: mitsubishi_wf_rac
ha_platforms:
  - climate
  - diagnostics
ha_zeroconf: true
ha_integration_type: device
---

The **Mitsubishi WF-RAC** {% term integration %} controls Mitsubishi Heavy Industries air conditioners fitted with the WF-RAC wireless LAN module (sold as part number WF-RAC, and marketed with the Smart M-Air app).

It talks to the module over your local network, using the same HTTP API the app uses. No account with the manufacturer is needed and the integration makes no outbound internet connection.

## Supported devices

Any indoor unit whose WF-RAC module answers on the local network. Confirmed on `SRK`-series wall-mounted units on single-split and multi-split systems, on all three firmware branches the module ships with. `FDT` cassettes and other indoor unit types use the same module and the same protocol.

The module is the requirement, not the indoor unit: a unit that works with the Smart M-Air app on the same network works here.

## Prerequisites

- The module has to be on your network already. Set it up once with the manufacturer's app, or through the module's own access point; this integration does not perform that first-time setup.
- Give the module a fixed address in your router. A changed address is not followed automatically and has to be corrected with **Reconfigure**.
- The module accepts a limited number of registered controllers. If its account table is full, Home Assistant cannot register and the integration raises a repair issue saying so; free a slot in the app, or factory-reset the module.

{% include integrations/config_flow.md %}

Units on the same network are discovered automatically and appear as discovered devices. Confirm one and give it a name.

{% configuration_basic %}
Name:
  description: "The name the airco gets in Home Assistant. It names the device and prefixes the entities belonging to it."
Host:
  description: "The local IP address of the airco's wireless module."
Port:
  description: "The port the module's local API listens on. This is 51443 on every firmware branch seen so far; discovery fills it in."
Ignore duplicate IP address:
  description: "Off by default. Adds the airco even though another entry already uses that IP address, for re-adding a unit whose old entry went missing. The module accepts one connection at a time, so two entries polling it produce errors in the log."
{% endconfiguration_basic %}

Everything else is configured afterwards under **Configure**.

{% configuration_basic %}
Retry limit:
  description: "Consecutive failed polls before the airco is marked unavailable. The minimum of three is about three minutes at the 60-second poll interval, which is enough to ride through the module's hourly Wi-Fi reassociation. Raise it on a weak link."
Target Temp. Offset:
  description: "Calibrates the setpoint sent to the unit. Positive lowers what is sent while the card keeps showing your setting. Most units round a half degree up to the next whole one, so 0.5 often acts as 1."
Target Temp. Offset (Cooling):
  description: "Overrides the general target offset for cool and dry mode. Leave empty to use the general offset there too."
Target Temp. Offset (Heating):
  description: "Overrides the general target offset for heat mode. Leave empty to use the general offset for heat too."
Indoor Temp. Sensor Offset:
  description: "Added to the unit's own indoor reading before it is shown. Display only; it does not change what the unit does."
Outdoor Temp. Sensor Offset:
  description: "The same, for the outdoor temperature the unit reports."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per air conditioner with a climate entity that offers:

- **Modes**: off, cool, heat, dry, fan only, and auto where the unit supports it.
- **Target temperature**, within the range the unit itself reports for the mode it is in.
- **Fan speed**, including the unit's quiet step.
- **Vertical and horizontal swing**, including the unit's 3D auto mode where fitted.
- **Away preset**, which switches the unit into its own Home Leave mode.

The current temperature shown is the unit's own return-air reading, corrected by the indoor sensor offset.

## Data updates

The integration polls each module every 60 seconds over the local network. A command you send is applied immediately rather than waiting for the next poll.

Commands issued close together are coalesced into a single frame, because the module accepts one connection at a time and expects about a second between requests. Changing the mode and the temperature in the same breath therefore reaches the unit as one write, not two.

## Known limitations

- **The unit briefly goes unavailable about once an hour.** The module reassociates with your Wi-Fi on its own; the default retry limit of three polls is chosen to ride through it. This is the module's behaviour, not a network fault.
- **Only one controller writes at a time.** The module grants a 60-second exclusive write lease to whoever wrote last. A command sent while somebody else holds it, typically the manufacturer's app, is refused and retried once when the lease lapses.
- **The current temperature is measured at the return air grille**, above the unit and inside its own airflow, so it reads differently from a thermostat placed in the room. The target and sensor offsets exist to calibrate that difference.
- **A limited number of controllers can be registered** on a module at once. Home Assistant occupies one slot.

## Troubleshooting

### The airco is not discovered

Discovery uses mDNS, which does not cross subnets or VLANs by default. Add the unit manually with its IP address if Home Assistant and the airco are on different networks, or if multicast traffic is filtered between them.

### Setup fails with "too many devices registered"

The module's account table is full. Remove a controller in the manufacturer's app, or factory-reset the module, then retry. Home Assistant raises a repair issue while this condition persists and clears it by itself once registration succeeds.

### The unit stops responding after using the app

The app takes the write lease for 60 seconds. Wait a minute and try again.

## Removing the integration

This integration follows standard integration removal. Removing the config entry also releases the controller slot Home Assistant occupies on the module.

{% include integrations/remove_device_service.md %}
