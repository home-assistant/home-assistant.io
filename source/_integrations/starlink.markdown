---
title: Starlink
description: Monitor Starlink satellite status from home Assistant
  - Binary Sensor
  - Sensor
ha_release: 
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@pacorain'
ha_domain: starlink
ha_platforms:
  - binary_sensor
  - sensor
---
The `starlink` platform consumes data from your [Starlink sattelite](https://www.starlink.com/) into Home Assistant sensors.

{% include integrations/config_flow.md %}

{% configuration %}
address:
  description: The address and port of the satellite. Most configurations should be kept at the default.
  required: true
  type: string
  default: 192.168.100.1:9200
scan_interval:
  description: How often to request an update (in seconds). Note that a connection is left open regardless of what value is picked.
  required: true
  type: float
  default: 5
name:
  description: The name of the configuration. All entities are prefixed with this name.
  required: true
  type: string
  default: Starlink
{% endconfiguration %}

## Configuring your network

If you are using the Starlink provided router with your dish, the default configuration settings should work just fine without any further configuration.

If you are using an alternate router, you will need to set up a static route. This can usually be done within your router's configuration page.

- Destination address: `192.168.100.0`
- Subnet mask: `255.255.255.0`
- Gateway IP address: `0.0.0.0`

## Available entities

When connected, entities added to Home Assistant will include (all provided directly from the satellite):

- Connected status, with a Problem attribute describing what's wrong with the connection
- Ping latency
- Ping drop rate
- Downlink throughput
- Uplink throughput
- Number of alerts (see State Attributes for all available alerts)
