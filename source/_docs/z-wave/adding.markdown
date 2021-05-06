---
title: "Z-Wave Devices - Adding and Removing"
description: "How to add and remove Z-Wave devices."
---

<div class='note'>

This Z-Wave integration is deprecated and replaced with a [new implementation based on Z-Wave JS](/integrations/zwave_js); it's currently in beta, and you can [try it now](/integrations/zwave_js/).

</div>

## Adding Devices

To add a [Z-Wave device](/docs/z-wave/devices/):

1. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/).
2. Click **Add Node** in the *Z-Wave Network Management* card, or **Add Node Secure** for secure devices like locks. This puts your [Z-Wave controller](/docs/z-wave/controllers/) in "inclusion" mode.
3. Activate your device by following the instructions provided with it. Usually, this involves pressing a button.
4. Make sure the device is in its final location, then click **Heal Network**. This is optional but helps optimize network speed.

When you add a device, it may initially appear without a specific entity ID (e.g., `zwave.__`) or other identifying information. *Heal Network* should speed the process of populating this information. You *might* need to restart Home Assistant for the entity ID to appear.

<div class='note warning'>

Some Z-Wave USB sticks have a physical "inclusion" button to add devices; **don't use it**. Likewise, don't add devices directly through other tools like [OpenZWave control panel](https://github.com/OpenZWave/open-zwave-control-panel). Many devices only send capabilities information at the time you add them, so if you add them outside of Home Assistant this information will be missing.

</div>

<div class='note warning'>
Secure devices require additional bandwidth; too many secure devices can slow down your Z-Wave network. We recommend only using secure inclusion for devices that require it, like locks or garage door openers.
</div>

## Removing Devices

To remove a [Z-Wave device](/docs/z-wave/devices/):

1. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/).
2. Click **Remove Node** in the *Z-Wave Network Management* card. This puts your [Z-Wave controller](/docs/z-wave/controllers/) in "exclusion" mode.
3. Activate your device by following the instructions provided with it. Usually, this involves pressing a button.
4. The device should now be removed, but that won't show until you restart Home Assistant. Look for a confirmation signal on the device if available, or confirm in the Home Assistant logs.
5. Click **Heal Network**. This is optional but helps optimize network speed.

If your device isn't responding to this process, possibly because you've factory reset it or it has failed, you can remove it using **Remove Failed Node**.

## Troubleshooting

Problems adding or removing devices?

### Already Added

If your device was previously added to another controller but not removed from it, **you must remove it before adding it to Home Assistant**.

1. **Remove the device from the old controller**, if possible. If your device was added to a different system (SmartThings, Wink, etc.) follow that system's instructions to remove the device. Then try adding the device to Home Assistant again.
2. If you can't remove it from the old controller, **try removing the device using Home Assistant**. Follow the instructions in [Removing Devices](#removing-devices); even though it hasn't been added to Home Assistant yet, most Z-Wave devices will respond to exclusion mode from *any* controller. Then try adding the device to Home Assistant again. (Secure devices with a theft protection feature may not allow this.)
3. If removing the device doesn't help, **try a factory reset** as a last resort. Check your device's manual for instructions.

### Range Issues

Normally you can add and remove devices as long as they are within range of any Z-Wave Plus device in your network, using a feature called [network-wide inclusion](https://z-wavealliance.org/z-wave_plus_certification/).

If you are using older non-Z-Wave Plus devices, your device may need to be within the range of your [controller](/docs/z-wave/controllers/) to be added or removed. If you cannot move the device (e.g., wall switches), you can try temporarily relocating your controller to be near your device. See the [Z-Wave Alliance documentation on Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) for more information on how to determine if your devices support Z-Wave Plus.

### Forcibly Removing Devices

You can use the **Remove Failed Node** button to remove a failed device (e.g., because it is broken). In rare cases, you may want to remove a device that has *not* failed. This is not recommended but can help when a device has not been recognized as failed.

1. Go to the *States* menu under *Developer tools* in the Home Assistant frontend
2. Click on the name of the `zwave.` entity you want to remove
3. Make note of the entity's "node_id" value as you will need to re-add the "node_id" attribute and value in step 4.
4. At the top, edit the JSON attributes to replace `false` with `true` for `"is_failed": false,` so that it reads `"is_failed": true.` Also add the "node_id" value to the number listed in the entity's attribute. The YAML attributes should look something like below:

    ```yaml
    node_id: 6
    is_failed: true
    ```

5. Click **Set State**
6. Go to the [Z-Wave control panel](/docs/z-wave/control-panel/)
7. Click **Remove Failed Node** in the *Z-Wave Node Management* card
8. The device will now be removed, but that won't show until you restart Home Assistant
