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

The device class tells Home Assistant what kind of cover an entity is, such as a garage door or curtains.

The device class makes a difference in the following places:

- Automations: Each type of cover has its own triggers and conditions, such as [Garage door opened](/triggers/garage_door.opened/) or [Curtain is closed](/conditions/cover.curtain_is_closed/). They only list covers with the matching device class. Dampers and covers without a device class have none.
- Assist: You can say "open the curtains in the kitchen" or ask "are any windows open?". In English, [Assist](/voice_control/) knows awnings, blinds, curtains, doors, garage doors, gates, shades, shutters, and windows.
- Voice assistants and Apple Home: [Google Assistant](/integrations/google_assistant/), [Alexa](/integrations/alexa/), and Apple Home, through the [HomeKit Bridge](/integrations/homekit/) integration, show many types as a matching device, such as a garage door or a window. Alexa and Apple Home show gates as garage doors. Google Assistant only opens doors, garage doors, and gates after you confirm with a PIN.
- Dashboards: The [Security dashboard](/dashboards/dashboards/#security-dashboard) shows doors, garage doors, gates, and windows. The [Climate dashboard](/dashboards/dashboards/#home-assistant-built-in-dashboards) shows awnings, blinds, curtains, shades, shutters, windows, and covers without a device class. The **Area controls** feature of the [area card](/dashboards/area/) can open or close all covers of one type in an area, such as all blinds.
- Display: Awnings, curtains, doors, and gates use horizontal arrows on their open and close buttons. Other covers use up and down arrows.
- Icon: The icon matches the type. For example, a garage door shows {% icon "mdi:garage-open" %} when it's open and {% icon "mdi:garage" %} when it's closed.
- History and Activity: If you have covers with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the cover sets the device class. When you create a cover yourself with a [template helper](/integrations/template/), you choose it.

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- {% icon "mdi:window-open" %} No device class: A generic cover.
- {% icon "mdi:window-open" %} **Awning** (`awning`): An awning, such as an exterior retractable window, door, or patio cover. Awnings use the same icon as a generic cover.
- {% icon "mdi:blinds-horizontal" %} **Blind** (`blind`): Blinds, which are linked slats that expand or collapse to cover an opening or may be tilted to partially cover an opening, such as window blinds.
- {% icon "mdi:curtains" %} **Curtain** (`curtain`): Curtains or drapes, which are often fabric hung above a window or door that can be drawn open.
- {% icon "mdi:circle" %} **Damper** (`damper`): A mechanical damper that reduces airflow, sound, or light.
- {% icon "mdi:door-open" %} **Door** (`door`): A door that provides access to an area.
- {% icon "mdi:garage-open" %} **Garage** (`garage`): A garage door that provides access to a garage. Under **Show as**, this type is called **Garage door**.
- {% icon "mdi:gate-open" %} **Gate** (`gate`): A gate. Gates are found outside of a structure and are typically part of a fence.
- {% icon "mdi:roller-shade" %} **Shade** (`shade`): Shades, which are a continuous plane of material or connected cells that expand or collapse over an opening, such as window shades.
- {% icon "mdi:window-shutter-open" %} **Shutter** (`shutter`): Shutters, which are linked slats that can be raised or lowered to cover an opening, such as window or door roller shutters. Some shutters, for example, some indoor or exterior window shutters, swing out or in to cover an opening or may be tilted to provide partial cover.
- {% icon "mdi:window-open" %} **Window** (`window`): A physical window that opens and closes or may tilt.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `garage`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### Changing the device class of a cover

If a cover shows up as the wrong type, for example as a window instead of a garage door, you can change its device class.

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the cover.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **Show as**, select the type that matches your device.
4. Select **Update**.
   - Result: The cover shows up as the new type in triggers, dashboards, and voice assistants.

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

The triggers and conditions documented on this page work only with `cover` entities that use the `awning`, `blind`, `curtain`, `shade`, or `shutter` device class.
