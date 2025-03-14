---
title: Aruba ClearPass
description: Instructions on how to integrate Aruba ClearPass into Home Assistant.
ha_category:
  - Presence Detection
ha_release: '0.90'
ha_iot_class: Local Polling
ha_domain: cppm_tracker
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

This platform allows you to detect presence by looking at connected devices to [Aruba Clearpass](https://www.arubanetworks.com/products/security/network-access-control/).

Supported platforms (tested):

- Aruba ClearPass 6.7.5

{% important %}
You must first create an API client [here](https://www.arubanetworks.com/techdocs/ClearPass/6.6/Guest/Content/AdministrationTasks1/CreateEditAPIclient.htm).
{% endimportant %}

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: cppm_tracker
    host: clearpass.server.org
    client_id: clearpassapi
    api_key: 00000004qyO513hTdCfjIO2ZWWnmex8QZ5000000000
```

{% configuration %}
host:
  description: "The IP address or hostname of the ClearPass server, e.g., `clearpass.server.com`."
  required: true
  type: string
client_id:
  description: "The client ID from the API Clients page."
  required: true
  type: string
api_key:
  description: "The secret from the API Clients page."
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
