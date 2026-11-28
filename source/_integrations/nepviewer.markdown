---
title: NEPViewer
description: Instructions on how to monitor your NEP solar microinverter system in Home Assistant with NEPViewer.
ha_release: 2026.12
ha_categories:
  - energy.solar_batteries
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@felipecrs"
ha_domain: nepviewer
ha_integration_type: hub
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - docs: /docs/energy/solar-panels/
    title: Integrating your solar panels
  - url: https://nepviewer.com
    title: NEPViewer
---

The **NEPViewer** {% term integration %} lets you monitor the production of your solar microinverter system from [NEP (Northern Electric Power)](https://northernep.com) in Home Assistant.
It connects to [NEPViewer](https://nepviewer.com), the monitoring service from NEP, and uses the data of the sites and devices in your NEPViewer account.

Use case: See how much solar power your system produces, add its production to the [Energy dashboard](/docs/energy/solar-panels/), and compare the production of individual panels.

## Prerequisites

1. Create an account on [NEPViewer](https://nepviewer.com), if you don't have one yet.
2. In NEPViewer, make sure that your site and its devices show up in your account.
3. Sign out of NEPViewer, and avoid using the same account in other places while Home Assistant is using it. Only one session per account can be active at a time. For details, refer to [Known limitations](#known-limitations).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address of your NEPViewer account."
Password:
  description: "The password of your NEPViewer account."
{% endconfiguration_basic %}

## Supported functionality

The **NEPViewer** integration adds the following devices to Home Assistant:

- **Site**: Each site in your NEPViewer account.
- **Gateway or microinverter**: Each gateway or microinverter in your NEPViewer account.
- **Panel**: Each panel that NEPViewer reports for a gateway or microinverter. The panels are named **Panel 1**, **Panel 2**, and so on. They are numbered by serial number across all gateways and microinverters, so a number can change after you add hardware.

### Sensors

Every site, gateway, microinverter, and panel has the following sensors:

- **Current power**
  - **Description**: The solar power that is currently produced, in watts (W).
- **Energy today**
  - **Description**: The solar energy produced today, in kilowatt-hours (kWh).
- **Lifetime energy**
  - **Description**: The total solar energy produced so far, in kilowatt-hours (kWh).

Every gateway and microinverter also has the following sensor:

- **Last reported**
  - **Description**: When the device last sent data to NEPViewer. The sensor stays available when the device stops reporting.

You can use the **Energy today** and **Lifetime energy** sensors as solar production in the [Energy dashboard](/docs/energy/solar-panels/).
A site, its gateways and microinverters, and its panels all report production of the same system.
To avoid counting the same energy more than once, add only one of these levels, and only one of the two sensors for each device.

## Data updates

The **NEPViewer** integration {% term polling polls %} data from the NEPViewer cloud every 5 minutes.

NEPViewer keeps returning the last values of a device that stopped reporting, for example during a power outage.
The integration marks a gateway or microinverter and its panels as unavailable when the device hasn't reported for 90 minutes, or for 24 hours if its last reported power was 0 W, as is normal at night.
A site becomes unavailable when all its gateways and microinverters are unavailable.

The lists of sites, gateways, and microinverters are only retrieved when the integration is set up, and panels are only added at that time.
To add new hardware to Home Assistant, reload the integration.

## Known limitations

- The integration requires an internet connection, because it retrieves all data from the NEPViewer cloud.
- NEPViewer allows only one active session per account. If you sign in with the same account in another place, such as the NEPViewer website or mobile app, the session of Home Assistant is no longer valid. At the next update, the sensors become unavailable, the integration stops updating, and Home Assistant asks you to reauthenticate. When Home Assistant signs in again, your session in the other place ends.
- If the last power that a device reported in the evening isn't 0 W, the device becomes unavailable 90 minutes later, until NEPViewer resets the power at midnight.
- If a device stops reporting and the day ends, NEPViewer resets its power to 0 W. The device then shows 0 W until it hasn't reported for 24 hours.
- If only some of the devices of a site stop reporting, the values of the site still include their last values.
- The integration only provides solar production data. Other data in NEPViewer, such as grid and battery power, is not available.
- The integration can't control your devices or change settings in NEPViewer.
- The integration retrieves up to 100 sites and up to 100 gateways and microinverters per account.

## Troubleshooting

{% details "Home Assistant asks you to sign in again" %}

### Symptom: Home Assistant asks you to reauthenticate the NEPViewer integration

All sensors of the integration are unavailable, and **NEPViewer** appears under **Attention required** in **Settings** > **Devices & services**.
The logs can show the message "Authentication with NEPViewer failed."

#### Description

NEPViewer rejected the session or the password that Home Assistant uses.
This can happen when you sign in with the same account in another place, such as the NEPViewer website or mobile app, or when you change your password.
The integration doesn't update until you reauthenticate.

#### Resolution

1. Sign out of your NEPViewer account in other places.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. Under **Attention required**, select **Reconfigure** on the **NEPViewer** card.
4. Enter the password of your NEPViewer account. If your password hasn't changed, enter the same password again.

The integration reloads, and the sensors become available again.

{% enddetails %}

{% details "Invalid authentication" %}

### Symptom: "Invalid authentication"

When you set up or reauthenticate the integration, the form shows the message "Invalid authentication".

#### Description

NEPViewer rejected the email address or the password.

#### Resolution

1. Check that you can sign in to [NEPViewer](https://nepviewer.com) with the same email address and password.
2. Sign out of NEPViewer again.
3. In Home Assistant, enter the credentials again.

{% enddetails %}

{% details "Failed to connect" %}

### Symptom: "Failed to connect" or "Could not connect to the NEPViewer API"

When you set up or reauthenticate the integration, the form shows the message "Failed to connect".
Or, all sensors are unavailable.
After a restart, the integration can also show the message "Could not connect to the NEPViewer API." while it retries the setup.

#### Description

Home Assistant can't reach the NEPViewer cloud.

#### Resolution

1. Check the internet connection of Home Assistant.
2. Check that the [NEPViewer](https://nepviewer.com) website is available.
3. If you are setting up or reauthenticating the integration, submit the form again. Otherwise, wait for the integration to recover. It tries again automatically.

{% enddetails %}

{% details "A microinverter is unavailable" %}

### Symptom: A gateway or microinverter is unavailable, but **Last reported** is available

#### Description

The device stopped sending data to NEPViewer, for example because of a power outage or a problem with its internet connection.
The NEPViewer website can still show the device as online.

#### Resolution

1. Check the power and the internet connection of the device.
2. Wait for the device to report again. The sensors become available at the next update.

{% enddetails %}

{% details "New hardware is missing in Home Assistant" %}

### Symptom: New hardware is missing in Home Assistant

You added a site, gateway, microinverter, or panel to your NEPViewer account, but it doesn't show up in Home Assistant.

#### Description

New hardware is only added when the integration is set up.

#### Resolution

1. Check that the hardware shows up in your NEPViewer account, then sign out of NEPViewer.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **NEPViewer**.
3. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
