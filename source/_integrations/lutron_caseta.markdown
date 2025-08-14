---
title: Lutron Caséta
description: Instructions on how to use Lutron Caseta devices with Home Assistant.
featured: true
ha_category:
  - Binary sensor
  - Button
  - Cover
  - Fan
  - Hub
  - Light
  - Scene
  - Switch
ha_release: 0.41
ha_iot_class: Local Push
ha_domain: lutron_caseta
ha_config_flow: true
ha_codeowners:
  - '@swails'
  - '@danaues'
  - '@eclair4151'
ha_zeroconf: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - button
  - cover
  - diagnostics
  - fan
  - light
  - scene
  - switch
ha_integration_type: integration
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches, dimmers, occupancy sensors, HVAC controls, etc. The `lutron_caseta` integration in Home Assistant is responsible for communicating with the Lutron Caseta Smart Bridge for the [Caseta](https://www.casetawireless.com/) product line of dimmers, switches, shades, and sensors. It will also communicate with the Lutron Radio RA2 Main Repeater for the [RA2 Select](http://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/RA2Select/Overview.aspx) product line of dimmers, switches, shades, and sensors.

This integration supports the [Caséta](https://www.casetawireless.com/), [RA2 Select](https://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/RA2Select/Overview.aspx), [RadioRA 3](https://radiora3.lutron.com/), and [Homeworks QSX](https://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/Homeworks/Overview.aspx) **(not QS)** lines of products. 

Supports Bridges:

- Lutron Caséta Smart Hub (L-BDG2-WH)
- Lutron Caséta Smart Bridge PRO (L-BDGPRO2-WH)
- RA2 Select Main Repeaters (RR-SEL-REP2-BL)
- QSX Processor (HQP7)
- RadioRA 3 All-in-One Processor (RR-PROC3)
 
For the RadioRA 2 and HomeWorks QS product lines, see the [Lutron integration](/integrations/lutron/).

The currently supported devices are:

- Wall and plug-in dimmers as [lights](#light)
- Wall switches as [switches](#switch)
- Scenes as [scenes](#scene)
- Lutron shades as [covers](#cover)
- Lutron smart [fan](#fan) speed control
- Lutron Occupancy/Vacancy [sensors](#sensor)
- Pico Remotes as [device triggers](/integrations/device_automation/)
- Shade Remotes as [device triggers](/integrations/device_automation/)

When configured, the Lutron Caséta integration will automatically discover the currently supported devices as set up in the Lutron Smart Bridge. The name assigned in the Lutron mobile app will be used to form the `entity_id` used in Home Assistant. e.g., a dimmer called 'Lamp' in a room called 'Bedroom' becomes `light.bedroom_lamp` in Home Assistant.

{% include integrations/config_flow.md %}

## Manual hub configuration

To use Lutron Caseta devices in your installation, you must first log in to your Lutron account and generate a certificate that allows Home Assistant to connect to your bridge. This can be accomplished by following the [steps here](https://github.com/gurumitts/pylutron-caseta/tree/master#getting-started), which will generate three files: caseta.key, caseta.crt, caseta-bridge.crt when you run it.

If you already have `caseta.key`, `caseta.crt`, `caseta-bridge.crt`, and cannot physically access the bridge to press the button, pairing can be done by utilizing these existing files.

Once you have the three necessary files, place them in your configuration directory and add the following to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
lutron_caseta:
  - host: IP_ADDRESS
    keyfile: caseta.key
    certfile: caseta.crt
    ca_certs: caseta-bridge.crt
```

{% note %}
Note that multiple hubs can be specified by using multiple configuration blocks, but each of them requires its own `keyfile`, `certfile`, and `ca_certs` to be generated and specified.
{% endnote %}

{% configuration %}
  host:
    required: true
    description: The IP address of the Lutron Smart Bridge.
    type: string
  keyfile:
    required: true
    description: The private key that Home Assistant will use to authenticate to the bridge.
    type: string
  certfile:
    required: true
    description: The certificate chain that Home Assistant will use to authenticate to the bridge.
    type: string
  ca_certs:
    required: true
    description: The list of certificate authorities (usually only one) that Home Assistant will expect when connecting to the bridge.
    type: string
{% endconfiguration %}

{% tip %}
It is recommended to assign a static IP address to your Lutron Smart Bridge. This ensures that it won't change IP address, so you won't have to change the `host` if it reboots and comes up with a different IP address.
<br>
Use a DHCP reservation on your router to reserve the address or in the PRO model of the Smart Bridge, set the IP address under Network Settings in the Advanced / Integration menu in the mobile app.
{% endtip %}

To get Lutron Caseta roller, honeycomb shades, wood blinds, lights, scene and switch working with Home Assistant, first follow the instructions for the general Lutron Caseta integration above.

## Cover

After setup, shades will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a shade called 'Living Room Window' will appear in Home Assistant as `cover.living_room_window`.

For more information on working with shades in Home Assistant, see the [Covers integration](/integrations/cover/).

Available actions: `cover.open_cover`, `cover.close_cover`, `cover.stop_cover` and `cover.set_cover_position`. Cover `position` ranges from `0` for fully closed to `100` for fully open.

Available actions for tilt-only wood blinds: `cover.open_cover_tilt`, `cover.close_cover_tilt`, `cover.stop_cover_tilt`, `cover.toggle_tilt`. Cover `position` is `0` or `100` for fully closed and `50` for fully open.

## Light

After setup, dimmable lights including wall and plug-in dimmers will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a light called 'Bedroom Lamp' will appear in Home Assistant as `light.bedroom_lamp`.

For non-dimmable lights or switched loads, see the switch section on this page.

For more information on working with lights in Home Assistant, see the [Lights integration](/integrations/light/).

## Scene

The Lutron Caseta scene platform allows you to control your Smart Bridge Scenes that are created in the Lutron mobile app.

After setup, scenes will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a scene called 'Entertain' will appear in Home Assistant as `scene.entertain`.

For more information on working with scenes in Home Assistant, see the [Scenes integration](/integrations/scene/).

Scenes are not directly supported on RA3 and QSX models, however the button platform (see below) can be used to activate scenes for these systems.

## Switch

After setup, switches will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a light switch called 'Master Bathroom Vanity' will appear in Home Assistant as `switch.master_bathroom_vanity`.

For dimmable lights including wall and plug-in dimmers, see the light section on this page.

For more information on working with switches in Home Assistant, see the [Switches integration](/integrations/switch/).

## Fan

After setup, fans will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a light switch called 'Master Bedroom Ceiling Fan' will appear in Home Assistant as `fan.master_bedroom_ceiling_fan`.

For more information on working with fans in Home Assistant, see the [Fans integration](/integrations/fan/).

## Sensor

Occupancy sensors can be added to a Lutron Caseta system to trigger events when an area becomes vacant and, optionally, occupied. However, Lutron systems report occupancy and vacancy statuses only in *occupancy groups* -- that is, groups of one or more sensors.

Occupancy groups will appear in Home Assistant using an `entity_id` based on the area name in which the first sensor of the group is located. For example, one or more sensors in the Master Bathroom will appear in Home Assistant as `binary_sensor.master_bathroom_occupancy`.

An occupancy group is considered occupied if any of the sensors in the group are currently in an "occupied" state. Specifically, this means that motion has been detected more recently than that sensor's particular timeout setting. Only after all sensors in an occupancy group report being vacant does the occupancy group itself report being vacant.

Lutron Caseta occupancy sensors support 4 different timeouts and 3 different sensitivity levels, but those are only controllable from the devices themselves and cannot be set from either Home Assistant or even the Caseta mobile app.

Because Lutron Caseta devices automatically report state to Home Assistant (rather than relying on polling), occupancy status updates occur almost instantaneously.

For more information on working with binary sensors in Home Assistant, see the [Binary Sensors integration](/integrations/binary_sensor/)

## Button

Button Entities are created for each Keypad button and Pico Remote button present within the system.
Radio RA3 and HomeWorks QSX systems can use these button entities to activate scenes that are defined within the Lutron system.

For more information on working with buttons in Home Assistant, see the [Buttons integration](/integrations/button/).

## Pico and Shade Remotes

Pico and Shade remotes are supported on the Smart Bridge (L-BDG2-WH), Smart Bridge PRO (L-BDGPRO2-WH), and RA2 Select (RR-SEL-REP2-BL) models.

Device triggers are implemented for `press` and `release` of each button on the remotes via watching for `lutron_caseta_button_event` events in the format:

{% raw %}

```json
{
    "serial": 28786608,
    "type": "FourGroupRemote",
    "button_number": 4,
    "device_name": "Shade Remote",
    "area_name": "Upstairs Hall",
    "action": "press"
}
```

{% endraw %}
