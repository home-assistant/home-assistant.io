---
title: Person
description: Instructions on how to set up people tracking within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.88
ha_quality_scale: internal
ha_domain: person
ha_iot_class: Calculated
ha_integration_type: system
---

The **Person** {% term integration %} allows connecting [device tracker](/integrations/device_tracker/) entities to one or more person entities. The state updates of a connected device tracker set the state of the person. When you use multiple device trackers, the state of the person is determined in this order:

1. If one or more [connection trackers](/integrations/device_tracker/#connection-trackers) are connected, the tracker most recently updated will be used.
2. If there are [position trackers](/integrations/device_tracker/#position-trackers), the most recently updated tracker will be used.
3. Otherwise, the latest tracker with state `not_home` will be used.

Let's say, for example, that you have three trackers: `tracker_gps`, `tracker_router`, and `tracker_ble`.

1. You're at home, and all three devices show state `home`. The state of your Person entity will be `home` with source `tracker_router` or `tracker_ble`, whichever was most recently updated.
2. You just left home. `tracker_gps` shows state `not_home`, but the other two trackers show state `home` (they may not have yet updated due to their `consider_home` setting, see [device_tracker](/integrations/device_tracker/)). Since the stationary trackers have priority, you are considered `home`.
3. After some time, both stationary trackers show state `not_home`. Now your Person entity has state `not_home` with source `tracker_gps`.
4. While you are away from home, your Home Assistant instance is restarted. Until the `tracker_gps` receives an update, your status will be determined by the stationary trackers, since they will have the most recent update after a restart. The state will be `not_home`.
5. Then you're going into a zone you have defined as `zone1`, `tracker_gps` sends an update, and now your state is `zone1` with source `tracker_gps`.
6. You've returned home and your mobile device has connected to the router, but `tracker_gps` hasn't updated yet. Your state will be `home` with source `tracker_router`.
7. After the `tracker_gps` update occurs, your state will still be `home` with source `tracker_router` or `tracker_ble`, whichever has the most recent update.

In short, when you're at home, your position is determined first by connection trackers (if any) and then by position trackers. When you're outside your home, your position is determined first by position trackers and then by connection trackers.

In addition to the state, the person will have the state attributes `latitude`, `longitude`, `gps_accuracy` and `in_zones` copied from the source device tracker.

You can manage persons {% my people title="via the UI from the person page inside the configuration panel" %} or via YAML in your {% term "`configuration.yaml`" %} file.

## Adding a person to Home Assistant

If you have administrator rights, you can add other persons to Home Assistant and create user accounts for them. Depending on the rights you give them, they can then use Home Assistant on their own devices, have their own dashboards, and be included in automations.

1. Go to {% my people title="**Settings** > **People**" %} and select **Add person**.
2. Enter their **Name**.
3. Add an image if you like.
4. Under **Allow login**, select whether they should be able to sign in.
   - If they cannot sign in, they do not get a user account and cannot do much with Home Assistant.
   - They cannot have their own dashboard, for example.
   - But they can still be used for device tracking, show up on a map, and be included in automations.
5. If they are able to sign in, fill in the user information.
   - Check if the username is correct. Home Assistant suggests one based on the person name, but the two do not have to be identical.
     - The username must be lowercase and contain no spaces.
     - The username is required to sign in.
     - The person name is the name displayed in the UI.
   - Enter a password and store it in a safe location.
   - Define if they should have **Local access only**.
     - If this is enabled, they won't have access to Home Assistant when they are outside your network, for example, from their phone.
   - Define if they should have **Administrator** rights.
   - Select **Create**.
6. If you have already set up devices for [presence detection](/getting-started/presence-detection/), select the devices that belong to this person.

### Customizing the picture for a person

To upload a picture in the frontend, open a person's page, select an image file or drag and drop one into the input field, and then crop it.

<lite-youtube videoid="rOlRnwaaT7Y" videotitle="Changing a profile picture" posterquality="maxresdefault"></lite-youtube>

See the documentation about [hosting files](/integrations/http/#hosting-files) for more information about the `www` folder.

## Configuring the `person` integration via the Home Assistant configuration panel

This integration is enabled by default, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, enable it manually by adding the following to your configuration:

```yaml
person:
```

## Configuring the `person` integration via YAML

If you prefer YAML, you can also configure your persons via the {% term "`configuration.yaml`" %} file:

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
    description: A unique ID for the person.
    required: true
    type: string
  name:
    description: The name of the person.
    required: true
    type: string
  user_id:
    description: The user ID of the Home Assistant user account for the person. You can find the `user_id` (also shown as `ID`) under **Settings** > **People**, on the **Users** tab.
    required: false
    type: string
  device_trackers:
    description: A list of device tracker entity IDs to track. These will represent the state of the person.
    required: false
    type: [string, list]
{% endconfiguration %}

Here's an extended example:

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

If you change the YAML, you can reload it by calling the `person.reload` action.

{% include integrations/actions.md %}
