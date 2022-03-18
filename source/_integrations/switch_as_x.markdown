---
title: "Switch as X"
description: "Instructions on how to convert any Home Assistant switch into something else."
ha_category:
  - Cover
  - Fan
  - Light
  - Lock
  - Siren
  - Switch
ha_release: 2022.4
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: switch_as_x
ha_config_flow: true
---

The Switch as X integrations lets you convert any Home Assistant switch into
a Home Assistant Light, Cover, Fan, Lock, or Siren.

In Home Assistant's world, a wall plug is a switch. And while that is correct
for a wall plug in general, those plugs are often used with e.g, a light
fixture or fan. General-purpose relays are similar, as sometimes used for
things like locks or garage doors.

Using the Switch as X integration, you can convert those switches into the
entity types that best matches your use case.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Switch entity:
  description: The switch entity you want to convert into something else.
Type:
  description: The type of entity you want the switch to become.
{% endconfiguration_basic %}
