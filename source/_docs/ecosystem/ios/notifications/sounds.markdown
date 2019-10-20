---
title: "Notification Sounds"
description: "Adding sounds to notifications"
redirect_from: /ecosystem/ios/notifications/sounds/
---

Adding a custom sound to a notification allows you to easily identify the notification without even looking at your device. Home Assistant for iOS comes with some notification sounds pre-installed but you can also upload your own.

Here is an example notification that uses one of the pre-installed sounds.

```yaml
- alias: Notify iOS app
  trigger:
    ...
  action:
    service: notify.ios_<your_device_id_here>
    data:
      message: “Something happened at home!”
      data:
        push:
          sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

Notes:
* You must use the full filename in the payload (including extension).

## Custom push notification sounds

The app allows you to use your own custom sounds in push notifications. The sounds must be formatted as 32bit float 48000Hz wav files. You set the filename of the sound in the notification payload. To add sounds:

1. Connect the device to a PC or Mac running the latest version of iTunes.
2. Go to the device in iTunes.
3. Select "File Sharing" in the left-hand menu.
4. Select Home Assistant.
5. Drag and drop properly formatted sounds (32bit float 48000Hz wav files).
6. Click Sync in the lower right.
7. Once the sync is complete, disconnect the device from the computer.
8. On your iOS device, open the Home Assistant app.
9. Go to Settings -> Notification Settings.
10. Select "Import sounds from iTunes".

Assuming that you correctly formatted the sounds they are now available to use in push notifications.

Notes:

* **Please note that due to a bug in iOS 10 you may need to restart your entire device before notification sounds can be played. This should hopefully be fixed by Apple soon.**
* Uploading a file with the same name as an existing one will overwrite the original.
* You can view what sounds are installed on each device by inspecting the `ios.conf` file in your configuration directory. They are listed in the `pushSounds` array.

### Preinstalled notification sounds

```txt
US-EN-Alexa-Back-Door-Opened.wav
US-EN-Alexa-Back-Door-Unlocked.wav
US-EN-Alexa-Basement-Door-Opened.wav
US-EN-Alexa-Basement-Door-Unlocked.wav
US-EN-Alexa-Boyfriend-Is-Arriving.wav
US-EN-Alexa-Daughter-Is-Arriving.wav
US-EN-Alexa-Front-Door-Opened.wav
US-EN-Alexa-Front-Door-Unlocked.wav
US-EN-Alexa-Garage-Door-Opened.wav
US-EN-Alexa-Girlfriend-Is-Arriving.wav
US-EN-Alexa-Good-Morning.wav
US-EN-Alexa-Good-Night.wav
US-EN-Alexa-Husband-Is-Arriving.wav
US-EN-Alexa-Mail-Has-Arrived.wav
US-EN-Alexa-Motion-At-Back-Door.wav
US-EN-Alexa-Motion-At-Front-Door.wav
US-EN-Alexa-Motion-Detected-Generic.wav
US-EN-Alexa-Motion-In-Back-Yard.wav
US-EN-Alexa-Motion-In-Basement.wav
US-EN-Alexa-Motion-In-Front-Yard.wav
US-EN-Alexa-Motion-In-Garage.wav
US-EN-Alexa-Patio-Door-Opened.wav
US-EN-Alexa-Patio-Door-Unlocked.wav
US-EN-Alexa-Smoke-Detected-Generic.wav
US-EN-Alexa-Smoke-Detected-In-Basement.wav
US-EN-Alexa-Smoke-Detected-In-Garage.wav
US-EN-Alexa-Smoke-Detected-In-Kitchen.wav
US-EN-Alexa-Son-Is-Arriving.wav
US-EN-Alexa-Water-Detected-Generic.wav
US-EN-Alexa-Water-Detected-In-Basement.wav
US-EN-Alexa-Water-Detected-In-Garage.wav
US-EN-Alexa-Water-Detected-In-Kitchen.wav
US-EN-Alexa-Welcome-Home.wav
US-EN-Alexa-Wife-Is-Arriving.wav
US-EN-Daisy-Back-Door-Motion.wav
US-EN-Daisy-Back-Door-Open.wav
US-EN-Daisy-Front-Door-Motion.wav
US-EN-Daisy-Front-Door-Open.wav
US-EN-Daisy-Front-Window-Open.wav
US-EN-Daisy-Garage-Door-Open.wav
US-EN-Daisy-Guest-Bath-Leak.wav
US-EN-Daisy-Kitchen-Sink-Leak.wav
US-EN-Daisy-Kitchen-Window-Open.wav
US-EN-Daisy-Laundry-Room-Leak.wav
US-EN-Daisy-Master-Bath-Leak.wav
US-EN-Daisy-Master-Bedroom-Window-Open.wav
US-EN-Daisy-Office-Window-Open.wav
US-EN-Daisy-Refrigerator-Leak.wav
US-EN-Daisy-Water-Heater-Leak.wav
US-EN-Morgan-Freeman-Back-Door-Closed.wav
US-EN-Morgan-Freeman-Back-Door-Locked.wav
US-EN-Morgan-Freeman-Back-Door-Opened.wav
US-EN-Morgan-Freeman-Back-Door-Unlocked.wav
US-EN-Morgan-Freeman-Basement-Door-Closed.wav
US-EN-Morgan-Freeman-Basement-Door-Locked.wav
US-EN-Morgan-Freeman-Basement-Door-Opened.wav
US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav
US-EN-Morgan-Freeman-Boss-Is-Arriving.wav
US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav
US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav
US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav
US-EN-Morgan-Freeman-Friend-Is-Arriving.wav
US-EN-Morgan-Freeman-Front-Door-Closed.wav
US-EN-Morgan-Freeman-Front-Door-Locked.wav
US-EN-Morgan-Freeman-Front-Door-Opened.wav
US-EN-Morgan-Freeman-Front-Door-Unlocked.wav
US-EN-Morgan-Freeman-Garage-Door-Closed.wav
US-EN-Morgan-Freeman-Garage-Door-Opened.wav
US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Good-Morning.wav
US-EN-Morgan-Freeman-Good-Night.wav
US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav
US-EN-Morgan-Freeman-Motion-Detected.wav
US-EN-Morgan-Freeman-Motion-In-Basement.wav
US-EN-Morgan-Freeman-Motion-In-Bedroom.wav
US-EN-Morgan-Freeman-Motion-In-Game-Room.wav
US-EN-Morgan-Freeman-Motion-In-Garage.wav
US-EN-Morgan-Freeman-Motion-In-Kitchen.wav
US-EN-Morgan-Freeman-Motion-In-Living-Room.wav
US-EN-Morgan-Freeman-Motion-In-Theater.wav
US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav
US-EN-Morgan-Freeman-Patio-Door-Closed.wav
US-EN-Morgan-Freeman-Patio-Door-Locked.wav
US-EN-Morgan-Freeman-Patio-Door-Opened.wav
US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav
US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav
US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav
US-EN-Morgan-Freeman-Setting-The-Mood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Someone-Is-Arriving.wav
US-EN-Morgan-Freeman-Son-Is-Arriving.wav
US-EN-Morgan-Freeman-Starting-Movie-Mode.wav
US-EN-Morgan-Freeman-Starting-Party-Mode.wav
US-EN-Morgan-Freeman-Starting-Romance-Mode.wav
US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-TV.wav
US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-TV.wav
US-EN-Morgan-Freeman-Vacate-The-Premises.wav
US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Welcome-Home.wav
US-EN-Morgan-Freeman-Wife-Is-Arriving.wav
```
