---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Cover
  - Scene
  - Sensor
ha_release: 0.15
ha_domain: hunterdouglas_powerview
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - "@bdraco"
  - "@kingy444"
  - "@trullock"
ha_homekit: true
ha_platforms:
  - cover
  - scene
  - sensor
ha_zeroconf: true
ha_dhcp: true
ha_integration_type: integration
---

The `hunterdouglas_powerview` integration allows you to integrate your [Hunter Douglas PowerView](https://www.hunterdouglas.com/operating-systems/powerview-motorization/support) devices in Home Assistant. The product is also known by the brand name Luxaflex Powerview in Europe and Australia [as explained on their website](https://www.hunterdouglasgroup.com/company/brands-in-action/), however this integration should work for both brands.

There is currently support for the following device types within Home Assistant:

- Cover
- Scene
- Sensor

{% include integrations/config_flow.md %}

## Supported Shades

Known devices and their supported functionality is listed below.

> :warning: Devices listed as **Under Development** may perform basic or slightly odd functionality until **Full** support is implemented.\
> We ask you wait patiently for Full support before raising support tickets for other models.\
> \
> If however you're shade is not listed below please raise a support request for them to be added.

| Type | Common Name                        | Capabilities                    | Support           |
| ---- | ---------------------------------- | ------------------------------- | ----------------- |
| 4    | Roman                              | Bottom Up                       | Full              |
| 5    | Bottom Up                          | Bottom Up                       | Full              |
| 6    | Duette                             | Bottom Up                       | Full              |
| 7    | Top Down                           | Top Down                        | Under Development |
| 8    | Duette, Top Down Bottom Up         | Top Down, Bottom Up             | Under Development |
| 9    | Duette DuoLite, Top Down Bottom Up | Top Down, Bottom Up             | Under Development |
| 18   | Silhouette                         | 90° Tilt when closed            | Under Development |
| 23   | Silhouette                         | 90° Tilt when closed            | Full              |
| 38   | Silhouette Duolite                 | Dual Shade Blackout + 90° Tilt  | Under Development |
| 42   | M25T Roller Blind                  | Bottom Up                       | Full              |
| 43   | Facette                            | 90° Tilt when closed            | Under Development |
| 44   | Twist                              | 180° Tilt when closed           | Full              |
| 47   | Pleated, Top Down Bottom Up        | Top Down, Bottom Up             | Under Development |
| 49   | AC Roller                          | Bottom Up                       | Full              |
| 51   | Venetian, Tilt Anywhere            | 180° Tilt Anywhere              | Under Development |
| 54   | Vertical Slats, Left Stack         | 180° Tilt when closed, Vertical | Under Development |
| 55   | Vertical Slats, Right Stack        | 180° Tilt when closed, Vertical | Under Development |
| 56   | Vertical Slats, Split Stack        | 180° Tilt when closed, Vertical | Under Development |
| 62   | Venetian, Tilt Anywhere            | 180° Tilt Anywhere, Vertical    | Under Development |
| 65   | Vignette Duolite                   | Dual Shade Blackout             | Under Development |
| 69   | Curtain, Left Stack                | 180° Tilt when closed, Vertical | Under Development |
| 70   | Curtain, Right Stack               | 180° Tilt when closed, Vertical | Under Development |
| 71   | Curtain, Split Stack               | 180° Tilt when closed, Vertical | Under Development |
| 79   | Duolite Lift                       | Dual Shade Blackout             | Under Development |

## Capabilities Information

### Bottom Up

These shades offer only the simple up/down movement of your conventional shades.

### Top Down

> :information_source: Full functionality not currently implemented
These shades offer a unique movement which is inverse to your conventional shade where the shade is fixed to the floor and lowers from the roof.

### Top Down, Bottom Up (TDBU)

> :information_source: Full functionality not currently implemented
TDBU shades consist of two rails controlled by two motors designated by Top and Bottom with fabric in between.
The Top and Bottom can move independently of each other to cover different parts of the window but cannot pass the other.
Two different entities that will be created for each blind: Top and Bottom.

#### Top entity

- 'Up/Open' will move the Top rail to the bottom of the window and set the Bottom rail to it's closed position.
- 'Down/Close' will move the Top rail to the top of the window and set the Bottom rail to it's closed position.
- 'Position' is the position in which the Top rail can move, so from the top of the window (0) to the bottom of the window (100).
- Note as the position of a Top rail cannot pass that of a Bottom rail if you set an 'impossible position' the position will fall back to the closest possible value to that requested.

#### Bottom entity

- 'Up/Open' will move the Bottom rail to the top of the window and set the Top rail to it's closed position.
- 'Down/Close' will move the Bottom rail to the bottom of the window and set the Top rail to it's closed position.
- 'Position' is the position in which the Bottom rail can move, so from the bottom of the window (0) to the top of the window (100).
- Note as the position of a Bottom rail cannot pass that of a Top rail if you set an 'impossible position' the position will fall back to the closest possible value to that requested.

### Tilt when closed

Shades with Tilt with Tilt when closed functionality only allow a shade to tilt when it is closed and will automatically close the vanes when the shade is moved from it's closed position.

### Tilt Anywhere

> :information_source: Full functionality not currently implemented
These shades can tilt in any position and do not require the shade to be open or closed to adjust tilt position.

### Dual Shade Blackout

> :information_source: Full functionality not currently implemented
These shades consist of two pieces of fabric attached to a single rail. The front shade is sheer with the rear being blackout and neither panel can move independently to the other.

## Example Automations

``` yaml
- alias: "blinds closed at night"
  trigger:
    platform: time
    at: "18:00:00"
  action:
    - service: scene.turn_on
      target:
        entity_id: scene.10877
```
