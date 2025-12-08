---
title: Change device type of a switch
description: Instructions on how to convert any Home Assistant switch into something else.
ha_category:
  - Cover
  - Fan
  - Helper
  - Light
  - Lock
  - Siren
  - Switch
  - Valve
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
  - valve
ha_integration_type: helper
---

The **Change device type of a switch** helper integrations lets you convert any Home Assistant switch into
a Home Assistant Light, Cover, Fan, Lock, Siren, or Valve.

In Home Assistant's world, a wall plug is a switch. And while that is correct
for a wall plug in general, those plugs are often used with e.g, a light
fixture or a fan. General-purpose relays are similar, as they are sometimes used for
things like locks or garage doors.

Using the **Change device type of a switch** helper integration, you can convert those switches into the
entity types that best matches your use case.

{% include integrations/config_flow.md name="Switch as X" %}

{% configuration_basic %}
Switch entity:
  description: The switch entity you want to convert into something else.
Type:
  description: The type of entity you want the switch to become.
{% endconfiguration_basic %}

## **Change device type of a switch** from the existing entity

Where compatible, **Change device type of a switch** will appear on entity properties. A list of entities can be found in **{% my entities title="Settings > Devices & services > Entities" %}**.

![Entity properties example](/images/integrations/switch_as_x/Entities_Properties.png)
