---
description: Instructions on how to integrate Aussie Broadband within Home Assistant.
ha_release: 2022.2
ha_domain: aussie_broadband
---

The **Aussie Broadband** {% term integration %} displays various service metrics using the Aussie Broadband API.

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
