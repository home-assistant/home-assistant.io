---
layout: page
title: "Pi-hole Sensor"
description: "Instructions on how to integrate Pi-hole sensors into Home Assistant."
date: 2016-09-03 16:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_iot_class: "Local Polling"
logo: pi_hole.png
ha_release: 0.28
---


The `pi_hole` sensor platform is displaying the statistical summary of a [Pi-hole](https://pi-hole.net/) system.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pi_hole
```

{% configuration %}
host:
  description: IP address of the host where Pi-hole is running.
  required: false
  type: string
  default: localhost
location:
  description: The installation location of the Pi-hole API.
  required: false
  type: string
  default: admin
ssl:
  description: "If `true`, use SSL/TLS to connect to the Pi-Hole system."
  required: false
  type: boolean
  default: false
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
monitored_conditions:
  description: Defines the stats to monitor as sensors.
  required: false
  type: list
  default: ads_blocked_today
  keys:
    ads_blocked_today:
      description: Total number of blocked ads today.
    ads_percentage_today:
      description: Percentage of blocked ads.
    dns_queries_today:
      description: Total number of DNS queries handled by Pi-hole today.
    domains_being_blocked:
      description: Total number of domains blocked by Pi-hole.
    queries_cached:
      description: Total number of cache queries on the last 24 hours.
    queries_forwarded:
      description: Total number of forwarded queries on the last 24 hours.
    unique_clients:
      description: Total number of unique clients on the last 24 hours.
    unique_domains:
      description: Total number of unique domains on the last 24 hours.
    clients_ever_seen:
      description: Total number of seen clients.
{% endconfiguration %}

This sensor platform was not made by Pi-hole LLC or the Pi-hole community. They didn't provide support, feedback, testing or helped in any way while it was created. This is third party, may not work if Pi-hole is breaking their API with the latest release, not official, not developed, not supported and not endorsed Pi-hole LLC or the Pi-hole community. The trademark `Pi-hole` and the logo is used here to describe the platform and only to describe. `Pi-hole` is a registered trademark of Pi-hole LLC. 
