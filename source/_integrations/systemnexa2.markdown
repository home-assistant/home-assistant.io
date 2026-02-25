---
title: System Nexa 2
description: How to integrate System Nexa 2 devices within Home Assistant.
ha_category:
  - Light
  - Sensor
  - Switch
ha_config_flow: true
ha_platforms:
  - diagnostics
  - light
  - sensor
  - switch
ha_release: 2026.3
ha_iot_class: Local Push
ha_codeowners:
  - '@konsulten'
  - '@slangstrom'
ha_domain: systemnexa2
ha_zeroconf: true
ha_quality_scale: silver
ha_integration_type: device
---

The **System Nexa 2** {% term integration %} allows you to integrate with the **System Nexa 2** devices from [Nexa](https://nexa.se/smarta-hem/system-nexa-2).

## Use cases

The System Nexa 2 integration brings your lights, switches, and smart plugs into Home Assistant, enabling you to create a truly smart home. Here are some ways you can benefit from this integration:

- Automate your lighting and appliances
   - Create automations to turn lights on at sunset, turn off devices when you leave home, or control your car heater based on outdoor temperature and your calendar to ensure a warm car before your morning commute.
- Enhance privacy and security
   - Disable cloud access to keep all communication local, ensuring your devices work without internet connectivity.
- Reduce light pollution
   - Turn off indicator LEDs on devices in your bedroom at night to create a better sleeping environment.
- Child-proof your smart home
   - Disable physical buttons on specific devices to prevent children from turning critical equipment on or off.
- Integrate with existing remotes
   - Enable 433 MHz communication to continue using your existing remote controls alongside Home Assistant automation.

## Supported devices

The following devices are known to be supported by the integration:

- WBD-01 In-Wall Dimmer
- WBR-01 In-Wall Switch/Relay
- WPO-01 Outdoor Smart Plug
- WPR-01 Indoor Smart Plug
- WPD-01 Indoor Dimmer Plug

## Prerequisites

1. Open the app store and install the **Nexa Hem** app.
2. Create an account.
3. Add the device by onboarding it to your Wi-Fi, making sure it's on a network reachable from Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP Address/hostname of your device. You can find it in your **Nexa Hem** app by selecting your device > **Network** > **IP**."
{% endconfiguration_basic %}

## Supported functionality

### Lights

- **Dimmer**
  - **Description**: Control dimmable lights with adjustable brightness levels.
  - **Available for devices**: WBD-01, WPD-01
  - **Remarks**: Supports brightness control from 0-100%

### Sensors

- **Signal strength**
  - **Description**: Wi-Fi signal strength (dBm).
  - **Available for devices**: all
  - **Remarks**: Disabled by default.

### Switches

- **Relay**
  - **Description**: Turn on or off switch relay.
  - **Available for devices**: WBR-01, WPO-01, WPR-01
- **433 MHz**
  - **Description**: Controls whether device should use 433 MHz communication.
  - **Available for devices**: all
- **Cloud Access**
  - **Description**: Controls whether to allow cloud access for device.
  - **Available for devices**: all
- **Physical Button**
  - **Description**: Controls whether the onboard button should have any effect on the device.
  - **Available for devices**: all
- **LED**
  - **Description**: Controls whether the onboard LED should be lit at any time.
  - **Available for devices**: all

## Known limitations

Currently this integration does not support the following functionality:

- Dimming configuration (lowest/highest brightness level, dimming mode)
- Device local scheduling/timers (can however be done via Home Assistant)
- Adding remote control transmitters to control devices
- Setting mode after power loss
- Updating Wi-Fi settings
- Firmware upgrade
- Local authentication

## Data updates

**System Nexa 2** devices push data directly to Home Assistant, enabling immediate updates for device state changes such as relay state and settings (433 MHz, cloud access, physical button, and LED).

## Examples

### Turn off LEDs at night

Automatically turn off device indicator LEDs during nighttime to reduce light pollution in bedrooms.

```yaml
automation:
  - alias: "Turn off bedroom device LEDs at night"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: switch.turn_off
        target:
          entity_id:
            - switch.bedroom_switch_led
            - switch.bedroom_dimmer_led

  - alias: "Turn on bedroom device LEDs in morning"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id:
            - switch.bedroom_switch_led
            - switch.bedroom_dimmer_led
```

### Car heater automation based on temperature

Start the car heater automatically before your morning commute when outdoor temperature is low.

```yaml
automation:
  - alias: "Preheat car on cold mornings"
    triggers:
      - trigger: time
        at: "06:30:00"
    conditions:
      - condition: numeric_state
        entity_id: sensor.outdoor_temperature
        below: 5
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.garage_car_heater
      - delay:
          minutes: 30
      - action: switch.turn_off
        target:
          entity_id: switch.garage_car_heater
```

## Troubleshooting

### Cannot add device

#### Symptom: Device is not discovered

When trying to set up the integration, the device is not automatically discovered.

##### Description

The device may not be discoverable due to network issues or because automatic discovery is not working properly on your network.

##### Resolution

To resolve this issue, try the following steps:

1. Open the **Nexa Hem** app and verify that your device is connected and working properly.
2. If the device appears in the app:
   - Open the device details in the **Nexa Hem** app.
   - Go to **Network** > **IP** to find the IP address of your device.
3. In Home Assistant, manually add the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Select **Add integration** and search for **System Nexa 2**.
   - Enter the IP address you found in the **Nexa Hem** app.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
