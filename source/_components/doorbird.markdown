---
layout: page
title: "DoorBird"
description: "Instructions on how to integrate your DoorBird video doorbell with Home Assistant."
date: 2017-08-06 11:30
sidebar: true
comments: false
sharing: true
footer: true
logo: doorbird.png
ha_category: Hub
ha_release: "0.54"
ha_iot_class: "Local Push"
---

The `doorbird` implementation allows you to integrate your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

To connect your device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
doorbird:
  devices:
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      hass_url_override: HASS_URL
      name: Front Door
    - host: DOORBIRD_IP_OR_HOSTNAME
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
      name: Driveway Gate
      monitored_conditions:
        - doorbell
        - motion
```

{% configuration %}
devices:
  description: List of doorbird devices.
  required: true
  type: list
  keys:
    host:
      description: The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
      required: true
      type: string
    username:
      description: The username of a non-administrator user account on the device.
      required: true
      type: string
    password:
      description: The password for the user specified.
      required: true
      type: string
    name:
      description: Custom name for this device.
      required: false
      type: string
    hass_url_override:
      description: If your DoorBird cannot connect to the machine running Home Assistant because you are using dynamic DNS or some other HTTP configuration (such as HTTPS), specify the LAN IP of the machine here to force a LAN connection.
      required: false
      type: string
    monitored_conditions:
      description: Monitor motion and/or doorbell events for this device.
      required: false
      type: string
      keys:
        doorbell:
          description: Monitor doorbell events
        motion:
          description: Monitor motion events (Motion monitoring must be enabled on the doorstation via DoorBird app)

{% endconfiguration %}

The configuration above is also used by the following components:
- [Camera](../camera.doorbird) - View live and historical event based images
- [Switch](../switch.doorbird) - Enable control of relays and camera night vision

## {% linkable_title Motion and Doorbell Events %}

Home Assistant will fire an event any time a `monitored_condition` happens on a doorstation.  Event names are created using the format `doorbird_{station}_{event}` (Examples: `doorbird_side_entry_button`, `doorbird_side_entry_motion`).  You can verify the assigned event names in the Home Assistant log file.

<p class="note info">
Home Assistant will register the monitored conditions with the device as schedule entries that correspond to favorites on startup. If you remove monitored conditions from your configuration, Home Assistant will attempt to remove these items from the device. However, in some cases, such as if the IP address of the machine running Home Assistant changes or if the device is renamed in your configuration, this will not work correctly and some data will be left in device storage.
<br><br>
This should not cause any problems, but if you would like to remove it, open a new browser window and navigate to `{Home Assistant URL}/api/doorbird/clear/{DoorBird name}`. Replace `{Home Assistant URL}` with the full path to your running instance, such as `http://localhost:8123`. Replace `{DoorBird name}` with the name specified in your configuration for the device you would like to clear, or how it appears in the Home Assistant UI if you have not specified one, such as `DoorBird 1`. Then use the mobile app to reschedule push notifications.
<br><br>
Please note that clearing device registrations will prevent the device from sending pushes to Home Assistant until you restart your instance with the component enabled. It could also affect other third-party applications you may use with your DoorBird device. It will not break the official mobile app in any way, so mobile push notifications will still work.
</p>

### {% linkable_title Automation Example %}
```yaml
- alias: Doorbird Ring
  trigger:
    platform: event
    event_type: doorbird_side_entry_button
  action:
    service: light.turn_on
      entity_id: light.side_entry_porch
```