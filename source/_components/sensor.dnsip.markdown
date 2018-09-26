---
layout: page
title: "DNS IP Sensor"
description: "Instructions on how to integrate a DNS IP sensor into Home Assistant."
date: 2017-02-25 11:05
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Network
ha_iot_class: "Cloud Polling"
ha_release: "0.40"
---


The `dnsip` sensor will expose an IP address, fetched via DNS resolution, as its value. There are two operational modes:

1. When you enable the sensor with minimal configuration, it will query the [OpenDNS](https://www.opendns.com/) nameservers with the hostname `myip.opendns.com`, which will resolve to your external/public IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to.

You may also override the nameserver that is being used by setting the `resolver` parameter to any nameserver you like.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dnsip
```

Configuration variables:

- **hostname** (*Optional*): The hostname for which to perform the DNS query. Defaults to `myip.opendns.com` (special hostname that resolves to your public IP).
- **name** (*Optional*): Name of the sensor. Defaults to `myip` or hostname without dots if specified.
- **resolver** (*Optional*): The DNS server to target the query at. Defaults to `208.67.222.222` (OpenDNS).
- **ipv6** (*Optional*): Set this to `true` or `false` if IPv6 should be used. When resolving the public IP, this will be the IP of the machine where Home Assistant is running on.
- **resolver_ipv6** (*Optional*): The IPv6 DNS server to target the query at. Defaults to `2620:0:ccc::2` (OpenDNS).
- **scan_interval** (*Optional*): Defines number of seconds for polling interval. Defaults to `120` seconds.

## {% linkable_title Extended example %}

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
