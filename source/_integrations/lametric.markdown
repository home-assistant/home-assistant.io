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
  - Update
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
  - update
ha_integration_type: device
ha_config_flow: true
ha_ssdp: true
ha_dhcp: true
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **LaMetric** {% term integration %} lets you integrate your [LaMetric TIME](https://lametric.com/) smart clock with Home Assistant, so you can display notifications, charts, and other visual updates on the device.

Use cases for this integration include:

- Sending notifications to the clock when events happen in your home, such as a doorbell ring, a delivery arrival, or a washing machine finishing.
- Displaying a chart of recent energy usage, temperature, or any other numeric value from your home.
- Controlling the device's brightness, volume, and Bluetooth state from automations.
- Cycling through the clock's apps or dismissing notifications without touching the device.

## Supported devices

The following LaMetric devices are known to be supported:

- [LaMetric TIME](https://lametric.com/)

## Prerequisites

Your LaMetric device must be powered on and connected to the same local network as Home Assistant. In most cases, the device is discovered automatically.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your LaMetric device. Only required when adding the device manually."
API key:
  description: "The device API key, which you can find in the LaMetric developer portal. Only required when adding the device manually."
{% endconfiguration_basic %}

During setup, you can choose between two methods:

- **Automatic**: Sign in with your LaMetric account to let Home Assistant fetch your devices and their credentials for you.
- **Manual**: Enter the device's hostname or IP address and API key. This method does not require a LaMetric account.

## Supported functionality

### Buttons

- **Next app**
  - **Description**: Switch to the next app displayed on the LaMetric device.
  - **Entity category**: Configuration
- **Previous app**
  - **Description**: Switch to the previous app displayed on the LaMetric device.
  - **Entity category**: Configuration
- **Dismiss current notification**
  - **Description**: Dismiss the currently shown notification.
  - **Entity category**: Configuration
- **Dismiss all notifications**
  - **Description**: Dismiss all queued notifications.
  - **Entity category**: Configuration

### Numbers

- **Brightness**
  - **Description**: Control the brightness of the display in percent.
  - **Entity category**: Configuration
- **Volume**
  - **Description**: Control the volume of the device in percent.
  - **Entity category**: Configuration

### Selects

- **Brightness mode**
  - **Description**: Choose whether the brightness is set manually or automatically based on ambient light.
  - **Entity category**: Configuration

### Sensors

- **Wi-Fi signal**
  - **Description**: The current Wi-Fi signal strength in percent.
  - **Entity category**: Diagnostic

### Switches

- **Bluetooth**
  - **Description**: Toggle the device's Bluetooth radio on or off.
  - **Entity category**: Configuration

### Update

The integration provides an update entity that shows whether a firmware update is available for your LaMetric device.

## Actions

The LaMetric integration provides actions to interact with your LaMetric device(s). These actions can be used, for example, in automations.

### Action: Chart

The {% my developer_call_service service="lametric.chart" title="`lametric.chart`" %} action displays a chart on your LaMetric device.

{% my developer_call_service badge service="lametric.chart" %}

{% configuration "lametric.chart" %}
device_id:
  description: The ID of the device to send the message to.
  required: true
  type: string
data:
  description: The data points in the chart, as a list of numbers. For example, `[1, 2, 3, 2, 1]`.
  required: true
  type: list
cycles:
  description: "Defines how long the notification is displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of the notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "The sound to play with the notification. For the list of supported sounds, see [Notification sounds](#notification-sounds)."
  required: false
  type: string
{% endconfiguration %}

### Action: Message

The {% my developer_call_service service="lametric.message" title="`lametric.message`" %} action sends a message to your LaMetric device. These messages can be enriched with icons and sounds.

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
  description: "The ID of an icon or animation. The list of all available icons is at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification is displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of the notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "The sound to play with the notification. For the list of supported sounds, see [Notification sounds](#notification-sounds)."
  required: false
  type: string
{% endconfiguration %}

## Notifications

You can send notifications to your LaMetric device using the [Notifications](/integrations/notify) integration.

Each LaMetric device added to Home Assistant has its own `notify.` action. The action name matches the name of your device as shown in your LaMetric account. For example, if you have a device called "My LaMetric", the action becomes `notify.my_lametric`.

The notification action against a LaMetric device accepts the following additional optional parameters:

{% configuration "notification" %}
icon:
  description: "The ID of an icon or animation. The list of all available icons is at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification is displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: warning
icon_type:
  description: "Defines the nature of the notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "The sound to play with the notification. For the list of supported sounds, see [Notification sounds](#notification-sounds)."
  required: false
  type: string
  default: none
{% endconfiguration %}

## Data updates

The integration polls the LaMetric device every 30 seconds over the local network for the latest state.

## Examples

### Notify on arrival

Send a notification to the LaMetric device when someone arrives at school, with a custom sound, icon, and priority:

```yaml
alias: "Send notification on arrival at school"
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

### Display a chart of recent temperature values

Send a chart with the last hour of temperature readings from a sensor:

```yaml
alias: "Show temperature chart on LaMetric"
triggers:
  - trigger: time_pattern
    minutes: "/10"
actions:
  - action: lametric.chart
    data:
      device_id: YOUR_DEVICE_ID
      data: [18, 19, 20, 21, 20, 19]
      priority: info
```

### Doorbell notification with sound

Play a sound and show a message on the LaMetric device when the doorbell is pressed:

```yaml
alias: "Doorbell notification"
triggers:
  - trigger: state
    entity_id: binary_sensor.doorbell
    to: "on"
actions:
  - action: notify.my_lametric
    data:
      message: "Ding dong!"
      data:
        sound: "knock-knock"
        icon: "a13710"
        priority: critical
        icon_type: alert
```

## Notification sounds

The following notification sounds can be used with the `sound` parameter on the notify and action calls:

- `alarm1`
- `alarm2`
- `alarm3`
- `alarm4`
- `alarm5`
- `alarm6`
- `alarm7`
- `alarm8`
- `alarm9`
- `alarm10`
- `alarm11`
- `alarm12`
- `alarm13`
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
- `wind`
- `wind_short`

## Known limitations

- The integration communicates with the LaMetric device over the local network. If the device is not reachable, its entities become unavailable.
- When the LaMetric device is powered through a USB port on a computer, the display brightness is limited. For full brightness, use a proper USB charger.
- The list of supported sounds is fixed by the device firmware. Adding custom sounds is not possible.

## Troubleshooting

### The brightness does not go to 100%

When the LaMetric is powered through a USB port on a computer, the brightness is limited. To get the full brightness, use a proper USB charger.

### Cannot connect during manual setup

If you see a "Cannot connect" error when adding the device manually, verify that:

1. The device is powered on and connected to your network.
2. The hostname or IP address you entered is correct.
3. The API key matches the one shown in the LaMetric developer portal.

## Manual automatic import configuration

If you prefer not to use the Home Assistant account linking service, you can set up the LaMetric application manually.

However, at this point, it is easier to choose the **Enter manually** option during the integration setup. This avoids the use of the account linking service and does not require any of the steps below.

If you still want to set up your own LaMetric application for importing your LaMetric devices, use the following steps:

1. Sign in with your LaMetric account at [developer.lametric.com](https://developer.lametric.com).
2. Select **Create** and choose [Notification](https://developer.lametric.com/applications/createsource) app.
3. Fill in the form. You can put almost anything in the fields, they just need to be populated:
    - **App Name**: Home Assistant
    - **Description**: Home Assistant
    - **Redirect URI**: `https://my.home-assistant.io/redirect/oauth`
    - **Privacy Policy**: `http://localhost/`
    - Check the **basic** and **read_devices** permission boxes.
    - Select **Save**.
4. You will be directed to your [Notification Apps list](https://developer.lametric.com/applications/sources). Select **Home Assistant** and copy your Client ID and Client Secret.

You can then add the credentials to [Application Credentials](/integrations/application_credentials/) and set up the integration.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation, you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration and authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
