---
title: HomeKit Controller
description: Instructions for how to integrate your HomeKit devices within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Climate
  - Cover
  - Light
  - Lock
  - Switch
  - Binary Sensor
  - Sensor
  - Fan
  - Health
  - Humidifier
ha_release: 0.68
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Jc2k'
ha_domain: homekit_controller
ha_zeroconf: true
ha_platforms:
  - air_quality
  - alarm_control_panel
  - binary_sensor
  - camera
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
---

The [HomeKit](https://developer.apple.com/homekit/) controller integration allows you to connect accessories with the "Works with HomeKit" logo to Home Assistant. This integration should not be confused with the [HomeKit](/integrations/homekit/) integration, which allows you to control Home Assistant devices via HomeKit.

The integration will automatically detect HomeKit compatible devices that are ready to pair if the [`zeroconf`](/integrations/zeroconf/) integration is enabled. This is enabled by default on new installations via the [`default_config`](/integrations/default_config/) component.

To see which devices have been discovered see the "Integrations" page in your Home Assistant dashboard. When you click on "Configure" you can enter your HomeKit PIN and the device should be added to your Home Assistant instance. If your device is currently paired with an Apple device via HomeKit, you will need to reset it in order to pair it with Home Assistant. Once Home Assistant is configured to work with the device, you can export it back to Siri and Apple Home with the [`HomeKit`](/integrations/homekit/) integration.

## Supported devices

There is currently support for the following device types within Home Assistant:

- Alarm Control Panel (HomeKit security system)
- Climate (HomeKit thermostats and air conditioners)
- Cover (HomeKit garage door openers, windows, or window coverings)
- Light (HomeKit lights)
- Lock (HomeKit lock)
- Switch (HomeKit switches, outlets and valves)
- Binary Sensor (HomeKit motion, contact, occupancy, carbon monoxide and smoke sensors)
- Sensor (HomeKit humidity, temperature, co2 and light level sensors)
- Fan
- Air Quality
- Humidifier (HomeKit humidifiers and dehumidifiers)
- Automation Triggers (HomeKit 'stateless' accessories like buttons, remotes and doorbells)

<div class='note'>

  If your device is not on this list then you may still be able to pair it, and it will be visible in the Device Registry. But Home Assistant may not create entities for it.

</div>

HomeKit IP accessories for these device types may work with some caveats:

- If the device is Wi-Fi based and has no physical controls or screen then you may need an Apple HomeKit device like an iPhone or iPad to get the accessory onto your Wi-Fi network. For example, for a Koogeek LS1 you must add the accessory to HomeKit on your iOS device, then remove it from the iOS device. This leaves the LS1 in an unpaired state but still on your Wi-Fi. Home Assistant can then find it and pair with it.
- You need to know the HomeKit PIN. There is no way to recover this if you do not have it. In this case, you will need to contact the manufacturer to see what options you have.

HomeKit controller will poll your devices, but it will also automatically enable push updates for accessories that support it.

Home Assistant does not currently support HomeKit BLE.

## 'Stateless' switches and sensors

Some HomeKit devices (like buttons, remotes and doorbells) don't have sensors that can be read like a normal HomeKit device - they only inform Home Assistant when something happens. This means Home Assistant can't show an entity for them, as they have no state. But they are available for use as [device automations](/integrations/device_automation/).

For example, to add a new automation that is triggered by one of these devices go to the device registry UI and find the device you want to use as a trigger. Click on it to reveal the device registry entry for it. You will be able to see the devices model, manufacturer and firmware version. You might see related entities - like a battery sensor.

<p class='img'>
<img src='/images/integrations/homekit_controller/device_automation_start.png' />
</p>

Click on the button to add an automation. A popup will show you a list of triggers that are available.

<p class='img'>
<img src='/images/integrations/homekit_controller/device_automation_triggers.png' />
</p>

Clicking on one will drop you in to the automation editor with a trigger pre-filled in. If your device supports it you will be able to choose between types of event - like a short press or a long press.

<p class='img'>
<img src='/images/integrations/homekit_controller/device_automation_new.png' />
</p>

When you have filled in the rest of the form to create your migration it will show up against that device in the device registry.

<p class='img'>
<img src='/images/integrations/homekit_controller/device_automation_finish.png' />
</p>

## Troubleshooting

### I don't have a HomeKit PIN

When you buy a certified HomeKit-enabled device, the PIN might be in the instructions or on a sticker on the accessory itself.

Devices with screens like thermostats may not have PIN codes in the packaging at all. Every time you click on "Configure" in the Home Assistant frontend, your accessory will generate a new pairing code and show it on the display.

If your device doesn't have a display and received HomeKit support after it was released, you may not have a pairing code. Dealing with this is manufacturer specific. Some manufacturers allow you to see the pairing code in their iOS app. Others force you to use their app to configure HomeKit and don't let you have the pairing pin - right now you won't be able to use HomeKit Controller with those devices.

If you have lost your PIN code, then you may not be able to pair your accessory. You should contact the manufacturer to see if there is anything you can do.

### Home Assistant cannot discover my device

For IP accessories, Home Assistant can only find devices that are already on the same network as your device. If an accessory is Wi-Fi based and has no user interface for joining it to your Wi-Fi network, you will need an Apple HomeKit controller device (an iPhone or iPad). You should pair it with the controller and then remove the pairing in the UI (but do not reset the accessory itself). This will leave the accessory on your Wi-Fi network but in an unpaired state, and then Home Assistant can find it.

Home Assistant can only find accessories that aren't already paired. Even if you reset your Home Assistant configuration, the accessory will still think it is paired and you won't be able to use it with Home Assistant. You should reset the accessory according to the manufacturer's instructions. Some devices have a "Reset HomeKit" option, and some may require a full reset.

If your devices are on a different VLAN to Home Assistant you must have an mDNS reflector for discovery and pairing to work.

Check that your device is visible with an mDNS tool. If you are comfortable with the command line you can run `netdisco` from your Home Assistant installation:

```bash
python3 -m netdisco
Discovered devices:
homekit:
[ {'host': '192.168.17.5',
  'hostname': 'Philips-hue.local.',
  'name': 'Philips hue - xxxx',
  'port': 8080,
  'properties': {'c#': '21',
                 'ci': '2',
                 'ff': '1',
                 'id': 'AA:BB:CC:DD:EE:FF',
                 'md': 'BSB002',
                 'pv': '1.1',
                 's#': '1',
                 'sf': '0'}},
```

`netdisco` is not used by Home Assistant to discover HomeKit devices, so if it can't see your device the problem is more likely to be environmental than with Home Assistant itself.

Alternatively if you are less comfortable with the command line you could use Discovery for [Mac](https://apps.apple.com/us/app/discovery-dns-sd-browser/id1381004916?mt=12) or [iOS](https://apps.apple.com/us/app/discovery-dns-sd-browser/id305441017), Android [Service Browser](https://play.google.com/store/apps/details?id=com.druk.servicebrowser) or [All My Lan](https://www.microsoft.com/en-us/p/all-my-lan/9wzdncrdn19v). These are a less useful diagnostic as they aren't running from the same point on your network as Home Assistant. Even if it is visible in this tool it might still be a networking issue. They can give sometimes give clues.

Where a discovery tool does give an IP, check it is what you expect (compare to DHCP leases in your router for example). Can you ping it? If not, you have a network problem.

Some users have reported that their network configuration has interfered with using HomeKit devices with Home Assistant. The symptoms vary but include discovery not working at all or being unstable (sometimes working, sometimes not). This is very specific not only to the hardware in use but how it is configured and unfortunately we can't suggest appropriate settings. For example, we have seen IGMP Snooping be blamed as the cause of the problem and also suggested as the fix.

### HomeKit controller is finding devices on my network even though I don't have any Apple devices

This is completely normal. Unlike many other commercial IoT offerings, the HomeKit protocol is a local and offline protocol that does not rely on the Apple ecosystem to function. You do not need an Apple online account to use a "Works with HomeKit" device. Some Wi-Fi devices may need an iOS device briefly to get them onto your WiFi, but other than that you do not need any Apple hardware on your network.

Many IoT devices are getting a post-launch HomeKit upgrade. This might mean your device starts showing in Home Assistant as a `homekit_controller` device even though when you bought it without HomeKit support. This might be a better choice for you than a native integration. For example, many climate devices have an online-only API and a HomeKit API. The HomeKit one might not expose all of the settings and controls you are used to, but it also won't break if your Internet connection goes down or the cloud service goes away.

### I have a warning in my logs about HomeKit controller skipping updates

You may say a log entry that looks like this:

```log
HomeKit controller update skipped as previous poll still in flight
```

In these cases it's unlikely that HomeKit controller itself is directly responsible. This is a safety feature to avoid overloading your Home Assistant instance. It means that Home Assistant tried to poll your accessory but the previous poll was still happening. This means it is taking over 1 minute to poll your accessory. This could be caused by a number of things:

- You have too many blocking synchronous integrations for your Home Assistant instance. All synchronous integrations share a thread pool, and if there are lots of tasks to run on it they will queued, which will cause delays. In the worst cases this queue can build up faster than it can be emptied. Faster hardware may help, but you may need to disable some integrations.
- Your network connection to an accessory is poor and HomeKit Controller is unable to reach the accessory reliably. This will likely require a change to your network setup to improve Wi-Fi coverage or replace damaged cabling.
- There is a problem with the accessory itself which is causing intermittent network issues.

In these cases, HomeKit Controller will skip polling to avoid a buildup of back pressure in your instance.

### I can't see any events generated for "stateless" accessories

This is expected. The only way to use stateless accessories like some doorbells, buttons or remotes with Home Assistant is through device automations. Home Assistant doesn't create duplicate events for device automation triggers, so for example you won't be able to watch them with the events developer tools.
