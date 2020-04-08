---
title: Tesla Powerwall
description: Instructions on how to integrate Tesla Power Walls into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: powerwall
---

The `powerwall` integration allows you to integrate your [Tesla Powerwall](https://www.tesla.com/powerwall) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

## Configuration

You will need the IP Address of your Powerwall to use this module.

To add `Tesla Powerwall` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Tesla Powerwall**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
powerwall:
  ip_address: YOUR_POWERWALL_IP
```

{% configuration %}
ip_address:
  description: The IP address of your Powerwall.
  required: true
  type: string
{% endconfiguration %}

### Binary Sensor

The following binary sensors are added for each Powerwall:

- Powerwall Status
- Powerwall Connected to Tesla
- Grid Status

### Sensor

The following binary sensors are added for each Powerwall:

- Powerwall Charge
- Powerwall Site Now
- Powerwall Load Now
- Powerwall Battery Now
- Powerwall Frequency Now (if applicable)
- Powerwall Busway Now (if applicable)
- Powerwall Solar Now (if applicable)
- Powerwall Generator Now (if applicable)
