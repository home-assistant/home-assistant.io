---
title: Osramlightify
description: Instructions on how to integrate Osram Lightify into Home Assistant.
ha_category:
  - Light
ha_release: 0.21
ha_iot_class: Local Polling
ha_domain: osramlightify
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `osramlightify` {% term integration %} allows you to integrate your [Osram Lightify](https://www.osram.com/cb/lightify/index.jsp) into Home Assistant.

To enable the {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: osramlightify
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: "IP address of the Osram Lightify bridge, e.g., `192.168.1.50`."
  required: true
  type: string
allow_lightify_nodes:
  description: (true/false) If `true` then import individual lights, if `false` then skip them.
  required: false
  default: true
  type: boolean
allow_lightify_sensors:
  description: (true/false) If `true` then import contact and motion sensors, if `false` then skip them. Takes effect only if `allow_lightify_nodes` is `true`.
  required: false
  default: true
  type: boolean
allow_lightify_switches:
  description: (true/false) If `true` then import switches, if `false` then skip them. Takes effect only if `allow_lightify_nodes` is `true`.
  required: false
  default: true
  type: boolean
allow_lightify_groups:
  description: (true/false) If `true` then import groups, if `false` then skip them.
  required: false
  default: true
  type: boolean
interval_lightify_status:
  description: Minimum interval in seconds between querying light status (for both individual lights and groups).
  required: false
  default: 5
  type: integer
interval_lightify_conf:
  description: Minimum interval in seconds between querying groups and scenes configuration.
  required: false
  default: 3600
  type: integer
{% endconfiguration %}

At the moment there is not much functionality for Osram Lightify switches and sensors.
The only thing that you can do out of the box is to track whether they are available or not.
Also for sensors a list of raw values is exposed as `sensor_values` attribute, and you can use them
in automations, if you know what particular values mean for your sensor.

It is suggested to make [scan_interval](/docs/configuration/platform_options/#scan-interval)
(30 seconds by default) less or equal to `interval_lightify_status`, otherwise the latter won't work
as expected. Shorter `scan_interval` may improve synchronization speed between individual lights and
groups. For example, if you turn on a group, all its lights may be updated to `on` immediately,
without querying the bridge.

Please note that to update all light statuses, only one query to the bridge is actually needed.

If a group has associated scenes, they will be imported as light effects and visible in `Effect`
dropdown on UI. You can apply a scene by clicking an item from the dropdown or by calling
`light.turn_on` service:

```yaml
  - action: light.turn_on
    target:
      entity_id: light.bedroom
    data:
      effect: Romance
```
