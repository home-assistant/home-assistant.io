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
ha_integration_type: integration
ha_codeowners:
  - '@bdraco'
  - '@Djelibeybi'
ha_quality_scale: platinum
ha_dhcp: true
---

The LIFX integration automatically discovers [LIFX](https://www.lifx.com) lights on each network that is enabled in Home Assistant's [network configuration](/integrations/network). Suppose any of your LIFX lights are not automatically discovered. In that case, you can add them manually using the user interface by following the configuration steps below for each light you want to add:

{% include integrations/config_flow.md %}

## Set state

LIFX lights allow a change of color and brightness even when they are turned off. This way, you can control the light during the day, so its settings are correct when events for turning on are received, for example, from motion detectors or external buttons.

The normal `light.turn_on` call cannot be used for this because it always turns the power on. Thus, LIFX has its own `set_state` service that allows color changes without affecting the current power state.

### Service `lifx.set_state`

Change the light to a new state.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.
| `transition` | Duration (in seconds) for the light to fade to the new state.
| `zones` | List of integers for the zone numbers to affect. See **Calculating zones to affect** below for more detail.
| `power` | Turn the light on (`True`) or off (`False`). Leave out to keep the power as it is.
| `...` | Use `color_name`, `brightness` etc. from [`light.turn_on`](/integrations/light/#service-lightturn_on) to specify the new state.

#### Calculating zones to affect

The LIFX Z and LIFX Lightstrip each have eight (8) zones per segment. You can connect up to ten (10) segments to a single controller, which results in a maximum zone count of 80.

The LIFX Beam has ten (10) zones per segment and one (1) zone per corner piece. You can connect up to eight (8) segments and two (2) corner pieces to a single controller, which results in a maximum zone count of 82.

All devices start counting zones at zero (0), which means the zone numbers for the `zones` attribute of the `lifx.set_state` service range from 0 to 79 for the LIFX Z and Lightstrip and 0 to 81 for the LIFX Beam.

## Set HEV cycle state

You can control the HEV LEDs in LIFX Clean bulbs using the `set_hev_cycle_state` service. The service can start or stop a HEV (or "Clean") cycle either using the default duration configured on the bulb or for a custom duration specified when calling the service. Home Assistant will return or log an error if an incompatible bulb is specified when calling the service.

To determine whether or not a HEV cycle is currently running, Home Assistant exposes a Clean Cycle binary sensor for all HEV-enabled bulbs. This sensor can be used to trigger automations to occur when a HEV cycle starts or stops. To reduce network load, HEV cycle status is only checked every 10 seconds so this sensor may not update instantaneously.

### Service `lifx.set_hev_cycle_state`

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of LIFX Clean bulbs.
| `power` | Start a HEV cycle (`True`) or stop a cycle (`False`).
| `duration` | Duration (in seconds) for the HEV cycle. The default duration of two hours (7200 seconds) is used if this attribute is omitted.

## Sensors

The following sensors are available depending on the LIFX model:

| Sensor | Description |
| ------ | ----------- |
| Clean cycle | Indicates whether a HEV cycle is currently active on a LIFX Clean bulb |
| Infrared brightness | Controls the infrared brightness amount on a LIFX Nightvision bulb |
| RSSI | Indicates the current WiFi signal strength on any LIFX bulb (disabled by default) |

Note that these sensors are only updated every 30 seconds and may not reflect the current state if changes are made externally to Home Assistant.

## Themes

Home Assistant provides a collection of predefined themes for LIFX multizone lights, each designed to mimic the theme of the same name from the LIFX smartphone app.

To apply a theme interactively, use the theme selection drop-down box found on the device configuration screen.

To apply a theme as part of an automation, use the `select.select_option` service call. You can also apply a theme when calling the `lifx.effect_move` service. See the **Light effects** section below for more details, including how to set a custom theme for that effect.

The following themes are available: `autumn`, `blissful`, `cheerful`, `dream`, `energizing`, `epic`, `exciting`, `focusing`, `halloween`, `hanukkah`, `holly`, `independence_day`, `intense`, `mellow`, `peaceful`, `powerful`, `relaxing`, `santa`, `serene`, `soothing`, `sports`, `spring`, `tranquil`, `warming`.

## Light effects

The LIFX platform supports several software-controlled light effects and one hardware based effect. You can start these effects with default options by using the `effect` attribute of the normal [`light.turn_on`](/integrations/light/#service-lightturn_on) service, for example like this:

```yaml
automation:
  - alias: "..."
    trigger:
      # ...
    action:
      - service: light.turn_on
        target:
          entity_id: light.office, light.kitchen
        data:
          effect: lifx_effect_pulse
```

However, if you want to fully control a light effect, you have to use its dedicated service call, like this:

```yaml
script:
  colorloop_start:
    alias: "Start colorloop"
    sequence:
      - service: lifx.effect_colorloop
        target:
          entity_id: group.livingroom
        data:
          brightness: 255
          period: 10
          spread: 30
          change: 35
```

### Hardware effects

The Flame (`lifx_effect_flame`), Morph (`lifx.effect_morph`) and Move (`lifx.effect_move`) effects are hardware-based and only work on specific LIFX devices. Flame and Morph are available on the LIFX Tile and Candle, while the Move effect requires a LIFX Z, Lightstrip, or Beam.

All hardware-based effects can be stopped and started regardless of the device's power state, but the default behavior for each service is to turn the device on when starting an effect. Set the `power_on` attribute of the service to `false` to override this default.

All the available light effects and their options are listed below.

### Service `lifx.effect_pulse`

Run a software-based flash effect by changing to a color and then back.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.
| `color_name` | A color name such as `red` or `green`.
| `rgb_color` | A list containing three integers representing the RGB color you want the light to be.
| `brightness` | Integer between 1 and 255 for how bright the color should be.
| `brightness_pct` | Alternative to `brightness`. Specify in percent between 1 and 100 for how bright the color should be.
| `period` | The duration of a single pulse (in seconds).
| `cycles` | The total number of pulses.
| `mode` | The way to change between colors. Valid modes: `blink` (default - direct transition to new color for 'period' time with original color between cycles), `breathe` (color fade transition to new color and back to original), `ping` (short pulse of new color), `strobe` (light turns off between color changes), `solid`(light does not return to original color between cycles).
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### Service `lifx.effect_colorloop`

Run a software-based effect that continuously loops colors around the color wheel. All participating lights will coordinate to keep similar (but not identical) colors.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.
| `brightness` | Number between 1 and 255 indicating the brightness of the effect. Leave this out to maintain the current brightness of each participating light.
| `brightness_pct` | Alternative to `brightness`. Specify in percent between 1 and 100 how bright each participating light should be.
| `saturation_min` | Number between 1 and 100 indicating the minimum saturation of the colors in the loop. Leave this out to use the default of 80%.
| `saturation_max` | Number between 1 and 100 indicating the maximum saturation of the colors in the loop. Leave this out to use the default of 100%.
| `period` | Duration (in seconds) between starting a new color change.
| `transition` | Duration (in seconds) where lights are actively changing color.
| `change` | Hue movement per period, in degrees on a color wheel (ranges from 0 to 359).
| `spread` | Maximum color difference between participating lights, in degrees on a color wheel (ranges from 0 to 359).
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### Service `lifx.effect_flame`

Run a hardware-based effect on LIFX matrix devices that creates a flame effect on the device. The device will be powered on by default, but this can be overridden by setting `power_on` to `false`. The `speed` attribute controls the speed of the flames.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of matrix lights.
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 1s, max: 25s)
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true)

### Service `lifx.effect_morph`

Run a hardware-based effect on LIFX matrix devices that animates blobs of colors across the device. The `speed` attribute controls the speed of the movement.

You must provide a `palette` or `theme` to use for the effect, but not both. The `palette` attribute allows you to select the colors used by the effect, while the `theme` attribute allows you to select one of the pre-configured themes which match those found in the LIFX smartphone app.

The device will be powered on by default, but this can be overridden by setting `power_on` to `false`.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of matrix lights.
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 1s, max: 25s)
| `palette` | A list of at least 2 and at most 16 HSBK values to use for this effect.
| `theme` | The theme to use for the effect. Must be one of: `autumn`, `blissful`, `cheerful`, `dream`, `energizing`, `epic`, `exciting`, `focusing`, `halloween`, `hanukkah`, `holly`, `independence` `day`, `intense`, `mellow`, `peaceful`, `powerful`, `relaxing`, `santa`, `serene`, `soothing`, `sports`, `spring`, `tranquil`, `warming`.
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true)

