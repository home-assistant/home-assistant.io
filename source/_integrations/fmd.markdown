---
title: FMD
description: Instructions on how to integrate FMD (Find My Device) with Home Assistant.
ha_category:
  - Presence detection
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: bronze
ha_codeowners:
  - '@devinslick'
ha_domain: fmd
ha_platforms:
  - device_tracker
ha_integration_type: device
---

The **FMD** {% term integration %} connects Home Assistant to an [FMD (Find My Device)](https://fmd-foss.org) server. FMD is an open-source, privacy-focused alternative to commercial device tracking services, built by the [FMD-FOSS](https://fmd-foss.org) project ([source](https://gitlab.com/fmd-foss/fmd-server)).

A device running the [FMD Android app](https://gitlab.com/fmd-foss/fmd-android) periodically reports encrypted location fixes to your FMD server. This integration logs in to the server with your account credentials, fetches the latest location data, and decrypts it locally on your Home Assistant instance. Location fixes are stored on the server in encrypted form and decrypted locally by this integration using your account credentials.

## Prerequisites

- A running FMD server: either your own (self-hosted via Docker or a VPS), or the project's free hosted instance at [server.fmd-foss.org](https://server.fmd-foss.org). For more information, refer to the [FMD server documentation](https://fmd-foss.org/docs/fmd-server/overview).
- An FMD account on that server, created in the FMD Android app. This integration cannot create an account; it can only use an existing one.
- At least one device running the FMD Android app, paired with your account.

## Supported devices

The integration supports any Android device running the FMD Android app and reporting to your FMD server. Each account is represented as one device in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Server URL:
  description: The full URL of your FMD server, including the protocol (for example, `https://fmd.example.com`).
Account ID:
  description: Your FMD account name on that server.
Password:
  description: The password for your FMD account.
{% endconfiguration_basic %}

## Supported functionality

### Entities

#### Device tracker

Each account gets one device tracker entity. It uses GPS as its source type and reports `home`, `not_home`, or a zone name based on the device's GPS coordinates.

Besides the location, the tracker exposes the following attributes when the device reports them: `battery`, GPS accuracy, altitude, speed, and heading, as well as the time the fix was recorded on the device. A dedicated battery sensor is not supported yet.

## FMD automation examples

The device tracker makes it easy to build automations around your device's presence and battery level. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: welcome a family member home

When the device tracker changes to the `home` state, the device is within your home zone. This automation welcomes the family member when they arrive.

- **Trigger**: Device tracker state changed to `home`
- **Action**: Send a notification to your phone

{% details "YAML example for welcoming a family member home" %}

{% example %}
automation: |
  alias: "Welcome home"
  triggers:
    - trigger: device_tracker
      domain: fmd
      entity_id: device_tracker.fmd_my_phone
      from: not_home
      to: home
  actions:
    - action: notify.mobile_app_my_phone
      message: "Welcome home!"
{% endexample %}

{% enddetails %}

### Automation: alert on low battery while away

If the battery level drops below 20% while the device is away from home, it may be about to go dark. This automation sends an alert so you can act before it does.

- **Trigger**: Device tracker battery level dropped below 20%
- **Condition**: Device is not at home
- **Action**: Send an alert to your phone

{% details "YAML example for alerting on low battery while away" %}

{% example %}
automation: |
  alias: "Phone battery low while away"
  triggers:
    - trigger: numeric_state
      entity_id: device_tracker.fmd_my_phone
      attribute: battery
      below: 20
  conditions:
    - condition: state
      entity_id: device_tracker.fmd_my_phone
      state: not_home
  actions:
    - action: notify.mobile_app_my_phone
      message: "Phone battery is at {{ state_attr('device_tracker.fmd_my_phone', 'battery') }}%, please charge it."
{% endexample %}

{% enddetails %}

## Data updates

The integration polls your FMD server every 30 minutes by default. Each poll fetches the most recent location fixes stored on the server. The FMD Android app uploads location fixes on its own schedule (configured in the app). Location fixes from fused, GPS, and network providers are used; fixes from less accurate sources (such as BeaconDB) are skipped.

## Known limitations

- The integration currently tracks a single device per account (the device paired with that account's app).
- Battery level is only exposed as an attribute of the device tracker; a dedicated battery sensor entity is not supported yet.
- Location fixes are only as fresh as the last upload from the device. Requesting an on-demand location from the device is not supported yet.
- Remote commands (ringing the device, taking a photo, and so on) are not supported yet.
- Each account/server combination requires its own config entry.

## Troubleshooting

### Setup fails with "Failed to connect"

#### Symptom

When trying to set up the integration, you see a **Failed to connect** error.

#### Description

The integration could not reach your FMD server.

#### Resolution

1. Verify the server URL includes the protocol (for example, `https://fmd.example.com`).
1. Verify the FMD server is running and reachable from your Home Assistant instance.
1. Check for TLS certificate issues if you use HTTPS.

### Setup fails with "Invalid authentication"

#### Symptom

When trying to set up the integration, you see an **Invalid authentication** error.

#### Description

The account ID or password does not match an account on the FMD server.

#### Resolution

1. Verify the account ID and password by logging in to your FMD server's web interface.
1. Note that the same account ID can exist on different servers; make sure you are using the credentials for the server you entered.

### Location data is missing or stale

#### Symptom

The tracker shows no location or a location that is hours old.

#### Description

The device has not uploaded a recent fix, or the most recent fixes use inaccurate providers.

#### Resolution

1. Open the FMD app on the device and check its upload schedule and connection status.
1. Wait for the next poll or call the `homeassistant.update_entity` action on the tracker.
1. Battery optimization on the device may prevent the FMD app from uploading; exclude it from battery optimization.

### Enabling debug logging

For more information on how to enable and use debug logs, refer to the [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) documentation.

To enable debug logging for the FMD integration, add the following to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fmd: debug
    fmd_api: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration disconnects Home Assistant from your FMD server. Your FMD account, the FMD server, and the paired device are not affected.
