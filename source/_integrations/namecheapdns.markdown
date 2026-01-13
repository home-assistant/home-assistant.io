---
title: Namecheap DynamicDNS
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

With the **Namecheap DynamicDNS** {% term integration %} you can automatically update your dynamic DNS entry hosted by Namecheap's [FreeDNS](https://www.namecheap.com/store/domains/freedns/) or [PremiumDNS](https://www.namecheap.com/security/premiumdns/) services.

## Prerequisites

Before setting up the integration, you need the following elements:

 - Have a [Namecheap account](https://ap.www.namecheap.com/).
 - The **host** ( `@` to update the root domain) and the **domain** you want to update, as well as the **Dynamic DNS password** for the domain. You can find the Dynamic DNS password in your [Namecheap account](https://ap.www.namecheap.com/) under **Domain List** > **Manage** > **Advanced DNS** > **Dynamic DNS**.

{% important %}
Namecheap only supports updating IPv4 addresses.
{% endimportant %}

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
