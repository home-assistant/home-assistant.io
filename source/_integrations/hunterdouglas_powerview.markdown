---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Button
  - Cover
  - Number
  - Scene
  - Select
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
  - number
  - scene
  - select
  - sensor
ha_zeroconf: true
ha_dhcp: true
ha_integration_type: integration
---

The `hunterdouglas_powerview` integration allows you to integrate your [Hunter Douglas PowerView](https://help.hunterdouglas.com/s/?tabset-9157f=849ff) devices in Home Assistant. The product is also known by the brand name Luxaflex Powerview in Europe and Australia [as explained on their website](https://www.hunterdouglasgroup.com/company/brands-in-action/), however this integration should work for both brands.

There is currently support for the following device types within Home Assistant:

- Button
- Cover
- Number
- Scene
- Select
- Sensor

{% include integrations/config_flow.md %}

## Hub capabilities

### Generation 1 + 2

Generation 1 and 2 hubs work better with Home Assistant when all calls are made directly via the Powerview application or Home Assistant itself.

Generation 1 and 2 Pebble remotes use proprietary Bluetooth Low Energy (PLE) and do not report shade position changes back to the hub.

This will result in the shade positioning displayed within Home Assistant being incorrect.

{% note %}
Calling the update entity action (`homeassistant.update_entity`) on a shade entity will trigger the hub to awaken a shade and report its current position.

[An example automation is available](#force-update-shade-position) below for mains powered shades. While the automation will work for battery-powered shades, it will quickly drain the batteries for these devices.
{% endnote %}

### Generation 3

Generation 3 introduced RF Radio Pebble Remotes.

Generation 3 shades report position changes back to the hub automatically. They should appear correctly in Home Assistant without requiring any additional automations or considerations for positioning.

## Shades

{% note %}
Your shades may still make work even if not listed. If you encounter issues, please raise a feature request on the community forum.
{% endnote %}

| Name (Type)                               | Capabilities                    |
| :---------------------------------------- | :------------------------------ |
| AC Roller  (49)                           | Bottom Up                       |
| Banded Shades (52)                        | Bottom Up                       |
| Bottom Up (5)                             | Bottom Up                       |
| Curtain, Left Stack (69)                  | Vertical                        |
| Curtain, Right Stack (70)                 | Vertical                        |
| Curtain, Split Stack (71)                 | Vertical                        |
| Facette (43)                              | Bottom Up TiltOnClosed 90°      |
| Designer Roller (1)                       | Bottom Up                       |
| Duette (6)                                | Bottom Up                       |
| Duette, Top Down Bottom Up (8)            | Top Down Bottom Up              |
| Duette and Applause SkyLift (10)          | Bottom Up                       |
| Duette Architella, Top Down Bottom Up (9) | Top Down Bottom Up              |
| Duette DuoLite, Top Down Bottom Up (9)    | Top Down Bottom Up              |
| Duolite Lift (79)                         | Dual Shade Overlapped           |
| M25T Roller Blind (42)                    | Bottom Up                       |
| Palm Beach Shutters (66)                  | Tilt Only 180°                  |
| Pirouette (18)                            | Bottom Up TiltOnClosed 90°      |
| Pleated, Top Down Bottom Up (47)          | Top Down Bottom Up              |
| Provenance Woven Wood (19)                | Bottom Up                       |
| Roman (4)                                 | Bottom Up                       |
| Silhouette (23)                           | Bottom Up TiltOnClosed 90°      |
| Silhouette Duolite (38)                   | Dual Shade Overlapped Tilt 90°  |
| Skyline Panel, Left Stack (26)            | Vertical                        |
| Skyline Panel, Right Stack (27)           | Vertical                        |
| Skyline Panel, Split Stack (28)           | Vertical                        |
| Top Down (7)                              | Top Down                        |
| Twist (44)                                | Bottom Up TiltOnClosed 180°     |
| Venetian, Tilt Anywhere (51)              | Bottom Up TiltAnywhere 180°     |
| Venetian, Tilt Anywhere (62)              | Bottom Up TiltAnywhere 180°     |
| Vertical Slats, Left Stack (54)           | Vertical TiltAnywhere 180°      |
| Vertical Slats, Right Stack (55)          | Vertical TiltAnywhere 180°      |
| Vertical Slats, Split Stack (56)          | Vertical TiltAnywhere 180°      |
| Vignette (31)                             | Bottom Up                       |
| Vignette (32)                             | Bottom Up                       |
| Vignette (84)                             | Bottom Up                       |
| Vignette Duolite (65)                     | Dual Shade Overlapped           |

## Capabilities Information

### Bottom Up

These shades offer only the simple up/down movement of your conventional shades.

### Top Down

These shades offer a unique movement that is inverse to your conventional shade, where the shade is fixed to the floor and lowered from the roof.

### Top Down Bottom Up(TDBU)

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

These shades can tilt in any position and do not require the shade to be open or closed to adjust the tilt position.

### Dual Shade Overlapped

These shades consist of two pieces of fabric attached to a single rail. The front shade is sheer, with the rear being opaque, and neither panel can move independently from the other.

Three different entities that will be created for each blind: Front, Rear and Combined.

#### Front entity

- 'Up/Open' will move the front shade to the ceiling
- 'Down/Close' will move the front shade to the floor
- As the positioning of the front requires the rear opaque to be fully opened any move will force the rear shade to be opened

#### Rear entity

- 'Up/Open' will move the rear shade to the ceiling
- 'Down/Close' will move the rear shade to the floor
- As the positioning of the rear requires the front sheer to be fully closed any move will force the front shade to be closed

#### Combined entity

- 'Up/Open' will move the front and rear shades to the ceiling
- 'Down/Close' will move the front and rear shades to the floor
- This entity combines movement for two entities in one
  - 0-50 represents the rear shade
  - 51-100 represents the front shade
- Tilt functionality will also be present on this entity for shades that support tilt
  - When Tilted the front sheer needs to be fully closed, this will happen automatically

## Buttons

### Calibrate

{% important %}
Gen 1 and Gen 2 Only.
{% endimportant %}
Initiate a calibration of the shade position. Calibration is a common requirement with Duette-type shades with a string drop that lowers and raises the blind and less so with roller types.

### Identify

Identify will 'jog' the shade position as a diagnostic tool to ensure the shade you are trying to move is both the intended shade and communicating correctly.

### Favorite

{% important %}
Gen 1 and Gen 2 Only.
{% endimportant %}

Move the shade to the favorite position as programmed physically on the device. This will perform the same move as the heart on the pebble remote.

## Selection Entities

### Power Source

{% important %}
Gen 1 and Gen 2 Only.
{% endimportant %}

Set the type for connected power source. Available options are Hardwired Power Supply, Battery Wand and Rechargeable Battery

## Number entities

### Velocity

{% important %}
Gen 3 Only.
{% endimportant %}

Velocity controls the speed of the shade. The default speed from Hunter Douglas is 0; setting this higher will increase the speed of the shade.

## Example Automations

### Calling a Powerview Scene

``` yaml
alias: "Blinds closed at night"
triggers:
  - trigger: time
    at: "18:00:00"
actions:
  - action: scene.turn_on
    target:
      entity_id: scene.10877
```

### Force Update Shade Position

This automation is not recommended for battery-powered shades.

``` yaml
alias: "Force Update"
description: "Update the position of defined shades"
triggers:
  - trigger: time_pattern
    hours: 1
actions:
  - action: homeassistant.update_entity
    target:
      entity_id:
        - cover.family_right
        - cover.family_left
        - cover.kitchen_roller
```
