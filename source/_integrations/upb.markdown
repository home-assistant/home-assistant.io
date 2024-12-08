---
title: Universal Powerline Bus (UPB)
description: Instructions on how to setup Universal Powerline Bus integration.
ha_category:
  - Light
  - Scene
ha_release: '0.110'
ha_config_flow: true
ha_iot_class: Local Push
ha_codeowners:
  - '@gwww'
ha_domain: upb
ha_platforms:
  - light
  - scene
ha_integration_type: integration
---

The ***Universal Powerline Bus (UPB)** {% term integration %} allows Home Assistant to connect to a Universal Powerline Bus Powerline Interface Module (UPB PIM) to get status and control UPB devices and UPB links. The UPB PIM may be connected either to a serial port or over TCP. The integration implements the following platforms:

- Light
- Scene

## Prerequisites

The UPB integration requires that an export from the `UPStart` UPB configuration program. To create an export, in `UPStart`, click the UPB button in the top left and select **Export to File**. This will create a file with the `.upe` extension. The file must be placed in the configuration directory of your Home Assistant installation.

{% include integrations/config_flow.md %}

## Device configuration

Using UPStart, configure each UPB dimmer-switch to report its state when it is manually operated. If you omit this step, manual changes to a dimmer-switch's state (on/off/brightness) will *not* be reported to Home Assistant.

## Events

An event is generated whenever a UPB Link is:

- activated
- deactivated
- goes to a new level
- fade is started
- fade is stopped
- blink is started

The event is `upb.scene_changed`.

The `event_data` contains the following:

- `command`: One of `activated`, `blink`, `deactivated`, `fade_started`,
  `fade_stopped`, or `goto`.
- `address`: The address of the link reporting the event. The `address`
  is comprised of the UPB network number and the UPB Link number.
  For example for UPB Network number 42 and UPB Link number 24 the
  `address` would be 42_24.
- `brightness_pct`: The brightness level as a percentage. `brightness_pct` is
  reported as -1 if the brightness is a default level of brightness is not
  applicable to the link change.
- `rate`: The rate for link to transition to the new level. `rate` is
  -1 for the default transition rate.

## Actions

Besides the standard actions provided by the Home Assistant [Light](/integrations/light/) and [Scene](/integrations/scene) integrations, the following extra actions are provided by the UPB integration:

- `upb.light_fade_start`
- `upb.light_fade_stop`
- `upb.light_blink`
- `upb.scene_deactivate`
- `upb.scene_goto`
- `upb.scene_fade_start`
- `upb.scene_fade_stop`
- `upb.scene_blink`

### Rate transition time

Both standard and custom actions that take a `transition` or a `rate` for changing brightness levels take time in seconds. The UPB
system only offers a discrete set of transition times. As such, the transition time requested is changed to the closest time based on
the table below. Note that this table does not apply to blink rates, only to brightness transition times.

| Request rate >= | Requested rate < | Rate Used |
| --------------- | ---------------- | --------- |
| 0 seconds       | 0.4 seconds      | 0 seconds
| 0.4 seconds     | 1.2 seconds      | 0.8 seconds
| 1.2 seconds     | 2.45 seconds     | 1.6 seconds
| 2.45 seconds    | 4.15 seconds     | 3.3 seconds
| 4.15 seconds    | 5.8 seconds      | 5.0 seconds
| 5.8 seconds     | 8.3 seconds      | 6.6 seconds
| 8.3 seconds     | 15 seconds       | 10 seconds
| 15 seconds      | 25 seconds       | 20 seconds
| 25 seconds      | 45 seconds       | 30 seconds
| 45 seconds      | 90 seconds       | 60 seconds
| 1.5 minute      | 3.5 minutes      | 2 minutes
| 3.5 minutes     | 7.5 minutes      | 5 minutes
| 7.5 minutes     | 12.5 minutes     | 10 minutes
| 12.5 minutes    | 22.5 minutes     | 15 minutes
| 22.5 minutes    | 45 minutes       | 30 minutes
| 45 minutes      | ∞                | 1 hour

### Action `upb.light_fade_start`

Starts a transition of a light to the specified level. Lights that are not dimmable ignore the fade start command.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB light which to start fading operation.
| `brightness` | no* | Integer between 0 and 255 for how bright the light should be, where 0 means the light is off, 1 is the minimum brightness and 255 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `brightness_pct`| no* | Number between 0 and 100 in percentage that specifies how bright the light should be, where 0 means the light is off, 1 is the minimum brightness and 100 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `rate` | yes | Number that represents the time (in seconds) the light should take to transition to the new state. See section on "Rate Transition Time" for how this time value is interpreted.

