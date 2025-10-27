---
title: FreeDNS
description: Keep your DNS record up to date with FreeDNS.
ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.67
ha_domain: freedns
ha_integration_type: integration
ha_quality_scale: legacy
---

With the `freedns` {% term integration %} you can keep your [FreeDNS](https://freedns.afraid.org) record up to date.

## Setup (Default API V1)

You need to determine your update URL or your access token.

1. Head over to the [FreeDNS](https://freedns.afraid.org) website and login to your account.
2. Select the menu "Dynamic DNS"
3. You should now see your update candidates in a table at the bottom of the page.
4. Copy the link target of the "Direct URL".
5. The access token is the part at the end of the link: `https://freedns.afraid.org/dynamic/update.php?YOUR_UPDATE_TOKEN`
6. Either put the token as `access_token` _or_ the whole URL into the `url` attribute.

## Configuration (API V1)

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
freedns:
  access_token: YOUR_TOKEN
```

## Setup (API V2)

You need to determine your update URL or your access token.

1. Head over to the [FreeDNS](https://freedns.afraid.org) website and login to your account.
2. Select the menu "Dynamic DNS"
3. You should now see your update candidates in a table at the bottom of the page.
4. Head over to page [Version 2](https://freedns.afraid.org/dynamic/v2/), and enable the candidate.
5. The access token is the part at the end of the link: `http://sync.afraid.org/u/RANDOMIZED_TOKEN/`
6. Put the whole URL into the `url` attribute.
7. (Instead of using the randomized token URL in the Version 2 there are other options to use for URL)

## Configuration (API V2)

To use the integration in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
freedns:
  url: http://sync.afraid.org/u/RANDOMIZED_TOKEN/
```


{% configuration %}
  access_token:
    description: Your access token. This is exclusive to `url`.
    required: false
    type: string
  url:
    description: The full update URL. This is exclusive to `access_token`.
    required: false
    type: string
  scan_interval:
    description: How often to call the update service.
    required: false
    type: time
    default: 10 minutes
{% endconfiguration %}
