---
title: Hisense AEH-W4A1
description: Instructions to setup the Hisense AEH W4A1 WiFi module for ACs.
ha_release: 0.103
ha_category:
  - Climate
ha_iot_class: Local Poll
ha_config_flow: true
ha_codeowners:
  - '@bannhead'
ha_domain: hisense_aehw4a1
---

The Hisense AEH-W4A1 is a Wi-Fi module used to give Wi-Fi connectivity to some Hisense ACs and rebranded models (Smart Cool, Beko and others).

Later AC models use other Wi-Fi modules (like AEH-W4B1 and AEH-W4E1) that are not compatible or otherwise tested with this integration.

It is highly recommended not to use one of the official smartphone applications and this integration at the same time, to avoid problems related to command collision.

## Configuration

To integrate one or more Hisense AEH-W4A1 controlled ACs with Home Assistant, use the Configuration/Integrations or add the following section to your `configuration.yaml` file:

```yaml
# Automatic discovery
hisense_aehw4a1:
```

Alternately, devices that are not discoverable can be statically configured.
The use of static configuration disables automatic discovery.

{% configuration %}
ip_address:
  description: One or more static IP addresses
  required: false
  type: list
{% endconfiguration %}

## Full configuration example

```yaml
# Static configured devices
hisense_aehw4a1:
  ip_address:
  - 192.168.5.10
  - 192.168.5.20
```
