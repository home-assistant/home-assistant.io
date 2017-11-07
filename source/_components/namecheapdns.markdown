---
layout: page
title: "NamecheapDNS"
description: "Keep your namecheap dynamic DNS up to date"
date: 2017-10-11 20:16
sidebar: true
comments: false
sharing: true
footer: true
logo: namecheap.png
ha_category: Utility
featured: false
ha_release: 0.56
---

With the `namecheapdns` component you can automatically update your dynamic DNS entry at [namecheapdns](https://www.namecheap.com/store/domains/freedns/).

<p class='note warning'>
Namecheap only supports IPv4 adresses to update.
</p>

To use the component in your installation, add the following to your `configuration.yaml` file:

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
