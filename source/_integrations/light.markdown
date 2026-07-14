---
title: Light
description: Instructions on how to set up your lights with Home Assistant.
ha_category:
  - Light
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: light
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Light** {% term integration %} allows you to track and control various light bulbs. Read the integration documentation for your particular light hardware to learn how to enable it.

{% include integrations/building_block_integration.md %}

## State and attributes of a light entity

Light {% term entities %} can have the following {% term states %}: `on` or `off`. The list of available attributes depends on the {% term device %}. Refer to the integration documentation of your light.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with differents states: `on`, `off`, or `unavailable`'>
  Three lights with differents states: `on`, `off`, or `unavailable`.
</p>

## Default turn-on values

To set the default color, brightness and transition values when the light is turned on, create a custom `light_profiles.csv`, normally located in the default configuration folder where you find {% term "`configuration.yaml`" %}.

The `light_profiles.csv` has to have a header. The format of the header is:

```txt
id,x,y,brightness,transition
```

- `id`: The name of the profile, used to reference it in action calls.
- `x`: The X coordinate of the CIE 1931 color space (xy color). It is a float typically between 0 and 1.
- `y`: The Y coordinate of the CIE 1931 color space. It is a float typically between 0 and 1.
- `brightness`: The brightness level to apply. It is a byte value between 0 and 255, not a percentage.
- `transition`: An optional positive integer specifying the transition time, in seconds, for the light to fade to a new state. This column can be omitted from the file.

The `.default` suffix should be added to the entity identifier of each light to define a default value. For example, for `light.ceiling_2` the `profile` field is `light.ceiling_2.default`. To define a default for all lights, the identifier `group.all_lights.default` can be used. Individual settings always supersede the `all_lights` default setting.

{% note %}
If a light entity is in the `on` state, the default profile brightness will only be applied if it is called in the action data attribute `profile`, like any other named profile. The transition attribute will be applied for all `light.turn_on`, `light.toggle`, and `light.turn_off` actions, unless specified otherwise in the action data.
{% endnote %}

### Example of a `light_profiles.csv` file

```txt
id,x,y,brightness,transition
relax,0.5119,0.4147,144,2
concentrate,0.2921,0.2606,240,1
reading,0.4448,0.4066,200
light.living_room_lamp.default,0.4576,0.4101,180
light.bedroom_lamp.default,0.5014,0.4152,60,3
group.all_lights.default,0.4448,0.4066,254,2
```

{% include integrations/triggers_conditions_actions.md %}
