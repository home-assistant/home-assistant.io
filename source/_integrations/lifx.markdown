---
title: LIFX
description: Instructions on how to integrate LIFX into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Light
  - Select
  - Sensor
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
ha_zeroconf: true
ha_codeowners:
  - '@Djelibeybi'
---

The **LIFX** {% term integration %} controls [LIFX](https://www.lifx.com) lights over your local network, without going through the LIFX cloud. Use it to switch your lights on and off, set their color and brightness, and start the animated effects that LIFX lights can run.

## Use cases

- Keep your lights responding when your internet connection is down, because Home Assistant talks to them directly over your local network instead of through the LIFX cloud.
- Use a light as a notification. Pulse the living room lights when the doorbell rings or the washing machine finishes, which reaches people that a spoken announcement does not.
- Wake up to a sunrise, or wind down to a sunset, by starting the Sky effect on a LIFX Ceiling on a schedule.
- Paint a theme across a Beam or a Z so a whole run of zones changes together, instead of setting one color across the entire light.
- Run a LIFX Clean cycle in a bathroom while the house is empty, and stop it automatically when someone comes home.

## Supported devices

The integration supports every LIFX light. Which features you get depends on what the light can do:

- **White lights**, such as the LIFX White and Filament, support brightness and, on some models, color temperature.
- **Color lights**, such as the LIFX Color, Mini, GU10, BR30, PAR38, and Downlight, add full color control.
- **Multizone lights** have a line of individually controlled zones.
- **Matrix lights** have a grid of individually controlled zones.
- **LIFX Clean** lights add an HEV cycle, and **LIFX Nightvision** lights add infrared LEDs.

{% note %}
Several lights are sold in more than one version. The Candle and the Downlight, for example, each come in a color version and a color temperature only version, and only some versions of the Candle have a grid of zones. Home Assistant asks the light what it supports, so you only see the controls it can actually use.
{% endnote %}

Multizone and matrix lights support extra effects, and spread a painted theme across their zones. It is not always obvious which group a light belongs to, so here they are:

- **Multizone**: Beam, Indoor/Outdoor Neon Flex, Lightstrip, Permanent Outdoor, String, and Z.
- **Matrix**: Candle Color, Ceiling, Luna, Mirror, Path, Spot, Tile, and Tube.

Matrix lights running firmware 4 or later also run the Sky effect. This includes the LIFX Ceiling, Luna, Mirror, E26 Candle, and E26 Tube, but not matrix lights still on firmware 3, such as the E12 Candle. For details on what each group can do, refer to [Light effects](#light-effects) and [Themes](#themes).

## Unsupported devices

The LIFX Switch is not supported by this integration, because it does not use the LIFX LAN protocol. You can add it to Home Assistant with the [Matter](/integrations/matter) integration or the [HomeKit Controller](/integrations/homekit_controller) integration instead. For details, refer to [LIFX Switch](#lifx-switch).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the light you want to add. On its own, Home Assistant asks whichever light answers at that address who it is."
Serial number:
  description: "The twelve character serial number of the light you want to add, printed on the light itself and shown in the LIFX app. On its own, Home Assistant broadcasts for the light that answers to it, so the light has to be on a network that Home Assistant can reach by broadcast."
{% endconfiguration_basic %}

Home Assistant discovers LIFX lights automatically on each network that is enabled in your [network configuration](/integrations/network). If a light is not discovered, you can add it manually by entering its host, its serial number, or both. If you leave both empty, Home Assistant searches your network and lets you pick from the lights it finds.

Giving both is the most direct option, because Home Assistant talks straight to that address without searching for the light first. Giving only the host is the option to use when you do not know the serial number, and either of those two is what you need when the light is on a network that Home Assistant cannot reach by broadcast, because a serial number on its own can only be resolved by broadcasting for it.

## Device names and areas

When a LIFX device is added, it is placed in an area named after its group in the LIFX app. If no area of that name exists yet, Home Assistant creates it.

Because Home Assistant already shows the area in front of the device name, a group name at the start of the device label is removed when the device is added. A bulb labeled "Kitchen Downlight" in the "Kitchen" group is named "Downlight" in the "Kitchen" area. Devices that were already added keep the name they were registered under, so their entity IDs do not change.

## Supported functionality

The **LIFX** integration provides the following entities.

### Lights

- **Light**
  - **Description**: Controls the power, brightness, color, and effects of the light. The entity uses the device name.
  - **Available for**: all LIFX lights
  - **Remarks**: Color, color temperature, and transition support depend on the model.

### Buttons

- **Identify**
  - **Description**: Flashes the light three times at maximum brightness, then returns it to its previous state. If the light is off, it is turned on for the flash and turned off again afterwards.
  - **Available for**: all LIFX lights

- **Restart**
  - **Description**: Restarts the light in the same way as a physical power cycle. This is a good way to make the light request a new DHCP lease.
  - **Available for**: all LIFX lights

### Selects

- **Infrared brightness**
  - **Description**: Sets how bright the infrared LEDs run when the visible brightness is low.
  - **Options**: `Disabled`, `25%`, `50%` or `100%`
  - **Available for**: LIFX Nightvision lights

- **Theme**
  - **Description**: Paints one of the built-in themes across the light.
  - **Options**: any of the [available themes](#themes)
  - **Available for**: multizone and matrix lights

### Sensors

- **RSSI**
  - **Description**: Reports the current Wi-Fi signal strength of the light.
  - **Available for**: all LIFX lights
  - **Remarks**: Disabled by default. To use it, enable the entity first.

### Binary sensors

- **Clean cycle**
  - **Description**: Indicates whether an HEV cycle is currently running.
  - **Available for**: LIFX Clean lights

### Light effects

LIFX lights can run animated effects. Some effects are calculated by Home Assistant and sent to the light, and others run on the light's own firmware.

Which effects a light offers depends on its type:

- White lights: Pulse and Stop.
- Color lights: Color loop, Pulse, and Stop.
- Multizone lights, such as the LIFX Z, Beam, and Neon Flex: Color loop, Move, Pulse, and Stop.
- Matrix lights, such as the LIFX Tile, Candle, Path, and Tube: Color loop, Flame, Morph, Pulse, and Stop.
- LIFX Ceiling: everything a matrix light offers, plus Sky.

The LIFX Luna, Mirror, E26 Candle, and E26 Tube also run the Sky effect, but it is not offered in the **Effect** option yet. On those lights, use the [**Sky effect**](/actions/lifx.effect_sky/) action instead.

The LIFX smartphone app splits the Sky effect into three separate effects, **Clouds**, **Sunrise**, and **Sunset**. In Home Assistant, they are one action with a **Sky type** option.

To start an effect with its default settings, use the **Effect** option of the [**Turn on light**](/actions/light.turn_on/) action:

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
        effect: effect_pulse
{% endexample %}

To control how an effect looks, use its dedicated action instead. Each action is described in [List of actions](#list-of-actions).

Firmware effects can be started and stopped whether the light is on or off. By default, starting one turns the light on. Set **Power on** to false to leave the power state alone.

### Themes

The integration includes a collection of predefined themes. Many of them match the theme of the same name in the LIFX app.

Themes can be painted onto any LIFX light with the [**Paint theme**](/actions/lifx.paint_theme/) action. A multizone or matrix light spreads the theme across its zones, and a light with a single zone takes one color from the theme at random.

You can also set a theme when you start the [**Move effect**](/actions/lifx.effect_move/) or [**Morph effect**](/actions/lifx.effect_morph/). To apply a theme by hand from the device page, use the **Theme** select entity, which multizone and matrix lights have.

The following themes are available:

- `arctic`
- `aurora_borealis`
- `autumn`
- `bias_lighting`
- `blissful`
- `calaveras`
- `cheerful`
- `cherry_blossom`
- `christmas`
- `coral_reef`
- `cyberpunk`
- `deep_sea`
- `desert`
- `dream`
- `earth`
- `energizing`
- `epic`
- `evening`
- `exciting`
- `fantasy`
- `fire`
- `focusing`
- `forest`
- `galaxy`
- `gentle`
- `halloween`
- `hanukkah`
- `holly`
- `hygge`
- `independence`
- `intense`
- `kwanzaa`
- `love`
- `mellow`
- `neon`
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
- `tropical`
- `vaporwave`
- `warming`
- `water`
- `zombie`

{% include integrations/actions.md %}

## Examples

Here are a few automation examples that use the actions provided by the LIFX integration:

{% include docs/paste_yaml_tip.md %}

### Automation: Flash the lights when the doorbell is pressed

Pulse the living room lights a few times so you notice the doorbell even if the sound is turned down.

- **Trigger**: State of the doorbell button changes to pressed
- **Action**: Pulse effect
  - **Target**: Living room (`light.living_room`)

Use the blueprint to pick the sensor, the lights, and the flash color without writing any YAML.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lifx_pulse_on_state_change.yaml" %}

{% details "YAML example for flashing the lights on a doorbell press" %}

{% example %}
automation: |
  alias: "Flash the living room lights on a doorbell press"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: lifx.effect_pulse
      target:
        entity_id: light.living_room
      data:
        mode: breathe
        color_name: "white"
        cycles: 3
{% endexample %}

{% enddetails %}

### Automation: Show a sky scene on the ceiling light in the evening

Start the Sky effect on a LIFX Ceiling light at sunset, using the slow sunset scene. To return the light to normal control later, use the [**Stop effect**](/actions/lifx.effect_stop/) action.

- **Trigger**: Sun: after sunset
- **Action**: Sky effect
  - **Target**: Bedroom ceiling (`light.bedroom_ceiling`)

Use the blueprint to choose the lights, the sky type, the speed, and how long after sunset the effect starts.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lifx_sky_effect_at_sunset.yaml" %}

{% details "YAML example for a sky scene in the evening" %}

{% example %}
automation: |
  alias: "Sky scene on the bedroom ceiling in the evening"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: lifx.effect_sky
      target:
        entity_id: light.bedroom_ceiling
      data:
        sky_type: Sunset
        speed: 120
{% endexample %}

{% enddetails %}

### Automation: Run a clean cycle when everyone leaves

Start a two-hour HEV cycle on a LIFX Clean light once the last person leaves home, so the room is cleaned while nobody is in it.

- **Trigger**: Zone: Person leaves home
- **Condition**: Nobody is home
- **Action**: Set HEV cycle state
  - **Target**: Bathroom (`light.bathroom`)

Use the blueprint to choose the zone to watch, the LIFX Clean lights, and how long the cycle runs.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/lifx_clean_cycle_when_empty.yaml" %}

{% details "YAML example for running a clean cycle when everyone leaves" %}

{% example %}
automation: |
  alias: "Run a LIFX clean cycle when everyone leaves"
  triggers:
    - trigger: zone
      entity_id: person.jane_doe
      zone: zone.home
      event: leave
  conditions:
    - condition: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: lifx.set_hev_cycle_state
      target:
        entity_id: light.bathroom
      data:
        power: true
        duration: 7200
{% endexample %}

{% enddetails %}

## Data updates

The **LIFX** integration {% term polling polls %} each light over your local network every 10 seconds. Changes made outside Home Assistant, such as from the LIFX app or a wall switch, can take up to that long to show up.

## Known limitations

### HomeKit Accessory Protocol

Most LIFX devices also support Apple HomeKit through the HomeKit Accessory Protocol (HAP). If a device has not already been added to HomeKit with an Apple device, you can add it to Home Assistant with the [HomeKit Controller](/integrations/homekit_controller) integration instead.

Compared to this integration, HomeKit Controller offers push updates, encrypted communication, and considerably less network traffic. It also lets you use LIFX devices that this integration does not support.

A device that supports HAP and has not been added to native HomeKit is discovered by both methods. You can set up both integrations for the same device at the same time, or ignore the discovery you do not want.

### LIFX Switch

The LIFX Switch is not supported by this integration. You have two other ways to add it to Home Assistant.

The LIFX Switch supports Matter over Wi-Fi, so you can add it with the [Matter](/integrations/matter) integration. If the switch is already paired with another ecosystem, such as Apple Home or Google Home, use that app to generate a new pairing code before you add it to Home Assistant.

You can also use the [HomeKit Controller](/integrations/homekit_controller) integration for a [LIFX Switch running firmware 3.90](https://support.lifx.com/en_us/switch-3-90-update-rk4zYiXVq) or higher. Follow the LIFX documentation to get a HomeKit code first, because you need it during setup. If you do not use Apple Home, this option keeps the switch entirely within Home Assistant.

When you use HomeKit Controller, each button on the switch is discovered as a [stateless switch](/integrations/homekit_controller#stateless-switches-and-sensors) and does not appear as an entity in Home Assistant. Relays that are configured as wired to non-LIFX devices appear as normal switches.

## Troubleshooting

### Lights are not discovered

LIFX lights are discovered by LIFX UDP broadcast, mDNS, HomeKit, and DHCP. Broadcast, mDNS, and HomeKit discovery all need Home Assistant to have a [network interface](/integrations/network) on the same subnet as your lights.

To resolve this issue, try the following steps:

1. If you have several network interfaces, make sure the one on the same subnet as your lights is enabled in your [network configuration](/integrations/network).
2. If your lights are on a separate network that Home Assistant cannot reach directly, add each light manually by host instead. A serial number on its own does not work here, because Home Assistant has to broadcast to resolve one.

### A LIFX Switch is not discovered

#### Symptom: "Cannot add pairing as device can no longer be found"

While adding a LIFX Switch with the [HomeKit Controller](/integrations/homekit_controller) integration, the switch is not discovered, or setup fails with this message.

#### Description

A LIFX Switch only advertises its HomeKit support for 15 minutes after it starts up.

#### Resolution

[Reboot your LIFX Switch](https://support.lifx.com/troubleshooting-switch-Hk6RWujLd), then start setup again within 15 minutes.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
