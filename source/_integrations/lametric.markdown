---
title: LaMetric
description: Instructions on how to integrate LaMetric with Home Assistant.
logo: lametric.png
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.49
ha_codeowners:
  - '@robbiet480'
ha_domain: lametric
ha_platforms:
  - notify
---

[LaMetric Time](https://lametric.com/) is a smart clock that can be used to access applications, listen to web radio and display notifications.

There is currently support for the following device types within Home Assistant:

- [Notify](#notifications)

The LaMetric Time can only be accessed by authorized applications. Therefore, each application that wants to access the LaMetric time needs to be registered at the LaMetric Developer web page. Sign Up and login to the developer web page. Click the Create button in the upper right corner, then select Notification App and click Create again. Enter an app name, a description and a redirect URL. Finally, click Save to create the application. For the newly created app you will obtain a client id and a client secret that is required in the following configuration.

```yaml
# configuration.yaml example
lametric:
  client_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
  client_secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Setup Steps

LaMetric needs an OAuth2 `client_id` and `client_secret` from the LaMetric developer portal to use it with Home Assistant.
These are the steps to take:

1. Log in with your LaMetric device account to [developer.lametric.com](https://developer.lametric.com).
2. Hit the Create button and choose [Notification](https://developer.lametric.com/applications/createsource).
3. Fill in the form. You can put almost anything in the fields, they just need to be populated:
  * App Name: Home Assistant 
  * Description: Home Assistant
  * Privacy Policy: `http://localhost/`
  * Check all permission boxes
  * Hit Save
4. You should be directed to your [Notification Apps list](https://developer.lametric.com/applications/sources), click on "Home Assistant", copy your client ID and client Secret and paste into the Home Assistant configuration block in the previous section.
5. Set up some notifications in Home Assistant by following the instructions on the [Lametric Notify](/integrations/lametric) page.
6. Save all configuration files and restart Home Assistant.

## Notifications

The `lametric` notification platform allows to send notification to a LaMetric device. It needs the LaMetric platform to be configured first.

To enable LaMetric notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: lametric
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
  default: notify
lifetime:
  description: Defines how long the message remains in LaMetric notification queue (in seconds).
  required: false
  type: integer
  default: 10
icon:
  description: An icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons). Note that icons always begin with "i" while animations begin with "a". This is part of the name, you can't just use the number!
  required: false
  type: string
cycles:
  description: Defines how long the notification will be displayed. Set to 0 to require manual dismissal
  required: false
  type: integer
  default: 1
priority:
  description: Defines the priority of the notification. Allowed values are info, warning, and critical
  required: false
  type: string
  default: warning
icon_type:
  description: Defines the nature of notification. Allowed values are none, info, and alert
  required: false
  type: string
  default: info
{% endconfiguration %}


## Examples

### Full configuration example

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: lametric
  lifetime: 20
  icon: a7956
  cycles: 3
  priority: info
  icon_type: none
```

### Changing sounds and icons

To add a notification sound, icon, cycles, or priority override, it has to be done via service data.

```yaml
- alias: "Send notification on arrival at school"
  trigger:
    platform: state
    entity_id: device_tracker.son_mobile
    from: "not_home"
    to: "school"
  action:
    service: notify.lametric
    data:
      message: "Son has arrived at school!"
      data:
        sound: "notification"
        icon: "i51"
        cycles: 0
        priority: "critical"
        icon_type: "none"
```

### Only notify specific device

If you have more than one La Metric device, you can specify which will receive the message by adding `target:` to the service data:

```yaml
  action:
    service: notify.lametric
    data:
      message: "Son has arrived at school!"
      target: "Office LaMetric"
      data:
        sound: "notification"
        icon: "i51"
 ```

 If target is not specified, all LaMetric devices will be notified.
