---
title: Digital Loggers
description: Instructions on how to integrate Digital Loggers DIN III relays into Home Assistant.
ha_category:
  - Switch
ha_release: 0.35
ha_iot_class: Local Polling
ha_domain: digitalloggers
ha_platforms:
  - switch
---

The `digitalloggers` switch platform allows you to control the state of your [Digital Loggers](https://www.digital-loggers.com/dinfaqs.html) switches.

## Configuration

To use your digitalloggers switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: digitalloggers
    host: 192.168.1.43
```

{% configuration %}
host:
  description: The IP address or FQDN of your DIN III relay, e.g., `192.168.1.32` or `myrelay.example.com`.
  required: true
  type: string
name:
  description: The name to use when controlling this relay.
  required: false
  default: DINRelay
  type: string
username:
  description: Username for controlling this relay.
  required: false
  default: admin
  type: string
password:
  description: Password for controlling this relay.
  required: false
  default: admin
  type: string
timeout:
  description: Override the timeout in seconds if you need to, valid range is 1 to 600.
  required: false
  default: 20
  type: integer
cycletime:
  description: "This is the delay enforced by the library when you send multiple commands to the same device. Override it if you need to. Valid range is 1 to 600. A delay is a recommendation of Digital Loggers: Many loads draw more power when they are initially switched on. Sequencing prevents circuit overloads when loads devices are attached to a single circuit."
  required: false
  default: 2
  type: integer
{% endconfiguration %}

Your relays will be available in the form `switch.fantasticrelaydevice_individualrelayname`

**Note:** There is currently a limitation of the [dlipower library](https://github.com/dwighthubbard/python-dlipower) used by the `digitalloggers` integration that communication is only available over port 80.
