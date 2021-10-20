---
title: Quantum Gateway
description: Instructions on how to integrate Quantum Gateways into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.81
ha_codeowners:
  - '@cisasteelersfan'
ha_domain: quantum_gateway
ha_platforms:
  - device_tracker
---

The `quantum_gateway` device tracker platform offers presence detection by looking at connected devices to a Verizon Fios gateway.

It was tested with a Verizon Fios-G1100 Quantum Gateway.

## Configuration

To use a Verizon Fios Quantum Gateway in your installation, add the following to your `configuration.yaml` file:

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
