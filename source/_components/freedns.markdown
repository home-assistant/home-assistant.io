---
layout: page
title: "freedns.afraid.org"
description: "Keep your DNS record up to date with FreeDNS."
date: 2018-03-27 21:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Utility
ha_release: 0.66
---

With the `freedns` component you can keep your [FreeDNS](https://freedns.afraid.org) record up to date.

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
freedns:
  access_token: YOUR_TOKEN
  update_interval:
    minutes: 15
```

{% configuration %}
  access_token:
    description: Your access token. This is exclusive to `url`
    required: false
    type: string
  url:
    description: The full update URL. This is exclusive to `access_token`
    required: false
    type: string
  update_interval:
    description: How often to call the update service.
    required: false
    type: time period
    default: 10 minutes
{% endconfiguration %}


## Determining your update url or access token

1. Head over to the [FreeDNS](https://freedns.afraid.org) website and login to your account.
2. Select the menu "Dynamic DNS"
3. You should now see your update candiates in a table at the bottom of the page.
4. copy the link target of the "Direct URL".
5. The access token is the part at the end of the link: `https://freedns.afraid.org/dynamic/update.php?YOUR_UPDATE_TOKEN`
6. Either put the token as `access_token` _or_ the whole url into the `url` attribute
