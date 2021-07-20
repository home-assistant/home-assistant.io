---
title: Gotify
description: Instructions on how to integrate a self-hosted Gotify service with your Home Assistant notifications.
ha_release: 2021.08
ha_category:
  - Notifications
ha_domain: notify_events
ha_codeowners:
  - '@benjmarshall'
ha_iot_class: Cloud Push
ha_platforms:
  - notify
---

## Description

The Gotify service is a platform for the **notify** component.

This platform allows you to use [Gotify](https://gotify.net/), an open-source, self-hosted, and simple to set-up push-message server to receive notifications from Home Assistant on your Android device.

## Setting up

To start getting notifications, you need to follow those simple steps:

1. Setup a Gotify server by following the instructions on their [docs site](https://gotify.net/docs/install). You can run the server using docker or a native Go binary. You must make sure your Gotify server is accessible from the open web for this component to be able to communicate with it.
2. When you first login to your Gotify server's WebUI setup a new user (unless you want to only use the default admin user), then logout and log back in as your new user.
3. Add a new application to your Gotify server on the **Apps** tab. Name the new application **Home Assistant**. You can upload the [Home Assistant logo](https://github.com/home-assistant/brands/raw/master/core_integrations/_homeassistant/icon.png) in order to add badges to your notifications.
4. When your application has been created Gotify will present you with a matching **token**. Copy this now as we will need it in the next step.
5. Add the Gotify integration to your installation by adding the following to your `configuration.yaml` file:

```yaml
gotify:
  url: YOUR_GOTIFY_URL (e.g "https://gotify.myserver.com")
  token: YOUR_APP_TOKEN
```

{% configuration %}
url:
  description: Your Gotify Server URL.
  required: true
  type: string
token:
  description: Your Gotify application token.
  required: true
  type: string
{% endconfiguration %}

6. Install the [Gotify Android App](https://github.com/gotify/android) and configure it to connect to your Gotify server using your user's details. It's also a good idea to [follow the instructions](https://github.com/gotify/android#disable-battery-optimization) to disable battery optimisations.

7. Now you can use the Gotify integration as a platform for your **notify** service, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

notify:
  - name: NOTIFIER_NAME (e.g. "gotify_push")
    platform: gotify
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
  default: notify
{% endconfiguration %}

### That's it!

Now you can use the **gotify** service inside your Home Assistant to send any notifications or alerts.

### Example service calls

```yaml
- service: notify.gotify_push
  data:
    message: "Home Assistant has started successfully."
```

```yaml
- service: notify.gotify_push
  data:
    message: "Backyard motion detected."
    title: "Alert!"
    data:
      priority: 9
      link: "lovelace/cameras"
```

### Message optional parameters
The following optional attributes can be added alongside the basic **message** field.

| Attribute  | Description
| ---------- | -----------
| `title`    | Message title.

The following attributes can be placed inside `data` for extended functionality.

| Attribute  | Description
| ---------- | -----------
| `priority` | int64 with higher values representing higher priority. By default this integration uses 4 if no priority is specified. The Gotify Android App uses the following values to configure it's notification types: Minimum(<1), Low(1-3), Normal(4-7), High(>7).
| `link`   | Home Assistant navigation link which will be opened in the app if the notification is clicked on an Android device. The Lovelace default page will be used if no link is specified.

To use notifications effectively, please see the [getting started with automation page](/getting-started/automation/).
