---
title: Sleep as Android
description: Instructions on how to integrate Sleep as Android with Home Assistant.
ha_category:
  - Event
ha_iot_class: Local push
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: sleep
ha_integration_type: integration
ha_platforms:
  - event
ha_quality_scale: silver
---

The **Sleep as Android** {% term integration %} connects the Sleep as Android app to Home Assistant, allowing you to trigger automations based on alarm clock or sleep cycle events.

## About Sleep as Android

**Sleep as Android** is a smart alarm clock with sleep cycle tracking capabilities and numerous other features to analyze and improve sleeping habits. It is available exclusively for Android devices and can be downloaded from [Google Play](https://play.google.com/store/apps/details?id=com.urbandroid.sleep).

## How you can use this integration

The Sleep as Android integration allows you to trigger sleep-related automations. You can trigger actions when sleep tracking starts or stops, such as dimming the lights or adjusting thermostat settings. Alarm events allow you to respond to snoozing or dismissing alarms — like starting a morning routine or sending a notification if the alarm was skipped. Additionally, you can react to specific sleep phases or sound detections (for example, snoring or baby crying), or monitor critical conditions such as sleep apnea.

## Prerequisites

This integration uses webhooks to receive events from Sleep as Android. By default, webhook triggers can only be accessed from devices on the same network as Home Assistant. If you want to receive events while away from your home network, remote access must be enabled, either by adding a [remote URL](/docs/configuration/remote/) or via [Nabu Casa Cloud](https://www.nabucasa.com/config/webhooks/).

Steps to set up the integration:

1. Preferably, open Home Assistant on the device you want to connect to the Sleep as Android integration and initiate the setup.
2. You will be presented a URL during the setup process. Mark the URL and copy it to the clipboard.
3. Open the Sleep as Android app and navigate to *{% icon "mdi:cog" %} Settings → Services → Automation → Webhooks*.
4. Turn on the switch to enable webhooks and paste the webhook URL from your clipboard into the URL field.

{% tip %}

If you scroll to the top and click on *Events* you can individually select and deselect on which events the Sleep as Android app should trigger.

{% endtip %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
"Webhook ID":
  description: "The ID for the webhook URL."
"Cloudhook":
    description: "Whether a Nabu Casa Cloudhook is used."
{% endconfiguration_basic %}

## Events

The integration offers various event entities that will display the most recent events from Sleep as Android. The event attributes provide additional details depending on the event type.

### Alarm clock

Events related to the alarm clock feature.

{% details "Available event types" %}

| Event type                | Description                |
| ------------------------- | -------------------------- |
| `alarm_alert_dismiss`     | Alarm stopped              |
| `alarm_alert_start`       | Alarm started              |
| `alarm_rescheduled`       | Alarm rescheduled          |
| `alarm_skip_next`         | Snoozing                   |
| `alarm_wake_up_check`     | Wake-up check notification |
| `before_smart_period`     | 45min before smart wake-up |
| `show_skip_next_alarm`    | 1h before alarm            |
| `smart_period`            | Smart wake-up started      |
| `time_to_bed_alarm_alert` | Time to bed                |

{% enddetails %}

### Anti-snoring

When the anti-snoring is triggered.

{% details "Available event types" %}

| Event type    | Description            |
| ------------- | ---------------------- |
| `antisnoring` | Anti-snoring triggered |

{% enddetails %}

### Lullaby

Events related to the Lullaby feature.

{% details "Available event types" %}

| Event type            | Description                     |
| --------------------- | ------------------------------- |
| `lullaby_start`       | Lullaby started playing         |
| `lullaby_stop`        | Lullaby stopped playing         |
| `lullaby_volume_down` | Lullaby started lowering volume |

{% enddetails %}

### Sleep phase

Events when entering a new sleep phase.

{% details "Available event types" %}

| Event type    | Description |
| ------------- | ----------- |
| `awake`       | Woke up     |
| `deep_sleep`  | Deep sleep  |
| `light_sleep` | Light sleep |
| `not_awake`   | Fell asleep |
| `rem`         | REM sleep   |

{% enddetails %}

### Sleep tracking

Events related to the sleep tracking feature.

{% details "Available event types" %}

| Event type               | Description      |
| ------------------------ | ---------------- |
| `sleep_tracking_paused`  | Tracking paused  |
| `sleep_tracking_resumed` | Tracking resumed |
| `sleep_tracking_started` | Tracking started |
| `sleep_tracking_stopped` | Tracking stopped |

{% enddetails %}

### Sound recognition

Events triggered when a specific sound is detected during sleep tracking.

{% details "Available event types" %}

| Event type          | Description          |
| ------------------- | -------------------- |
| `sound_event_baby`  | Baby crying          |
| `sound_event_cough` | Coughing or sneezing |
| `sound_event_laugh` | Laughter             |
| `sound_event_snore` | Snoring              |
| `sound_event_talk`  | Talking              |

{% enddetails %}

### Sleep apnea

When a significant dip in oxygen saturation level is detected.

{% details "Available event types" %}

| Event type    | Description          |
| ------------- | -------------------- |
| `apnea_alarm` | Sleep apnea detected |

{% enddetails %}

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
