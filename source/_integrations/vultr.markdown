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
ha_quality_scale: legacy
---

The **Vultr** {% term integration %} allows you to access information about and interact with your [Vultr](https://www.vultr.com) subscriptions (Virtual Private Servers) from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

Obtain your API key from your [Vultr Account](https://my.vultr.com/settings/#settingsapi).

{% important %}
Ensure you allow the public IP of Home Assistant under the Access Control heading.
{% endimportant %}

To integrate your Vultr subscriptions with Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
vultr:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your Vultr API key.
  required: true
  type: string
{% endconfiguration %}

## Binary sensor

The `vultr` binary sensor platform allows you to monitor your [Vultr](https://www.vultr.com/) subscription to see if it is powered on or not.

### Configuration

To use this binary sensor, you first have to set up your Vultr hub.

{% note %}
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
{% endnote %}

Minimal `configuration.yaml` (produces `binary_sensor.vultr_web_server`):

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: vultr
    subscription: 123456
```

{% configuration %}
subscription:
  description: The subscription you want to monitor, this can be found in the URL when viewing a server.
  required: true
  type: string
name:
  description: The name you want to give this binary sensor.
  required: false
  default: "Vultr {subscription label}"
  type: string
{% endconfiguration %}

### Full example

Full {% term "`configuration.yaml`" %} (produces `binary_sensor.totally_awesome_server`):

```yaml
binary_sensor:
  - platform: vultr
    name: totally_awesome_server
    subscription: 12345
```

## Sensor

The `vultr` sensor platform will allow you to view current bandwidth usage and pending charges against your [Vultr](https://www.vultr.com/) subscription.

To use this sensor, you must set up your Vultr hub.

{% note %}
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
{% endnote %}

Minimal {% term "`configuration.yaml`" %} (produces `sensor.vultr_web_server_current_bandwidth_used` and `sensor.vultr_web_server_pending_charges`):

```yaml
sensor:
  - platform: vultr
    subscription: 123456
```

{% configuration %}
subscription:
  description: The Vultr subscription to monitor, this can be found in the URL when viewing a subscription.
  required: true
  type: string
name:
  description: The name to give this sensor.
  required: false
  default: "Vultr {Vultr subscription label} {monitored condition name}"
  type: string
monitored_conditions:
  description: List of items you want to monitor for each subscription.
  required: false
  detault: All conditions
  type: list
  keys:
    current_bandwidth_gb:
      description: The current (invoice period) bandwidth usage in Gigabytes (GB).
    pending_charges:
      description: The current (invoice period) charges that have built up for this subscription. Value is in US Dollars (US$).
{% endconfiguration %}

Full {% term "`configuration.yaml`" %} using `{}` to format condition name (produces `sensor.server_current_bandwidth_gb` and `sensor.server_pending_charges`):

```yaml
sensor:
  - platform: vultr
    name: Server {}
    subscription: 123456
    monitored_conditions:
      - current_bandwidth_gb
      - pending_charges
```

Custom {% term "`configuration.yaml`" %} with only one condition monitored (produces `sensor.web_server_bandwidth`):

```yaml
sensor:
  - platform: vultr
    name: Web Server Bandwidth
    subscription: 123456
    monitored_conditions:
      - current_bandwidth_used
```

## Switch

The `vultr` switch platform allows you to control (start/stop) your [Vultr](https://www.vultr.com/) subscription.

To control your Vultr subscription, you first have to set up your Vultr hub.

### Configuration

Minimal {% term "`configuration.yaml`" %} (produces `switch.vultr_web_server`):

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    subscription: YOUR_SUBSCRIPTION_ID
```

{% configuration %}
subscription:
  description: List of droplets you want to control.
  required: true
  type: string
name:
  description: The name you want to give this switch.
  required: false
  default: "Vultr {subscription label}"
  type: string
{% endconfiguration %}

### Additional examples

Full example that produces `switch.amazing_server`, assuming a subscription that has an ID of `123456` and a label of `Web Server`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: vultr
    name: Amazing Server
    subscription: 123456
```
