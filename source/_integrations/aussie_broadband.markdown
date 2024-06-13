---
title: Aussie Broadband
description: Instructions on how to integrate Aussie Broadband within Home Assistant.
ha_category:
  - Network
  - Sensor
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@nickw444'
  - '@Bre77'
ha_domain: aussie_broadband
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The Aussie Broadband integration displays various service metrics using the Aussie Broadband API.

## Prerequisites

You must have a [My Aussie Broadband](https://my.aussiebroadband.com.au) account, and at least 1 active service.

{% include integrations/config_flow.md %}

## Entities

### Sensor

The integration will create sensor entities for a variety of metrics that relate to your service:

#### NBN/Internet Services
- Total Usage
- Downloaded Data
- Uploaded Data
- Billing Cycle Length
- Billing Cycle Remaining

#### Mobile phone
- Data Usage
- National Calls
- Mobile Calls
- SMS Sent
- Billing Cycle Length
- Billing Cycle Remaining
