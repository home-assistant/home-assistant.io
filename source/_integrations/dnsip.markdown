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

The DNS IP integration will expose an IP address, fetched via DNS resolution (every 2 minutes), as its value. It provides both IPv4 and IPv6 lookup as separate sensors depending on accessibility to resolvers.

1. When you enable the integration with the default value, it will query the [OpenDNS](https://www.opendns.com/) nameservers with the hostname `myip.opendns.com`, which will resolve to your external/public IP address.
2. If you specify a `hostname`, a regular DNS lookup will be performed, providing you the IP the hostname resolves to.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Resolver:
  description: "You may override the default nameservers that are being used by setting any nameserver you like."
{% endconfiguration_basic %}
