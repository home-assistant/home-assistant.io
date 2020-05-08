---
title: Cloudflare
description: Automatically update your Cloudflare DNS records.
ha_category:
  - Network
ha_release: 0.74
ha_codeowners:
  - '@ludeeus'
ha_domain: cloudflare
---

With the `cloudflare` integration, you can keep your Cloudflare records up to date.

The integration runs every hour, but can also be started manually by using the service `cloudflare.update_records` under services.

## Setup

You can find your global API key in your Cloudflare account settings.

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cloudflare:
  email: YOUR_EMAIL_ADDRESS
  api_key: YOUR_GLOBAL_API_KEY
  zone: EXAMPLE.COM
  records:
    - ha
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
  description: The DNS zone (domain) you want to update.
  required: true
  type: string
records:
  description: A list of records (subdomains) you want to update.
  required: true
  type: list
{% endconfiguration %}

## Additional information

### Usage of external service

This platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.

### API Key

Please note that the `api_key` is the [global API key](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345682) of your Cloudflare account (not the API Token).

### Home Assistant Companion App

If you would like to use [iOS App](https://companion.home-assistant.io/) via Cloudflare set **Minimum TLS version as 1.2**, in order to do that, do the following:
1. Login to your [Cloudflare](https://dash.cloudflare.com/) account.
2. Choose your domain.
3. Click on the `SSL/TLS` icon.
4. Go to tab `Edge Certificates`.
5. Find `Minimum TLS Version` and set it to **1.2**.

Other settings should not cause any issues.

### SSH over Cloudflare

For SSH usage (according to [this](https://blog.cloudflare.com/cloudflare-now-supporting-more-ports/) source), you need to connect directly to your server (bypassing Cloudflare). To do that, create a `CNAME` DNS record, e.g., `ssh.example.com`, with proxy status as "DNS only" (to do that click on orange icon, it will change color to gray) and then connect to `ssh.example.com` using your server SSH port.

### Using Cloudflare domain only for Home Assistant

If you want to update just a main domain, place in the records list only your domain, e.g., `example.com`. It will update your `A` DNS record with your IP every hour.

```yaml
# Example configuration.yaml entry for one domain
cloudflare:
  email: YOUR_EMAIL_ADDRESS
  api_key: YOUR_GLOBAL_API_KEY
  zone: EXAMPLE.COM
  records:
    - EXAMPLE.COM
```

#### The minimum DNS record settings (if you have set up HTTPS already)

To redirect from your domain to the IP address of your Home Assistant server set this DNS record:

```text
Type: A
Name: @
IPv4 Address: your.ip.address
```

You can find your current IP address using [this](https://api.ipify.org/) page.

In order to redirect from `https://www` to `https://` you need to set this DNS record:

```text
Type: CNAME
Name: @
Target: example.com (your actual domain)
```

And also create Page Rule:

```text
If the URL matches: www.example.com*
Then the settings are: Forwarding URL
Status: 302 - Temporary redirect
Destination URL: https://example.com/$1
```
