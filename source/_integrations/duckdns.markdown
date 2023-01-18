---
title: Duck DNS
description: Keep your computer registered with the DuckDNS dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.55
ha_domain: duckdns
ha_integration_type: integration
---

The DuckDNS integration allows you to keep your DuckDNS subdomain always in sync with your public IP address. [DuckDNS](https://www.duckdns.org) is a free service that allows you to bind your own favorite subdomain under `duckdns.org` to the public IP address in use from your router, even though such address is dynamically allocated by your internet service provider and therefore changes over time.

<div class='note'>

If you are running the Home Assistant DuckDNS add-on this integration is not required. The add-on will keep your IP updated with DuckDNS.

</div>

{% include integrations/config_flow.md %}

## Service `set_txt`

Set the TXT record of your DuckDNS subdomain.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `txt` | no | Payload for the TXT record. |
