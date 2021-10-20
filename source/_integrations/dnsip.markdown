---
title: DNS IP
description: Instructions on how to integrate a DNS IP sensor into Home Assistant.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: '0.40'
ha_domain: dnsip
ha_platforms:
  - sensor
---

The `dnsip` sensor will expose an IP address, fetched via DNS resolution, as its value. There are two operational modes:

1. When you enable the sensor with minimal configuration, it will query the [OpenDNS](https://www.opendns.com/) nameservers with the hostname `myip.opendns.com`, which will resolve to your external/public IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to.

You may also override the nameserver that is being used by setting the `resolver` parameter to any nameserver you like.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dnsip
```

{% configuration %}
hostname:
  description: The hostname for which to perform the DNS query.
  required: false
  default: "`myip.opendns.com` (special hostname that resolves to your public IP)"
  type: string
name:
  description: Name of the sensor.
  required: false
  default: "`myip` or hostname without dots if specified"
  type: string
resolver:
  description: The DNS server to target the query at.
  required: false
  default: "`208.67.222.222` (OpenDNS)"
  type: string
ipv6:
  description: Set this to `true` or `false` if IPv6 should be used. When resolving the public IP, this will be the IP of the machine where Home Assistant is running on.
  required: false
  default: false
  type: boolean
resolver_ipv6:
  description: The IPv6 DNS server to target the query at.
  required: false
  default: "`2620:0:ccc::2` (OpenDNS)"
  type: string
scan_interval:
  description: Defines number of seconds for polling interval.
  required: false
  default: "`120`"
  type: integer
{% endconfiguration %}

## Extended example

```yaml
# Example configuration.yaml entry
sensor:
  # Own public IPv4 address
  - platform: dnsip
  # Resolve IP address of home-assistant.io via Google DNS
  - platform: dnsip
    hostname: home-assistant.io
    name: hass
    resolver: 8.8.8.8
```
