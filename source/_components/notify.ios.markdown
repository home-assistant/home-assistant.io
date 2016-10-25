---
layout: page
title: "Home Assistant for iOS"
description: "Documentation about the Home Assistant iOS notify platform."
release_date: 2016-10-24 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Notifications
ha_release: 0.31
---

The `ios` notify platform enables sending push notifications to the Home Assistant iOS app.

## {% linkable_title Setup %}
```yaml
# Example configuration.yaml entry
notify:
  - platform: ios
```

Configuration variables:

- **name** (*Optional*): The name of the service. Not recommended to add this.

## {% linkable_title Basic Usage %}

The iOS notify platform accepts the standard `title`, `message` and `target` parameters.

`title` only displays on Apple Watch and iOS 10 devices.

`target` can be used to specific a single device using its PushID, found in `ios.conf`. The preferred way of providing a target is through a target specific notify service.

## {% linkable_title Advanced Usage %}

In addition to the standard parameters, the iOS notify platform exposes advanced functionality through the `data` dictionary of the notification.

### {% linkable_title Enhancing basic notifications %}

#### Badge
You can set the icon badge in the payload:

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.iOSApp
      data:
        message: “Something happened at home!”
        data:
          push:
            badge: 5
```

#### Subtitle
iOS 10 supports a subtitle in addition to the title:

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.iOSApp
      data:
        message: “Something happened at home!”
        data:
          subtitle: "Subtitle goes here"
```

#### {% linkable_title Attachments %}

iOS 10 adds _attachments_ to notifications. An attachment is an image, video, or audio file which is downloaded to the device when a notification is received and shown alongside the notification. A thumbnail is shown when the notification is not expanded. The full size attachment is shown when the notification is expanded.

_To expand a notification on 3D Touch devices simply force touch any notification. On non-3D Touch devices swipe and tap the "View" button._

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!""
        data:
          attachment:
            url: https://67.media.tumblr.com/ab04c028a5244377a0ab96e73915e584/tumblr_nfn3ztLjxk1tq4of6o1_400.gif
            content-type: gif
            hide-thumbnail: false
