---
title: Simplepush
description: Instructions on how to add Simplepush notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Polling
ha_release: 0.29
ha_config_flow: true
ha_domain: simplepush
ha_platforms:
  - notify
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The `simplepush` platform uses [Simplepush](https://simplepush.io/) to deliver notifications from Home Assistant to your Android and iOS device. Unlike similar apps the Simplepush app requires no registration and supports end-to-end encryption.

{% include integrations/config_flow.md %}

To test if the service works, just send a message with `curl` from the command-line.

```bash
curl 'https://simplepu.sh/YOUR_SIMPLEPUSH_KEY/message'
```

If you enter your password and salt (as defined in the Simplepush app settings) during the configuration of this integration, all notifications sent from this integration will be end-to-end encrypted.

## Notifications

Simplepush can send a notification by calling the [`notify` action](/integrations/notify/).

You can specify the `event` under the `data` key.
Events can be used to customize the notification behavior.

It is also possible to specify `attachments` under the `data` key.
Attachments can be images, GIFs or video files that are accessible by a URL.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Examples 

Send a notification with a title and event.

```yml
- action: notify.simplepush
    data:
      title: "This is the title"
      message: "This is the message"
      data:
        event: "event"
```

Send a notification with four attachments defined by their URL.
Attachments can be images, GIFs or video files.

```yml
- action: notify.simplepush
    data:
      message: "This is the message"
      data:
        attachments:
          - image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
          - image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Newtons_cradle_animation_book_2.gif"
          - video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          - video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            thumbnail: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg"
```
