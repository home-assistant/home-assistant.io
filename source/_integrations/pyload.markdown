---
title: pyLoad
description: Instructions on how to integrate pyLoad download sensor within Home Assistant.
ha_category:
  - Downloading
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: pyload
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `pyload` {% term integration %} allows you to monitor your downloads with [pyLoad](https://pyload.net/) from within Home Assistant and setup automation based on the information.

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pyload
```

{% configuration %}
host:
  description: This is the IP address of your pyLoad download manager.
  required: false
  type: string
  default: localhost
port:
  description: The port your pyLoad interface uses.
  required: false
  type: integer
  default: 8000
name:
  description: The name to use when displaying this pyLoad instance.
  required: false
  type: string
  default: 20
username:
  description: Your pyLoad username.
  required: false
  type: string
password:
  description: Your pyLoad password.
  required: false
  type: string
ssl:
  description: Enable SSL/TLS for the host.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

If everything is setup correctly, the download speed will show up in the frontend.

<p class='img'>
  <img src='/images/integrations/pyload/pyload_speed.png' />
</p>
