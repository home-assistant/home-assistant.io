---
title: ATEN Rack PDU
description: Instructions on how to integrate ATEN Rack PDUs into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.103
ha_codeowners:
  - '@mtdcr'
ha_domain: aten_pe
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `aten_pe` {% term integration %} lets you control [ATEN Rack PDUs](https://www.aten.com/eu/en/products/energy-intelligence-pduupsracks/rack-pdu/) from Home Assistant.

In order to use it, SNMP must be enabled on your PDU. It is recommended to use SNMPv3 to protect your credentials from eavesdropping.

Tested devices:

- [PE8324G](https://www.aten.com/eu/en/products/energy-intelligence-pduupsracks/rack-pdu/pe8324/)

To set it up, add the following information to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %} file:

```yaml
switch:
  - platform: aten_pe
    host: 192.168.0.60
```

{% configuration %}
host:
  description: The IP/host which to control.
  required: true
  type: string
port:
  description: The port on which to communicate.
  required: false
  type: string
  default: 161
community:
  description: community string to use for authentication (SNMP v1 and v2c).
  required: false
  type: string
  default: private
username:
  description: Username to use for authentication.
  required: false
  type: string
  default: administrator
auth_key:
  description: Authentication key to use for SNMP v3.
  required: false
  type: string
priv_key:
  description: Privacy key to use for SNMP v3.
  required: false
  type: string
{% endconfiguration %}
