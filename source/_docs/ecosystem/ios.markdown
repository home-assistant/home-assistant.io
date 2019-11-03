---
title: "iOS"
description: "Documentation about the Home Assistant iOS app."
redirect_from: /ecosystem/ios/
---

The Home Assistant for iOS app offers a companion app for iOS which is deeply integrated into both Home Assistant and iOS. Its basic features include:

* Advanced push notifications
* Location tracking
* Basic control of all Home Assistant entities
* Integration with third party apps

The app is available on the iOS App Store in every country that Apple supports.

<p style="text-align: center;"><a target="_blank" href="https://itunes.apple.com/us/app/home-assistant-open-source-home-automation/id1099568401?mt=8" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg) no-repeat;width:135px;height:40px;background-size:contain;"></a></p>

## Basic requirements

* iOS device running at least iOS 9, but iOS 10 is greatly preferred.
* Home Assistant 0.42.4 or higher for push notification support.
* SSL is strongly recommended. Self-signed SSL certificates will not work due to Apple's limitations.

The `ios` integration is the companion integration for the Home Assistant iOS app. While not required, adding the `ios` integration to your setup will greatly enhance the iOS app with new notification, location and sensor functions not possible with a standalone app.

Loading the `ios` integration will also load the [`device_tracker`](/integrations/device_tracker), [`zeroconf`](/integrations/zeroconf) and [`notify`](/integrations/notify) platforms.

The Home Assistant for iOS app supports the new authentication system introduced in Home Assistant 0.77.

## Setup

### Automated Setup

The `ios` integration may or may not be automatically loaded under the following circumstances:

1. The [`discovery`](/integrations/discovery) integration is enabled.
2. You have just installed the app and are at the getting started screen.

Automated discovery and integration loading only happens at first install of the app. You may need to wait a few minutes for the iOS integration to load as the `discovery` integration only scans the network every 5 minutes.

After the first automated setup you need to add `ios:` to your configuration so that the integration loads by default even after restarting Home Assistant.

### Manual Setup

You may also manually load the `ios` integration by adding the following to your configuration:

```yaml
# Example configuration.yaml entry
ios:
```

{% configuration %}
push:
  description: Actionable push notifications configuration. See the [actionable notifications documentation](/docs/ecosystem/ios/notifications/actions/) for more information.
  required: false
  type: list
{% endconfiguration %}

