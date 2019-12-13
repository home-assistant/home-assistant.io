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

For SSH usage (according to [this](https://blog.cloudflare.com/cloudflare-now-supporting-more-ports/) source), you need to connect directly to your server (bypassing Cloudflare). To do that create a `CNAME` DNS record, e.g., `ssh.example.com`, with proxy status as "DNS only" (to do that click on orange icon, it will change color to gray) and then connect to `ssh.example.com` using your server SSH port.
