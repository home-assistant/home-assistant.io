---
layout: page
title: "Z-Wave Devices - Adding and Removing"
description: "How to add and remove Z-Wave devices."
date: 2017-11-08 19:06
sidebar: true
comments: false
sharing: true
footer: true
---

## {% linkable_title Adding Non-Secure Devices %}

To add (include) a non-secure Z-Wave [device](/docs/z-wave/devices/) to your system:

1. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/) in the Home Assistant frontend
2. Click the **Add Node** button in the *Z-Wave Network Management* card - this will place the controller in inclusion mode
3. Activate your device to be included by following the instructions provided with the device
4. With the device in its final location, run a *Heal*

Don't use this for [secure devices](https://home-assistant.io/docs/z-wave/adding/#adding-secure-devices), since this is likely to limit the features the device supports.

<p class='note warning'>
Don't use the OpenZWave control panel (OZWCP), **or the physical button on a controller**, to add or remove devices. Many devices will only send the information about their capabilities at the time you include them. If you use the OpenZWave control panel, or the button on a device, then Home Assistant won't have that information. Using the physical button on a controller will also result in a non-security inclusion being performed, which may limit the features the device supports.
</p>

When you add a device, it may initially appear without a specific entity ID (eg `zwave.__`) and without other identifying information. Running a *Heal* should help speed this process up, and you'll need to run a *Heal* anyway so that all the devices in your Z-Wave network learn about the new device. You *might* need to restart Home Assistant (not reboot the system) to have the entity ID fully visible.

## {% linkable_title Adding Secure Devices %}

Security Z-Wave devices require a network key. You must set the *network_key* configuration variable to use a network key before adding these devices. Some devices only expose their full capabilities when included this way, you should always read the manual for your device to find out the recommended inclusion method. Note, secure devices that had been connected to another hub/network in the past may have a "theft protection" feature which requires to first exclude the device successfully from the previous hub using the previous hub/Software setup before it can be enrolled in a new hub/network. To add (include) a secure Z-Wave device:

1. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/) in the Home Assistant frontend
2. Click the **Add Node Secure** button in the *Z-Wave Network Management* card - this will place the controller in inclusion mode
3. Activate your device to be included by following the instructions provided with the device

### {% linkable_title Network Key %}

An easy script to generate a random key:
```bash
cat /dev/urandom | tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

On macOS, this script will generate a random key:
```bash
cat /dev/urandom | LC_CTYPE=C tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

<p class='note warning'>
Ensure you keep a backup of this key. If you have to rebuild your system and don't have a backup of this key, you won't be able to reconnect to any security devices. This may mean you have to do a factory reset on those devices, and your controller, before rebuilding your Z-Wave network.
</p>

## {% linkable_title Removing Devices %}

To remove (exclude) a Z-Wave device from your system:

1. Go to the Z-Wave control panel in the Home Assistant frontend
2. Click the **Remove Node** button in the *Z-Wave Network Management* card - this will place the controller in exclusion mode
3. Activate your device to be excluded by following the instructions provided with the device
4. With the device in its final location, run a *Heal*
