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
ha_codeowners:
  - '@gjohansson-ST'
ha_integration_type: integration
---

The **DNS IP** {% term integration %} will expose an IP address, fetched via DNS resolution (every 2 minutes), as its value. It provides both IPv4 and IPv6 lookup as separate sensors depending on accessibility to resolvers.

1. When you enable the {% term integration %}  with the default value, it will query the [OpenDNS](https://www.opendns.com/) nameservers with the hostname `myip.opendns.com`, which will resolve to your external/public IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to. If your hostname resolves to multiple IP addresses, the lowest IP will be returned as the state. The first 10 IPs will be returned in ascending order in the `ip_addresses` attribute.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Resolver:
  description: "You may override the default IPV4 and IPV6 nameservers that are being used by setting any nameserver IP address you like, for example `1.1.1.1` (IPV4) or `2606:4700:4700::1111` (IPV6)."
Port:
  description: "You may override the default DNS port of `53`. This may be useful to bypass DNS filtering or redirection."
{% endconfiguration_basic %}
