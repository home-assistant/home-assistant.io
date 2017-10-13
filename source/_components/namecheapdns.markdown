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

With the namecheapDNS component you can automatically update your dynamic DNS entry.

<p class='note warning'>
Namecheap only supports IPv4 adresses to update.
</p>

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
namecheapdns:
  host: @
  domain: example.com
  access_token: 0123_Dynamic_DNS_Password
```

{% configuration %}
  host:
    description: The host part or "subdomain" part you want to update (If you want your domain leave the @ sign)
    required: true
    type: string
  domain:
    description: Your namecheap TLD (example.com).
    required: true
    type: string
  access_token:
    description: The namecheap "Dynamic DNS Password" you can find under the "Advanced DNS" Tab
    required: true
    type: string
{% endconfiguration %}

See the [How do I set up a Host for Dynamic DNS?](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) for further instructions
