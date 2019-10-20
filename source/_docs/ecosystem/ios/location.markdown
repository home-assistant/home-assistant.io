---
title: "Location"
description: "Documentation about the location tracking abilities in Home Assistant for iOS"
redirect_from: /ecosystem/ios/location/
---

## Location tracking when outside a Home Assistant zone

Home Assistant for iOS receives _significant location updates_ from iOS. Whenever an update is received, it is sent to Home Assistant. Roughly, an update is received every time that your device transfers to a new cellular tower, a significant amount of time has passed (usually a couple hours) or a connection state changes and the system notices your location recently changed.

Apple [defines][apple-location-programming-guide] significant significant-change location updates as:

> The significant-change location service delivers updates only when there has been a significant change in the device’s location, such as 500 meters or more.

They also say in the [Energy Efficiency Guide][apple-energy-guide]:

> Significant-change location updates wake the system and your app once every 15 minutes, at minimum, even if no location changes have occurred.

Finally, I think this answer from [Stack Overflow][stackoverflow] says it best:

> The significant location change is the least accurate of all the location monitoring types. It only gets its updates when there is a cell tower transition or change. This can mean a varying level of accuracy and updates based on where the user is. City area, more updates with more towers. Out of town, interstate, fewer towers and changes.

What's the real story on significant-change location updates? Who knows, because Apple keeps it private.

## Location tracking in Home Assistant zones

At launch, Home Assistant for iOS sets up geofences for all zones in your Home Assistant configuration. Enter and exit notifications are sent to Home Assistant.

### Configuration

Add `track_ios: false` to your zone configurations to disable zone location tracking for all connected iOS apps.

### iBeacons

As of 1.0.3 the app has basic support for using iBeacons to trigger enter/exit updates. To configure them, add your iBeacon details to your zone like this:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons _instead of your location_ for enter and exit triggers around your zones. To add an iBeacon to `zone.home` add the above under your `customize`.

[apple-energy-guide]: https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4
[apple-location-programming-guide]: https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9
[stackoverflow]: http://stackoverflow.com/a/13331625/486182
