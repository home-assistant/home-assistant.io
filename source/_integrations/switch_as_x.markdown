---
title: Switch as X
description: Instructions on how to convert any Home Assistant switch into something else.
ha_category:
  - Cover
  - Fan
  - Helper
  - Light
  - Lock
  - Siren
  - Switch
ha_release: 2022.4
ha_iot_class: Calculated
ha_quality_scale: internal
ha_domain: switch_as_x
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/core'
ha_platforms:
  - cover
  - fan
  - light
  - lock
  - siren
ha_integration_type: helper
---

The Switch as X integrations lets you convert any Home Assistant switch into
a Home Assistant Light, Cover, Fan, Lock, or Siren.

In Home Assistant's world, a wall plug is a switch. And while that is correct
for a wall plug in general, those plugs are often used with e.g, a light
fixture or a fan. General-purpose relays are similar, as they are sometimes used for
things like locks or garage doors.

Using the Switch as X integration, you can convert those switches into the
entity types that best matches your use case.

{% include integrations/config_flow.md name="Change device type of a switch" %}
{% configuration_basic %}
Switch entity:
  description: The switch entity you want to convert into something else.
Type:
  description: The type of entity you want the switch to become.
{% endconfiguration_basic %}

## Switch as X from the existing entity

Where compatible, Switch as X will appear on entity properties. A list of entities can be found in {% my entities title="Settings -> Devices & Services -> Entities" %}.

![Entity properties exampl](/images/integrations/switch_as_x/Entities_Properties.png)
