---
title: DNS IP
description: Instructions on how to integrate a DNS IP sensor into Home Assistant.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: '0.40'
ha_domain: dnsip
ha_platforms:
  - sensor
---

The `dnsip` sensor will expose an IP address, fetched via DNS resolution, as its value. There are two operational modes:

1. When you enable the sensor with default values, it will query the [OpenDNS](https://www.opendns.com/) nameservers with the hostname `myip.opendns.com`, which will resolve to your external/public IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to.

You may also override the nameserver that is being used by setting the `resolver` parameter to any nameserver you like.
If you prefer also the option to use IPv6 is available.

{% include integrations/config_flow.md %}
