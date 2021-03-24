---
title: Analytics
description: Share system analytics and diagnostics
ha_category:
  - Other
ha_release: 2021.4 
ha_iot_class: Cloud Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: analytics
---

The Analytics integration will collect information about the running Home Assistant instance and its environment. The information sent depends on what sections you enable in the integration, by default nothing is enabled. The different sections can be controlled in the UI under **{% my general title="Configuration >> General" %}**.

**{% my general badge %}**

When enabled the integration will send data 15 minutes after each start, and every 24h after startup. When the data is sent the full payload will be printed to your log.

The collected data is available to the public at https://analytics.home-assistant.io

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually, just enabling the integration will nok make it sent analytics:

```yaml
analytics:
```

## Basic analytics

This includes:

- The UUID of your system
- The version of your system
- The installation type of your system

If your system includes the Supervisor this will also contain:

- A boolean that indicates if the system is supported
- A boolean that indicates if the system is healthy

{% details Example payload %}

```json
{
  "huuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2021.4.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true
  }
}
```

{% enddetails %}

## Usage analytics

You need to enable [basic analytics](#basic-analytics) to be able to enable this.

This includes:

- The names of all your integrations

If your system include the Supervisor this will also contain:

- The name of all installed add-ons
- The version of all installed add-ons
- The state of protection mode of all installed add-ons
- The state of the auto update toggle of all installed add-ons

{% details Example payload %}

```json
{
  "huuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2021.4.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true
  },
  "integrations": ["awesome_integration"],
    "addons": [
        {
            "slug": "awesome_addon",
            "protected": true,
            "version": "1.0.0",
            "auto_update": false
        }
    ]
}
```

{% enddetails %}

## Statistics

You need to enable [basic analytics](#basic-analytics) to be able to enable this.

This includes:

- Number of integrations
- Number of users
- Number of entities
- Number of automations

If your system include the Supervisor this will also contain:

- Number of installed add-ons

{% details Example payload %}

```json
{
  "huuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "2021.4.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true
  },
  "state_count": 1,
  "automation_count": 2,
  "integration_count": 3,
  "addon_count": 4,
  "user_count": 5
}
```

{% enddetails %}

## Diagnostics

This is not sent to the same [Receiver](#receiver) as the rest of the information enabled with this integration. Crash reports are sent to [Sentry](https://sentry.io/welcome/). This data will not be made public and will only be available to a few core developers.

For now, this is only being done for events inside the Supervisor if your system has that. If this changes to include other parts of the ecosystem it will be mentioned in the release notes and the documentation here will be updated.

## Receiver

The receiver that the payloads are sent to is running as a [CloudFlare Worker](https://workers.cloudflare.com/) and the code for that can be inspected in the [home-assistant/analytics repository](https://github.com/home-assistant/analytics.home-assistant.io).
