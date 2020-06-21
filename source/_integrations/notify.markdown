---
title: Notifications
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: notify
---

The `notify` integration makes it possible to send notifications to a wide variety of platforms. To use it you have to setup at least one notification target (notifier), check the [integrations list](/integrations/#notifications) for one that fits your use case.

If you want to send notifications to the Home Assistant web interface, you may use the [Persistent Notification integration](/integrations/persistent_notification/).

## Service

Once loaded, the `notify` platform will expose a service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `target`               |      yes | Some platforms allow specifying a recipient that will receive the notification. See your platform page if it is supported.
| `data`                 |      yes | On platforms who have extended functionality. See your platform page if it is supported.

The notify integration supports specifying [templates](/topics/templating/) with `data_template`. This will allow you to use the current state of Home Assistant in your notifications.

In an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this with a customized subject.

```yaml
action:
  service: notify.notify
  data:
    message: "Your message goes here"
    title: "Custom subject"
```

### Test if it works

After you setup a [notifier](/integrations/#notifications) a simple way to test if you have set up your notify platform correctly, is to open **Developer Tools** from the sidebar and then select the  **Services** tab. Choose your service from the **Service** dropdown menu, enter the sample below into the **Service Data** field, and press the **CALL SERVICE** button.

```json
{
  "message": "The sun is {% raw %}{% if is_state('sun.sun', 'above_horizon') %}up{% else %}down{% endif %}{% endraw %}!"
}
```

The automation equivalent would be:

```yaml
action:
  service: notify.notify
  data_template:
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
