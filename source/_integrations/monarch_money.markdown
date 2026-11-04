---
description: Instructions on the Monarch Money Integration for personal finance.
ha_release: '2024.10'
ha_domain: monarch_money
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

Each `account` is set up as a device in Home Assistant and contains the following sensors:

- **Balance**: The account balance.
- **Age**: When Monarch Money last retrieved the data.
- **Owner**: The institution owner in Monarch Money.

### Budgets

Each `budget` category is set up as a service device in Home Assistant and contains the following sensors for the current month:

- **Budget actual**: The actual amount recorded for the category.
- **Budget planned**: The amount budgeted for the category.
- **Budget remaining**: The remaining amount reported by Monarch Money, including rollover from previous months.

Budget data updates every four hours. New categories appear after the next update.

If Monarch Money returns a category without current-month data, its device and sensors still appear, but the sensors are **Unavailable** until data is available. If current-month data is available but an individual amount is missing, that sensor shows as **Unknown**.

## Removing the integration

{% include integrations/remove_device_service.md %}

