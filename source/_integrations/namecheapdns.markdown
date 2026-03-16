---
title: Namecheap DynamicDNS
description: Keep your namecheap dynamic DNS up to date
ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: namecheapdns
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_quality_scale: platinum
---

With the **Namecheap DynamicDNS** {% term integration %} you can automatically update your dynamic DNS entry hosted by Namecheap's [FreeDNS](https://www.namecheap.com/store/domains/freedns/) or [PremiumDNS](https://www.namecheap.com/security/premiumdns/) services.

## Prerequisites

Before setting up the integration, you need the following elements:

 - Have a [Namecheap account](https://ap.www.namecheap.com/).
 - The **host** ( `@` to update the root domain) and the **domain** you want to update, as well as the **Dynamic DNS password** for the domain. You can find the Dynamic DNS password in your [Namecheap account](https://ap.www.namecheap.com/) under **Domain List** > **Manage** > **Advanced DNS** > **Dynamic DNS**.

## About Namecheap

[Namecheap](https://www.namecheap.com/) is a domain registrar and web hosting provider that offers free and paid DNS services, including a dynamic DNS update service, for domains registered both with Namecheap and with other registrars.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
  host:
    description: The host to update ('home' for home.example.com). Use '@' to update the root domain
  domain:
    description: The domain to update ('example.com')
  password:
    description: Dynamic DNS password for the domain
{% endconfiguration_basic %}

See Namecheap's [How do I set up a Host for Dynamic DNS?](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) guide for further instructions.

## Data updates

This integration syncs your public IP with your (sub)domain's DNS record every 5 minutes.

## Known limitations

- Namecheap only supports updating IPv4 addresses.
- The integration updates your (sub)domain's DNS record periodically rather than continuously monitoring your public IP.

## Troubleshooting

The **Namecheap DynamicDNS** integration relies on an active internet connection to update the DNS record of your (sub)domain. If you encounter issues, verify that your network connection is stable and the Namecheap DynamicDNS service is reachable. Additionally, the Namecheap DynamicDNS service itself may experience downtime, whether unexpected or due to scheduled maintenance.

In any case, before reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*).

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
