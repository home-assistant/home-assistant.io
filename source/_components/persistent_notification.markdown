---
layout: page
title: "Persistent notification"
description: "Instructions on how to integrate persistant notifications into Home Assistant."
date: 2016-06-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.23
---

The `persistant_notification` can be used to show a message on the frontend that has to be dismissed by the user.

<p class='img'>
  <img src='/images/screenshots/persistant-notification.png' />
</p>

### {% linkable_title Service %}

The service `persistent_notification/create` takes in `message`, `title`, and `notification_id`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `notification_id`      |      yes | If `notification_id` is given, it will overwrite the notification if there already was a notification with that ID.

The `persistant_notification` component supports specifying [templates](/topics/templating/) for both the `message` and the `title`. This will allow you to use the current state of Home Assistant in your notifications.

In an [action](https://home-assistant.io/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this with a customized subject.

```yaml
action:
  service: persistant_notification.create
  data:
    message: "Your message goes here"
    title: "Custom subject"
```

### {% linkable_title Create a perstistant notification %}

Use **Call Service** from the **Developer Tools** to call the `persistant_notification` service. Choose `persistant_notification/create` from the list of **Available services:** and enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{
  "notification_id": "1234",
  "title": "Sample notification",
  "message": "This is a sample text"
}
```
This will create the notification entry shown above.
