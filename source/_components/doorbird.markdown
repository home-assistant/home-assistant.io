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
ha_iot_class: "Local Polling"
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

Device Configuration Variables:

- **host** (*Required*): The LAN IP address or hostname of your device. You can find this by going to the [DoorBird Online check](http://www.doorbird.com/checkonline) and entering the information from the paper that was included in the box.
- **username** (*Required*): The username of a non-administrator user account on the device.
- **password** (*Required*): The password for the user specified.
- **name** (*Optional*): Custom name for this device.
- **hass_url_override** (*Optional*): If your DoorBird cannot connect to the machine running Home Assistant because you are using dynamic DNS or some other HTTP configuration (such as HTTPS), specify the LAN IP of the machine here to force a LAN connection.
- **monitored_conditions** (*Optional*): Monitor motion and/or doorbell events for this device.

The configuration above is also used by the following components:
- [Camera](../camera.doorbird) - View live and historical event based images
- [Switch](../switch.doorbird) - Enable control of relays and camera night vision

## Motion and Doorbell Events

Home Assistant will fire an event any time a `monitored_condition` happens on a doorstation.  Event names are created using the format `doorbird_{station}_{event}` (Examples: `doorbird_side_entry_button`, `doorbird_side_entry_motion`).  You can verify the assigned event names in the Home Assistant log file.

<p class="note warning">
Enabling any monitored condition will delete all registered notification services on the doorstation every time Home Assistant starts. This will not affect notifications delivered by the DoorBird mobile app.
</p>

### Automation Example
```yaml
- alias: Doorbird Ring
  trigger:
    platform: event
    event_type: doorbird_side_entry_button
  action:
    service: light.turn_on
      entity_id: light.side_entry_porch
```