---
title: Griddy Power
description: Instructions on how to integrate griddy prices into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.107
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: griddy
---

The `griddy` integration allows you to integrate your [Griddy](https://griddy.com/) price data into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Sensor

## Configuration

You will need your Griddy Load Zone to use this module.

To add `Griddy` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Griddy**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
griddy:
  loadzone: YOUR_LZ
```

{% configuration %}
loadzone:
  description: Your Load Zone is in your Griddy account under “Account > Meter > Load Zone.”
  required: true
  type: string
{% endconfiguration %}

### Sensor

The current price for the Load Zone will appear as a sensor:

- LZ_XXXXX Price Now

### Example Automation

```yaml
- id: '1572630019168'
  alias: Stop Tesla Charging if Power Price Spikes
  description: ''
  trigger:
  - above: '30'
    entity_id: sensor.lz_houston_price_now
    platform: numeric_state
  condition:
  - condition: zone
    entity_id: device_tracker.my_tesla
    zone: zone.home
  action:
  - service: switch.turn_off
    entity_id: switch.my_tesla_charger_switch
```
