---
title: LaMetric
description: Instructions on how to integrate LaMetric TIME with Home Assistant.
ha_category:
  - Button
  - Notifications
  - Number
ha_iot_class: Local Polling
ha_release: 0.49
ha_codeowners:
  - '@robbiet480'
  - '@frenck'
ha_domain: lametric
ha_platforms:
  - button
  - notify
  - number
ha_integration_type: integration
ha_config_flow: true
ha_ssdp: true
ha_dhcp: true
---

[LaMetric TIME](https://lametric.com/) is a smart clock that can be used to access applications, listen to web radio and display notifications.

{% include integrations/config_flow.md %}

## Notifications

You can send notifications to your LaMetric device using
the [Notifications](/integrations/notify) integration.

Each LaMetric device added to your Home Assistant will have its own
`notify.` service. The service name matches the name of your device
as shown in your LaMetric account. For example, if you have a device
called "My LaMetric", the service would become `notify.my_lametric`.

The notification service call against an LaMetric device can take the
following, additional, optional parameters:

{% configuration %}
icon:
  description: "An icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
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
  trigger:
    platform: state
    entity_id: device_tracker.tom_mobile
    from: "not_home"
    to: "school"
  action:
    service: notify.my_lametric
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
notify service calls:

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
  * App Name: Home Assistant 
  * Description: Home Assistant
  * Redirect URI: `https://my.home-assistant.io/redirect/oauth`
  * Privacy Policy: `http://localhost/`
  * Check the "basic" and "read_devices" permission boxes
  * Click Save
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
