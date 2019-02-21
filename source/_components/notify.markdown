---
layout: page
title: "Notifications"
description: "Instructions on how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
---

The `notify` component makes it possible to send notifications to a wide variety of platforms. Please check the sidebar for a full list of platforms that are supported.

If you want to send notifications to the Home Assistant Web Interface you may use the [Persistent Notification Component](/components/persistent_notification/).

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: pushbullet
    name: NOTIFY_NAME
    api_key: YOUR_API_KEY
```

The **name** parameter is optional but needed if you want to use multiple platforms. The platform will be exposed as service `notify.<name>`. The name will default to `notify` if not supplied.

### {% linkable_title Service %}

Once loaded, the `notify` platform will expose a service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification. Default is `Home Assistant`.
| `target`               |      yes | Some platforms will allow specifying a recipient that will receive the notification. See your platform page if it is supported.
| `data`                 |      yes | On platforms who have extended functionality. See your platform page if it is supported.

The notification component supports specifying [templates](/topics/templating/) with `data_template`. This will allow you to use the current state of Home Assistant in your notifications.

In an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this with a customized subject.

```yaml
action:
  service: notify.notify
  data:
    message: "Your message goes here"
    title: "Custom subject"
```

### {% linkable_title Test if it works %}

A simple way to test if you have set up your notify platform correctly, is to use <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose your service from the dropdown menu **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "message": "The sun is {% raw %}{% if is_state('sun.sun', 'above_horizon') %}up{% else %}down{% endif %}{% endraw %}!"
}
```

The automation equivalent would be:

```yaml
action:
  service: notify.notify
  data:
    message: "The sun is {% raw %}{% if is_state('sun.sun', 'above_horizon') %}up{% else %}down{% endif %}{% endraw %}!"
```

For services which have support for sending images.

```json
{ "message": "Test plugin",
  "data": {
    "photo": {
        "url": "http://www.gbsun.de/gbpics/berge/berge106.jpg"
    }
  }
}
```

The automation equivalent would be:

```yaml
action:
  service: notify.notify
  data:
    message: "Test plugin"
    data:
      photo:
        url: "http://www.gbsun.de/gbpics/berge/berge106.jpg"
```


If the service support sending the location, the data from this sample can be used.

```json
{ "message": "Test plugin",
  "data": {
    "location": {
      "latitude": 7.3284,
      "longitude": 46.38234
    }
  }
}
```

The automation equivalent would be:

```yaml
action:
  service: notify.notify
  data:
    message: "Test plugin"
    data:
      location:
        latitude: 7.3284
        longitude: 46.38234
```
