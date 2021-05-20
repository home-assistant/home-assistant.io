---
title: Traccar
description: Instructions how to use Traccar GPS tracker to track devices in Home Assistant.
ha_release: 0.83
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar
ha_platforms:
  - device_tracker
---

`Traccar` uses GPS for tracking and has support for over 1500 different types of devices. One option is to track the [Traccar Client](https://www.traccar.org/client/) app on a smartphone via `webhook`. The other option is to connect to an existing [Traccar Server](https://www.traccar.org/server/) installation which is also available as Home Assistant add-on.

## Traccar Client

To configure Traccar Client, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration. This URL has to be set in the Traccar app.

## Traccar Server

To integrate Traccar Server in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: traccar
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
host:
  description: The DNS name or IP Address of the server running Traccar.
  required: true
  type: string
username:
  description: The username for the Traccar server.
  required: true
  type: string
password:
  description: The password for your given account on the Traccar server.
  required: true
  type: string
host:
  description: The DNS name or IP Address of the server running Traccar.
  required: true
  type: string
port:
  description: The port of your Traccar server.
  required: false
  default: 8082
  type: integer
ssl:
  description: Use HTTPS to connect to Traccar server. *NOTE* A host *cannot* be an IP address when this option is enabled.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
max_accuracy:
  description: Filter positions with higher accuracy than specified.
  required: false
  type: integer
  default: 0
skip_accuracy_filter_on:
  description: Skip filter position by "max_accuracy filter" if any of specified attributes are pressent on the traccar message.
  required: false
  type: list
monitored_conditions:
  description: Additional traccar computed attributes or device-related attributes to include in the scan.
  required: false
  type: list
event:
  description: "Traccar events to include in the scan and fire within Home Assistant. *NOTE* For more info regarding Traccar events please refer to Traccar's documentation: https://www.traccar.org/documentation/events/."
  required: false
  type: list
  keys:
    device_moving:
      description: "**deviceMoving** event."
      required: false
      type: string
    command_result:
      description: "**commandResult** event."
      required: false
      type: string
    device_fuel_drop:
      description: "**deviceFuelDrop** event."
      required: false
      type: string
    geofence_enter:
      description: "**geofenceEnter** event."
      required: false
      type: string
    device_offline:
      description: "**deviceOffline** event."
      required: false
      type: string
    driver_changed:
      description: "**driverChanged** event."
      required: false
      type: string
    geofence_exit:
      description: "**geofenceExit** event."
      required: false
      type: string
    device_overspeed:
      description: "**deviceOverspeed** event."
      required: false
      type: string
    device_online:
      description: "**deviceOnline** event."
      required: false
      type: string
    device_stopped:
      description: "**deviceStopped** event"
      required: false
      type: string
    maintenance:
      description: "**maintenance** event."
      required: false
      type: string
    alarm:
      description: "**alarm** event."
      required: false
      type: string
    text_message:
      description: "**textMessage** event."
      required: false
      type: string
    device_unknown:
      description: "**deviceUnknown** event."
      required: false
      type: string
    ignition_off:
      description: "**ignitionOff** event."
      required: false
      type: string
    ignition_on:
      description: "**ignitionOff** event."
      required: false
      type: string
    all_events:
      description: "**allEvents** catchall for all event types."
      required: false
      type: string
{% endconfiguration %}

The parameter `monitored_conditions` allows you to track non standard attributes from the traccar platform and use them in your Home Assistant. For example if you need to monitor the state of the non standard attribute `alarm` and a custom computed attribute `mycomputedattribute` just fill the configuration with:

```yaml
device_tracker:
  - platform: traccar
    ...
    monitored_conditions: ['alarm', 'mycomputedattribute']
```

The parameter `event` allows you to import events from the traccar platform (https://www.traccar.org/documentation/events/) and fire them in your Home Assistant. It accepts a list of events to be monitored and imported and each event must be listed in lowercase snakecase. The events will be fired with the same event name defined in the aforementioned list preceded by the prefix `traccar_`. For example if you need to import the Traccar events `deviceOverspeed` and `deviceFuelDrop` in Home Assistant, you need to fill the `event` parameter with:

```yaml
device_tracker:
  - platform: traccar
    ...
    event: ['device_overspeed', 'device_fuel_drop']
```
and as soon as Home Assistant receives those events from the platform, they will be fired as `traccar_device_overspeed` and `traccar_device_fuel_drop`.
*NOTE* Specify `all_events` if you want to import all events.
