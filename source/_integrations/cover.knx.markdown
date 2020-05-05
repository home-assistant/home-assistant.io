---
title: "KNX Cover"
description: "Instructions on how to integrate KNX covers with Home Assistant."
ha_category:
  - Cover
ha_release: 0.48
ha_iot_class: Local Push
ha_domain: knx
---

<div class='note'>

The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx` cover platform is used as an interface to KNX covers.

To use your KNX covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: knx
    name: "Kitchen.Shutter"
    move_long_address: '3/0/0'
    move_short_address: '3/0/1'
    position_address: '3/0/3'
    position_state_address: '3/0/2'
    travelling_time_down: 51
    travelling_time_up: 61
```

{% configuration %}
name:
  description: A name for this device used within Home Assistant.
  required: false
  default: KNX Cover
  type: string
move_long_address:
  description: KNX group address for moving the cover full up or down.
  required: false
  type: string
move_short_address:
  description: KNX group address for moving the cover short time up or down. If the KNX device has a stop group address you can use that here.
  required: false
  type: string
position_address:
  description: KNX group address for moving the cover to the dedicated position.
  required: false
  type: string
position_state_address:
  description: Separate KNX group address for requesting the current position of the cover.
  required: false
  type: string
angle_address:
  description: KNX group address for moving the cover to the dedicated angle.
  required: false
  type: string
angle_state_address:
  description: Separate KNX group address for requesting the current angle of cover.
  required: false
  type: string
travelling_time_down:
  description: Time cover needs to travel down in seconds. Needed to calculate the intermediate positions of cover while traveling.
  required: false
  default: 25
  type: integer
travelling_time_up:
  description: Time cover needs to travel up in seconds. Needed to calculate the intermediate positions of cover while traveling.
  required: false
  default: 25
  type: integer
invert_position:
  description: Set this to true if your actuator report fully closed as 100%.
  required: false
  default: false
  type: boolean
invert_angle:
  description: Set this to true if your actuator reports tilt fully closed as 100%.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