### Service `lifx.effect_move`

Run a hardware-based effect on LIFX multizone devices that move the current colors on the device in a particular direction. The direction and speed of the animation are controlled by the `speed` and `direction` attributes. You can change the effect's colors while running using the `lifx.set_state` service.

The effect will not be visible if all LEDs on the device are set to the same color and is ignored by unsupported devices.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of multizone lights.
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 0.1s, max: 60s)
| `direction` | The direction in which the effect will travel, either "right" or "left" (default: right)
| `theme` | The name of a pre-defined theme to apply to the multizone device before starting the effect.
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true)

### Service `lifx.effect_stop`

Run an effect that does nothing, thereby stopping any software or hardware effect that might be running.

| Service data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.

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

## LIFX Switch

The LIFX integration does not support the LIFX Switch. However, the [HomeKit Controller](/integrations/homekit_controller) integration can be used instead for
[LIFX Switch running firmware 3.90](https://support.lifx.com/en_us/switch-3-90-update-rk4zYiXVq) or higher. Follow the LIFX
documentation to obtain a HomeKit code prior to integrating the Switch with Home Assistant as it will be needed during the process.

When using the [HomeKit Controller](/integrations/homekit_controller) integration, each button on the LIFX Switch is discovered as a
[stateless switch](/integrations/homekit_controller#stateless-switches-and-sensors) and will not appear as an entity in Home Assistant.
Relays that are configured as wired to non-LIFX devices will appear as normal switches in Home Assistant.

## Troubleshooting Discovery

### Lights

LIFX and HomeKit based discovery of LIFX bulbs relies on Home Assistant having a [network interface](/integrations/network) connected to the same subnet as your LIFX bulbs. If you use a segregated IoT network to which Home Assistant is not directly connected, use the manual configuration method documented above to bypass discovery.

If you have multiple network interfaces, ensure that the interface connected to the same subnet as your LIFX bulbs is enabled in Home Assistant's [network configuration](/integrations/network).

### Switches

If your switch is not automatically discovered or you get a "_Cannot add pairing as device can no longer be found_" error
during the config process, [reboot your LIFX Switch](https://support.lifx.com/troubleshooting-switch-Hk6RWujLd) as they
only broadcast HomeKit compatibility for 15 minutes.
