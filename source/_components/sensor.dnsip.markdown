---
layout: page
title: "DNS IP"
description: "Instructions how to integrate timetable data for travelling in Germany within Home Assistant."
date: 2017-02-25 11:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.40
---


The `dnsip` sensor will expose an IP address, fetched via DNS resolution, as its value. There are two operational modes:

1. When you enable the sensor with minimal configuration, it will query [OpenDNS](https://www.opendns.com/)' nameserver with the URI `myip.opendns.com`, which will resolve to your external IP address. You can use this to get notified if your internet connection has been interrupted and you've been assigned a new IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to.

You may also override the nameserver that's being used by setting the `resolver` parameter to any nameserver you like.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dnsip
```

Configuration variables:

- **hostname** (*Optional*): The hostname for which to perform the DNS query.
- **resolver** (*Optional*): The DNS server to target the query at.
- **ipv6** (*Optional*): Set this to `true` or `false` if IPv6 should be used. Resolving the public IP will resolve to IP of the machine HASS is running on.
- **resolver_ipv6** (*Optional*): The IPv6 DNS server to target the query at.
- **scan_interval** (*Optional*): Defines number of seconds for polling interval. Default is 120 seconds.

#### {% linkable_title Extended example %}

```yaml
# Example configuration.yaml entry
sensor:
  # Own public IPv4 address
  - platform: dnsip
  # IP address of home-assistant.io
  - platform: dnsip
    hostname: home-assitant.io
    resolver: 8.8.8.8
```
