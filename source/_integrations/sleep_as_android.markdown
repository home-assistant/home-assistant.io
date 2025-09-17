---
title: Sleep as Android
description: Instructions on how to integrate Sleep as Android with Home Assistant.
ha_category:
  - Event
  - Sensor
ha_iot_class: Local Push
ha_release: 2025.9
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: sleep_as_android
ha_integration_type: integration
ha_platforms:
  - diagnostics
  - event
  - sensor
ha_quality_scale: silver
---

The **Sleep as Android** {% term integration %} connects the Sleep as Android app to Home Assistant, allowing you to trigger automations based on alarm clock or sleep cycle events.

## About Sleep as Android

[**Sleep as Android**](https://sleep.urbandroid.org/) is a smart alarm clock with sleep cycle tracking capabilities and numerous other features to analyze and improve sleeping habits. It is available exclusively for Android devices and can be downloaded from [Google Play](https://play.google.com/store/apps/details?id=com.urbandroid.sleep).

## How you can use this integration

The Sleep as Android integration allows you to trigger sleep-related automations. You can trigger actions when sleep tracking starts or stops, such as dimming the lights or adjusting thermostat settings. Alarm events allow you to respond to snoozing or dismissing alarms — like starting a morning routine or sending a notification if the alarm was skipped. Additionally, you can react to specific sleep phases or sound detections (for example, snoring or baby crying), or monitor critical conditions such as sleep apnea.

## Prerequisites

This integration uses webhooks to receive events from Sleep as Android. By default, webhook triggers can only be accessed from devices on the same network as Home Assistant. If you want to receive events while away from your home network, remote access must be enabled, either by adding a [remote URL](/docs/configuration/remote/) or via [Nabu Casa Cloud](https://www.nabucasa.com/config/webhooks/).

Steps to set up the integration:

1. Preferably, open Home Assistant on the device you want to connect to the Sleep as Android integration and initiate the setup.
2. You will be presented a URL during the setup process. Mark the URL and copy it to the clipboard.
3. Open the Sleep as Android app and go to {% icon "mdi:cog" %} **Settings** > **Services** > **Automation** > **Webhooks**.
4. Turn on the switch to enable webhooks and paste the webhook URL from your clipboard into the URL field.

{% note %}

To receive updates from Sleep as Android while away from home, your Home Assistant instance must be remotely accessible.  
You can enable this by configuring a remote URL for Home Assistant or by using Home Assistant Cloud.  

When setting up the Sleep as Android integration, the webhook is created using your external or cloud URL if remote access is available at that time.  
If your instance is not remotely accessible during setup, the webhook will use your internal URL instead.  
In this case, you will need to manually update the webhook to use your remote URL once remote access is configured.

{% endnote %}

{% tip %}

If you scroll to the top and select **Events**, you can individually select and deselect the events the Sleep as Android app should trigger.

{% endtip %}

{% include integrations/config_flow.md %}

## Sensors

- **Next alarm**: The scheduled time of your upcoming alarm.  
- **Alarm label**: The label or description assigned to the next alarm.

## Events

The integration offers various event entities that will display the most recent events from Sleep as Android.

### Alarm clock

Events related to the alarm clock feature.

| Event type          | Description                |
| ------------------- | -------------------------- |
| `alert_dismiss`     | Alarm dismissed            |
| `alert_start`       | Alarm started              |
| `rescheduled`       | Alarm rescheduled          |
| `skip_next`         | Alarm skipped              |
| `snooze_clicked`    | Snoozing                   |
| `snooze_canceled`   | Snoozing canceled          |

### Smart wake-up

Events related to the smart wake-up feature.

| Event type                | Description                |
| ------------------------- | -------------------------- |
| `before_smart_period`     | 45min before smart wake-up |
| `smart_period`            | Smart wake-up started      |

### User notifications

Events related to user notifications.

| Event type                | Description     |
| ------------------------- | --------------- |
| `wake_up_check`           | Wake-up check   |
| `show_skip_next_alarm`    | Skip next alarm |
| `time_to_bed_alarm_alert` | Time to bed     |

### Sleep health

Events related to sleep health.

| Event type    | Description            |
| ------------- | ---------------------- |
| `antisnoring` | Anti-snoring triggered |
| `apnea_alarm` | Sleep apnea detected   |

### Lullaby

Events related to the Lullaby feature.

| Event type    | Description                     |
| ------------- | ------------------------------- |
| `start`       | Lullaby started playing         |
| `stop`        | Lullaby stopped playing         |
| `volume_down` | Lullaby started lowering volume |

### Sleep phase

Events when entering a new sleep phase.

| Event type    | Description |
| ------------- | ----------- |
| `awake`       | Woke up     |
| `deep_sleep`  | Deep sleep  |
| `light_sleep` | Light sleep |
| `not_awake`   | Fell asleep |
| `rem`         | REM sleep   |

{% warning %}

Be cautious when automating based on sleep phase events, especially deep and light sleep, as these can trigger lots of events throughout the night, and they may not precisely correlate with the resulting sleep graph as Sleep as Android can only detect phases reliably using whole-night data.

{% endwarning %}

### Sleep tracking

Events related to the sleep tracking feature.

| Event type | Description      |
| ---------- | ---------------- |
| `paused`   | Tracking paused  |
| `resumed`  | Tracking resumed |
| `started`  | Tracking started |
| `stopped`  | Tracking stopped |

### Sound recognition

Events triggered when a specific sound is detected during sleep tracking.

| Event type | Description          |
| ---------- | -------------------- |
| `baby`     | Baby crying          |
| `cough`    | Coughing or sneezing |
| `laugh`    | Laughter             |
| `snore`    | Snoring              |
| `talk`     | Talking              |

## Automation

Here’s an example automation: when your Sleep as Android alarm starts ringing, your bedroom blinds will automatically open.

{% raw %}

```yaml
alias: Open window blinds on Alarm
triggers:
  - trigger: state
    entity_id:
      - event.sleep_as_android_alarm_clock
    attribute: event_type
    to: alert_start
    not_from: unavailable
conditions:
  - condition: state
    entity_id: person.user1
    state: home
actions:
  - action: cover.open_cover
    target:
      entity_id: cover.bedroom_blinds
mode: single
```

{% endraw %}

## Control Sleep as Android via Home Assistant

The **Sleep as Android** app can be automated through its [Intent API](https://sleep.urbandroid.org/docs/devs/intent_api.html), allowing you to perform actions such as:

- Enable or disable alarms
- Snooze or dismiss alarms
- Start, stop, or pause sleep tracking
- Stop lullaby playback

Thanks to the **Home Assistant Companion App for Android**, which supports [broadcasting intents](/docs/notifications/notification-commands#broadcast-intent), you can trigger these actions directly from Home Assistant.

To make this even easier, you can import the following blueprint. It supports nearly all Sleep as Android actions, so you can automate your sleep routine without writing any custom scripts:

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/sleep-as-android-trigger-app-actions/920845" %}

## Data updates

This integration receives push updates from the Sleep as Android app whenever an event is triggered. If no events occur, the displayed data may become outdated.

## Known limitations

- If Home Assistant is unreachable when an event is pushed, for example when you are away from your home network without remote access, the Sleep as Android integration will miss the update. The app does not retry sending it.

- The integration does not support controlling the Sleep as Android app, such as setting alarm times or turning off alarms.

## Troubleshooting

The **Sleep as Android** integration receives updates via a push from your Sleep as Android app to a webhook.  If you encounter issues, verify that your Home Assistant is reachable from your mobile phone.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}

4. Open the Sleep as Android app and go to {% icon "mdi:cog" %} **Settings** > **Services** > **Automation** > **Webhooks**. Turn off webhooks and remove the URL.
