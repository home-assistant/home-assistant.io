---
title: LIFX
description: Instructions on how to integrate LIFX into Home Assistant.
ha_category:
  - Button
  - Light
ha_iot_class: Local Polling
ha_release: 0.81
ha_config_flow: true
ha_domain: lifx
ha_homekit: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - select
  - sensor
ha_integration_type: device
ha_dhcp: true
ha_codeowners:
  - '@Djelibeybi'
---

The **LIFX** {% term integration %} automatically discovers [LIFX](https://www.lifx.com) lights on each network that is enabled in Home Assistant's [network configuration](/integrations/network). Suppose any of your LIFX lights are not automatically discovered. In that case, you can add them manually using the user interface by following the configuration steps below for each light you want to add:

{% include integrations/config_flow.md %}

## Sensors

The following sensors are available depending on the LIFX model:

| Sensor | Description |
| ------ | ----------- |
| Clean cycle | Indicates whether a HEV cycle is currently active on a LIFX Clean bulb |
| Infrared brightness | Controls the infrared brightness amount on a LIFX Nightvision bulb |
| RSSI | Indicates the current WiFi signal strength on any LIFX bulb (disabled by default) |

Note that these sensors are only updated every 30 seconds and may not reflect the current state if changes are made externally to Home Assistant.

## Themes

Home Assistant provides a collection of predefined themes for LIFX matrix and multizone lights, each designed to mimic the theme of the same name from the LIFX smartphone app.

To apply a theme interactively, use the theme selection drop-down box found on the device configuration screen.

To apply a theme as part of an automation, use the `select.select_option` action call. You can also apply a theme when starting the [`lifx.effect_move`](/actions/lifx.effect_move/) action.

The following themes are available:

- `autumn`
- `blissful`
- `bias_lighting`
- `calaveras`
- `cheerful`
- `christmas`
- `dream`
- `energizing`
- `epic`
- `evening`
- `exciting`
- `fantasy`
- `focusing`
- `gentle`
- `halloween`
- `hanukkah`
- `holly`
- `hygge`
- `independence`
- `intense`
- `love`
- `kwanzaa`
- `mellow`
- `party`
- `peaceful`
- `powerful`
- `proud`
- `pumpkin`
- `relaxing`
- `romance`
- `santa`
- `serene`
- `shamrock`
- `soothing`
- `spacey`
- `sports`
- `spring`
- `stardust`
- `thanksgiving`
- `tranquil`
- `warming`
- `zombie`

## Light effects

The LIFX platform supports several software-controlled light effects and one hardware based effect. You can start these effects with default options by using the `effect` attribute of the normal [`light.turn_on`](/actions/light.turn_on/) action, for example like this:

{% example %}
automation: |
  alias: "Start a LIFX pulse effect"
  triggers:
    - trigger: state
      entity_id: binary_sensor.office_motion
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id:
          - light.office
          - light.kitchen
      data:
        effect: lifx_effect_pulse
{% endexample %}

However, if you want to fully control a light effect, you have to use its dedicated action, like this:

{% example %}
script: |
  colorloop_start:
    alias: "Start colorloop"
    sequence:
      - action: lifx.effect_colorloop
        target:
          entity_id: group.livingroom
        data:
          brightness: 255
          period: 10
          spread: 30
          change: 35
{% endexample %}

### Hardware effects

The Flame (`lifx.effect_flame`), Morph (`lifx.effect_morph`), Sky (`lifx.effect_sky`), and Move (`lifx.effect_move`) effects are hardware-based and only work on specific LIFX devices. Flame and Morph are available on the LIFX Tile, Candle, Path, Spot, and Ceiling while the Sky effect is only available on the Ceiling. The Move effect requires a LIFX Z, Lightstrip, Beam, Neon, or String.

All hardware-based effects can be stopped and started regardless of the device's power state, but the default behavior for each action is to turn the device on when starting an effect. Set the `power_on` attribute of the action to `false` to override this default.

{% include integrations/actions.md %}

## Infrared brightness

Home Assistant will automatically create an Infrared Brightness configuration entity for LIFX Night Vision bulbs. Changing the state of this entity will change the brightness of the LEDs on the bulb.

## Buttons

The LIFX button platform creates two buttons for each LIFX device.

### Identify button

The Identify button will flash the bulb three times at maximum brightness then return the bulb to the state it was in prior. Successful identification requires the bulb to be powered on and already configured in Home Assistant.

### Restart button

The Restart button triggers the bulb to restart in exactly the same way as a physical power cycle, which makes it ideal for triggering a new DHCP request from the bulb.

## HomeKit Accessory Protocol

Most LIFX devices support Apple HomeKit via the HomeKit Accessory Protocol (HAP). If a LIFX device has not already been added to HomeKit natively using an Apple iOS or macOS device, it can be paired with Home Assistant using via the [HomeKit Controller](/integrations/homekit_controller) integration which uses HAP.

This enables the use of LIFX devices in Home Assistant that are not supported by the LIFX integration. See below for specific details on controlling LIFX Switches.

The LIFX integration currently has to poll the device every few seconds, as opposed to using the [HomeKit Controller](/integrations/homekit_controller) integration, which offers push updates, encrypted communications, and significantly less network traffic.

Discoveries from control protocols that are not desired can be ignored in the UI. LIFX devices that support HAP will be discovered by both methods if they have not been added to native HomeKit using an Apple iOS or macOS device. It is possible to set up control of the device in Home Assistant using both protocols simultaneously by configuring both the LIFX integration and the HomeKit Controller integration for the same device.

## LIFX switch

The LIFX integration does not support the LIFX Switch. However, the [HomeKit Controller](/integrations/homekit_controller) integration can be used instead for
[LIFX Switch running firmware 3.90](https://support.lifx.com/en_us/switch-3-90-update-rk4zYiXVq) or higher. Follow the LIFX
documentation to obtain a HomeKit code before integrating the Switch with Home Assistant as it will be needed during the process.

When using the [HomeKit Controller](/integrations/homekit_controller) integration, each button on the LIFX Switch is discovered as a
[stateless switch](/integrations/homekit_controller#stateless-switches-and-sensors) and will not appear as an entity in Home Assistant.
Relays that are configured as wired to non-LIFX devices will appear as normal switches in Home Assistant.

## Troubleshooting discovery

### Lights

LIFX and HomeKit based discovery of LIFX bulbs relies on Home Assistant having a [network interface](/integrations/network) connected to the same subnet as your LIFX bulbs. If you use a segregated IoT network to which Home Assistant is not directly connected, use the manual configuration method documented above to bypass discovery.

If you have multiple network interfaces, ensure that the interface connected to the same subnet as your LIFX bulbs is enabled in Home Assistant's [network configuration](/integrations/network).

### Switches

If your switch is not automatically discovered or you get a "_Cannot add pairing as device can no longer be found_" error
during the config process, [reboot your LIFX Switch](https://support.lifx.com/troubleshooting-switch-Hk6RWujLd) as they
only broadcast HomeKit compatibility for 15 minutes.
