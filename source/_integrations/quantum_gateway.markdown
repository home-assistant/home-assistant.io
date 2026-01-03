---
title: Quantum Gateway
description: Instructions on how to integrate Quantum Gateways into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.81
ha_codeowners:
  - '@cisasteelersfan'
ha_domain: quantum_gateway
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `quantum_gateway` device tracker platform offers presence detection by looking at devices connected to a Verizon Fios gateway.

It was tested with a Verizon Fios-G1100 and G3100 Quantum Gateway.

## Configuration

To use a Verizon Fios Quantum Gateway in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: quantum_gateway
    host: 192.168.1.1
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: false
  type: string
  default: myfiosgateway.com
password:
  description: The password for the `admin` user. The default password may be printed on the gateway itself.
  required: true
  type: string
ssl:
  description: Use HTTPS when connecting to gateway. New firmware may require HTTPS while older may require this to be False.
  required: false
  type: boolean
  default: True
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
