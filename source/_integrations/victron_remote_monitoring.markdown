---
title: Victron Remote Monitoring
description: Instructions for implementation of Victron Remote Monitoring platform into Home Assistant.
ha_category:
  - Energy
ha_release: '2025.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@AndyTempel'
ha_domain: victron_remote_monitoring
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - url: https://vrm.victronenergy.com/
    title: Victron VRM Portal
  - url: https://vrm-api-docs.victronenergy.com/#/
    title: VRM JSON API v2 documentation
  - url: https://www.victronenergy.com/media/pg/VRM_Portal_manual/en/introduction.html
    title: VRM Portal manual
ha_quality_scale: bronze
---

The **Victron Remote Monitoring** (VRM) {% term integration %} pulls site statistics, solar production and consumption forecasts from [Victron Energy](https://www.victronenergy.com/)'s <abbr title="Victron Remote Monitoring">VRM</abbr> portal into Home Assistant. It provides day-ahead, next-hour, and six-day outlooks for both production and consumption. It also includes peak-time predictions. The integration requires at least 30 days of VRM history before forecasts become available.

## Prerequisites

- <abbr title="Victron Remote Monitoring">VRM</abbr> access token (keep this secret!). Create one in the VRM Portal under **Preferences** > **Integrations** > **Access tokens** or use [this link](https://vrm.victronenergy.com/access-tokens).
- Access to your site(s) with the account used to create the token.

### Forecast requirements

- <abbr title="Victron Remote Monitoring">VRM</abbr> installation with a solar system and all consumption routed through inverters or a grid meter.
- At least 30 days of data in VRM before forecasts appear.

{% important %}
Your <abbr title="Victron Remote Monitoring">VRM</abbr> access token grants full access to your VRM portal, including system control and data retrieval. Treat it like a password:

- Do not share it.
- Rotate it immediately if you suspect compromise.
{% endimportant %}

{% include integrations/config_flow.md %}

## Setup notes

1. When prompted, paste your <abbr title="Victron Remote Monitoring">VRM</abbr> access token.
2. After validation, the integration automatically fetches the list of sites available to that token.
3. Select your site from the dropdown and finish the setup.

## Data updates

The <abbr title="Victron Remote Monitoring">VRM</abbr> integration fetches fresh data from the VRM API every 60 minutes.

## Sensor entities

### Solar production forecast

- Estimated energy production — Yesterday
- Estimated energy production — Today
- Remaining production — Today
- Estimated energy production — Tomorrow
- Production — Current hour
- Production — Next hour
- Peak production time — Yesterday
- Peak production time — Today
- Peak production time — Tomorrow

### Consumption forecast

- Estimated energy consumption — Yesterday
- Estimated energy consumption — Today
- Remaining consumption — Today
- Estimated energy consumption — Tomorrow
- Consumption — Current hour
- Consumption — Next hour
- Peak consumption time — Yesterday
- Peak consumption time — Today
- Peak consumption time — Tomorrow

## Adding Victron Remote Monitoring to the Energy dashboard

Solar production forecasts can be added to the built-in [Energy dashboard](/docs/energy/) to visualize expected solar production alongside your actual energy data.

### Prerequisites 

- You must first add your solar panels to the Energy dashboard. 
   - If you have not already done so, follow the instructions in the [Energy dashboard documentation](/docs/energy/) to add your solar panels.

### To add Victron Remote Monitoring to the Energy dashboard

1. Go to {% my energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. In the **Solar panels** section, edit your solar panels and enable the **Forecast production** option.
3. Select the desired Victron Remote Monitoring installation from the list of available forecast providers.
4. Select **Save**. 
   - No additional parameters are required. The integration retrieves the forecast from your VRM data.
   - **Result**: The forecast will now appear in your Energy dashboard's solar production graph.

## Troubleshooting

### Can't set up authentication

#### Symptom: “Invalid authentication”

#### Description

This usually means that the token used is invalid or expired.

#### Resolution

Verify that you're logged in with the correct <abbr title="Victron Remote Monitoring">VRM</abbr> account, then try the following steps:

1. Log in to the VRM portal and under **Preferences** > **Integrations** > **Access tokens** (or use [this link](https://vrm.victronenergy.com/access-tokens)), remove the current token if present.
2. Generate a new token by selecting **Add** on the same page, enter the token name, leave the expiry date empty, and select **Create token**.
3. Copy and paste the newly generated token into Home Assistant. Follow the setup instructions.

### No sites listed during setup

#### Symptoms: Empty dropdown, “No sites found for this account” or “Site ID not found. Please check the ID and try again.”

#### Description

The integration could not find any sites or installations associated with your account.

#### Resolution

Verify that you're logged in with the correct <abbr title="Victron Remote Monitoring">VRM</abbr> account and that you have permission to access the desired sites or installations.

### Can't find sensors

#### Symptom: Sensors are unavailable or missing

#### Description

The integration cannot retrieve forecast data.

#### Resolution

1. Check the logs and the **Settings** > **Devices & services** page for any errors.
2. Check if you still have permission to access the desired site or installation.
3. If you reset or just set up the <abbr title="Victron Remote Monitoring">VRM</abbr> Forecasts, there might be a delay of up to 30 days before data appears.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the <abbr title="Victron Remote Monitoring">VRM</abbr> Portal under **Preferences** > **Integrations** > **Access tokens** or use [this link](https://vrm.victronenergy.com/access-tokens) to remove the token.
