---
title: Vultr
description: Instructions on how to integrate Vultr within Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Switch
  - System monitor
ha_release: 0.58
ha_iot_class: Cloud Polling
ha_domain: vultr
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Vultr** {% term integration %} allows you to access information about and interact with your [Vultr](https://www.vultr.com) instances (Virtual Private Servers) from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

Obtain your API key from your [Vultr Account](https://my.vultr.com/settings/#settingsapi).

<div class='note'>
Ensure you allow the public IP of Home Assistant under the Access Control heading.
</div>

To integrate your Vultr instances with Home Assistant, Add the device types to your {% term "`configuration.yaml`" %} file. Each device type requires an API key.
{% include integrations/restart_ha_after_config_inclusion.md %}


## Binary sensor

The `vultr` binary sensor platform allows you to monitor your [Vultr](https://www.vultr.com/) instance to see if it is powered on or not.

### Configuration
<div class='note'>

The following examples assume an instance that has an ID of `123456` and a label of `Web Server`

</div>

Minimal `configuration.yaml` (produces `binary_sensor.vultr_web_server`):

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: vultr
    api_key: Your Vultr API key.
    instance: 123456
```

{% configuration %}
api_key:
  description: Your Vultr API key.
  required: true
  type: string
instance:
  description: The instance you want to monitor, this can be found in the URL when viewing a server.
  required: true
  type: string
name:
  description: The name you want to give this binary sensor.
  required: false
  default: "Vultr {instance label}"
  type: string
{% endconfiguration %}

### Full example

Full {% term "`configuration.yaml`" %} (produces `binary_sensor.totally_awesome_server`):

```yaml
binary_sensor:
  - platform: vultr
    name: totally_awesome_server
    instance: 12345
```

## Sensor

The `vultr` sensor platform will allow you to view current bandwidth usage, account balance and pending charges against your [Vultr](https://www.vultr.com/) account.

Minimal {% term "`configuration.yaml`" %} (produces `sensor.vultr_account_balance`, `sensor.vultr_current_bandwidth_in`, `sensor.vultr_current_bandwidth_out` and `sensor.vultr_pending_charges`):

```yaml
sensor:
  - platform: vultr
    api_key: Your Vultr API key.
```

{% configuration %}
api_key:
  description: Your Vultr API key.
  required: true
  type: string
name:
  description: The name to give this sensor.
  required: false
  default: "Vultr {Vultr subscription label} {monitored condition name}"
  type: string
monitored_conditions:
  description: List of items you want to monitor for each account.
  required: false
  detault: All conditions
  type: list
  keys:
    current_bandwidth_gb_in:
      description: The current (invoice period) bandwidth usage in Gigabytes (GB).
    current_bandwidth_gb_out:
      description: The current (invoice period) bandwidth usage out Gigabytes (GB).
    pending_charges:
      description: The current (invoice period) charges that have built up for this account. Value is in US Dollars (US$).
    balance:
      description: The current account balance. Value is in US Dollars (US$).
{% endconfiguration %}

Full {% term "`configuration.yaml`" %} using `{}` to format condition name (produces `sensor.account_account_balance`, `sensor.account_current_bandwidth_in`, `sensor.account_current_bandwidth_out` and `sensor.account_pending_charges`):

```yaml
sensor:
  - platform: vultr
    api_key: Your Vultr API key.
    name: Account {}
    monitored_conditions:
      - current_bandwidth_gb_in
      - current_bandwidth_gb_out
      - pending_charges
      - balance
```

Custom {% term "`configuration.yaml`" %} with only one condition monitored (produces `sensor.account_current_bandwidth_gb_in`):

```yaml
sensor:
  - platform: vultr
    api_key: Your Vultr API key.
    name: Account Bandwidth In
    monitored_conditions:
      - current_bandwidth_gb_in
```

## Switch

The `vultr` switch platform allows you to control (start/stop) your [Vultr](https://www.vultr.com/) instance.

### Configuration

Minimal {% term "`configuration.yaml`" %} (produces `switch.vultr_web_server`):

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    api_key: Your Vultr API key.
    instance: YOUR_INSTANCE_ID
```

{% configuration %}
api_key:
  description: Your Vultr API key.
  required: true
  type: string
instance:
  description: The instance you want control.
  required: true
  type: string
name:
  description: The name you want to give this switch.
  required: false
  default: "Vultr {subscription label}"
  type: string
{% endconfiguration %}

### Additional examples

Full example that produces `switch.amazing_server`, assuming an instance that has an ID of `123456` and a label of `Amazing Server`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    api_key: Your Vultr API key.
    name: Amazing Server
    instance: 12345
```
