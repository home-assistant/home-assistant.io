---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Button
  - Cover
  - Scene
  - Sensor
ha_release: 0.15
ha_domain: hunterdouglas_powerview
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@kingy444'
  - '@trullock'
ha_homekit: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - scene
  - sensor
ha_zeroconf: true
ha_dhcp: true
ha_integration_type: integration
---

The `hunterdouglas_powerview` integration allows you to integrate your [Hunter Douglas PowerView](https://help.hunterdouglas.com/s/?tabset-9157f=849ff) devices in Home Assistant. The product is also known by the brand name Luxaflex Powerview in Europe and Australia [as explained on their website](https://www.hunterdouglasgroup.com/company/brands-in-action/), however this integration should work for both brands.

There is currently support for the following device types within Home Assistant:

- Button
- Cover
- Scene
- Sensor

<div class="note">
The Powerview Hub does not automatically wake shades or report position changes made via pebble remotes.

Calling the update entity service (`homeassistant.update_entity`) on a shade entity will trigger the hub to awaken a shade and report its current position. [An example automation is available](#force-update-shade-position) below for mains powered shades. While the automation will work for battery-powered shades, it will quickly drain their batteries for these devices.
</div>

{% include integrations/config_flow.md %}

## Shades

### Known working devices

<div class="note">
If your shade is not listed please raise a feature request on the community forum.
</div>

| Name (Type)                               | Capabilities                    |
| :---------------------------------------- | :------------------------------ |
| Roman (4)                                 | Bottom Up                       |
| Bottom Up (5)                             | Bottom Up                       |
| Duette (6)                                | Bottom Up                       |
| Duette, Top Down Bottom Up (8)            | Top Down, Bottom Up             |
| Duette DuoLite, Top Down Bottom Up (9)    | Top Down, Bottom Up             |
| Silhouette (18)                           | 90° Tilt when closed            |
| Silhouette (23)                           | 90° Tilt when closed            |
| Duette Architella, Top Down Bottom Up (9) | Top Down, Bottom Up             |
| M25T Roller Blind (42)                    | Bottom Up                       |
| Facette (43)                              | 90° Tilt when closed            |
| Twist (44)                                | 180° Tilt when closed           |
| Pleated, Top Down Bottom Up (47)          | Top Down, Bottom Up             |
| AC Roller  (49)                           | Bottom Up                       |

### Devices with limited functionality

<div class="note">
These devices are currently still being tested. We ask you wait patiently while this completes. Until this is completed these may perform basic or slightly odd functionality.
</div>

| Name (Type)                               | Capabilities                    |
| :---------------------------------------- | :------------------------------ |
| Top Down (7)                              | Top Down                        |
| Silhouette Duolite (38)                   | Dual Shade Blackout + 90° Tilt  |
| Venetian, Tilt Anywhere (51)              | 180° Tilt Anywhere              |
| Vertical Slats, Left Stack (54)           | 180° Tilt when closed, Vertical |
| Vertical Slats, Right Stack (55)          | 180° Tilt when closed, Vertical |
| Vertical Slats, Split Stack (56)          | 180° Tilt when closed, Vertical |
| Venetian, Tilt Anywhere (62)              | 180° Tilt Anywhere, Vertical    |
| Vignette Duolite (65)                     | Dual Shade Blackout             |
| Curtain, Left Stack (69)                  | 180° Tilt when closed, Vertical |
| Curtain, Right Stack (70)                 | 180° Tilt when closed, Vertical |
| Curtain, Split Stack (71)                 | 180° Tilt when closed, Vertical |
| Duolite Lift (79)                         | Dual Shade Blackout 90° Tilt    |

## Capabilities Information

### Bottom Up

These shades offer only the simple up/down movement of your conventional shades.

### Top Down

<div class="note">Full functionality not currently implemented</div>

These shades offer a unique movement that is inverse to your conventional shade, where the shade is fixed to the floor and lowered from the roof.

### Top Down, Bottom Up (TDBU)

TDBU shades consist of two rails controlled by two motors designated by Top and Bottom with fabric in between.
The Top and Bottom can move independently to cover different parts of the window but cannot pass the other.
Two different entities that will be created for each blind: Top and Bottom.

#### Top entity

- 'Up/Open' will move the Top rail to the bottom of the window and set the Bottom rail to its closed position.
- 'Down/Close' will move the Top rail to the top of the window and set the Bottom rail to its closed position.
- 'Position' is the position in which the Top rail can move from the top of the window (0) to the bottom (100).
- The position of a Top rail cannot pass that of a Bottom rail. If you set an impossible position, the position will fall back to the closest possible value to that requested.

#### Bottom entity

- 'Up/Open' will move the Bottom rail to the top of the window and set the Top rail to its closed position.
- 'Down/Close' will move the Bottom rail to the bottom of the window and set the Top rail to its closed position.
- 'Position' is the position in which the Bottom rail can move from the bottom of the window (0) to the top (100).
- The position of a Bottom rail cannot pass that of a Top rail. If you set an impossible position, the position will fall back to the closest possible value to that requested.

### Tilt when closed

Shades with Tilt when closed functionality only allow a shade to tilt when it is closed and will automatically close the vanes when the shade is moved from it's closed position.

### Tilt Anywhere

<div class="note">Full functionality not currently implemented</div>

These shades can tilt in any position and do not require the shade to be open or closed to adjust the tilt position.

### Dual Shade Blackout

<div class="note">Full functionality not currently implemented</div>

These shades consist of two pieces of fabric attached to a single rail. The front shade is sheer, with the rear being blackout, and neither panel can move independently from the other.

## Buttons

### Calibrate

Initiate a calibration of the shade position. Calibration is a common requirement with Duette-type shades with a string drop that lowers and raises the blind and less so with roller types.

### Identify

Identify will 'jog' the shade position as a diagnostic tool to ensure the shade you are trying to move is both the intended shade and communicating correctly.

## Example Automations

### Calling a Powerview Scene

``` yaml
alias: "blinds closed at night"
trigger:
  platform: time
  at: "18:00:00"
action:
  - service: scene.turn_on
    target:
      entity_id: scene.10877
```

### Force Update Shade Position

This automation is not recommended for battery-powered shades.

``` yaml
alias: Force Update
description: 'Update the position of defined shades'
mode: single
trigger:
  - platform: time_pattern
    hours: '1'
action:
  - service: homeassistant.update_entity
    target:
      entity_id:
        - cover.family_right
        - cover.family_left
        - cover.kitchen_roller
```
