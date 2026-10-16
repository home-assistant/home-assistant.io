---
title: Cover
description: Instructions on how to integrate covers into Home Assistant.
ha_category:
  - Cover
ha_release: 0.27
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: cover
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Home Assistant can give you an interface to control covers such as roller shutters, blinds, and garage doors.

{% include integrations/building_block_integration.md %}

## Cover states

A cover can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Opening** (`opening`): The cover is in the process of opening to reach a set position.
- **Open** (`open`): The cover has reached the open position.
- **Closing** (`closing`): The cover is in the process of closing to reach a set position.
- **Closed** (`closed`): The cover has reached the closed position.
- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

The device class of a cover determines the icon shown for each state. The state labels are the same for all device classes.

## Device class

The device class tells Home Assistant what kind of cover an entity is, such as a garage door or curtains. Home Assistant uses the device class to choose the icon and the arrows on the open and close buttons. The device class also decides where you can use the cover, such as in triggers and conditions, in [Assist](/voice_control/), on the [Security dashboard](/dashboards/dashboards/#security-dashboard), or in voice assistants. If a cover doesn't show up where you expect it, check its device class.

The integration that provides the cover sets the device class. When you create a cover yourself with a [template helper](/integrations/template/), you choose the device class.

### Device classes in automations and templates

- Automations: Most device classes have their own triggers and conditions, such as [Garage door opened](/triggers/garage_door.opened/). Of your covers, these triggers and conditions only list the ones with that device class. The list below shows the triggers and conditions of each device class. Dampers and covers without a device class have none.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `garage`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

A cover without a device class is a generic cover and shows {% icon "mdi:window-open" %}.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. The icons show an open cover. If the device class has its own triggers and conditions, they're listed below the item.

- {% icon "mdi:window-open" %} **Awning** (`awning`): An awning, such as an exterior retractable window, door, or patio cover. Awnings use the same icon as a generic cover.
  - Triggers: [Awning closed](/triggers/cover.awning_closed/), [Awning opened](/triggers/cover.awning_opened/)
  - Conditions: [Awning is closed](/conditions/cover.awning_is_closed/), [Awning is open](/conditions/cover.awning_is_open/)
- {% icon "mdi:blinds-horizontal" %} **Blind** (`blind`): Blinds, which are linked slats that expand or collapse to cover an opening or may be tilted to partially cover an opening, such as window blinds.
  - Triggers: [Blind closed](/triggers/cover.blind_closed/), [Blind opened](/triggers/cover.blind_opened/)
  - Conditions: [Blind is closed](/conditions/cover.blind_is_closed/), [Blind is open](/conditions/cover.blind_is_open/)
- {% icon "mdi:curtains" %} **Curtain** (`curtain`): Curtains or drapes, which are often fabric hung above a window or door that can be drawn open.
  - Triggers: [Curtain closed](/triggers/cover.curtain_closed/), [Curtain opened](/triggers/cover.curtain_opened/)
  - Conditions: [Curtain is closed](/conditions/cover.curtain_is_closed/), [Curtain is open](/conditions/cover.curtain_is_open/)
- {% icon "mdi:circle" %} **Damper** (`damper`): A mechanical damper that reduces airflow, sound, or light.
- {% icon "mdi:door-open" %} **Door** (`door`): A door that provides access to an area.
  - Triggers: [Door closed](/triggers/door.closed/), [Door opened](/triggers/door.opened/)
  - Conditions: [Door is closed](/conditions/door.is_closed/), [Door is open](/conditions/door.is_open/)
- {% icon "mdi:garage-open" %} **Garage** (`garage`): A garage door that provides access to a garage. Under **Show as**, this type is called **Garage door**.
  - Triggers: [Garage door closed](/triggers/garage_door.closed/), [Garage door opened](/triggers/garage_door.opened/)
  - Conditions: [Garage door is closed](/conditions/garage_door.is_closed/), [Garage door is open](/conditions/garage_door.is_open/)
- {% icon "mdi:gate-open" %} **Gate** (`gate`): A gate. Gates are found outside of a structure and are typically part of a fence.
  - Triggers: [Gate closed](/triggers/gate.closed/), [Gate opened](/triggers/gate.opened/)
  - Conditions: [Gate is closed](/conditions/gate.is_closed/), [Gate is open](/conditions/gate.is_open/)
- {% icon "mdi:roller-shade" %} **Shade** (`shade`): Shades, which are a continuous plane of material or connected cells that expand or collapse over an opening, such as window shades.
  - Triggers: [Shade closed](/triggers/cover.shade_closed/), [Shade opened](/triggers/cover.shade_opened/)
  - Conditions: [Shade is closed](/conditions/cover.shade_is_closed/), [Shade is open](/conditions/cover.shade_is_open/)
- {% icon "mdi:window-shutter-open" %} **Shutter** (`shutter`): Shutters, which are linked slats that can be raised or lowered to cover an opening, such as window or door roller shutters. Some shutters, for example, some indoor or exterior window shutters, swing out or in to cover an opening or may be tilted to provide partial cover.
  - Triggers: [Shutter closed](/triggers/cover.shutter_closed/), [Shutter opened](/triggers/cover.shutter_opened/)
  - Conditions: [Shutter is closed](/conditions/cover.shutter_is_closed/), [Shutter is open](/conditions/cover.shutter_is_open/)
- {% icon "mdi:window-open" %} **Window** (`window`): A physical window that opens and closes or may tilt.
  - Triggers: [Window closed](/triggers/window.closed/), [Window opened](/triggers/window.opened/)
  - Conditions: [Window is closed](/conditions/window.is_closed/), [Window is open](/conditions/window.is_open/)

### Changing the device class of a cover

If a cover shows up as the wrong type, for example as a window instead of a garage door, you can change its device class.

You can only change the device class in the UI if the cover has a unique ID. A cover without a unique ID shows a message in its entity settings instead. For such a cover, you can change the device class in YAML with [customization](/docs/configuration/customizing-devices/#customizing-an-entity-in-yaml).

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the cover.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **Show as**, select the type that matches your device.
4. Select **Update**.
   - Result: The cover shows up as the new type in triggers and dashboards.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Cover automation examples

You can use cover triggers and conditions to adjust lighting, remind yourself when something is still open, and run routines that depend on whether a cover is open or closed.

{% include docs/paste_yaml_tip.md %}

### Automation: turn off the office lamp when the blind opens after sunrise

If daylight is enough for the room, this automation turns off the office lamp when the blind opens in the morning.

- **Trigger**: Blind opened
  - **Target**: Office blind
- **Action**: Turn off light
  - **Target**: Office lamp

{% details "YAML example for turning off the office lamp" %}

{% example %}
automation: |
  alias: "Turn off the office lamp when the blind opens"
  triggers:
    - trigger: cover.blind_opened
      target:
        entity_id: cover.office_blind
  conditions:
    - condition: sun
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.office_lamp
{% endexample %}

{% enddetails %}

### Automation: close the bedroom shutter at sunset if it is still open

At sunset, this automation checks whether the bedroom shutter is still open. If it is, Home Assistant closes it for the night.

- **Trigger**: Sunset
- **Condition**: Shutter is open
  - **Target**: Bedroom shutter
- **Action**: Close cover

{% details "YAML example for closing the bedroom shutter at sunset" %}

{% example %}
automation: |
  alias: "Close the bedroom shutter at sunset"
  triggers:
    - trigger: sun.sunset
  conditions:
    - condition: cover.shutter_is_open
      target:
        entity_id: cover.bedroom_shutter
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_shutter
{% endexample %}

{% enddetails %}

## Known limitations

The triggers and conditions in [List of triggers](#list-of-triggers) and [List of conditions](#list-of-conditions) work only with `cover` entities that use the `awning`, `blind`, `curtain`, `shade`, or `shutter` device class.
