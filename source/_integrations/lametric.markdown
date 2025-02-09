---
title: LaMetric
description: Instructions on how to integrate LaMetric TIME with Home Assistant.
ha_category:
  - Button
  - Notifications
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.49
ha_codeowners:
  - '@robbiet480'
  - '@frenck'
  - '@bachya'
ha_domain: lametric
ha_platforms:
  - button
  - diagnostics
  - notify
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
ha_config_flow: true
ha_ssdp: true
ha_dhcp: true
---

[LaMetric TIME](https://lametric.com/) is a smart clock that can be used to access applications, listen to web radio and display notifications.

{% include integrations/config_flow.md %}

## Actions

The LaMetric integration provides actions to interact with your LaMetric
device(s). Those action can be used in, for example, automations.

### Action `lametric.chart`

The {% my developer_call_service service="lametric.chart" title="`lametric.chart`" %}
action allows you to display a little chart to your LaMetric.

{% my developer_call_service badge service="lametric.chart" %}

{% configuration "lametric.chart" %}
device_id:
  description: The ID of the device to send the message to.
  required: true
  type: string
data:
  description: The data points in the chart, as a list of numbers. For example `[1, 2, 3, 2, 1]`.
  required: true
  type: list
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string
{% endconfiguration %}

### Action `lametric.message`

The {% my developer_call_service service="lametric.message" title="`lametric.message`" %}
action allows you to send a message to your LaMetric. These
messages can be enrichted with icons and sounds.

{% my developer_call_service badge service="lametric.message" %}

{% configuration "lametric.message" %}
device_id:
  description: The ID of the device to send the message to.
  required: true
  type: string
message:
  description: The message to send to the LaMetric device.
  required: true
  type: string
icon:
  description: "The ID of an icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string
{% endconfiguration %}

## Notifications

You can send notifications to your LaMetric device using
the [Notifications](/integrations/notify) integration.

Each LaMetric device added to your Home Assistant will have its own
`notify.` actions. The action name matches the name of your device
as shown in your LaMetric account. For example, if you have a device
called "My LaMetric", the action would become `notify.my_lametric`.

The notification performed action against an LaMetric device can take the
following, additional, optional parameters:

{% configuration "notification" %}
icon:
  description: "The ID of an icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: warning
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string
  default: none
{% endconfiguration %}

## Example

To add a notification sound, icon, cycles, or priority override,

```yaml
- alias: "Send notification on arrival at school"
  triggers:
    - trigger: state
      entity_id: device_tracker.tom_mobile
      from: "not_home"
      to: "school"
  actions:
    - action: notify.my_lametric
      data:
        message: "Tom has arrived at school!"
        data:
          sound: "notification"
          icon: "51"
          cycles: 0
          priority: "critical"
          icon_type: "info"
```

## List of notification sounds

The following notification sounds can be used with the `sound` parameter on
notify action:

- `alarm1`
- `alarm10`
- `alarm11`
- `alarm12`
- `alarm13`
- `alarm2`
- `alarm3`
- `alarm4`
- `alarm5`
- `alarm6`
- `alarm7`
- `alarm8`
- `alarm9`
- `bicycle`
- `car`
- `cash`
- `cat`
- `dog`
- `dog2`
- `energy`
- `knock-knock`
- `letter_email`
- `lose1`
- `lose2`
- `negative1`
- `negative2`
- `negative3`
- `negative4`
- `negative5`
- `notification`
- `notification2`
- `notification3`
- `notification4`
- `open_door`
- `positive1`
- `positive2`
- `positive3`
- `positive4`
- `positive5`
- `positive6`
- `statistic`
- `thunder`
- `water1`
- `water2`
- `win`
- `win2`
- `wind_short`
- `wind`

## Manual automatic import configuration

If you prefer not to use the Home Assistant account linking service, you
can set up the LaMetric application manually.

However, please note! At this point, it is easier to choose the "Enter manually"
option during the integration setup; this also avoids the use of the account
linking service and doesn't need all the steps below either.

If you still want to set up your own LaMetric application for importing
your LaMetric devices, use the following steps:

1. Log in with your LaMetric device account to [developer.lametric.com](https://developer.lametric.com).
2. Click the Create button and choose [Notification](https://developer.lametric.com/applications/createsource) app.
3. Fill in the form. You can put almost anything in the fields, they just need to be populated:
  - App Name: Home Assistant 
  - Description: Home Assistant
  - Redirect URI: `https://my.home-assistant.io/redirect/oauth`
  - Privacy Policy: `http://localhost/`
  - Check the "basic" and "read_devices" permission boxes
  - Click Save
4. You should be directed to your [Notification Apps list](https://developer.lametric.com/applications/sources),
   click on "Home Assistant", copy your client ID and Client Secret.

You may then add the credentials to [Application Credentials](/integrations/application_credentials/) and then setup the integration.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

## Troubleshooting

### The brightness doesn't go to 100%

When the LaMetric is powered by a USB port on a computer, the brightness is limited.
To get the full brightness, use a proper USB charger.
