---
title: Gotify
description: Instructions on how to integrate a self-hosted Gotify service with your Home Assistant notifications.
ha_release: 2021.08
ha_category:
  - Notifications
ha_domain: gotify
ha_codeowners:
  - '@benjmarshall'
ha_iot_class: Cloud Polling
ha_platforms:
  - notify
ha_config_flow: true
---

This integration allows you to use [Gotify](https://gotify.net/), an open-source, self-hosted, and simple to set-up push-message server to receive notifications from Home Assistant.

## Prerequisites

To start getting notifications you need to follow these steps:

1. Setup a Gotify server by following the instructions on their [documentation site](https://gotify.net/docs/install). You can run the server using Docker or a native Go binary. You must make sure your Gotify server is accessible from the open web for this component to be able to communicate with it.
2. When you first login to your Gotify server's WebUI setup a new user (unless you want to only use the default admin user), then logout and log back in as your new user.
3. Add a new client to your Gotify server on the **Clients** tab. The new client will have a **client token** associated with it which you can view by clicking the eye symbol. You will need this **client token** in the Configuration step.
4. (Optional) Gotify requires notifications to be assigned to channels called Applications. This integration can configure an Application for you, alternatively you can add a new Application manually to your Gotify server on the **Apps** tab. You can upload the [Home Assistant logo](https://github.com/home-assistant/brands/raw/master/core_integrations/_homeassistant/icon.png) in order to add badges to your notifications. The new Application will an **app token** associated with it which you can view by clicking the eye symbol. If you want to use a manually created Application you will need need this **app token** in the Configuration step. If you don't want to manually create an Application this integration will create an Application called Home Assistant for you in the Configuration step.

{% include integrations/config_flow.md %}

### Example service calls

```yaml
- service: notify.gotify_home_assistant
  data:
    message: "Home Assistant has started successfully."
```

```yaml
- service: notify.gotify_home_assistant
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
