---
title: Greenwave Reality
description: Instructions on how to set up Greenwave Reality lights within Home Assistant.
ha_category:
  - Light
ha_release: 0.61
ha_iot_class: Local Polling
ha_domain: greenwave
ha_platforms:
  - light
ha_integration_type: integration
ha_quality_scale: legacy
---

This integration communicates with the Greenwave Reality (TCP Connected) Gateway to allow control of all lights and fixtures registered to the gateway. Bulbs and Fixtures can be created and modified inside the TCP Lighting App for Android and iOS.

This integration has been tested on firmware revisions:

- 2.0.105

To configure the connection to the gateway, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
light:
  - platform: greenwave
    host: XXX.XXX.XXX.XXX
    version: 3
```
The version option is the major revision of your firmware, which should be 2 or 3. If you are running Version 2, there are no extra steps. If you are running Version 3, you must press the Sync button on the gateway prior to the first launch of Home Assistant, so a token can be grabbed. Once Home Assistant has started, you can either press the Sync button again or wait for it to time out manually.

{% configuration %}
host:
  description: The IP Address of your Gateway
  required: true
  type: string
version:
  description: Major version of the gateway firmware
  required: true
  type: integer
{% endconfiguration %}
