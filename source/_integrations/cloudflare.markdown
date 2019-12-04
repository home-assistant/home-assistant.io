---
title: "Cloudflare"
description: "Automatically update your Cloudflare DNS records."
logo: cloudflare.png
ha_category:
  - Network
ha_release: 0.74
---

With the `cloudflare` integration you can keep your Cloudflare records up to date.

The integration will run every hour, but can also be started manually by using the service `cloudflare.update_records` under services.

## Setup

You will find your global API key in your Cloudflare account settings.

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cloudflare:
  email: YOUR_EMAIL_ADDRESS
  api_key: YOUR_GLOBAL_API_KEY
  zone: EXAMPLE.COM
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
  description: The [global API key](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345682) for your Cloudflare account (it is not an API Token).
  required: true
  type: string
zone:
  description: The DNS zone (domain) you want to update.
  required: true
  type: string
records:
  description: A list of records (subdomains) you want to update. If you want to update just a main domain just put here your domain, e.g. EXAMPLE.COM.
  For SSH usage (according to [this](https://blog.cloudflare.com/cloudflare-now-supporting-more-ports/) source) you need to connect directly to your server. In order to do that please create CNAME DNS record e.g. SSH.EXAMPLE.COM with proxy status as "DNS only" (you need to click on orange icon to in order to make it gray) and than just connect to SSH.EXAMPLE.COM using your server ssh port.
  required: true
  type: list
{% endconfiguration %}

This platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.
