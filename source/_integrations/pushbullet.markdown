---
title: Pushbullet
description: Instructions on how to read user pushes in Home Assistant
ha_category:
  - Notifications
  - Sensor
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_domain: pushbullet
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensors)
- [Notifications](#notifications)

{% note %}
The free tier is [limited](https://docs.pushbullet.com/#push-limit) to 500 pushes per month.
{% endnote %}

## Prerequisites

Notification Mirroring allows users to see their Android device's notifications on their computer. It must be first enabled in the app and is currently only available on the Android platform. For more information, please see [this announcement](https://blog.pushbullet.com/2013/11/12/real-time-notification-mirroring-from-android-to-your-computer/) on the Pushbullet Blog.

Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.

{% include integrations/config_flow.md %}

## Sensors

The following sensors are created after setting up the integration:

- Application name: The application sending the push.
- Body: The notification message body.
- Notification ID: The ID of the notification.
- Tag: The notification tag (if the application sending supports it).
- Package name: The name of the sender’s package.
- Receiver Email: The email of the push’s target.
- Sender Email: The email of the sender.
- Sender device ID: The ID of the sender’s device.
- Title: The title of the push.
- Type: The type of the push.

"Body" and "Title" are enabled by default. The rest can be enabled from the UI.

## Notifications

The Pushbullet notification platform sends messages to [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends. The free tier is [limited](https://docs.pushbullet.com/#push-limit) to 500 pushes per month.

### Usage

Pushbullet is a notify platform and thus can be controlled by calling the notify action [as described here](/integrations/notify/). It will send a notification to all devices registered in the Pushbullet account. An optional **target** parameter can be given to Pushbullet to specify specific account's devices, contacts or channels.

| Type    | Prefix     | Suffix                  | Example                   |
| ------- | ---------- | ----------------------- | ------------------------- |
| Device  | `device/`  | Device nickname         | `device/iphone`           |
| Channel | `channel/` | Channel tag             | `channel/my_home`         |
| Email   | `email/`   | Contact's email address | `email/email@example.com` |
| SMS     | `sms/`     | Contact's phone number  | `sms/0612345678`          |

If using targets, your own account's email address functions as 'send to all devices'. All targets are verified (if exists) before sending, except email.

#### Example action payload

```yaml

  message: A message for many people
  target: 
    - device/telephone
    - email/hello@example.com
    - channel/my_home
    - sms/0612345678

```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### URL support

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send URL"
      message: "This is an url"
      data:
        url: "google.com"
```

- `url` (*Required*): Page URL to send with Pushbullet.

### File support

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send file"
      message: "This is a file"
      data:
        file: /path/to/my/file
```

- `file` (*Required*): File to send with Pushbullet.

### File URL support

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send file"
      message: "This is a file URL"
      data:
        file_url:  https://cdn.pixabay.com/photo/2014/06/03/19/38/test-361512_960_720.jpg
```

- `file_url` (*Required*): File to send with Pushbullet.

### Single target

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send to one device"
      message: "This only goes to one specific device"
      target: device/DEVICE_NAME
```

- `target`: Pushbullet device to receive the notification.

{% important %}
Don't forget to [allowlist external directories](/integrations/homeassistant/#allowlist_external_dirs), so Home Assistant has access to them.
{% endimportant %}
