---
title: Vistapool
description: Monitor and control Vistapool-compatible pool controllers via the Vistapool cloud API.
ha_category:
  - Button
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - button
  - sensor
ha_integration_type: hub
ha_dhcp: true
---

The **Vistapool** integration connects Home Assistant to **Vistapool-compatible pool controllers**, including AquaRite, Vistapool, Sugar Valley, Poolwatch, Kripsol, and Dagen devices.

It communicates with the official Vistapool cloud API using real-time push updates (no polling), giving you instant visibility and control over your pool equipment.

### Use case

Vistapool turns your pool controller into a live source of data and a remote that you can tie into the rest of your home. Once set up, you can keep an eye on water chemistry, get notified when something needs attention, and automate routine tasks. Typical things you can do with it:

- Watch water temperature, pH, ORP (redox), and chlorine production from a dashboard.
- Get a notification when pH or chlorine drift outside the healthy range.
- Cycle the pool light through its built-in color shows from any automation.
- Combine pool state with the rest of your home, such as turning off the filtration pump while a high-load appliance is running.

When your pool controller's Wi-Fi module joins your network, Home Assistant detects it automatically and offers to set up the integration for you. You only need to enter your Vistapool cloud account credentials to finish.

{% include integrations/config_flow.md %}

## Prerequisites

- A supported Vistapool-compatible pool controller
- A Wi-Fi module connected to the internet
- The controller must already be linked to your Vistapool cloud account

## Supported devices

Any pool controller compatible with the Vistapool cloud platform, including:

- AquaRite
- Vistapool
- Sugar Valley
- Poolwatch
- Kripsol
- Dagen

## Sensors

The integration provides the following sensors:

- **Water temperature**: current pool water temperature
- **pH**: current pH level (if pH module installed)
- **ORP / Rx**: redox potential in mV (if Rx module installed)
- **Chlorine (Cl)**: chlorine level (if Cl module installed)
- **CD**: conductivity level (if CD module installed)
- **UV**: UV module reading (if UV module installed)
- **Electrolysis / Hydrolysis**: current production level in gr/h
- **Filtration intel time**: daily runtime in Intel mode
- **Wi-Fi signal strength**: controller RSSI (diagnostic, disabled by default)

## Button

If your controller drives a multi-color LED light fixture, the integration exposes a one-shot button to cycle through the available colors from Home Assistant.

- **LED next color**: advance the LED fixture to its next color. The integration briefly toggles the pool light off and back on (or just turns it on if it was off). The physical fixture interprets the power cycle as the color-advance signal, just as the **Next** button under **LED Color** does in the Vistapool app's **Illumination** screen. Available only if your controller reports an LED fixture.

## Examples

The following automations show how you can wire pool state into the rest of your home. Replace the entity IDs with the ones your controller exposes.

Notify when chlorine production drops, which usually means the salt level or cell needs attention:

{% example %}
automation: |
  alias: "Pool: low chlorine production"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_pool_electrolysis
      below: 5
      for:
        minutes: 30
  actions:
    - action: notify.persistent_notification
      data:
        title: "Pool chlorine low"
        message: "The salt cell is producing less than 5 gr/h. Check salt level or clean the cell."
{% endexample %}

Notify when pH drifts outside the healthy range:

{% example %}
automation: |
  alias: "Pool: pH out of range"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_pool_ph
      below: 7.0
    - trigger: numeric_state
      entity_id: sensor.my_pool_ph
      above: 7.6
  actions:
    - action: notify.persistent_notification
      data:
        title: "Pool pH out of range"
        message: "pH is {{ states('sensor.my_pool_ph') }}. Healthy range is 7.0 to 7.6."
{% endexample %}

Cycle the pool light to the next color at sunset every evening:

{% example %}
automation: |
  alias: "Pool: advance LED color at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: button.press
      target:
        entity_id: button.my_pool_led_next_color
{% endexample %}

## Data updates

Vistapool uses real-time **cloud push**. Home Assistant subscribes to the Vistapool cloud once and the controller streams every change as it happens, so dashboards and automations react within a second or two of the physical event, with no fixed polling interval.

When the connection drops, the integration reconnects automatically with exponential backoff. Entities go to **Unavailable** while the connection is down and recover as soon as the stream is back.

## Known limitations

- The integration requires an active internet connection as it communicates via the Vistapool cloud API
- Sensor availability depends on which modules are physically installed on your controller

## Troubleshooting

### Entities show "Unavailable"

Check your internet connection and verify the controller is online in the Vistapool app. The integration will automatically reconnect when the connection is restored.

### Reauth notification appears

Your stored password is no longer accepted by Vistapool. Select the notification to re-enter your password and restore the connection. Your username stays the same.

### Entities not updating

The integration uses real-time cloud push. If updates stop, try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
