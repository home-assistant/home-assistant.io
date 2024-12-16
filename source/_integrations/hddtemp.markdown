---
title: hddtemp
description: Instructions on how to integrate hard drive temperature information into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.32
ha_iot_class: Local Polling
ha_domain: hddtemp
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `hddtemp` sensor {% term integration %} is using the data provided by [HDDTemp](https://savannah.nongnu.org/projects/hddtemp).

## Setup

It required that `hddtemp` is started or running in daemon mode on a local or remote system.

```bash
hddtemp -dF
```

{% important %}
You can't use this sensor in a container (only Home Assistant Core is supported) as it requires access to `hddtemp` which is not available in a container-based setup.
{% endimportant %}

## Configuration

To setup a HDDTemp to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hddtemp
    disks:
      - /dev/sda1
```

{% configuration %}
name:
  description: Friendly name to use for the frontend.
  required: false
  default: HD Temperature
  type: string
host:
  description: Host where `hddtemp` is running.
  required: false
  default: localhost
  type: string
port:
  description: Port that is used by `hddtemp`.
  required: false
  default: 7634
  type: integer
disks:
  description: "Disk to be monitored. Example: `/dev/sda1`."
  required: false
  type: list
{% endconfiguration %}
