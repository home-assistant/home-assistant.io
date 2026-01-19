---
title: Namecheap FreeDNS
description: Keep your namecheap dynamic DNS up to date
ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: namecheapdns
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

With the **Namecheap FreeDNS** {% term integration %} you can automatically update your dynamic DNS entry hosted by Namecheap's [FreeDNS](https://www.namecheap.com/store/domains/freedns/) service.

## About Namecheap

[Namecheap](https://www.namecheap.com/) is a domain registrar and web hosting provider that offers free and paid DNS services, including a dynamic DNS update service, for domains registered both with Namecheap and with other registrars.

## Configuration

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
namecheapdns:
  domain: example.com
  password: YOUR_PASSWORD
```

{% configuration %}
  host:
    description: The host part or "subdomain" part you want to update.
    required: false
    type: string
  domain:
    description: Your root domain (example.com).
    required: true
    type: string
  password:
    description: The Namecheap "Dynamic DNS Password" you can find under the "Advanced DNS" tab.
    required: true
    type: string
{% endconfiguration %}

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
