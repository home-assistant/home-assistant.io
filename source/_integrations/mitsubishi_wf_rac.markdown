---
title: Mitsubishi WF-RAC
description: Instructions on how to integrate Mitsubishi Heavy Industries air conditioners with a WF-RAC module into Home Assistant.
ha_category:
  - Climate
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@blues-sechseck'
ha_domain: mitsubishi_wf_rac
ha_platforms:
  - climate
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Mitsubishi WF-RAC** {% term integration %} controls [Mitsubishi Heavy Industries air conditioners](https://www.mhi-mth.co.jp/en/products/residential-and-commercial-air-conditioners/rac-sr/) fitted with the WF-RAC wireless LAN module (sold as part number WF-RAC, and marketed with the Smart M-Air app).

It talks to the module over your local network, using the same HTTP API the app uses. No account with the manufacturer is needed and the integration makes no outbound internet connection.

## Supported devices

Any indoor unit whose WF-RAC module answers on the local network. Confirmed on `SRK`-series wall-mounted units on single-split and multi-split systems, on all three firmware branches the module ships with. `FDT` cassettes and other indoor unit types use the same module and the same protocol.

The module is the requirement, not the indoor unit: a unit that works with the Smart M-Air app on the same network works here.

## Prerequisites

- The module has to be on your network already. Set it up once with the manufacturer's app, or through the module's own access point; this integration does not perform that first-time setup.
- Give the module a fixed address in your router. A changed address is picked up when the module announces itself again, but only then.
- The module presents a self-signed certificate, and the connection does not verify it by default. To verify it instead, save the module's certificate as `ac_cert.pem` in your Home Assistant configuration directory; the integration picks it up on the next reload. Fetch it with `openssl s_client -connect <module IP>:51443 -showcerts </dev/null 2>/dev/null | openssl x509 -outform PEM > ac_cert.pem`. This is optional, and it only makes a difference on a network where you do not trust the path to the module.
- The module accepts a limited number of registered controllers. If its account table is full, Home Assistant cannot register and the integration raises a repair issue saying so; free a slot in the app, or factory-reset the module.

{% include integrations/config_flow.md %}

Units on the same network are discovered automatically and appear as discovered devices. Confirm one to add it.

{% configuration_basic %}
Host:
  description: "The local IP address of the airco's wireless module."
Port:
  description: "The port the module's local API listens on. This is 51443 on every firmware branch seen so far; discovery fills it in."
Ignore duplicate IP address:
  description: "Off by default. Adds the airco even though another entry already uses that IP address, for re-adding a unit whose old entry went missing. The module accepts one connection at a time, so two entries polling it produce errors in the log."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per air conditioner with a climate entity that offers:

- **Modes**: off, cool, heat, dry, fan only, and auto where the unit supports it.
- **Target temperature**, within the range the unit itself reports for the mode it is in.
- **Fan speed**, including the unit's quiet step.
- **Vertical and horizontal swing**, including the unit's 3D auto mode where fitted.
- **Away preset**, which switches the unit into its own Home Leave mode.

The current temperature shown is the unit's own return-air reading.

## Mitsubishi WF-RAC automation examples

The unit measures at its own return air grille and knows nothing about the room it sits in. Most of what is worth automating here comes from pairing it with something that does.

{% include docs/paste_yaml_tip.md %}

### Automation: Pre-cool the bedroom before bedtime, but only in summer

A separate room sensor is the better trigger, so the unit only starts when the room itself is warm rather than by the clock alone.

- **Trigger**: Time: 21:30
- **Condition**: Numeric state: bedroom temperature above 23 °C
- **Action**: Climate: Set target temperature to 22 °C in cool mode

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/mitsubishi_wf_rac_precool_with_room_sensor.yaml" %}

{% details "YAML example for pre-cooling the bedroom" %}

{% example %}
automation: |
  alias: "Pre-cool the bedroom"
  triggers:
    - trigger: time
      at: "21:30:00"
  conditions:
    - condition: numeric_state
      entity_id: sensor.bedroom_temperature
      above: 23
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.bedroom
      data:
        temperature: 22
        hvac_mode: cool
{% endexample %}

{% enddetails %}

### Automation: Turn the unit off when a window is opened

The unit keeps running against an open window on its own. Give it a couple of minutes so a quick airing does not switch it off.

- **Trigger**: State: bedroom window open for 2 minutes
- **Action**: Climate: Turn off

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/mitsubishi_wf_rac_off_with_open_window.yaml" %}

{% details "YAML example for switching off with the window open" %}

{% example %}
automation: |
  alias: "Stop cooling with the window open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_window
      to: "on"
      for: "00:02:00"
  actions:
    - action: climate.turn_off
      target:
        entity_id: climate.bedroom
{% endexample %}

{% enddetails %}

### Automation: Fall back to Home Leave instead of switching off

On units that report it, Home Leave keeps the room within a wide band rather than letting it drift. It is offered as the `away` preset and needs the unit to be cooling or heating already, so the direction it should hold is unambiguous.

- **Trigger**: State: person away from home for 30 minutes
- **Condition**: The living room unit is not off
- **Action**: Climate: Set preset mode to `away`

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/mitsubishi_wf_rac_home_leave_while_away.yaml" %}

{% details "YAML example for falling back to Home Leave" %}

{% example %}
automation: |
  alias: "Home Leave while nobody is in"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: "not_home"
      for: "00:30:00"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: climate.living_room
          state: "off"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.living_room
      data:
        preset_mode: away
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} each module every 60 seconds over the local network. A command you send is applied immediately rather than waiting for the next poll.

Commands issued together are coalesced into a single frame, because the module accepts one connection at a time and expects about a second between requests. A scene that sets the mode, the temperature and the fan speed at once therefore reaches the unit as one write rather than three. Actions issued one after another, each waiting for its own result, are sent separately.

## Known limitations

- The unit briefly goes unavailable about once an hour. The module reassociates with your Wi-Fi on its own. The integration tolerates three failed polls in a row to ride through it. This is the module's behavior, not a network fault.
- Only one controller writes at a time. The module grants a 60-second exclusive write lease to whoever wrote last. A command sent while somebody else holds it, typically the manufacturer's app, is refused and retried once when the lease lapses.
- The current temperature is measured at the return air grille, above the unit and inside its own airflow, so it reads differently from a thermostat placed in the room.
- A limited number of controllers can be registered on a module at once. Home Assistant occupies one slot.

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
