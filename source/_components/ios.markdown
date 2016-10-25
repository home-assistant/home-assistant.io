---
layout: page
title: "Home Assistant for iOS"
description: "Documentation about the Home Assistant iOS app."
release_date: 2016-10-24 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Hub
featured: true
ha_release: 0.31
ha_iot_class: "Local Push"
---

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
[ios-notify]: /components/notify.ios
