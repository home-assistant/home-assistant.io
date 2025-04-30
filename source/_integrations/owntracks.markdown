---
title: OwnTracks
description: Instructions on how to use OwnTracks to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Push
ha_release: 0.7.4
ha_config_flow: true
ha_domain: owntracks
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

[OwnTracks](https://owntracks.org/) is a free and open source application for iOS and Android that allows you to track your location and send it directly to Home Assistant. OwnTracks can be set up via  **{% my integrations title="Settings > Devices & services" %}**.

By default, the integration listens for incoming messages from OwnTracks via HTTP. If Home Assistant is configured to use MQTT instead, it listens for MQTT messages. When a location is submitted via HTTP, Home Assistant returns all [Persons](/integrations/person/)' last known locations. Their location will be displayed within the OwnTracks app.

## Configuration

1. To set up OwnTracks in Home Assistant, go to **{% my integrations title="Settings > Devices & services" %}**.
2. Add the **OwnTracks** integration.
   - This will give you the **Webhook** URL as well as the **Encryption key** to use during mobile device configuration (below).

### Configuring the app - Android

1. Install the [OwnTracks](https://play.google.com/store/apps/details?id=org.owntracks.android) application for Android.
   - If you need a version of OwnTracks without Google Play Services, the "OSS" flavour is available [here](https://github.com/owntracks/android/releases).

2. In the app, open the sidebar and select **Preferences**, then **Connection**. 
3. Change the following settings:

   - **Mode**: HTTP
   - **Host**: `<URL given to you when setting up the integration>`
   - **Identification**:
     - **Username**: `<Username>`: You can make one up for OwnTracks.
     - **Password**: Can be left blank.
     - **Device ID**: `<Device name>`: Something that helps you remember which of your devices is used for OwnTracks.
     - **Tracker ID**: `<xx>` Two character tracker ID. (can be left blank)

4. Your tracker device will be known in Home Assistant as `<Username>_<Device name>`. If you entered a Tracker ID, the `tid` attribute will be set to that ID.

### Configuring the app - iOS

1. [Install the OwnTracks application for iOS.](https://itunes.apple.com/us/app/owntracks/id692424691?mt=8)
2. In the OwnTracks app, tap the (i) in the top left and select **Settings**. 
3. Change the following settings:

   - **Mode**: HTTP
   - **URL**: `<URL given to you when setting up the integration>`
   - Turn on authentication
   - **User ID**: `<Your name>`. You can make one up for OwnTracks.

## Advanced configuration

OwnTracks allows the user to set advanced configuration by adding a section to your {% term "`configuration.yaml`" %}.

```yaml
# Example configuration.yaml entry
owntracks:
```

{% configuration %}
max_gps_accuracy:
  description: Sometimes OwnTracks can report GPS location with a very low accuracy (few kilometers). That can trigger false zoning in your Home Assistant installation. With the parameter, you can filter these GPS reports. The number has to be in meters. For example, if you put 200, only GPS reports with an accuracy of 200 meters will be takes in account.
  required: false
  type: integer
waypoints:
  description: "OwnTracks users can define [waypoints](https://owntracks.org/booklet/features/waypoints/) (a.k.a regions) which are similar in spirit to Home Assistant zones. If this configuration variable is `true`, the OwnTracks users who are listed in the `waypoint_whitelist` can export waypoints from the device. Home Assistant will import these waypoints as zone definitions."
  required: false
  default: true
  type: boolean
waypoint_whitelist:
  description: "A list of usernames (as defined for [OwnTracks](/integrations/owntracks)) who can export their waypoints from OwnTracks to Home Assistant. This would be the `username` portion of the Base Topic Name, (e.g., owntracks/username/iPhone)."
  required: false
  default: All users who are connected to Home Assistant via OwnTracks.
  type: list
secret:
  description: "[Payload encryption key](https://owntracks.org/booklet/features/encrypt/). This is usable when communicating with a third-party untrusted server or a public server (where anybody can subscribe to any topic). By default, the payload is assumed to be unencrypted (although the communication between Home Assistant and the server might still be encrypted). This feature requires the `libsodium` library to be present."
  required: false
  type: string
mqtt_topic:
  description: The topic to subscribe for OwnTracks updates on your MQTT instance.
  required: false
  default: owntracks/#
  type: string
events_only:
  description: Home Assistant will ignore all location updates and rely solely on geofence enter/leave events.
  required: false
  type: boolean
  default: false
region_mapping:
  description: "Dictionary to remap names of regions as configured in the OwnTracks app to Home Assistant zones. Use this if you have multiple homes or Home Assistant instances and want to map a different label to 'home'. `key: value` maps OwnTracks region `key` to Home Assistant zone `value`."
  required: false
  type: list
{% endconfiguration %}

A full sample configuration for the `owntracks` platform is shown below:

```yaml
# Example configuration.yaml entry
owntracks:
  max_gps_accuracy: 200
  waypoints: true
  mqtt_topic: "owntracks/#"
  events_only: true
  waypoint_whitelist:
    - jon
    - ram
  region_mapping:
    cabin: home
    office: work
```

## Using OwnTracks regions

OwnTracks can track regions, and send region entry and exit information to Home Assistant. To do this, set up a region in the OwnTracks app. Make sure to use the same name for the region in your Home Assistant Zone. When adding the coordinates for your region, note that the unit used for **Radius** in OwnTracks is *meter*. For more information, refer to the [OwnTracks documentation](https://owntracks.org/booklet/guide/waypoints/).

Home Assistant uses the enter and leave messages to set your zone location. Your location will be set to the center of zone when you enter. Location updates from OwnTracks will be ignored while you are inside a zone.

When you exit a zone, Home Assistant will start using location updates to track you again. To make sure that Home Assistant correctly exits a zone (which it calculates based on your GPS coordinates), you may want to set your Zone radius in HA to be slightly smaller that the OwnTracks region radius.

## Using OwnTracks regions - forcing OwnTracks to update using iBeaconsOwntracks

{% note %}
OwnTracks v2.0.0 removes support for iBeacons on Android.
{% endnote %}

When run in the usual *significant changes mode* (which is kind to your phone battery), OwnTracks sometimes doesn't update your location as quickly as you'd like when you arrive at a zone. This can be annoying if you want to trigger an automation when you get home. You can improve the situation using iBeacons.

iBeacons are simple Bluetooth devices that send out an "I'm here" message. They are supported by iOS and some Android devices. OwnTracks explain more [here](https://owntracks.org/booklet/guide/beacons/).

When you enter an iBeacon region, OwnTracks will send a `region enter` message to HA as described above. So if you want to have an event triggered when you arrive home, you can put an iBeacon outside your front door. If you set up an OwnTracks iBeacon region called `home` then getting close to the beacon will trigger an update to HA that will set your zone to be `home`.

When you exit an iBeacon region HA will switch back to using GPS to determine your location. Depending on the size of your zone, and the accuracy of your GPS location this may change your HA zone.

Sometimes OwnTracks will lose connection with an iBeacon for a few seconds. If you name your beacon starting with `-` OwnTracks will wait longer before deciding it has exited the beacon zone. HA will ignore the `-` when it matches the OwnTracks region with Zones. So if you call your OwnTracks region `-home` then HA will recognize it as `home`, but you will have a more stable iBeacon connection.

## Using OwnTracks iBeacons to track devices

iBeacons don't need to be stationary. You could put one on your key ring, or in your car.

When your phone sees a mobile iBeacon that it knows about, it will tell HA the location of that iBeacon. If your phone moves while you are connected to the iBeacon, HA will update the location of the iBeacon. But when your phone loses the connection, HA will stop updating the iBeacon location.

To use mobile iBeacons with HA, you just set up a region that doesn't match your Zone names. If HA sees an entry event for an iBeacon region that doesn't match a Zone name (say `keys`) - it will start tracking it, calling the device `device_tracker.beacon_keys`).

This allows you to write zone automations for devices that can't track themselves (for example *alert me if I leave the house and my keys are still at home*). Another example would be *open the gates if my car arrives home*.

## Using mobile and fixed iBeacons together

You can use iBeacons of both types together, so if you have a Zone `drive` with an iBeacon region called `-drive` and you arrive home with a mobile iBeacon called `-car`, then `device_tracker.beacon_car` will be set to a state of `drive`.

## Importing OwnTracks waypoints as zones

By default, any OwnTracks user connected to Home Assistant can export their waypoint definitions (from the *Export - Export to Endpoint* menu item) which will then be translated to zone definitions in Home Assistant. The zones will be named `<user>-<device> - <region name>:<region uuid>`. This functionality can be controlled in 2 ways:

1. The configuration variable `waypoints` can be set to `false` which will disable importing waypoints for all users.
2. The configuration variable `waypoint_whitelist` can contain a list of users who are allowed to import waypoints.
