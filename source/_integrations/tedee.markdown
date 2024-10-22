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
- You need to have the local API enabled.
- The bridge firmware needs to be at least version `2.2.18086` for push updates to work without errors.

If you do not own the bridge, you can still add your locks to Home Assistant through the [HomeKit device integration](/integrations/homekit_controller/) (only for PRO model). Communication will happen over Bluetooth in that case, and features will be limited.

{% note %}
The integration will try to configure callbacks to receive near-real-time push updates from your bridge about your lock state changes. For this to work properly, the bridge must be able to reach your Home Assistant instance. It will prefer the configured `internal_url`, so ensure this address is reachable from your bridge on your network.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your router or in the Tedee app under **Bridge Settings** -> **Local API**."
  required: false
  type: string
Local Access Token:
  description: "The local access token for your bridge. You can find it in the Tedee app under **Bridge Settings** -> **Local API**."
  required: false
  type: string
{% endconfiguration_basic %}

## Supported devices

This integration supports

- Tedee PRO
- Tedee GO

## Binary sensors

We have three binary sensors: One that indicates whether the battery is currently charging, one indicating if the pull spring is enabled, and one indicating whether the lock is in a "semi-locked" position, meaning the lock has been turned manually and between its normal end positions.

## Sensors

The integration currently offers two sensors: A battery sensor, indicating the charge of your lock, and a "pull spring duration" sensor, indicating how long (in seconds) your latch will stay pulled after a pull operation (if supported).

## Possible use-cases

- Auto lock-/unlock the door based on presence
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

## Kown Limitations

This integration only supports functionality that is available locally. This means that 

- Activity logs
- Updates
- Key Pads

are not supported.

## Troubleshooting

{% details "Lock state is not updated in real-time" %}
Make sure your bridge can reach your Home Assistant instance. This means, if you use separate VLANs you need to configure your Firewall appropriately. Additionally, if you have configured a SSL enabled endpoint for your `Internal URL` (Settings -> System -> Network -> Home Assistant URL), you can try to set it back to the IP address of your instance (or a non-HTTPS URL), as HTTPS sometimes leads to problems with the push updates.
{% enddetails %}

{% details "Authentication failures when trying to use the integration" %}
The token that is used to talk to your lock is time limited. Sometimes there were issues when the clock of the Home Assistant host was slightly out of sync, so try to sync your hosts clock.
{% enddetails %}
