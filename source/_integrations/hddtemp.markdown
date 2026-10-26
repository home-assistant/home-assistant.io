---
description: Instructions on how to integrate hard drive temperature information into Home Assistant.
ha_release: 0.32
ha_domain: hddtemp
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **hddtemp** {% term integration %} is using the data provided by [HDDTemp](https://savannah.nongnu.org/projects/hddtemp).

## Setup

It required that `hddtemp` is started or running in daemon mode on a local or remote system.

```bash
hddtemp -dF
```

## Configuration

To set up a HDDTemp to your installation, add the following to your {% term "`configuration.yaml`" %} file.
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
