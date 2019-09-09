---
title: "Notifications Introduction"
description: "Getting started with iOS notifications"
redirect_from: /ecosystem/ios/notifications/
---

The `ios` notify platform enables sending push notifications to the Home Assistant iOS app.

The 'ios' integration will automatically load the notify service.
The service integration can be called using `service: notify.ios_<your_device_ID>`.
Your device ID can be found in the `ios.conf` file in your configuration folder. The file is compressed JSON. You can view it easier by copying the file contents and pasting them into [JSONLint](http://jsonlint.com).

In this example, the device ID is `robbiet480_7plus`, so the notify service to use is `notify.ios_robbiet480_7plus`:
```json
{"devices":{"robbiet480_7plus":{"app":{"bundleIdentifer":"io.robbie.HomeAssistant","versionNumber":1,"buildNumber":53},"pushSounds":[],"permissions":["location"],"deviceId":"robbiet480_7plus","device":{"type":"iPhone 7 Plus","systemName":"iOS","systemVersion":"10.3","permanentID":"AB9F02FE-6AC6-47B8-ADEB-5DD87B489156","localizedModel":"iPhone","name":"Robbie's iPhone 7 Plus","model":"iPhone"},"battery":{"state":"Full","level":100},"pushToken":"SECRET","pushId":"SECRET"}}}
```

You can find more information in the [Basic Notifications](/docs/ecosystem/ios/notifications/basic/) documentation and the [Actionable Notifications](/docs/ecosystem/ios/notifications/actions/) documentation.
