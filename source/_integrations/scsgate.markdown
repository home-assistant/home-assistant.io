---
title: SCSGate
description: Instructions on how to integrate SCSGate into Home Assistant.
ha_category:
  - Cover
  - Hub
  - Light
  - Switch
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: scsgate
ha_platforms:
  - cover
  - light
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The SCSGate {% term integration %} support the [SCSGate](https://translate.google.com/translate?hl=en&sl=it&tl=en&u=http%3A%2F%2Fguidopic.altervista.org%2Feibscsgt%2Finterface.html) device. This a home-brew device allows to interact with the MyHome system from BTicino/Legrande.

There is currently support for the following device types within Home Assistant:

- [Cover](/integrations/scsgate/#cover)
- [Light](/integrations/scsgate/#light)
- [Switch](/integrations/scsgate/#switch)

To enable SCSGate in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
scsgate:
  device: PATH_TO_DEVICE
```

{% configuration %}
device:
  description: The path to your device, e.g., `/dev/ttyACM0`.
  required: true
  type: string
{% endconfiguration %}

### How to find the scs_id for your devices

The SCSGate integration relies on the [scsgate](https://github.com/flavio/scsgate) Python module.

This module provides also a command line tool called `scs-monitor`. This program can be used to find the IDs of your lights, switches and roller shutters and produce the YAML snippet to insert into your {% term "`configuration.yaml`" %} file.

For more information checkout [this](https://scsgate.readthedocs.org/en/latest/?badge=latest#creation-of-a-home-assistant-configuration-file) section of `scsgate`'s documentation.

### Cover

The SCSGate devices can control motorized covers connected to the BTicino MyHome system.

To enable SCSGate covers in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

{% configuration %}
devices:
  description: A list of devices.
  required: true
  type: list
  keys:
    slug:
      description: Slug of the device.
      required: true
      type: list
      keys:
        name:
          description: Name to use in the frontend.
          required: true
          type: string
        scs_id:
          description: The ID of your SCSGate device.
          required: true
          type: string
{% endconfiguration %}

{% note %}
**Known limitation:** It is not possible to know the current state of the cover.
{% endnote %}

### Light

The SCSGate device can control lights of the BTicino MyHome system.

To enable SCSGate lights in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
light:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

{% configuration %}
devices:
  description: A list of devices with their name to use in the frontend.
  required: true
  type: list
{% endconfiguration %}

### Switch

The SCSGate device can control switches of the BTicino MyHome system.

To enable SCSGate switches in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: scsgate
    devices:
      living_room:
        scs_id: XXXXX
```

{% configuration %}
devices:
  description: A list of devices with their name to use in the frontend.
  required: true
  type: list
{% endconfiguration %}
