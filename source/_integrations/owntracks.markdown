---
title: OwnTracks
description: Instructions on how to use Owntracks to track devices in Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Push
ha_release: 0.7.4
ha_config_flow: true
ha_domain: owntracks
ha_platforms:
  - device_tracker
---

[OwnTracks](https://owntracks.org/) (and its Android fork [NextTracks](https://codeberg.org/nexttracks/android)) is a free and open source application for iOS and Android that allow you to track your location and send it directly to Home Assistant. It can be set up via the integrations panel in the configuration screen.

By default the integration will listen for incoming messages from OwnTracks via HTTP. It will also listen for MQTT messages if Home Assistant is configured to use MQTT. When a location is submitted via HTTP, Home Assistant will return all [Persons](/integrations/person/)' last known locations and they will be displayed within the OwnTracks app.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UieAQ8sC6GY" frameborder="0" allowfullscreen></iframe>
</div>

## Configuration

To configure OwnTracks, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration (below).

### Configuring the app - Android

Install [OwnTracks](https://play.google.com/store/apps/details?id=org.owntracks.android) or [NextTracks](https://codeberg.org/nexttracks/android/releases) (Available from [F-Droid](https://f-droid.org/packages/org.nexttracks.android)) application for Android.

In the app, open the sidebar and click on preferences, then on the connection. Change the following settings:

 - Mode: Private HTTP
 - Host: `<URL given to you when setting up the integration>`
 - Identification:
   - Username: `<Username>`
   - Password: Can be left blank.
   - Device ID: `<Device name>`
   - Tracker ID: `<xx>` Two character tracker ID. (can be left blank)

Your tracker device will be known in Home Assistant as `<Username>_<Device name>`. If you entered a Tracker ID the tid attribute will  be set to that ID.

### Configuring the app - iOS

[Install the OwnTracks application for iOS.](https://itunes.apple.com/us/app/owntracks/id692424691?mt=8)

In the OwnTracks app, tap the (i) in the top left and click on settings. Change the following settings:

 - Mode: HTTP
 - URL: `<URL given to you when setting up the integration>`
 - Turn on authentication
 - User ID: `<Your name>`

## Advanced configuration

OwnTracks allows the user to set advanced configuration by adding a section to your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
owntracks:
```

{% configuration %}
max_gps_accuracy:
  description: Sometimes Owntracks can report GPS location with a very low accuracy (few kilometers). That can trigger false zoning in your Home Assistant installation. With the parameter, you can filter these GPS reports. The number has to be in meter. For example, if you put 200 only GPS report with an accuracy under 200 will be take in account.
  required: false
  type: integer
waypoints:
  description: "Owntracks users can define [waypoints](https://owntracks.org/booklet/features/waypoints/) (a.k.a regions) which are similar in spirit to Home Assistant zones. If this configuration variable is `true`, the Owntracks users who are in `waypoint_whitelist` can export waypoints from the device and Home Assistant will import them as zone definitions."
  required: false
  default: true
  type: boolean
waypoint_whitelist:
  description: "A list of user names (as defined for [Owntracks](/integrations/owntracks)) who can export their waypoints from Owntracks to Home Assistant. This would be the `username` portion of the Base Topic Name, (e.g., owntracks/**username**/iPhone)"
  required: false
  default: All users who are connected to Home Assistant via Owntracks.
  type: list
secret:
  description: "[Payload encryption key](https://owntracks.org/booklet/features/encrypt/). This is usable when communicating with a third-party untrusted server or a public server (where anybody can subscribe to any topic). By default the payload is assumed to be unencrypted (although the communication between Home Assistant and the server might still be encrypted). This feature requires the `libsodium` library to be present."
  required: false
  type: string
mqtt_topic:
  description: The topic to subscribe for Owntracks updates on your MQTT instance.
  required: false
  default: owntracks/#
  type: string
events_only:
  description: Home Assistant will ignore all location updates and rely solely on geofence enter/leave events.
  required: false
  type: boolean
  default: false
region_mapping:
  description: "Dictionary to remap names of regions as configured in the Owntracks app to Home Assistant zones. Use this if you have multiple homes or Home Assistant instances and want to map a different label to 'home'. `key: value` maps Owntracks region `key` to Home Assistant zone `value`."
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

## Using Owntracks regions

Owntracks can track regions, and send region entry and exit information to Home Assistant. You set up a region in the Owntracks app which you should name the same as your Home Assistant Zone, and then make sure to turn on the `share` option for the region in the owntracks app. Please see the [owntracks documentation](https://owntracks.org/booklet/guide/waypoints/).

Home Assistant will use the enter and leave messages to set your zone location. Your location will be set to the center of zone when you enter. Location updates from OwnTracks will be ignored while you are inside a zone.

When you exit a zone, Home Assistant will start using location updates to track you again. To make sure that Home Assistant correctly exits a zone (which it calculates based on your GPS coordinates), you may want to set your Zone radius in HA to be slightly smaller that the Owntracks region radius.

## Using Owntracks regions - forcing Owntracks to update using iBeacons

<div class='note'>
Owntracks v2.0.0 removes support for iBeacons on Android.
</div>

When run in the usual *significant changes mode* (which is kind to your phone battery), Owntracks sometimes doesn't update your location as quickly as you'd like when you arrive at a zone. This can be annoying if you want to trigger an automation when you get home. You can improve the situation using iBeacons.

iBeacons are simple Bluetooth devices that send out an "I'm here" message. They are supported by iOS and some Android devices. Owntracks explain more [here](https://owntracks.org/booklet/guide/beacons/).

When you enter an iBeacon region, Owntracks will send a `region enter` message to HA as described above. So if you want to have an event triggered when you arrive home, you can put an iBeacon outside your front door. If you set up an OwnTracks iBeacon region called `home` then getting close to the beacon will trigger an update to HA that will set your zone to be `home`.

When you exit an iBeacon region HA will switch back to using GPS to determine your location. Depending on the size of your zone, and the accuracy of your GPS location this may change your HA zone.

Sometimes Owntracks will lose connection with an iBeacon for a few seconds. If you name your beacon starting with `-` Owntracks will wait longer before deciding it has exited the beacon zone. HA will ignore the `-` when it matches the Owntracks region with Zones. So if you call your Owntracks region `-home` then HA will recognize it as `home`, but you will have a more stable iBeacon connection.

## Using Owntracks iBeacons to track devices

iBeacons don't need to be stationary. You could put one on your key ring, or in your car.

When your phone sees a mobile iBeacon that it knows about, it will tell HA the location of that iBeacon. If your phone moves while you are connected to the iBeacon, HA will update the location of the iBeacon. But when your phone loses the connection, HA will stop updating the iBeacon location.

To use mobile iBeacons with HA, you just set up a region that doesn't match your Zone names. If HA sees an entry event for an iBeacon region that doesn't match a Zone name (say `keys`) - it will start tracking it, calling the device `device_tracker.beacon_keys`).

This allows you to write zone automations for devices that can't track themselves (for example *alert me if I leave the house and my keys are still at home*). Another example would be *open the gates if my car arrives home*.

## Using mobile and fixed iBeacons together

You can use iBeacons of both types together, so if you have a Zone `drive` with an iBeacon region called `-drive` and you arrive home with a mobile iBeacon called `-car`, then `device_tracker.beacon_car` will be set to a state of `drive`.

## Importing Owntracks waypoints as zones

By default, any Owntracks user connected to Home Assistant can export their waypoint definitions (from the *Export - Export to Endpoint* menu item) which will then be translated to zone definitions in Home Assistant. The zones will be named `<user>-<device> - <waypoint name>`. This functionality can be controlled in 2 ways:

1. The configuration variable `waypoints` can be set to `false` which will disable importing waypoints for all users.
2. The configuration variable `waypoint_whitelist` can contain a list of users who are allowed to import waypoints.
