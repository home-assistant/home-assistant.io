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
ha_integration_type: system
---

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

Home Assistant allows users to share their usage data via the analytics integration. The aggregated data is available at <https://analytics.home-assistant.io>. It is used to influence Home Assistant development priorities and to convince manufacturers to add local control and privacy-focused features.

## Data collection

The information sent depends on what options you opt-in to. You can opt-in during onboarding and by going to **{% my analytics title="Settings > System > Analytics" %}** .

{% my analytics badge %}

When enabled, data will be sent 15 minutes after each start, and every 24h after startup. Sent data is printed to your log.

### Basic analytics

This includes:

- Unique identifier for your system (to ensure each installation is counted once)
- Home Assistant version
- Home Assistant installation type
- Your country-code (derived server-side from your IP-address), example: `"NO"` for Norway.
  - If you live in the US this will also include the region (state) code, example: `"CO"` will be used if you live in Colorado.

If your system includes the Supervisor, this will also contain:

- If your installation is supported
- If your installation is healthy
- The architecture of your installation

If you are running Home Assistant Operating System, this will also contain:

- The board type you are using
- The version of the Operating System

{% details "Example payload" %}

```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "{{current_version}}",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "{{site.data.version_data.hassos['odroid-n2']}}"
  }
}
```

{% enddetails %}

### Usage analytics

_Requires basic analytics to be enabled._

This includes:

- The names of all your core integrations
- The names and versions of all your custom integrations if you have any
- The name and version of the engine used in the [recorder integration](/integrations/recorder)
- Boolean to indicate that the [energy integration](/integrations/energy) is configured
- Boolean to indicate that [HTTP certificate](https://www.home-assistant.io/integrations/http/#ssl_certificate) is configured

If your system includes the Supervisor, this will also contain:

- For each add-on
  - Name
  - Version
  - If protection mode is enabled
  - If auto update is enabled

{% details "Example payload" %}

```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "{{current_version}}",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "{{site.data.version_data.hassos['odroid-n2']}}"
  },
  "integrations": ["awesome_integration"],
  "addons": [
    {
      "slug": "awesome_addon",
      "protected": true,
      "version": "1.0.0",
      "auto_update": false
    }
  ],
  "energy": {
    "configured": true
  },
  "recorder": {
    "engine": "sqlite",
    "version": "123"
  },
  "certificate": false
}
```

{% enddetails %}

### Statistics

_Requires basic analytics to be enabled._

This includes:

- Number of integrations
- Number of users
- Number of entities
- Number of automations

If your system includes the Supervisor, this will also contain:

- Number of installed add-ons

{% details "Example payload" %}

```json
{
  "uuid": "12a3456bc78d90123ef4567g789012h3",
  "version": "{{current_version}}",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "{{site.data.version_data.hassos['odroid-n2']}}"
  },
  "state_count": 1,
  "automation_count": 2,
  "integration_count": 3,
  "addon_count": 4,
  "user_count": 5
}
```

{% enddetails %}

### Diagnostics

If enabled, a crash report will be collected when an unexpected error occurs and uploaded to [Sentry](https://sentry.io). These reports will help fix bugs and improve performance and stability.

Crash reports are only visible to the Home Assistant Core developers. This feature is currently limited to the [Supervisor](/docs/glossary/#home-assistant-supervisor) and [OS-Agent](https://github.com/home-assistant/os-agent).

## Data storage & processing

All data is received and processed by the Home Assistant Analytics Receiver ([source](https://github.com/home-assistant/analytics.home-assistant.io)).

When your installation sends a payload, that payload includes a unique identifier. This identifier is used to make sure that your installation is only counted once.

Your data is securely stored in [Cloudflare's Key-Value store](https://www.cloudflare.com/products/workers-kv/). It will be stored for a maximum of 60 days since the last update. Only aggregated data is made publicly available.

This is an example of how the information is stored:
{% configuration_basic %}
"uuid:12a3456bc78d90123ef4567g789012h3":
  description: "{'version': '{{current_version}}', 'installation_type': 'Home Assistant OS', 'country': 'NO'}"

{% endconfiguration_basic %}

## Device analytics

**This is available only on the development version of Home Assistant.** To switch to development version, look [here for Home Assistant OS](/common-tasks/os/#running-a-development-version) and [here for Home Assistant Container](/common-tasks/container/#running-a-development-version).

If enabled, anonymous device analytics snapshots will be collected and uploaded to the [Open Home Foundation Device Database](https://devices.openhomefoundation.org/). These snapshots help us better understand what devices are used in real life to build a free and open source device database.

The snapshots include:

For each device:

- Integration domain
- Manufacturer, model name, model ID
- Hardware and software version
- Whether the device has a configuration URL
- Device hierarchy information (`via_device` relationships)

For each entity belonging to a device:

- Entity domain (light, sensor, switch, etc.)
- Entity category (config, diagnostic, or none)
- Original device class (temperature, humidity, etc.)
- Unit of measurement
- Whether it uses `has_entity_name`
- Whether it has an assumed state

Device snapshots do not include device names, entity names, entity IDs, state values, unique identifiers (MAC addresses, serial numbers), IP addresses, or any personally identifiable information. Device IDs are anonymized using integration-scoped indices.

Currently custom integrations are not included.

Snapshots are uploaded every 24 hours.

{% details "Example payload" %}

```json
{
  "hue": {
    "devices": [
      {
        "entry_type": null,
        "has_configuration_url": true,
        "hw_version": "2.1",
        "manufacturer": "Signify",
        "model": "Philips Hue Bridge",
        "model_id": "BSB002",
        "sw_version": "1.65.1",
        "via_device": null,
        "entities": []
      },
      {
        "entry_type": null,
        "has_configuration_url": false,
        "hw_version": null,
        "manufacturer": "Signify",
        "model": "Hue color lamp",
        "model_id": "LCT015",
        "sw_version": "1.104.2",
        "via_device": ["hue", 0],
        "entities": [
          {
            "assumed_state": false,
            "domain": "light",
            "entity_category": null,
            "has_entity_name": true,
            "original_device_class": null,
            "unit_of_measurement": null
          }
        ]
      }
    ],
    "entities": []
  }
}
```

{% enddetails %}
