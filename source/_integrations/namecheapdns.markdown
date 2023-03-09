---
title: Namecheap FreeDNS
description: Keep your namecheap dynamic DNS up to date
ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: namecheapdns
ha_integration_type: integration
---

With the `namecheapdns` integration you can automatically update your dynamic DNS entry at [namecheapdns](https://www.namecheap.com/store/domains/freedns/).

<div class='note warning'>
Namecheap only supports IPv4 addresses to update.
</div>

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

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
    description: Your namecheap TLD (example.com).
    required: true
    type: string
  password:
    description: The namecheap "Dynamic DNS Password" you can find under the "Advanced DNS" tab.
    required: true
    type: string
{% endconfiguration %}

See the [How do I set up a Host for Dynamic DNS?](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) for further instructions
