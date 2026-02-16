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
  - '@cypherbits'
ha_domain: cloudflare
ha_config_flow: true
ha_integration_type: integration
---

The **Cloudflare** {% term integration %} allows you to keep your [Cloudflare](https://www.cloudflare.com/) DNS records up to date.

The integration runs every hour, but can also be triggered by running the {% my developer_services title="`cloudflare.update_records` action" service="cloudflare.update_records" %}.

## Requirements

The setup requires an API Token created with `Zone:Zone:Read` and `Zone:DNS:Edit` permissions for all zones in your account.

An easy way to create this is to start with the "Edit zone DNS" template then add `Zone:Zone:Read` to the permissions.

[Cloudflare API Tokens Guide](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

The integration provides the following sensors:

- **External IP**: The current external IP address of your Home Assistant instance.
- **Last Update**: The timestamp of the last successful update of the DNS records.

### Switches

The integration provides a switch for each configured DNS record to toggle the [Cloudflare Proxy](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/) status.

## Actions

### Action: Update records

The `cloudflare.update_records` action is used to manually trigger an update of the Cloudflare records for all configured zones.

## Additional information

### Usage of external service

This integration uses the whoami service from [home-assistant/services.home-assistant.io](https://github.com/home-assistant/services.home-assistant.io) to set the public IP address.

### Limitations

#### Unusable TLDs

Due to a limitation in the Cloudflare API, you can not use this integration with any of the following TLD's:

- `.cf`
- `.ga`
- `.gq`
- `.ml`
- `.tk`

#### Record types

This integration can only update A records.

#### Reconfiguration

To change the Zone and A record selection, the integration needs to be removed and added again.
You cannot view which records were selected or view the API Token once the integration is configured.
