---
title: Person
description: Instructions on how to set up people tracking within Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.88
ha_quality_scale: internal
ha_domain: person
ha_iot_class: Calculated
---

The `person` integration allows connecting [device tracker](/integrations/device_tracker/) entities to one or more person entities. The state updates of a connected device tracker will set the state of the person. When multiple device trackers are used, the state of person will be determined in this order:

1. If there are stationary trackers (non-GPS trackers, e.g., a router or Bluetooth device tracker) presenting the state `home`, the tracker most recently updated will be used.
2. If there are trackers of type `gps`, then the most recently updated tracker will be used.
3. Otherwise, the latest tracker with state `not_home` will be used.

Let's say, for example, that you have three trackers: `tracker_gps`, `tracker_router` and `tracker_ble`.

1. You're at home, all three devices show state `home` - the state of your Person entity will be `home` with source `tracker_router` or `tracker_ble`, whichever was most recently updated.
2. You just left home. `tracker_gps` shows state `not_home`, but the other two trackers show state `home` (they may not have yet updated due to their `consider_home` setting see [device_tracker](/integrations/device_tracker/#configuring-a-device_tracker-platform)). Since the stationary trackers have priority, you are considered `home`.
3. After some time, both stationary trackers show state `not_home`. Now your Person entity has state 'not_home' with source `tracker_gps`.
4. While you are away from home, your Home Assistant instance is restarted. Until the `tracker_gps` receives an update, your status will be determined by the stationary trackers, since they will have the most recent update after a restart. Obviously, the state will be `not_home`.
5. Then you're going into a zone you have defined as `zone1`, `tracker_gps` sends an update, and now your state is `zone1` with source `tracker_gps`.
6. You've returned home and your mobile device has connected to the router, but `tracker_gps` hasn't updated yet. Your state will be `home` with source `tracker_router`.
7. After the `tracker_gps` update occurs, your state will still be `home` with source `tracker_router` or `tracker_ble`, whichever has the most recent update.

In short, when you're at home, your position is determined first by stationary trackers (if any) and then by GPS. When you're outside your home, your position is determined firstly by GPS and then by stationary trackers.

**Hint**: When you use multiple device trackers together, especially stationary and GPS trackers, it's advisable to set `consider_home` for stationary trackers as low as possible see [device_tracker](/integrations/device_tracker/#configuring-a-device_tracker-platform)).

You can manage persons via the UI from the person page inside the configuration panel or via `YAML` in your `configuration.yaml` file.

## Configuring the `person` integration via the Home Assistant configuration panel

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
person:
```

## Configuring the `person` integration via YAML

If you prefer YAML, you can also configure your persons via the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
```

{% configuration %}
  id:
    description: A unique id of the person.
    required: true
    type: string
  name:
    description: The name of the person.
    required: true
    type: string
  user_id:
    description: The user ID of the Home Assistant user account for the person. `user_id` (aka `ID`) of users can be inspected in the "Users"/"Manage users" screen in the configuration panel.
    required: false
    type: string
  device_trackers:
    description: A list of device tracker entity IDs to track. These will represent the state of the person.
    required: false
    type: [string, list]
{% endconfiguration %}

An extended example would look like the following sample:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
  - name: Stacey
    id: stacey12345
    user_id: 12345678912345678912345678912345
    device_trackers:
      - device_tracker.stacey
      - device_tracker.beacon
```

If you change the YAML, you can reload it by calling the `person.reload` service.

### Customizing the picture for a person

You can easily upload a picture in the frontend. Simply click on a person, select or drop an image in the input field, and then crop it. 

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rOlRnwaaT7Y" frameborder="0" allowfullscreen></iframe>
</div>


You can also do this using YAML. By following the instructions on the [customizing entities](/docs/configuration/customizing-devices#entity_picture) page, you can customize the picture used for a person entity in the `customize:` section of your configuration. For example:

```yaml
customize:
  person.ada:
    entity_picture: "/local/ada.jpg"
```

See the documentation about [hosting files](/integrations/http/#hosting-files) for more information about the `www` folder.
