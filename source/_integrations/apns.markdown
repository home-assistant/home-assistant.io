---
title: Apple Push Notification Service (APNS)
description: Instructions on how to add APNS notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.31
ha_iot_class: Cloud Push
ha_domain: apns
ha_platforms:
  - notify
---

The `apns` platform uses the Apple Push Notification service (APNS) to deliver notifications from Home Assistant.

## Setup

To use the APNS service you will need an Apple developer account and you will need to create an app to receive push notifications. For more information, see the Apple developer documentation.

## Configuration

To enable APNS notifications, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: apns
  cert_file: cert_file.pem
  topic: topic
```

{% configuration %}
name:
  description: he name of the notifier. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: true
  type: string
cert_file:
  description: The certificate to use to authenticate with the APNS service.
  required: true
  type: string
topic:
  description: The app bundle ID specified in the certificate.
  required: true
  type: string
sandbox:
  description: If true notifications will be sent to the sandbox (test) notification service.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

The APNS platform will register two services, `notify.NOTIFIER_NAME` and `apns.apns_NOTIFIER_NAME`.

### apns.apns_NOTIFIER_NAME

This service will register device IDs with Home Assistant. In order to receive a notification a device must be registered. The app on the device can use this service to send an ID to Home Assistant during startup, the ID will be stored in `[NOTIFIER_NAME]_apns.yaml`.

See `didRegisterForRemoteNotificationsWithDeviceToken` in the [Apple developer documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/occ/intfm/UIApplicationDelegate/application:didRegisterForRemoteNotificationsWithDeviceToken:) for more information about how to obtain a device ID.

### notify.NOTIFIER_NAME

This service will send messages to a registered device. The following parameters can be used:

- **message**: The message to send.

- **target**: The desired state of the device, only devices that match the state will receive messages. To enable state tracking a registered device must have a `tracking_device_id` attribute added to the `[NOTIFIER_NAME]_apns.yaml` file. If this ID matches a device in `known_devices.yaml` the device state will be tracked.

- **data**:
  * **badge**: The number to display as the badge of the app icon.
  * **sound**: The name of a sound file in the app bundle or in the Library/Sounds folder.
  * **category**: Provide this key with a string value that represents the identifier property of the `UIMutableUserNotificationCategory`.
  * **content_available**: Provide this key with a value of 1 to indicate that new content is available.
