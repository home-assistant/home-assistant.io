---
title: D-Link Wi-Fi Smart Plugs
description: Instructions on how to integrate D-Link switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.14
ha_domain: dlink
ha_platforms:
  - switch
---

The `dlink` switch platform allows you to control the state of your [D-Link Wi-Fi Smart Plugs](https://us.dlink.com/en/consumer/smart-plugs).

Supported devices (tested):

- DSP-W215
- DSP-W110

To use your D-Link smart plugs in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: dlink
  host: IP_ADRRESS
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: "The IP address of your D-Link plug, e.g., 192.168.1.32."
  required: true
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  default: D-link Smart Plug W215
  type: string
username:
  description: The username for your plug.
  required: true
  default: admin
  type: string
password:
  description: The password for your plug.
  required: true
  default: The default password is the `PIN` included on the configuration card.
  type: string
use_legacy_protocol:
  description: Enable limited support for legacy firmware protocols (Tested with v1.24).
  required: false
  default: false
  type: boolean
{% endconfiguration %}
