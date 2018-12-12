---
layout: page
title: "Push Notifications"
description: "Instructions on how to use the HTML5 push notifications platform from Home Assistant."
date: 2016-08-17 21:58
sidebar: true
comments: false
sharing: true
footer: true
logo: html5.png
ha_category: Notifications
ha_release: 0.27
---

The `html5` notification platform enables you to receive push notifications to Chrome or Firefox, no matter where you are in the world. `html5` also supports Chrome and Firefox on Android, which enables native-app-like integrations without actually needing a native app.

<p class='note'>
HTML5 push notifications **do not** work on iOS.
</p>

## {% linkable_title Configuration %}

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: html5
    name: NOTIFIER_NAME
    gcm_api_key: YOUR_API_KEY
    gcm_sender_id: YOUR_SENDER_ID
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: notify
gcm_api_key:
  description: The API Server key provided to you by Google for Google Cloud Messaging (GCM). Required to push to Chrome.
  required: true
  type: string
gcm_sender_id:
  description: The sender ID provided to you by Google for Google Cloud Messaging (GCM). Required to push to Chrome.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Getting ready for Chrome %}

1. Make sure you can access your Home Assistant installation from outside your network over HTTPS ([see docs](/docs/configuration/remote/)).
2. Create a new project at [https://console.cloud.google.com/home/dashboard](https://console.cloud.google.com/home/dashboard).
3. Go to [https://console.cloud.google.com/apis/credentials/domainverification](https://console.cloud.google.com/apis/credentials/domainverification) and verify your domain via Google Webmaster Central / Search Console - [instructions](#verify-your-domain).
4. With the domain verified, go to [https://console.firebase.google.com](https://console.firebase.google.com), select import Google project and select the project you created.
5. Then, click the cogwheel on top left and select "Project settings".
6. Select 'Cloud Messaging' tab, listed beneath Project Credentials will be your 152 character 'Server Key' and 12 digit ID 'Sender ID' you need for configuring this component.

#### {% linkable_title Verify your domain %}

Follow these steps to verify domain ownership with Google Webmaster Central/Search Console:
1. Enter your domain and add `/local` at the end, e.g., `https://example.com:8123/local`
2. Select HTML file verification and download the google*.html file.
2. Create a directory named `www` in your Home Assistant configuration directory (`/config/` share from Samba add-on).
3. Place the downloaded `google*.html` file in the `www` directory.
4. RESTART Home Assistant. **This is important!**
5. Verify the file can be accessed in the browser, e.g., **https://example.com:8123/local/google123456789.html** (change filename). You should see a plain text message saying "google-site-verification: ...". If you see "404: Not Found" or something else, retry the above steps.
6. Go back to Google Webmaster Central/Search Console and proceed with the verification.

### {% linkable_title Requirements %}

The `html5` platform can only function if all of the following requirements are met:

* You are using Chrome and/or Firefox on any desktop platform, ChromeOS or Android.
* Your Home Assistant instance is exposed to the world.
* If using a proxy, HTTP basic authentication must be off for registering or unregistering for push notifications. It can be re-enabled afterwards.
* If you don't run Hass.io: `pywebpush` must be installed. `libffi-dev`, `libpython-dev` and `libssl-dev` must be installed prior to `pywebpush` (i.e. `pywebpush` probably won't automatically install).
* You have configured SSL/TLS for your Home Assistant. It doesn't need to be configured in Home Assistant though, e.g., you can be running [NGINX](/ecosystem/nginx/) in front of Home Assistant and this will still work. The certificate must be trustworthy (i.e. not self signed).
* You are willing to accept the notification permission in your browser.

### {% linkable_title Setting up %}

Assuming you have already added the platform to your configuration:

1. Open Home Assistant in Chrome or Firefox.
2. Load profile page by clicking on the badge next to the Home Assistant title in the sidebar. Assuming you have met all the [requirements](#requirements) above then you should see a new slider for Push Notifications. If the slider is greyed out, ensure you are viewing Home Assistant via its external HTTPS address. If the slider is not visible, ensure you are not in the user configuration (Sidebar, Configuration, Users, View User).
3. Slide it to the on position.
4. Within a few seconds you should be prompted to allow notifications from Home Assistant.
5. Assuming you accept, that's all there is to it!
6. (Optional, but highly recommended!) Open the `html5_push_registrations.conf` file in your configuration directory. You will see a new entry for the browser you just added. Rename it from `unnamed device` to a name of your choice, which will make it easier to identify later. _Do not change anything else in this file!_ You need to restart Home Assistant after making any changes to the file.

### {% linkable_title Testing %}

Assuming the previous test completed successfully and your browser was registered, you can test the notification as follows:

1. Open Home Assistant in Chrome or Firefox.
2. Open the sidebar and click the Services button at the bottom (shaped like a remote control), located below the Developer Tools.
3. From the Services dropdown, search for your HTML5 notify service (e.g., notify.NOTIFIER_NAME) and select it.
4. In the Service Data text box enter: `{"message":"hello world"}`, then press the CALL SERVICE button.
5. If everything worked you should see a popup notification.

### {% linkable_title Usage %}

The `html5` platform accepts a standard notify payload. However, there are also some special features built in which you can control in the payload.


#### {% linkable_title Actions %}

Chrome supports notification actions, which are configurable buttons that arrive with the notification and can cause actions on Home Assistant to happen when pressed. You can send up to 2 actions.

```yaml
message: Anne has arrived home
data:
  actions:
    - action: open
      icon: "/static/icons/favicon-192x192.png"
      title: Open Home Assistant
    - action: open_door
      title: Open door
```

#### {% linkable_title Data %}

Any parameters that you pass in the notify payload that aren't valid for use in the HTML5 notification (`actions`, `badge`, `body`, `dir`, `icon`, `image`, `lang`, `renotify`, `requireInteraction`, `tag`, `timestamp`, `vibrate`) will be sent back to you in the [callback events](#automating-notification-events).

```yaml
title: Front door
message: The front door is open
data:
  my-custom-parameter: front-door-open
```

#### {% linkable_title Tag %}

By default, every notification sent has a randomly generated UUID (v4) set as its _tag_ or unique identifier. The tag is unique to the notification, _not_ to a specific target. If you pass your own tag in the notify payload you can replace the notification by sending another notification with the same tag. You can provide a `tag` like so:

```yaml
title: Front door
message: The front door is open
data:
  tag: front-door-notification
```

Example of adding a tag to your notification. This won't create new notification if there already exists one with the same tag.

{% raw %}
```yaml
  - alias: Push/update notification of sensor state with tag
    trigger:
      - platform: state
        entity_id: sensor.sensor
    action:
      service: notify.notify
      data_template:
        message: "Last known sensor state is {{ states('sensor.sensor') }}."
      data:
        data:
          tag: 'notification-about-sensor'
```
{% endraw %}

#### {% linkable_title Targets %}

If you do not provide a `target` parameter in the notify payload a notification will be sent to all registered targets as listed in `html5_push_registrations.conf`. You can provide a `target` parameter like so:

```yaml
title: Front door
message: The front door is open
target: unnamed device
```

`target` can also be a string array of targets like so:

```yaml
title: Front door
message: The front door is open
target:
  - unnamed device
  - unnamed device 2
```

#### {% linkable_title Overrides %}

You can pass any of the parameters listed [here](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#Parameters) in the `data` dictionary. Please note, Chrome specifies that the maximum size for an icon is 320px by 320px, the maximum `badge` size is 96px by 96px and the maximum icon size for an action button is 128px by 128px.

#### {% linkable_title URL %}

You can provide a URL to open when the notification is clicked by putting `url` in the data dictionary like so:

```yaml
title: Front door
message: The front door is open
data:
  url: https://google.com
```

If no URL or actions are provided, interacting with a notification will open your Home Assistant in the browser. You can use relative URLs to refer to Home Assistant, i.e. `/map` would turn into `https://192.168.1.2:8123/map`.

### {% linkable_title Automating notification events %}

During the lifespan of a single push notification, Home Assistant will emit a few different events to the event bus which you can use to write automations against.

Common event payload parameters are:

| Parameter | Description                                                                                                                                                                                                                                                    |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`  | The `action` key that you set when sending the notification of the action clicked. Only appears in the `clicked` event.                                                                                                                                        |
| `data`    | The data dictionary you originally passed in the notify payload, minus any parameters that were added to the HTML5 notification (`actions`, `badge`, `body`, `dir`, `icon`, `image`, `lang`, `renotify`, `requireInteraction`, `tag`, `timestamp`, `vibrate`). |
| `tag`     | The unique identifier of the notification. Can be overridden when sending a notification to allow for replacing existing notifications.                                                                                                                        |
| `target`  | The target that this notification callback describes.                                                                                                                                                                                                          |
| `type`    | The type of event callback received. Can be `received`, `clicked` or `closed`.                                                                                                                                                                                 |

You can use the `target` parameter to write automations against a single `target`. For more granularity, use `action` and `target` together to write automations which will do specific things based on what target clicked an action.

#### {% linkable_title received event %}

You will receive an event named `html5_notification.received` when the
notification is received on the device.

```yaml
- alias: HTML5 push notification received and displayed on device
  trigger:
    platform: event
    event_type: html5_notification.received
```

#### {% linkable_title clicked event %}

You will receive an event named `html5_notification.clicked` when the notification or a notification action button is clicked. The action button clicked is available as `action` in the `event_data`.

```yaml
- alias: HTML5 push notification clicked
  trigger:
    platform: event
    event_type: html5_notification.clicked
```

or

```yaml
- alias: HTML5 push notification action button clicked
  trigger:
    platform: event
    event_type: html5_notification.clicked
    event_data:
      action: open_door
```

#### {% linkable_title closed event %}

You will receive an event named `html5_notification.closed` when the notification is closed.

```yaml
- alias: HTML5 push notification clicked
  trigger:
    platform: event
    event_type: html5_notification.closed
```

### {% linkable_title Making notifications work with NGINX proxy %}

If you use [NGINX](/ecosystem/nginx/) as a proxy with authentication in front of your Home Assistant instance, you may have trouble with receiving events back to Home Assistant. It's because of authentication token that cannot be passed through the proxy.

To solve the issue put additional location into your nginx site's configuration:

```bash
location /api/notify.html5/callback {
    if ($http_authorization = "") { return 403; }
    allow all;
    proxy_pass http://localhost:8123;
    proxy_set_header Host $host;
    proxy_redirect http:// https://;
}
```

This rule check if request have `Authorization` HTTP header and bypass the htpasswd (if you use one).

If you still have the problem, even with mentioned rule, try to add this code:

```bash
    proxy_set_header Authorization $http_authorization;
    proxy_pass_header Authorization;
```
