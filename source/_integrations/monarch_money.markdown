---
title: Monarch Money
description: Instructions on the Monarch Money Integration for personal finance.
ha_categories:
  - finance
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_codeowners:
  - '@jeeftor'
  - '@bradleyseanf'
ha_domain: monarch_money
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Monarch Money](https://monarch.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity, the three major financial backends.

## Prerequisites

- You need a Monarch Money account to use this integration.
- You need the email address and password for your Monarch Money account. If you use multi-factor authentication (MFA), you also need your authentication code during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address you use to sign in to Monarch Money."
Password:
  description: "The password for your Monarch Money account."
Enter your MFA code:
  description: "The authentication code for your Monarch Money account. This field appears after you enter your email address and password if your account requires multi-factor authentication."
{% endconfiguration_basic %}

### Accounts & devices

Each `account` is set up as a device in Home Assistant and contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Balance|Account balance|
|Age| This sensor shows when the data was retrieved by Monarch's back end |
|Owner|Shows the institution owner in Monarch Money|

## Removing the integration

{% include integrations/remove_device_service.md %}