```

Notes:
* The thumbnail of the notification will be the media at the `url`.
* The notification content is the media at the `url`.
* Attachment can be used with custom push notification categories.

##### Supported media types

If the attachment does not appear please ensure it is in one of the following formats:

###### Audio

Maximum file size: 5 MB

Formats:
* AIFF
* WAV
* MP3
* MPEG4 Audio

###### Image

Maximum file size: 10 MB

Formats:
* JPEG
* GIF
* PNG

###### Video

Maximum file size: 50 MB

Formats:
* MPEG
* MPEG2
* MPEG4
* AVI

##### Configuration
You can pass the following keys to change the behavior of the attachment:

###### `url`
The URL of content to use as the attachment. This URL _must_ be accessible from the Internet, or the receiving device must be on the same network as the hosted content.

###### `content-type`
By default, the extension of the URL will be checked to determine the filetype. If there is no extension/it can't be determined you can manually provide a file extension.

###### `hide-thumbnail`
If set to `true` the thumbnail will not show on the notification. The content will only be viewable by expanding.

### {% linkable_title Push notification sounds %}
Home Assistant comes with some notification sounds pre-installed.

#### {% linkable_title Preinstalled notification sounds %}

* `US-EN-Alexa-Back-Door-Opened.wav`
* `US-EN-Alexa-Back-Door-Unlocked.wav`
* `US-EN-Alexa-Basement-Door-Opened.wav`
* `US-EN-Alexa-Basement-Door-Unlocked.wav`
* `US-EN-Alexa-Boyfriend-Is-Arriving.wav`
* `US-EN-Alexa-Daughter-Is-Arriving.wav`
* `US-EN-Alexa-Front-Door-Opened.wav`
* `US-EN-Alexa-Front-Door-Unlocked.wav`
* `US-EN-Alexa-Garage-Door-Opened.wav`
* `US-EN-Alexa-Girlfriend-Is-Arriving.wav`
* `US-EN-Alexa-Good-Morning.wav`
* `US-EN-Alexa-Good-Night.wav`
* `US-EN-Alexa-Husband-Is-Arriving.wav`
* `US-EN-Alexa-Mail-Has-Arrived.wav`
* `US-EN-Alexa-Motion-At-Back-Door.wav`
* `US-EN-Alexa-Motion-At-Front-Door.wav`
* `US-EN-Alexa-Motion-Detected-Generic.wav`
* `US-EN-Alexa-Motion-In-Back-Yard.wav`
* `US-EN-Alexa-Motion-In-Basement.wav`
* `US-EN-Alexa-Motion-In-Front-Yard.wav`
* `US-EN-Alexa-Motion-In-Garage.wav`
* `US-EN-Alexa-Patio-Door-Opened.wav`
* `US-EN-Alexa-Patio-Door-Unlocked.wav`
* `US-EN-Alexa-Smoke-Detected-Generic.wav`
* `US-EN-Alexa-Smoke-Detected-In-Basement.wav`
* `US-EN-Alexa-Smoke-Detected-In-Garage.wav`
* `US-EN-Alexa-Smoke-Detected-In-Kitchen.wav`
* `US-EN-Alexa-Son-Is-Arriving.wav`
* `US-EN-Alexa-Water-Detected-Generic.wav`
* `US-EN-Alexa-Water-Detected-In-Basement.wav`
* `US-EN-Alexa-Water-Detected-In-Garage.wav`
* `US-EN-Alexa-Water-Detected-In-Kitchen.wav`
* `US-EN-Alexa-Welcome-Home.wav`
* `US-EN-Alexa-Wife-Is-Arriving.wav`
* `US-EN-Daisy-Back-Door-Motion.wav`
* `US-EN-Daisy-Back-Door-Open.wav`
* `US-EN-Daisy-Front-Door-Motion.wav`
* `US-EN-Daisy-Front-Door-Open.wav`
* `US-EN-Daisy-Front-Window-Open.wav`
* `US-EN-Daisy-Garage-Door-Open.wav`
* `US-EN-Daisy-Guest-Bath-Leak.wav`
* `US-EN-Daisy-Kitchen-Sink-Leak.wav`
* `US-EN-Daisy-Kitchen-Window-Open.wav`
* `US-EN-Daisy-Laundry-Room-Leak.wav`
* `US-EN-Daisy-Master-Bath-Leak.wav`
* `US-EN-Daisy-Master-Bedroom-Window-Open.wav`
* `US-EN-Daisy-Office-Window-Open.wav`
* `US-EN-Daisy-Refrigerator-Leak.wav`
* `US-EN-Daisy-Water-Heater-Leak.wav`
* `US-EN-Morgan-Freeman-Back-Door-Closed.wav`
* `US-EN-Morgan-Freeman-Back-Door-Locked.wav`
* `US-EN-Morgan-Freeman-Back-Door-Opened.wav`
* `US-EN-Morgan-Freeman-Back-Door-Unlocked.wav`
* `US-EN-Morgan-Freeman-Basement-Door-Closed.wav`
* `US-EN-Morgan-Freeman-Basement-Door-Locked.wav`
* `US-EN-Morgan-Freeman-Basement-Door-Opened.wav`
* `US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav`
* `US-EN-Morgan-Freeman-Boss-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav`
* `US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Friend-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Front-Door-Closed.wav`
* `US-EN-Morgan-Freeman-Front-Door-Locked.wav`
* `US-EN-Morgan-Freeman-Front-Door-Opened.wav`
* `US-EN-Morgan-Freeman-Front-Door-Unlocked.wav`
* `US-EN-Morgan-Freeman-Garage-Door-Closed.wav`
* `US-EN-Morgan-Freeman-Garage-Door-Opened.wav`
* `US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Good-Morning.wav`
* `US-EN-Morgan-Freeman-Good-Night.wav`
* `US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav`
* `US-EN-Morgan-Freeman-Motion-Detected.wav`
* `US-EN-Morgan-Freeman-Motion-In-Basement.wav`
* `US-EN-Morgan-Freeman-Motion-In-Bedroom.wav`
* `US-EN-Morgan-Freeman-Motion-In-Game-Room.wav`
* `US-EN-Morgan-Freeman-Motion-In-Garage.wav`
* `US-EN-Morgan-Freeman-Motion-In-Kitchen.wav`
* `US-EN-Morgan-Freeman-Motion-In-Living-Room.wav`
* `US-EN-Morgan-Freeman-Motion-In-Theater.wav`
* `US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav`
* `US-EN-Morgan-Freeman-Patio-Door-Closed.wav`
* `US-EN-Morgan-Freeman-Patio-Door-Locked.wav`
* `US-EN-Morgan-Freeman-Patio-Door-Opened.wav`
* `US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav`
* `US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav`
* `US-EN-Morgan-Freeman-Setting-The-Mood.wav`
* `US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav`
* `US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav`
* `US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav`
* `US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav`
* `US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav`
* `US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav`
* `US-EN-Morgan-Freeman-Someone-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Son-Is-Arriving.wav`
* `US-EN-Morgan-Freeman-Starting-Movie-Mode.wav`
* `US-EN-Morgan-Freeman-Starting-Party-Mode.wav`
* `US-EN-Morgan-Freeman-Starting-Romance-Mode.wav`
* `US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Light.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-Off-The-TV.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Light.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav`
* `US-EN-Morgan-Freeman-Turning-On-The-TV.wav`
* `US-EN-Morgan-Freeman-Vacate-The-Premises.wav`
* `US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav`
* `US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav`
* `US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav`
* `US-EN-Morgan-Freeman-Welcome-Home.wav`
* `US-EN-Morgan-Freeman-Wife-Is-Arriving.wav`

Here is an example notification that uses one of the pre-installed sounds.

```yaml
- alias: Notify iOS app
  trigger:
    ...
  action:
    service: notify.iOSApp
    data:
      message: “Something happened at home!”
      data:
        push:
          sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

Notes:
* You must use the full filename in the payload (including extension).

