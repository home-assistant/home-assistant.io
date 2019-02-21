---
layout: page
title: "Quantum Gateway"
description: "Instructions on how to integrate Quantum Gateways into Home Assistant."
date: 2018-09-30 01:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
logo: fios.svg
ha_release: 0.81
---

The `quantum_gateway` device tracker platform offers presence detection by looking at connected devices to a Verizon Fios gateway.

It was tested with a Verizon Fios-G1100 Quantum Gateway.

## {% linkable_title Configuration %}

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
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
