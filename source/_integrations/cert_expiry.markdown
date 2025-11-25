---
title: Certificate Expiry
description: Instructions on how to set up HTTPS (SSL) certificate expiry sensors within Home Assistant.
ha_category:
  - Network
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jjlawren'
ha_domain: cert_expiry
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Certificate Expiry** {% term integration %} fetches the certificate from a configured host and displays its expiration in a timestamp sensor.
The sensor checks and updates the certificate information for the configured host every 12 hours.

{% include integrations/config_flow.md %}

## Attributes

The Certificate Expiry {% term entities %} provide extra attributes to represent the state of the certificate.

| Name | Description |
| ---- | ----------- |
| `is_valid` | If the certificate is able to be validated: `True` / `False`.
| `error` | A human-readable error description if the certificate is considered invalid, "None" otherwise.
