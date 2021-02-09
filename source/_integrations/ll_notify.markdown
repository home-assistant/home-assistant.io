---
title: Lovelace Notify
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 2021.1.16
ha_quality_scale: 
ha_codeowners:
  - '@rr326'
ha_domain: ll_notify
ha_iot_class:
---

ll_notify is a Home Assistant component that allows you to easily add notifications and alerts to a Lovelace dashboard.

![Screen Capture](/images/lovelace/ll_notify.gif)

## Configuration

```yaml
# config/configuration.yaml

ll_notify: # required
  defaults: # optional
    notifier:
      position: bottom-right
      delay: 30
```

{% configuration %}
defaults:
    description: Default settings
    required: false
    type: map
    keys:
        notifier:
            description: Defaults for notifications
            required: false
            type: map
            keys:
                delay:
                    description: auto-dismiss wait time (in seconds)  (0 = until clicked)
                    required: false
                    type: integer
                    default: 5
                position:
                    description: default position (bottom-right, bottom-center, bottom-left, top-right, top-center, top-left)
                    required: false
                    type: string
                    default: 'bottom-right'
{% endconfiguration %}

## Using ll_notify

### In a Dashboard

```yaml
  - type: button
    name: Success
    tap_action:
        action: call-service
        service: ll_notify.success
        service_data:
            message: "Test success"
            wait: 10
```

### Services

* `ll__notify.success`
* `ll__notify.error`
* `ll__notify.warning`
* `ll__notify.dismiss_all`

### Service Data Attributes

| Service data attribute | Optional | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `message`            | no       | Message to display |
| `wait`               | yes      | Delay before notification closes (seconds). 0 = stay open until clicked.|

## Advanced Usage

The above configuration options should suffice for most simple use cases.

That said, ll_notify will pass through any configuration options directly to the underlying Javascript framework. You can see the full list of defaults here: [AlertifyJS Defaults](https://alertifyjs.com/guide.html#defaults). 

### Advanced Configuration

```yaml
ll_notify:
    defaults: 
        theme:
            ok: 'custom_theme_ok'
```

### Advanced Dashboard

```yaml
# Complicated - with "callbacks"
  - type: button
    name: Success w/ callbacks
    tap_action:
        action: call-service
        service: ll_notify.success
        service_data:
            message: "Success w/ callbacks"
            wait: 1
            after_close:
                - action: call_service
                  domain: ll_notify
                  service: success
                  service_data:
                      message: After close - message.
                - action: fire_event
                  event_name: fake_event
                  event_data:
                      field1: val1
                - action: js_fire_event
                  event_name: fake_js_event
                  event_data:
                      field1: val1
```

### Advanced Services

* `ll__notify.message`
* `ll__notify.notify`
* `ll__notify.alert`
* `ll__notify.confirm`

### Advanced Service Data Attributes

All service data attributes will be passed through directly to AlertifyJS, except the Actions, as described below. To learn more about these services, see the [AlertifyJS Documentation](https://alertifyjs.com/).

### Advanced Actions / "callbacks"

AlertifyJS uses callbacks after a notification is dismissed, or after a confirm dialog is accepted or rejected. ll_notify instead implements 3 types of actions:

1. `call_service` - Call a Home Assistant service
2. `fire_event` - Fire a Home Assistant event
3. `js_fire_event` - Fire a Javascript event, solely in the browser.

You can trigger one action, or multiple actions. See the example dashboard above.

### Missing Alertify features

Not all AlertifyJS features have been implemented.

Alertify's [notifications](https://alertifyjs.com/notifier.html) are implemented fully and are quite easy to use.

Aleritify's [alerts](https://alertifyjs.com/alert.html) and [confirm dialogs](https://alertifyjs.com/confirm.html) are also implemented. You can set all the properties by sending key:value pairs in `service_data`, but most of the methods are not implemented.

Alertify's [prompt](https://alertifyjs.com/prompt.html) is not implemented at all.
