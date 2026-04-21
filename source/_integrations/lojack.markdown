---
title: LoJack
description: Instructions on how to integrate your LoJack by Spireon vehicle tracking account with Home Assistant.
ha_category:
  - Car
  - Presence detection
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@devinslick'
ha_domain: lojack
ha_platforms:
  - device_tracker
ha_integration_type: hub
---

The **LoJack** {% term integration %} connects Home Assistant to vehicles equipped with [LoJack by Spireon](https://www.spireon.com/lojack/) GPS tracking hardware. After you authenticate with your Spireon/LoJack account credentials, the integration automatically discovers every vehicle registered to your account and creates a device for each one, with a device tracker entity that shows the vehicle's current or last known GPS location on the map.

LoJack/Spireon is a vehicle tracking and recovery service primarily available in the United States. The hardware is typically installed by a dealership at the time of vehicle purchase. You need an active Spireon/LoJack account with at least one enrolled vehicle to use this integration.

## Supported devices

The integration supports any vehicle enrolled in a Spireon/LoJack account, including:

- Vehicles with factory-installed LoJack hardware
- Vehicles with dealer-installed LoJack devices
- Vehicles tracked through the Spireon fleet management platform (consumer accounts)

Each vehicle registered to your account is represented as a separate device in Home Assistant, named after its year, make, and model (for example, "2021 Toyota Camry"). The manufacturer is listed as Spireon LoJack, and the vehicle's VIN is used as the serial number.

## Prerequisites

Before setting up the integration, make sure you have the following:

- An active **Spireon/LoJack account** with valid credentials (username and password)
- At least one vehicle enrolled and active on the account
- A working internet connection (the integration communicates with the Spireon cloud API)

No additional hardware is required on the Home Assistant side. The LoJack GPS hardware is installed in the vehicle.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The username (typically an email address) for your Spireon/LoJack account."
Password:
  description: "The password for your Spireon/LoJack account."
{% endconfiguration_basic %}

### Reauthentication

If your credentials expire or you change your password, Home Assistant prompts you to re-authenticate:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **LoJack** integration. It will show a **Re-authenticate** message.
2. Select the **Reconfigure** button or the re-authenticate prompt.
3. Enter your new **password**.
4. Select **Submit**.

The integration verifies the password against the same account. Your username cannot be changed during reauthentication. On success, the integration reloads automatically.

### Reconfiguration

If you need to update both your username and password (for example, if you changed your Spireon account email):

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **LoJack** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Update your **username** and/or **password**.
4. Select **Submit**.

{% note %}
If you change the username to a different account, the reconfiguration will abort with an "account mismatch" error. Each LoJack account must be a separate config entry.
{% endnote %}

## Supported functionality

### Entities

The **LoJack** integration provides the following entities for each vehicle.

#### Device tracker

Each vehicle gets a device tracker entity named after the vehicle. It uses GPS as its source type and reports `home`, `not_home`, or a zone name based on the vehicle's GPS coordinates.

## Data updates

The **LoJack** integration {% term polling polls %} data from the Spireon cloud API every 5 minutes by default. Each poll retrieves the last known location cached on the Spireon server. It does _not_ command the vehicle's hardware to obtain a new GPS fix. The server-side cache is updated whenever the vehicle's LoJack hardware periodically reports in (the reporting interval is determined by the LoJack hardware and firmware and is not configurable).

Calling the `homeassistant.update_entity` action re-fetches the last known location already stored on the Spireon server. This is fast and lightweight but only returns whatever location the server already has. If the vehicle has not reported in recently, you will get stale data. Use this approach when you want to check the location more frequently than every 5 minutes, or when you need a quick, low-overhead update.

## Examples

### Arrival and departure notifications

```yaml
automation:
  - alias: "Notify when vehicle arrives home"
    triggers:
      - trigger: state
        entity_id: device_tracker.lojack_camry
        to: "home"
    actions:
      - action: notify.mobile_app_phone
        data:
          message: "Your vehicle has arrived home."
```

## Known limitations

- All data flows through the Spireon cloud API. If the Spireon servers are down, the integration cannot retrieve location data.
- The integration uses cloud polling. There is no webhook or push mechanism, so location updates depend on the polling interval.
- The LoJack hardware reporting interval is determined by the LoJack firmware and is not configurable by the user or the integration.
- LoJack by Spireon is primarily available in the United States. International availability may vary.
- The integration does not support creating or managing LoJack geofences. Use Home Assistant {% term zones %} for geofence functionality instead.
- The integration does not support remote commands (no remote start, lock/unlock, or similar vehicle commands).
- Each LoJack/Spireon account requires its own config entry. You cannot merge vehicles from multiple accounts into a single entry.

## Troubleshooting

### Can't connect to LoJack servers

#### Symptom: "Failed to connect to LoJack servers"

When trying to set up or use the integration, you see a "Failed to connect to LoJack servers" error.

#### Description

This means the integration is unable to reach the Spireon cloud API. The issue could be with your internet connection or a temporary Spireon server outage.

#### Resolution

To resolve this issue, try the following steps:

1. Verify your internet connection is working.
2. Check that the Spireon/LoJack API is online by trying to log in at the Spireon website or mobile app.
3. If the Spireon API is experiencing a temporary outage, try again later.

### Invalid credentials

#### Symptom: "Invalid username or password"

When trying to set up the integration, you see an "Invalid username or password" error.

#### Description

The credentials you entered do not match any active Spireon/LoJack account.

#### Resolution

To resolve this issue, try the following steps:

1. Verify your credentials work on the official Spireon/LoJack website or mobile app.
2. Ensure you are using the correct username format (typically an email address).
3. If you recently changed your password, use the [reauthentication flow](#reauthentication).

### Stale location data

If the location data seems outdated:

1. Keep in mind that the default polling interval is 5 minutes, so data may be up to 5 minutes old.
2. The Spireon server may have cached old data if the vehicle's hardware hasn't reported in recently. The vehicle hardware reports in on its own schedule, which is not configurable.
3. Use the `homeassistant.update_entity` action to re-fetch the latest cached location from the server.

### Vehicle not appearing

If a vehicle on your account does not appear in Home Assistant:

1. Verify the vehicle is enrolled and active on your Spireon/LoJack account.
2. Check that the vehicle appears when you log in to the Spireon website.
3. Try removing and re-adding the integration.

### Enabling debug logging

For more information about how to enable and use debug logs, refer to the [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) documentation.

To enable debug logging for the LoJack integration, add the following to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.lojack: debug
    lojack_api: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration disconnects Home Assistant from the Spireon/LoJack service. Your Spireon/LoJack account and vehicle enrollment are not affected.
