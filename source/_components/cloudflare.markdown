---
layout: page
title: "Cloudflare"
description: "Automatically update your Cloudflare DNS records."
date: 2018-07-10 20:08
sidebar: true
comments: false
sharing: true
footer: true
logo: cloudflare.png
ha_category: Network
featured: false
ha_release: 0.74
---

With the `cloudflare` component can you keep your Cloudflare records up to date.

The component will run every hour, but can also be started manually by using the service `cloudflare.update_records` under services.

## {% linkable_title Setup %}

You will find your global API key in your Cloudflare account settings.

## {% linkable_title Configuration %}

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cloudflare:
  email: user@example.com
  api_key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41
  zone: example.com
  records:
    - bin
    - www
```

{% configuration cloudflare %}
email:
  description: The email address for your Cloudflare account.
  required: true
  type: string
api_key:
  description: The global API key for your Cloudflare account.
  required: true
  type: string
zone:
  description: The DNS zone you want to update.
  required: true
  type: string
records:
  description: A list of records you want to update.
  required: true
  type: list
{% endconfiguration %}

This platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.
