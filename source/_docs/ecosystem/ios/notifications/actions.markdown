---
title: "Actionable notifications"
description: "Making push notifications a two way system"
redirect_from: /ecosystem/ios/notifications/actions/
---

Actionable notifications allow you to attach 1-4 custom buttons to a notification. When one of the actions is selected Home Assistant will be notified which action was chosen. This allows you to build complex automations.

Examples of actionable notifications:

- A notification is sent whenever motion is detected in your home while you are away or asleep. You can add an action to Sound Alarm. When tapped, Home Assistant is notified that the `sound_alarm` action was selected. You can add an automation to sound the burglar alarm whenever this event is seen.
- Someone rings your front door bell. You can send an action to lock or unlock your front door. When tapped, a notification is sent back to Home Assistant upon which you can build automations.
- Send a notification whenever your garage door opens with actions to open and close the garage.

<p class='img'>
  <img src='/images/ios/actions.png' />
  Actionable notifications allow the user to send a command back to Home Assistant.
</p>

## Overview of how actionable notifications work

In advance of sending a notification:

1. Define a notification category in your Home Assistant configuration which contain 1-4 actions.
2. At launch iOS app requests notification categories from Home Assistant (can also be done manually in notification settings).

When sending a notification:

1. Send a notification with `data.push.category` set to a pre-defined notification category identifier.
2. Push notification delivered to device
3. User opens notification.
3. Action tapped
4. Identifier of action sent back to HA as the `actionName` property of the event `ios.notification_action_fired`, along with other metadata such as the device and category name.

<p class='img'>
  <img src='/images/ios/NotificationActionFlow.png' />
  How the iOS device and Home Assistant work together to enable actionable notifications.
</p>

## Definitions
- Category - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
- Actions - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

## Category parameters

- **name** (*Required*): A friendly name for this category.
- **identifier** (*Required*): A unique identifier for the category. Must be lowercase and have no special characters or spaces.
- **actions** (*Required*): A list of actions.

## Actions parameters

- **identifier** (*Required*): A unique identifier for this action. Must be uppercase and have no special characters or spaces. Only needs to be unique to the category, not unique globally.
- **title** (*Required*): The text to display on the button. Keep it short.
- **activationMode** (*Optional*): The mode in which to run the app when the action is performed. Setting this to `foreground` will make the app open after selecting. Default value is `background`.
- **authenticationRequired** (*Optional*): If `true`, the user must unlock the device before the action is performed.
- **destructive** (*Optional*): When the value of this property is a truthy value, the system displays the corresponding button differently to indicate that the action is destructive (text color is red).
- **behavior** (*Optional*): When `textInput` the system provides a way for the user to enter a text response to be included with the notification. The entered text will be sent back to Home Assistant. Default value is `default`.
- **textInputButtonTitle** (*Optional*): The button label. *Required* if `behavior` is `textInput`.
- **textInputPlaceholder** (*Optional*): The placeholder text to show in the text input field. Only used if `behavior` is `textInput` and the device runs iOS 10.

Here's a fully built example configuration:

```yaml
ios:
  push:
    categories:
      - name: Alarm
        identifier: 'alarm'
        actions:
          - identifier: 'SOUND_ALARM'
            title: 'Sound Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
            behavior: 'default'
          - identifier: 'SILENCE_ALARM'
            title: 'Silence Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: false
            behavior: 'textInput'
            textInputButtonTitle: 'Silencio!'
            textInputPlaceholder: 'Placeholder'
```

## Building automations for notification actions
Here is an example automation to send a notification with a category in the payload:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!"
        data:
          push:
            badge: 5
            sound: <SOUND FILE HERE>
            category: "alarm" # Needs to match the top level identifier you used in the ios configuration
          action_data: # Anything passed in action_data will get echoed back to Home Assistant.
            entity_id: light.test
            my_custom_data: foo_bar
```

When an action is selected an event named `ios.notification_action_fired` will be emitted on the Home Assistant event bus. Below is an example payload.

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "sourceDevicePushId": "ab9f02fe-6ac6-47b8-adeb-5dd87b489156",
  "textInput": "",
  "actionData": {}
}
```

Here's an example automation for the given payload:
```yaml
automation:
  - alias: Sound the alarm
    trigger:
      platform: event
      event_type: ios.notification_action_fired
      event_data:
        actionName: SOUND_ALARM
    action:
      ...
```

Notes:

* `textInput` will only exist if `behavior` was set to `textInput`.
* `actionData` is a dictionary with parameters passed in the `action_data` dictionary of the `push` dictionary in the original notification.
* When adding or updating push categories be sure to update push settings within the Home Assistant iOS app. This can be found within the app at **Settings** (gear icon) > **Notification Settings**.

## Compatibility with different devices

* For devices that support "Force Touch" / "3D Touch" - a long press on the notification will cause the actions to appear. Devices such as iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max as well as some iPad and Apple Watch models.

* For device that do not support this feature - a left to right swipe on the notification + tap on 'View' button, will cause the relevant actions to appear. Devices such as iPhone 6 and below, iPhone SE, iPhone XR as some iPad models.
