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
4. With the device in its final location, run a *Heal Network*

Don't use this for [secure devices](/docs/z-wave/adding/#adding-secure-devices), since this is likely to limit the features the device supports.

<p class='note warning'>
Don't use the OpenZWave control panel (OZWCP), **or the physical button on a controller**, to add or remove devices. Many devices will only send the information about their capabilities at the time you include them. If you use the OpenZWave control panel, or the button on a device, then Home Assistant won't have that information. Using the physical button on a controller will also result in a non-security inclusion being performed, which may limit the features the device supports.
</p>

When you add a device, it may initially appear without a specific entity ID (eg `zwave.__`) and without other identifying information. Running a *Heal* should help speed this process up, and you'll need to run a *Heal* anyway so that all the devices in your Z-Wave network learn about the new device. You *might* need to restart Home Assistant (not reboot the system) to have the entity ID fully visible.

## {% linkable_title Network Key %}

Security Z-Wave devices require a network key. Some devices only expose their full capabilities when included this way. You should always read the manual for your device to find out the recommended inclusion method. Note, secure devices that had been connected to another hub/network in the past may have a "theft protection" feature which requires to first exclude the device successfully from the previous hub using the previous hub/Software setup before it can be enrolled in a new hub/network.

A valid network key will be a 16 byte value, defined in the zwave section of your configuration, such as the following example:

```yaml
zwave:
  usb_path: /dev/ttyACM0
  network_key: "0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10"
```

Each individual value in the defined key can be anywhere from 0x00 to 0xFF. Define your own key by making changes to the above example key or for additional security try one of the two scripts mentioned below.

### {% linkable_title Network Key %}

An easy script to generate a random key:

```bash
$ cat /dev/urandom | tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

On macOS, this script will generate a random key:

```bash
$ cat /dev/urandom | LC_CTYPE=C tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

If the above command doesn't work then replace `LC_CTYPE=C` with `LC_ALL=C`:

```bash
$ cat /dev/urandom | LC_ALL=C tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

<p class='note warning'>
Ensure you keep a backup of this key. If you have to rebuild your system and don't have a backup of this key, you won't be able to reconnect to any security devices. This may mean you have to do a factory reset on those devices, and your controller, before rebuilding your Z-Wave network.
</p>

## {% linkable_title Adding Secure Devices %}

After defining your network key, follow these steps to add (include) a secure Z-Wave device:

1. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/) in the Home Assistant frontend
2. Click the **Add Node Secure** button in the *Z-Wave Network Management* card - this will place the controller in inclusion mode
3. Activate your device to be included by following the instructions provided with the device
4. With the device in its final location, run a *Heal Network*

## {% linkable_title Removing Devices %}

To remove (exclude) a Z-Wave device from your system:

1. Go to the Z-Wave control panel in the Home Assistant frontend
2. Click the **Remove Node** button in the *Z-Wave Network Management* card - this will place the controller in exclusion mode
3. Activate your device to be excluded by following the instructions provided with the device
4. The device will now be removed, but that won't show until you restart Home Assistant 
5. Run a *Heal Network* so all the other nodes learn about its removal

If your device isn't responding to this process, possibly because you've factory reset it or it has failed, you can remove it using **Remove Failed Node**. This only works for devices marked as `"is_failed": true`, but you can trick the system into thinking that this the case:

1. Go to the *States* menu under *Developer tools* in the Home Assistant frontend
2. Click on the name of the `zwave.` entity you want to remove
3. At the top, edit the JSON attributes to replace `false` with `true` for `"is_failed": false,` so that it reads `"is_failed": true,`
4. Click **Set State**
5. Go to the Z-Wave control panel in the Home Assistant frontend
6. Click the **Remove Failed Node** button in the *Z-Wave Network Management* card
7. The device will now be removed, but that won't show until you restart Home Assistant 

## {% linkable_title Troubleshooting %}

Sometimes devices won't add to Home Assistant. There are a couple of possible problems.

1. You're not using all Z-Wave Plus devices, in which case the device can't use the mesh to be added, and must be in the same room as your controller.
2. The device was previously added to another controller, and not removed. You'll need to follow the process above for removing devices first, then try adding it again.