### Action `upb.light_fade_stop`

Stop a light when transitioning from one light level to another. Stops either a fade or a goto (goto occurs when using a `light.turn_on` or `light.turn_off`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB light which to stop fading operation.

### Action `upb.light_blink`

Start a light blinking.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB light which to blink.
| `rate` | no | Number between 0 and 4.25 that represents the time (in seconds) the rate the light blinks. Note the UPB implementation limits the blink rate to no faster than 1/3 of a second.

### Action `upb.scene_deactivate`

Deactivate a scene. The term “deactivate” is a general UPB term that usually means to turn to the OFF state, but each individual device manufacturer can define it differently for their device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB scene to deactivate.

### Action `upb.scene_goto`

Starts a transition of a scene to the specified level.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB scene to transition.
| `brightness` | no* | Integer between 0 and 255 for how bright the scene should be, where 0 means the scene is off, 1 is the minimum brightness and 255 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `brightness_pct`| no* | Number between 0 and 100 in percentage that specifies how bright the scene should be, where 0 means the scene is off, 1 is the minimum brightness and 100 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `rate` | yes | Number that represents the time (in seconds) the light should take to transition to the new state. See section on "Rate Transition Time" for how this time value is interpreted.

### Action `upb.scene_fade_start`

Starts a transition of a scene to the specified level. Lights within the scene that are not dimmable ignore the fade start command.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB scene to transition.
| `brightness` | no* | Integer between 0 and 255 for how bright the scene should be, where 0 means the scene is off, 1 is the minimum brightness and 255 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `brightness_pct`| no* | Number between 0 and 100 in percentage that specifies how bright the scene should be, where 0 means the scene is off, 1 is the minimum brightness and 100 is the maximum brightness. *Only one of `brightness` and `brightness_pct` may be used.
| `rate` | yes | Number that represents the time (in seconds) the light should take to transition to the new state. See section on "Rate Transition Time" for how this time value is interpreted.

### Action `upb.scene_fade_stop`

Stop a scene when transitioning from one light level to another. Stops either a fade or a goto.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB scene which to stop fading operation.

### Action `upb.scene_blink`

Start a scene blinking.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | UPB scene which to blink.
| `rate` | no | Number between 0 and 4.25 that represents the time (in seconds) the rate the scene blinks. Note the UPB implementation limits the blink rate to no faster than 1/3 of a second.

## Examples

```yaml
#automation:

- alias: "Specific scene activated"
  description: "Trigger when scene 9 on network 42 is activated"
  triggers:
    - trigger: event
      event_type: upb.scene_changed
      event_data:
        command: activated
        address: "42_9"
  actions:
    - action: persistent_notification.create
      data:
        title: "Scene Activated"
        message: >
          Activated scene 9 on network 42: {{trigger.event.data.command}}, {{trigger.event.data.address}}

```

```yaml
#script:
 
all_lights_on:
  alias: "All Lights On"
  description: "Activate two UPB scenes named interior_lights and exterior_lights"
  sequence:
    - action: scene.turn_on
      target:
        entity_id: 
          - scene.interior_lights
          - scene.exterior_lights

all_lights_off:
  alias: "All Lights Off"
  description: "Deactivate two UPB scenes named interior_lights and exterior_lights"
  sequence:
    - action: upb.scene_deactivate
      target:
        entity_id: 
          - scene.interior_lights
          - scene.exterior_lights

kitchen_fade_on:
  alias: "Kitchen Fade to On"
  description: "Turn on kitchen light to 75% over a period of 10 seconds"
  sequence:
    - action: upb.light_fade_start
      target:
        entity_id: light.kitchen
      data:
        brightness_pct: 75
        rate: 10
```

## Notes

- A UPB device does not always report its current state. For example, if you call `upb.light_fade_start` and then, a few seconds later, call `upb.light_fade_stop`, the selected UPB device will not report its new brightness level. However, if you then call `homeassistant.update_entity` it will make the UPB device report its current state to Home Assistant.
- Alterations to your UPB configuration with UpStart must be re-exported. The exported UPE file must have the same filename in the Home Assistant `config` directory.

## Debugging

Debug logs are often required to solve an issue. To enable UPB debug logs add the following to your {% term "`configuration.yaml`" %} file in your Home Assistant `config` directory:

```yaml
logger:
  logs:
    upb_lib: debug
    homeassistant.components.upb: debug
```

After updating your configuration file, restart Home Assistant. The debug logs will be in the file `homeassistant.log` in the `config` directory.