### {% linkable_title Custom push notification sounds %}
The app allows you to use your own custom sounds in push notifications. The sounds must be formatted following [Apple's requirements][sound-requirements]. You set the filename of the sound in the notification payload. To add sounds:

1. Connect the device to a PC or Mac running the latest version of iTunes.
2. Go to the device in iTunes.
3. Select "Apps" on the left sidebar.
4. Scroll down until you see the section labeled "File Sharing".
5. Select HomeAssistant.
6. Drag and drop properly formatted sounds.
7. Click Sync in the lower right.
8. Once sync is complete, disconnect the device from the computer.
9. On your iOS device, open the Home Assistant app.
10. Go to Settings -> Notification Settings.
11. Select "Import sounds from iTunes".

Assuming that you correctly formatted the sounds they are now available to use in push notifications.

Notes:
* **Please note that due to a bug in iOS 10 you may need to restart your entire device before notification sounds can be played. This should hopefully be fixed by Apple soon.**
* Uploading a file with the same name as an existing one will overwrite the original.
* You can view what sounds are installed on each device by inspecting the `ios.conf` file in your configuration directory. They are listed in the `pushSounds` array.

### {% linkable_title Creating actionable notifications %}

Actionable notifications allow you to attach 1-4 custom buttons to a notification. When one of the actions is selected Home Assistant will be notified which action was chosen. This allows you to build complex automations. Some examples include:

- A notification is sent whenever motion is detected in your home while you are away or asleep. You can add an action to Sound Alarm. When tapped, Home Assistant is notified that the `sound_alarm` action was selected. You can add an automation to sound the burglar alarm whenever this event is seen.
- Someone rings your front door bell. You can send an action to lock or unlock your front door. When tapped, a notification is sent back to Home Assistant upon which you can build automations.

#### Overview of how actionable notifications work

In advance of sending a notification:

1. Define a notification category in your Home Assistant configuration which contain 1-4 actions.
2. At launch iOS app requests notification categories from Home Assistant (can also be done manually in notification settings).

When sending a notification:

1. Send a notification with `data.push.category` set to a pre-defined notification category identifer.
2. Push notification delivered to device
3. User opens notification.
3. Action tapped
4. Identifier of action sent back to HA as the `actionName` property of the event `ios.notification_action_fired`, along with other metadata such as the device and category name.


#### Definitions
- Category - A category represents a type of notification that the app might receive. Think of it as a unique group of actions. A categories parameters include:
- Action - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports. An actions parameters include:

#### {% linkable_title Category parameters %}
**All category parameters are required and none have default values.**

| Name         | Description                                                                                       |
|--------------|---------------------------------------------------------------------------------------------------|
| `name`       | A friendly name for this category                                                                 |
| `identifier` | A unique identifier for the category. Must be uppercase and have no special characters or spaces. |
| `actions`    | A list of actions                                                                                 |

#### {% linkable_title Action parameters %}

| Name                     | Required?                                                                  | Default Value | Allowed Values               | Description                                                                                                                                                                                                 |
|--------------------------|----------------------------------------------------------------------------|---------------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `identifier`             | Required                                                                   | None          | String                       | A unique identifier for this action. Must be uppercase and have no special characters or spaces. Only needs to be unique to the category, not unique globally.                                              |
| `title`                  | Required                                                                   | None          | String                       | The text to display on the button. Keep it short.                                                                                                                                                           |
| `activationMode`         | Optional                                                                   | `background`  | `foreground` or `background` | The mode in which to run the app when the action is performed. Setting this to `foreground` will make the app open after selecting.                                                                         |
| `authenticationRequired` | Optional                                                                   | False         | Boolean                      | If true the user must unlock the device before the action is performed.                                                                                                                                     |
| `destructive`            | Optional                                                                   | False         | Boolean                      | A Boolean value indicating whether the action is destructive. When the value of this property is true, the system displays the corresponding button differently to indicate that the action is destructive. |
| `behavior`               | Optional                                                                   | `default`     | `default` or `textInput`     | When TextInput the system provides a way for the user to enter a text response to be included with the notification. The entered text will be sent back to Home Assistant.                                  |
| `textInputButtonTitle`   | Required if `behavior` is `textInput`                                      | None          | String                       | The button label text.                                                                                                                                                                                      |
| `textInputPlaceholder`   | Optional but only usable if `behavior` is `textInput` and device is iOS 10 | None          | String                       | The placeholder text to show in the text input field.                                                                                                                                                       |

#### {% linkable_title Building automations for notification actions %}
Here is an example automation to send a notification with a category in the payload:

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!""
        data:
          push:
            badge: 5
            sound: <SOUND FILE HERE>
            category: "ALARM" # Needs to match the top level identifier you used in the ios configuration
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

## {% linkable_title Rate limiting %}

Currently, you are allowed to send a maximum of 150 push notifications per day per device. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications. The rate limit resets at midnight UTC daily. When a notification is sent your current rate limits (including sent notifications and notifications remaining for the day) will be output to your Home Assistant logs. If an error occurs while sending a notification your rate limit will not be affected.

[ios-component]: /components/ios
[sound-requirements]: https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html#//apple_ref/doc/uid/TP40008194-CH103-SW6
