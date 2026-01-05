---
title: Duck DNS
description: Keep your public IP address in sync with your Duck DNS subdomain.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.55
ha_domain: duckdns
ha_integration_type: integration
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
---

The **Duck DNS** {% term integration %} keeps your Duck DNS subdomain in sync with your current public IP address.

## About Duck DNS

[Duck DNS](https://www.duckdns.org) is a free dynamic DNS service that lets you assign a custom subdomain under `duckdns.org` to the public IP address used by your router. This is especially useful when your internet service provider assigns IP addresses dynamically, causing them to change over time. Duck DNS ensures your chosen subdomain always points to the correct IP.

{% note %}

If you are running the Home Assistant Duck DNS add-on this integration is not required. The add-on will keep your IP updated with Duck DNS.

{% endnote %}

## How You Can Use This Integration

- Keep your Duck DNS subdomain automatically in sync with your public IP.  
- Update ACME DNS-01 challenges for automated SSL certificate validation.

## Prerequisites

To set up the integration, you need your Duck DNS subdomain and token. You can find these on the [Duck DNS homepage](https://www.duckdns.org) after logging in. If you don’t have an account, sign up using your preferred method (e.g., GitHub, Google), then create a new subdomain.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
  domain:
    description: Your Duck DNS subdomain (without the `.duckdns.org` suffix).
    required: true
  access_token:
    description: Your Duck DNS access token. Log in to the site to get one.
    required: true
{% endconfiguration_basic %}

## Action `set_txt`

Set the TXT record of your Duck DNS subdomain.

| Data attribute         | Optional | Description                 |
| ---------------------- | -------- | --------------------------- |
| `config_entry_id`      | no       | The Duck DNS integration ID.|
| `txt`                  | yes      | Payload for the TXT record. |

{% details "Example YAML configuration" %}

{% raw %}

```yaml
action: duckdns.set_txt
data:
  config_entry_id: 01234567890ABCDEF # Replace with your actual config entry ID
  txt: LoqXcYV8...jxAjEuX0.9jg46WB3...fm21mqTI # Replace with a valid ACME DNS-01 challenge
```

{% endraw %}

{% enddetails %}

## Data updates  

This integration syncs your public IP with your Duck DNS subdomain every 5 minutes.

## Known limitations

- Duck DNS errors do not clearly indicate authentication failures. If you have recreated your token, make sure to update your Duck DNS configuration entry with the new token.
- The integration updates your Duck DNS subdomain periodically rather than continuously monitoring your public IP. After a long outage, the update interval is increased to reduce unnecessary requests. Once your internet connection is restored, it may take up to 30 minutes for your subdomain to reflect your current IP.

## Troubleshooting

The **Duck DNS** integration relies on an active internet connection to update the DNS record of your subdomain. If you encounter issues, verify that your network connection is stable and the Duck DNS service is reachable. Additionally, the Duck DNS service itself may experience downtime, whether unexpected or due to scheduled maintenance.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*).

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
