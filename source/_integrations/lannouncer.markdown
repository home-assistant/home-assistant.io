---
title: LANnouncer
description: Instructions on how to add Lannouncer notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: lannouncer
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `lannouncer` notification {% term integration %} allows you to play spoken messages (TTS) or sounds on an Android device running [Lannouncer](https://play.google.com/store/apps/details?id=com.keybounce.lannouncer&hl=en_US). This can be useful when you have a wall mounted Android tablet, or an Android device that is permanently powered and turned on and want to use that to play notifications.

To enable Lannouncer notifications in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: lannouncer
    host: HOSTNAME_OR_IP
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
host:
  description: The hostname or IP-address of the Android device that is running Lannouncer.
  required: true
  type: string
port:
  description: The port on which Lannouncer is running.
  required: false
  default: 1035
  type: integer
{% endconfiguration %}

### Installation

You need to install the Lannouncer app and enable the *Network (TCP) Listener* and *Auto-Start Network Listener*. You can disable the *GCM (Google Cloud) and WAN Messaging* and *SMS Listener* since this integration doesn't use them.

Lannouncer uses the default Android TTS voice. You can tweak that in the Android configuration, or you can install a different TTS engine from the Play Store. You might want to raise the volume in the app settings since that depends on the actual hardware device.

More information can be found [here](https://web.archive.org/web/20200928053944/https://www.keybounce.com/lannouncer/configuring-lannouncer/) (archived website).

### Sending messages

Lannouncer supports two types of messages.

Spoken messages is the default method (`speak`). You just invoke the `notify` action with the following JSON and the device will speak out the specified message.

```json
{
  "message": "I'm sorry, I cannot do that Dave."
}
```

The second method is to play notifications (`alarm`). There are 4 built-in sounds (`chime`, `doorbell`, `alarm` and `siren`).

```json
{
  "message": "chime",
  "data": {
    "method": "alarm"
  }
}
```

You can also request to play a configured additional soundfiles (`FILE1`, `FILE2`, `FILE3`, `FILE4` or `FILE5`). You can configure this file in the app settings.

```json
{
  "message": "FILE1",
  "data": {
    "method": "alarm"
  }
}
```

{% note %}
The free version only supports one additional soundfile.
{% endnote %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
