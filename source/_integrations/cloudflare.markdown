---
title: Cloudflare
description: Automatically update your Cloudflare DNS records.
ha_category:
  - Network
ha_release: 0.74
ha_iot_class: Cloud Push
ha_codeowners:
  - '@ludeeus'
  - '@ctalkington'
ha_domain: cloudflare
ha_config_flow: true
---

With the `cloudflare` integration, you can keep your Cloudflare records up to date.

The integration runs every hour, but can also be started manually by using the service `cloudflare.update_records` under services.

<div class='note warning'>

Due to a limitation in the Cloudflare API, you can not use this integration with any of the following TLD's:

- `.cf`
- `.ga`
- `.gq`
- `.ml`
- `.tk`

</div>

## Requirements

<div class='note warning'>

On older versions of Home Assistant, this integration used the account email and Global API Key to authenticate.

As of Home Assistant 0.117, API Tokens are now used to authenticate.

</div>

Setup requires an API Token created with Zone:Zone:Read and Zone:DNS:Edit permissions for all zones in your account.

An easy way to create this is to start with the "Edit zone DNS" template then add Zone:Zone:Read to the permissions.

[Cloudflare API Tokens Guide](https://developers.cloudflare.com/api/tokens/create)

{% include integrations/config_flow.md %}

## Additional information

### Usage of external service

This platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.

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

#### The minimum DNS record settings (if you have set up HTTPS already)

To redirect from your domain to the IP address of your Home Assistant instance, set this DNS record:

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
