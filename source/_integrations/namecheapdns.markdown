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

With the `namecheapdns` {% term integration %} you can automatically update your dynamic DNS entry hosted by Namecheap's [FreeDNS](https://www.namecheap.com/store/domains/freedns/) service.

{% important %}
Namecheap only supports updating IPv4 addresses.
{% endimportant %}

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
