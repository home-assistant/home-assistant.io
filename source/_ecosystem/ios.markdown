---
layout: page
title: "iOS"
description: "Documentation about the Home Assistant iOS app."
release_date: 2016-10-24 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

The Home Assistant for iOS app offers a companion app for iOS which is deeply integrated into both Home Assistant and iOS. Its basic features include:

* Advanced push notifications
* Location tracking
* Basic control of all Home Assistant entities
* Integration with third party apps

<p class='note warning'>
Currently, the app is only available via a closed beta. It will be on the App Store within the next few weeks.
</p>

<p class='img'>
  <img src='/images/ios/control1.png' width='310' height='552' />
  An example of a Home Assistant group as seen in the iOS app.
</p>

## Basic requirements

* iOS device running at least iOS 9, but iOS 10 is greatly preferred.
* Home Assistant 0.31.1 or higher for push notification support.
* SSL is strongly recommended. Self-signed SSL certificates will not work due to Apple's limitations.

The `ios` component is the companion component for the Home Assistant iOS app. While not required, adding the `ios` component to your setup will greatly enhance the iOS app with new notification, location and sensor functions not possible with a standalone app.

Loading the `ios` component will also load the [`device_tracker`][device-tracker] and [`zeroconf`][zeroconf] components. It also provides functionality required for the iOS notify platform but will not automatically load the `notify` component or platform as of 0.31.1. You must manually load it. See the [iOS notify platform][ios-notify] for more information.

## {% linkable_title Setup %}

### Automated Setup

The `ios` component will automatically be loaded under the following circumstances:

1. The [`discovery`][discovery] component is enabled.
2. You have just installed the app and are at the getting started screen.

Automated discovery and component loaded can only happen at first install of the app. You may need to wait a few minutes for the iOS component to load as the `discovery` component only scans the network every 5 minutes.

### Manual Setup

You may also manually load the `ios` component by adding the following to your configuration:

```yaml
# Example configuration.yaml entry
ios:
```

Configuration variables:

- **push** (*Optional*): Push notification configuration. See the [iOS `notify` platform][ios-notify] for more information.

[discovery]: /components/discovery
[device-tracker]: /components/device_tracker
[zeroconf]: /components/zeroconf
[notify]: /components/notify
[ios-notify]: /ecosystem/ios/notifications/
