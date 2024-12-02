---
title: Tedee
description: Instructions on how to integrate your Tedee lock with Home Assistant.
ha_release: 2024.2
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: tedee
ha_platforms:
  - binary_sensor
  - diagnostics
  - lock
  - sensor
ha_codeowners:
  - '@patrickhilker'
  - '@zweckj'
ha_integration_type: integration
ha_quality_scale: platinum
---

This integration interacts with your [Tedee](https://tedee.com) locks by communicating with the Tedee bridge through HTTP. The integration will communicate with your lock locally.

## Prerequisites

- You will need the bridge to add your locks using this integration.
- You need to have the **local API** and **encrypted token** enabled.
- The bridge firmware needs to be at least version `2.2.18086` for push updates to work without errors.

If you do not own the bridge, you can still add your locks to Home Assistant through the [HomeKit device integration](/integrations/homekit_controller/) (only for PRO model). Communication will happen over Bluetooth in that case, and features will be limited.

{% note %}
The integration will try to configure webhooks to receive near-real-time push updates from your bridge about your lock state changes. For this to work properly, the bridge must be able to reach your Home Assistant instance. It will prefer the configured `internal_url`, so ensure this address is reachable from your bridge on your network. If communication through the webhooks is not possible, the integration will query for an update every 30 seconds.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your router or in the Tedee app under **Bridge Settings** -> **Local API**."
Local Access Token:
  description: "The local access token for your bridge. You can find it in the Tedee app under **Bridge Settings** -> **Local API**."
{% endconfiguration_basic %}

## Supported devices

This integration supports

- Tedee PRO
- Tedee GO

## Binary sensors

- **Charging**: indicates whether the battery is currently charging.
- **Pullspring enabled**: indicates whether the pull spring setting is enabled.
- **Semi locked**: indicates whether the lock is in a "semi-locked" position. "Semi-locked" means the lock has been turned manually and is between its normal end positions. The lock itself will be unavailable in this position.
- **Lock uncalibrated** (disabled by default): Shows when the lock is in an "uncalibrated state".

## Sensors

The integration currently offers two sensors: A **battery** sensor, indicating the charge of your lock, and a **"pull spring duration"** sensor, indicating how long (in seconds) your latch will stay pulled after a pull operation (if supported).

## Possible use-cases

- Auto lock/unlock the door based on presence
- Control your lock from smart home panels
- Get alerts when battery is low

## Automations

Get started quickly with these automation examples.

### Automatically lock the door when the last person leaves home

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: Lock door when last person leaves
description: Lock the door when last person leaves the home
mode: single
triggers:
  - trigger: state
    entity_id:
      - zone.home
    to: "0"
conditions: []
actions:
  - action: lock.lock
    metadata: {}
    data: {}
    target:
      entity_id: lock.lock_a1b2
```

{% endraw %} {% enddetails %}

## Known Limitations

This integration only supports functionality that is available locally. This means that the following elements are not supported:

- Activity logs
- Updates
- Key pads

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Lock state is not updated in real-time" %}

Make sure your bridge can reach your Home Assistant instance. This means that if you use separate VLANs, you need to configure your Firewall appropriately. Additionally, if you have configured an SSL-enabled endpoint for your Internal URL ({% my network title="Settings > System > Network" %}> Home Assistant URL), try setting it back to the IP address of your instance (or a non-HTTPS URL), as HTTPS sometimes leads to problems with the push updates.

{% enddetails %}

{% details "Authentication failures when trying to use the integration" %}

- This integration works with *local* tokens only, tokens from the cloud won't work
- In the [bridge settings](https://docs.tedee.com/bridge-api#tag/Authenticate) **encrypted token** must be enabled
- The token that is used to talk to your lock is time-limited. Sometimes there were issues when the clock of the Home Assistant host was slightly out of sync, so try to sync your host's clock.

{% enddetails %}
