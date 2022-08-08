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
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Notifications](#notifications)

<div class='note'>

The free tier is [limited](https://docs.pushbullet.com/#push-limit) to 500 pushes per month.

</div>

### Sensor

The `pushbullet` sensor platform reads messages from [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends. This sensor platform provides sensors that show the properties of the latest received Pushbullet notification mirror.

### Setup

Notification Mirroring allows users to see their Android device's notifications on their computer. It must be first enabled in the app and is currently only available on the Android platform. For more information, please see [this announcement](https://blog.pushbullet.com/2013/11/12/real-time-notification-mirroring-from-android-to-your-computer/) on the Pushbullet Blog.

Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.

### Configuration

To enable the Pushbullet sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pushbullet
    api_key: YOUR_API_KEY
    monitored_conditions:
      - body
```

{% configuration %}
api_key:
  description: Your Pushbullet API key.
  required: true
  type: string
monitored_conditions:
  description: Properties of the push to monitor.
  required: false
  default: "`body` and `title`"
  type: list
  keys:
    application_name:
      description: The application sending the push.
    body:
      description: Body of the message.
    notification_id:
      description: ID of the notification.
    notification_tag:
      description: Tag (if the application sending supports it).
    package_name:
      description: Name of the sender's package.
    receiver_email:
      description: The email of the push's target.
    sender_email:
      description: The sender of the push.
    source_device_iden:
      description: ID of the sender's device.
    title:
      description: Title of the push.
    type:
      description: Type of push.
{% endconfiguration %}

All properties will be displayed as attributes. The properties array are just for logging the sensor readings for multiple properties.

## Notifications

The `pushbullet` notification platform sends messages to [Pushbullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers, and friends. The free tier is [limited](https://docs.pushbullet.com/#push-limit) to 500 pushes per month.

To enable Pushbullet notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushbullet
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Enter the API key for Pushbullet. Go to [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) to retrieve your API key/access token.
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
{% endconfiguration %}

### Usage

Pushbullet is a notify platform and thus can be controlled by calling the notify service [as described here](/integrations/notify/). It will send a notification to all devices registered in the Pushbullet account. An optional **target** parameter can be given to Pushbullet to specify specific account's devices, contacts or channels.

Type | Prefix | Suffix | Example
---- | ------ | ------ | -------
Device | `device/` | Device nickname | `device/iphone`
Channel | `channel/` | Channel tag | `channel/my_home`
Email | `email/` | Contact's email address | `email/email@example.com`
SMS | `sms/` | Contact's phone number | `sms/0612345678`

If using targets, your own account's email address functions as 'send to all devices'. All targets are verified (if exists) before sending, except email.

#### Example service payload

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
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send URL
    message: This is an url
    data:
      url: google.com
```

- `url` (*Required*): Page URL to send with Pushbullet.

### File support

```yaml
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send file
    message: This is a file
    data:
      file: /path/to/my/file
```

- `file` (*Required*): File to send with Pushbullet.

### File URL support

```yaml
action:
  service: notify.NOTIFIER_NAME
  data:
    title: Send file
    message: This is a file URL
    data:
      file_url:  https://cdn.pixabay.com/photo/2014/06/03/19/38/test-361512_960_720.jpg
```

- `file_url` (*Required*): File to send with Pushbullet.

### Single target

```yaml
  action:
    service: notify.NOTIFIER_NAME
    data:
      title: "Send to one device"
      message: "This only goes to one specific device"
      target: device/DEVICE_NAME
```

- `target`: Pushbullet device to receive the notification.

<div class='note'>

Don't forget to [allowlist external directories](/docs/configuration/basic/), so Home Assistant has access to them.

</div>
