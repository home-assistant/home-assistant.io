---
title: getsequence.io
description: Instructions on how to integrate getsequence.io into Home Assistant.
ha_category:
- Sensor
ha_iot_class: Cloud Polling
ha_release: 2025.11.0
ha_config_flow: true
ha_codeowners:
- '@DellanX'
ha_domain: getsequence
ha_platforms:
- sensor
ha_integration_type: service
---

The **getsequence.io** {% term integration %} allows you to monitor your Sequence financial accounts and track cash flow directly in Home Assistant. Sequence is a financial orchestration platform that helps you manage your pods, account balances, and money flow.

## Supported functionality

The integration provides the following capabilities:

- Monitor individual pod balances
- Track total balance across all accounts
- Categorize external accounts as investments or liabilities
- Optional cash flow tracking with utility meters
- Real-time balance updates every 5 minutes

## Prerequisites

1. A Sequence account at [getsequence.io](https://getsequence.io)
2. API access enabled in your Sequence dashboard
3. An active API access token

To get your API access token:

1. Log in to your Sequence dashboard.
2. Go to **Settings** > **Enable Remote API**.
3. Select **Generate a new API access token**.
4. Copy the generated token for use in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Access Token:
  description: "Your Sequence API access token. You can find this in your Sequence dashboard under **Settings** > **Enable Remote API**."
{% endconfiguration_basic %}

## Configuration options

After adding the integration, you can configure additional options by going to {% my integrations title="**Settings** > **Devices & services**" %} and selecting **Configure** on the Sequence integration.

{% configuration_basic %}
External Account Categorization:
  description: Choose which external accounts to categorize as investments or liabilities. This affects which accounts are included in the respective total sensors.
{% endconfiguration_basic %}

## Entities

The integration creates the following entities:

### Sensors

**Balance sensors** (always enabled):

- **Net balance**: Total balance across all accounts
- **Pods total**: Total balance across pods only
- **Income source total**: Total balance across income sources
- **External total**: Total of uncategorized external accounts
- **Liability total**: Total of manually categorized liability accounts
- **Investment total**: Total of manually categorized investment accounts
- **Data age**: Age of the last successful data fetch

**Individual account sensors**:

- Individual sensors for each pod showing current balance
- Individual sensors for each income source
- Individual sensors for each external account

**Cash flow utility meters** (disabled by default):

These sensors track positive cash flow increases over time periods. They are disabled by default to avoid clutter. Enable them individually as needed in {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.

- Daily, weekly, monthly, and yearly cash flow tracking
- Separate tracking for pods, income sources, and external accounts
- Individual cash flow meters for each account

## Data updates

The integration {% term polling polls %} data from the Sequence API every 5 minutes by default. Cash flow calculations are updated with each data refresh.

## Known limitations

- Cash flow is calculated from balance changes, not transaction history
- Utility meters reset their accumulation if the integration is restarted
- Manual configuration is required for external account categorization

## Troubleshooting

### Cannot connect to Sequence

**Symptom**: The integration shows "Cannot connect" during setup.

**Description**: This typically means there's an issue with your API token or network connectivity.

**Resolution**:

1. Verify your internet connection is working.
2. Check that your API access token is correct and hasn't expired.
3. Ensure you've enabled the Remote API in your Sequence dashboard.
4. Try generating a new API access token.

### Missing account data

**Symptom**: Some accounts don't appear as sensors.

**Description**: The integration only shows accounts that are accessible through the Sequence API.

**Resolution**:

1. Ensure your accounts are properly set up in your Sequence dashboard.
2. Check that the accounts have recent activity or balances.
3. Verify that all accounts are visible in the Sequence web interface.

## Removing the integration

{% include integrations/remove_device_service.md %}
