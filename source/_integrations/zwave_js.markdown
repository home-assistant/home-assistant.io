---
title: Z-Wave
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave JS.
featured: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Fan
  - Hub
  - Humidifier
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave_js
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - humidifier
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: hub
ha_zeroconf: true
related:
  - docs: /connect/zwa-2
    title: Home Assistant Connect ZWA-2 Z-Wave adapter
  - docs: /docs/z-wave/controllers/
    title: Other Z-Wave adapters
---

The **Z-Wave** {% term integration %} allows you to control a Z-Wave network from Home Assistant via the [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/) driver.

## Getting started

This section shows how to set up a Z-Wave network and how to add a Z-Wave end device to that network.

A Z-Wave network in Home Assistant includes the following elements:

- a Z-Wave adapter (for example, [Home Assistant Connect ZWA-2](/connect/zwa-2))
- a Z-Wave server (for example, the **Z-Wave JS** app (formerly known as an add-on))
- this Z-Wave integration
- Z-Wave end devices

### Setting up a Z-Wave server in Home Assistant

This section shows how to set up a Z-Wave server using the **Z-Wave JS** app in Home Assistant.

For other ways to set up a Z-Wave server, refer to the [advanced installation instructions](#advanced-installation-instructions).

Once you have set up the Z-Wave server, you can [add devices to the network](#adding-a-new-device-to-the-z-wave-network).

#### Prerequisites

- A [supported Z-Wave adapter](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules). 
  - First-time user? For recommendations, refer to the [what-to-buy-section](#which-z-wave-adapter-should-i-buy).

#### To set up a Z-Wave server

1. Open the Home Assistant user interface.
2. Plug the Z-Wave adapter into the device running Home Assistant.
   - Most likely, your adapter will be recognized automatically.
   - In the dialog, select **Recommended installation**.
     - This will install the Z-Wave JS app on the Home Assistant server.
   - Add the device to an {% term area %} and select **Finish**.
   - **Troubleshooting**: If your adapter is not recognized, follow [these steps](#my-z-wave-adapter-isnt-recognized-automatically-during-setup).

3. Wait for the installation to complete.
4. Depending on your Home Assistant version, you may be prompted for network security keys.
   - If you are using Z-Wave for the first time, leave all the fields empty and select **Submit**. The system will generate network security keys for you.
   - If this Z-Wave adapter has already been paired with secure devices, you need to enter the previously used network key as the S0 network key. S2 security keys will be automatically generated for you.
   - Make sure that you keep a backup of these keys in a safe place in case you need to move your Z-Wave adapter to another device. Copy and paste them somewhere safe.
5. Wait for the Z-Wave JS app to start up.
6. Once the installation is complete, the **Device info** of the Z-Wave adapter is shown.
   - You successfully installed the Z-Wave integration and the Z-Wave JS app.
   - You can now [add devices](/integrations/zwave_js/#adding-a-new-device-to-the-z-wave-network) to the Z-Wave network.

{% note %}
While your Z-Wave mesh is permanently stored on your adapter, the additional metadata is not. When the Z-Wave integration starts up the first time, it will interview your entire Z-Wave network. Depending on the number of devices paired with the Z-Wave adapter, this can take a while. You can speed up this process by manually waking up your battery-powered devices. Most of the time, this is a button press on those devices (see their manual). It is not necessary to exclude and re-include devices from the mesh.
{% endnote %}

### Adding a new device to the Z-Wave network

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Select **Add device**.
   - The Z-Wave adapter is now in inclusion mode.
3. Check if your device supports SmartStart:
   - On the packaging, check for the SmartStart label.
   - Find the QR code. It can be on the packaging or on the device itself.
4. Depending on whether your device supports SmartStart, follow the steps in either option 1 or 2:
   - **Option 1: your device supports SmartStart**:
     - Make sure the device is turned off.
     - Select **Scan QR code** and scan the QR code on your device.
       - **Troubleshooting**: If scanning does not work (for example due to missing HTTPS), paste the QR code content as text from a different QR reader and select **Submit**.
     - If the device supports Z-Wave Long Range, you're prompted to choose the network type.
       - **Long Range**: If it is far away from other devices, or that spot has had connection issues in the past. It might also help preserve battery life.
       - **Mesh**: If you already have a mesh network. Adding it can enhance coverage and reliability of this network.
       - You can always remove and pair the device again to switch to the other network type.
     - Turn the device on and set it into inclusion mode.
       - If it was already on, you might need to power-cycle it.
   - **Option 2: your device does not support SmartStart**:
     - Set the device in inclusion mode. Refer to the device manual to see how this is done.
     - If your device is included using S2 security, you may be prompted to enter a PIN number provided with your device. Often, this PIN is provided with the documentation _and_ is also printed on the device itself. For more information on secure inclusion, refer to [this section](/integrations/zwave_js/#should-i-use-secure-inclusion).
5. The UI should confirm that the device was added. After a short while (seconds to minutes), the entities should also be created.
6. **Troubleshooting**: If the adapter fails to add/find your device, cancel the inclusion process.
   - In some cases, it might help to first [remove](#removing-a-device-from-a-foreign-z-wave-network) a device (exclusion) before you add it, even when the device has not been added to this Z-Wave network yet.
   - Another approach would be to factory reset the device. Refer to the device manual to see how this is done.

**Important:**

1. **Do not move your Z-Wave adapter to include devices.** Moving the adapter is no longer necessary and leads to broken routes.
2. **Do not initiate device inclusion from the Z-Wave adapter itself.** This is no longer supported.

### Removing a device from the current Z-Wave network

Do this before using the device with another adapter, or when you don't use the device anymore. It removes the device from the Z-Wave network stored on the adapter. It also removes the device and all its entities from Home Assistant. You can not join a device to a new network if it is still paired with an adapter.

1. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Z-Wave** integration.
   - Then, select the device you want to remove.
3. Under **Device info**, select the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Delete**.
   - This opens a dialog with options for removing the device.
4. Select **Remove a working device**.
   - The Z-Wave adapter is now in exclusion mode.
5. Put the device you want to remove in exclusion mode. Refer to its manual to learn how this is done.
6. The UI should confirm that the device was removed and the device and entities will be removed from Home Assistant.

### Removing a device from a foreign Z-Wave network

Do this when you have a device that is still paired with an adapter, but you don't have access to that adapter anymore. If the device was not excluded from that adapter, you cannot join it to a new network. This process removes the device from the previous adapter's network, allowing you to pair it with a new adapter.

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Select **Options**.
3. Next to **Remove foreign device**, select **Remove** > **Start exclusion**.
4. Put the device you want to remove in exclusion mode. Refer to its manual to learn how this is done.
5. The UI should confirm that the device was removed and the device and entities will be removed from Home Assistant.

## Migrating a Z-Wave network to a new adapter

Do this if you have an existing Z-Wave network and want to replace its adapter with a new adapter. The Z-Wave integration with all its entities will stay in Home Assistant. The new adapter is added to Home Assistant and paired with the existing network.

{% tip %}
You cannot run two Z-Wave adapters at the same time with the same Z-Wave app instance. If you only want to use a single app instance, you need to migrate the network to the new adapter. If you want to use two adapters at the same time, you need a second Z-Wave JS Server instance. You can run this additional Z-Wave JS Server instance in a separate container, or run Z-Wave JS Server or Z-Wave JS UI on another system outside of Home Assistant.
{% endtip %}

### Prerequisites

- Administrator rights in Home Assistant

#### Device-specific prerequisites

{% details "Migrating from a 500 series adapter" %}

Before starting migration, you need to update the adapter to SDK 6.61+

- Check the documentation of your device to see if and how they can be updated.
- [Steps to update Aeotec Z-Stick 5](https://aeotec.freshdesk.com/support/solutions/articles/6000252294-z-stick-gen5-v1-02-firmware-update).

{% enddetails %}

{% details "Migrating from a Nortek HUSBZB-1 adapter" %}

There is no easy way to update that device.

- You need to set up a new network.
- If you are comfortable with soldering:
  - Some users have reported that they were able to upgrade the firmware of the **Nortek HUSBZB-1** with [this update procedure (requires soldering)](https://community.hubitat.com/t/guide-nortek-husbzb-1-nvm-backup-restore-and-updating-z-wave-firmware/48012).
  - The procedure is very involved. Most likely, starting from scratch is quicker.

{% enddetails %}

### To migrate a Z-Wave network to a new adapter

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Under **Migrate adapter**, select **Migrate**.
3. When the **Unplug your adapter** dialog shows up, unplug your old adapter.
   - It is important to remove the old device now, as it might interfere with the new one. Even though it might not throw an error immediately, it might cause issues.
4. Connect the new adapter.
5. Select **Submit**.
6. In the **Select your device** dialog, select the Z-Wave adapter you just connected.
   - Typically, you can select the device you connected to a USB port.
   - To connect to a Z-Wave controller that you exposed elsewhere via TCP (such as [Portable Z-Wave](https://www.home-assistant.io/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/)), select the **Use socket** option.
7. Select **Submit**.
   - The new adapter is now being paired with your existing Z-Wave network.
   - **Troubleshooting**: If the migration fails, it might be because you selected **Use socket** by mistake. If you were using a USB-based controller, plug the old adapter in again, and wait for the network to reload.
     - Once your old adapter is connected and the network is operational, repeat the migration steps.
     - Make sure to select the new controller this time (instead of **Use socket**).
8. Once the migration has completed, check if you want to rename the adapter. If you have previously changed the name, the new adapter might keep the name of the old adapter.
   - In the top-left corner, select the back button to go back to the integration page.
   - In the list of devices, check the device name.
   - To change the device name, select the {% icon "mdi:pencil" %} button.

## Migrating from Z-Wave JS UI to the Z-Wave JS app

If you have been using the Z-Wave JS UI app, you can migrate to the Z-Wave JS app without needing to re-pair your devices. The Z-Wave JS app is the successor of the Z-Wave JS UI app and provides a better experience and more features. The migration process involves installing the Z-Wave JS app, which will automatically take over from the Z-Wave JS UI app.

### Prerequisites

- Administrator rights in Home Assistant
- Your Z-Wave network is currently managed by the Z-Wave JS UI app

### Installing necessary apps

1. In Home Assistant, go to {% my supervisor_addon addon="core_zwave_js" title="**Settings** > **Apps** > **Z-Wave JS**" %}.
2. Install the Z-Wave JS app by selecting **Install**.
   - Do not start the app yet.
3. Install necessary helper apps:
   - Install the [**Terminal & SSH** app](/common-tasks/os/#installing-and-using-the-ssh-app) so you can run commands on the Home Assistant host.
   - Install an app that lets you upload and edit files on the Home Assistant host, like the [**File Editor** app](/common-tasks/os/#installing-and-using-the-file-editor-app) or the [**Studio Code Server** app](/common-tasks/os/#installing-and-using-the-visual-studio-code-vsc-app).

### Downloading the backup from Z-Wave JS UI

1. Open **Z-Wave JS UI** web interface and go to the **Store** tab.

   ![Store tab in the Z-Wave JS UI web interface](/images/integrations/z-wave/z-wave-js-ui-store-tab.png)

2. Download a backup:
   - In the bottom-right corner, select **Download**.

   ![Download button in the Z-Wave JS UI web interface](/images/integrations/z-wave/z-wave-js-ui-download-backup.png)

3. Stop the **Z-Wave JS UI** app.

### Running the migration script

1. Download the migration script `.zip` file from `https://gist.github.com/AlCalzone/eb0947a39a3ff91c053f259f0ac4efc3#file-migrate_to_zwave_js_app-sh`.
2. Extract the zip file and locate the `migrate_to_zwave_js_app.sh` script.
3. Locate the backup file you downloaded from the Z-Wave JS UI web interface. It should be a `.zip` file.
4. Open the Studio Code Server or SSH app.
5. Upload the backup file and the migration script into a temporary folder, ideally the `/tmp` folder.
6. Open the terminal, then use `cd /tmp` to navigate to the `/tmp` folder.

   ![Navigating to the temp folder in the terminal](/images/integrations/z-wave/z-wave-js-ui-migration-tmp-1.png)

7. Make the script executable by running `chmod +x ./migrate_to_zwave_js_app.sh`

   ![Make the script executable in the terminal](/images/integrations/z-wave/z-wave-js-ui-migration-run-chmod.png)

8. Run `./migrate_to_zwave_js_app.sh <backup-filename>`, then follow the on-screen instructions:

   ![Running the migration script in the terminal](/images/integrations/z-wave/z-wave-js-ui-migration-run-script.png)

### Reconfiguring the Z-Wave integration to use the Z-Wave JS app

1. Go to {% my integrations title="**Settings** > **Devices & services**" domain="zwave_js" %}.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu, then choose **Reconfigure**.

   ![Reconfiguring the Z-Wave integration](/images/integrations/z-wave/z-wave-js-ui-migration-reconfigure.png)

3. Select **Reconfigure the current adapter**.

   ![Reconfiguring the current adapter](/images/integrations/z-wave/z-wave-js-ui-migration-reconfigure-adapter.png)

4. Depending on how your controller is connected, you might need to either select or clear the **Use the Z-Wave Supervisor app** checkbox.
   - _Option 1:_ If you are using a USB-based or TCP-based controller:
     - Select the **Use the Z-Wave Supervisor app** checkbox.

       ![Selecting the Z-Wave Supervisor app checkbox](/images/integrations/z-wave/z-wave-js-ui-migration-select-option.png)

     - In the next step, select your controller and select **Submit**.

       ![Reconfiguring the current adapter](/images/integrations/z-wave/z-wave-js-ui-migration-select-adapter-1.png)

   - _Option 2:_ If you are using a GPIO module or if your controller is not showing up in the list:
     - Clear the **Use the Z-Wave Supervisor app** checkbox.

       ![Deselecting the Z-Wave Supervisor app](/images/integrations/z-wave/z-wave-js-ui-migration-deselect-option.png)

     - Enter the connection details for your Z-Wave JS app:
       - In the **URL** field, enter `ws://core-zwave-js:3000`.

       ![Reconfiguring the current adapter](/images/integrations/z-wave/z-wave-js-ui-migration-enter-url.png)

5. Remove the temporary files you uploaded to the `/tmp` folder for the migration.
6. Done! Your Z-Wave JS app is now managing your Z-Wave network. You can start the Z-Wave JS app and stop and uninstall the Z-Wave JS UI app.

## Overriding the radio frequency region of the adapter in the Z-Wave JS app

The frequency used by Z-Wave devices depends on your region. For 700 and 800 series adapters, this frequency can be changed. The frequency of end devices cannot, so you need to make sure to buy devices specific to your region.

If you are using the Z-Wave JS app, Home Assistant automatically changes the radio frequency region to match the region/country you're in. If needed, you can override this setting.

### Prerequisites

- Administrator rights in Home Assistant
- All your Z-Wave devices must be specified for that region
- Note: this procedure only applies if your adapter is [set up using the Z-Wave JS app](#to-set-up-a-z-wave-server)

### To override the radio frequency region of your Z-Wave adapter

1. Go to {% my supervisor_addon addon="core_zwave_js" title="**Settings** > **Apps** > **Z-Wave JS**" %}.
2. Open the **Configuration** tab.
3. In the **Options** section, select the **Radio Frequency Region**.
   - **Automatic** sets the region based on the location defined under {% my general title="**Settings** > **System** > **General**" %}.
   - For regions where Long Range is available, it uses Long Range if the adapter supports it.
   - If you set regions manually, choose one of the Long Range options where available:
     - **Europe (Long Range)** or **USA (Long Range)**.
   - Even with the Long Range option selected, you can still add devices that don't support Long Range.
4. To apply your changes, select **Save**.
   - Your Z-Wave adapter is now ready to communicate with devices that were specified for your chosen region.
5. To return to the default setting and use the region defined by Home Assistant, under **Radio Frequency Region** choose **Automatic**.

## Backing up your Z-Wave network

It's recommended to create a backup before making any major changes to your Z-Wave network. For example, before migrating from one adapter to another, or before resetting your adapter. The backup stores your Z-Wave adapter's non-volatile memory (NVM), which contains your network information including paired devices. It is stored in a binary file that you can download.

### Prerequisites

- Administrator rights in Home Assistant

### To backup your Z-Wave network

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Under **Download backup**, select **Download**.
   - **Result**: The backup file is downloaded to the device from which you initiated the download.
3. Done! Store the backup file somewhere safe in case you need it later to restore your Z-Wave network.

## Restoring your Z-Wave network from a backup

You can restore your Z-Wave network from a backup.

### Prerequisites

- Administrator rights in Home Assistant
- Have a [backup](#backing-up-your-z-wave-network) downloaded

### Restoring a Z-Wave network from backup

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Under **Restore from backup**, select **Restore**.
   - Select the backup you want to restore from.
   - **Result**: The Z-Wave network is being restored and the devices that were part of the network should show up again.

## Updating the firmware of your Z-Wave device

Adapters and devices with the Firmware Update Metadata Command Class allow you to update the firmware by uploading a firmware file. In those cases, you can start the firmware update from the device page in Home Assistant. Refer to the documentation of the device manufacturer to find the corresponding firmware file. An example is the [firmware page by Zooz](https://www.support.getzooz.com/kb/article/1158-zooz-ota-firmware-files/).

{% note %}
**Risk of damage to the device due to firmware update**

A firmware update can damage your Z-Wave device.

- Before updating your Z-Wave device, make sure an update is necessary, and that you have the correct firmware file matching your device.
- Once you have started the update process, you must not interrupt the update process but let it complete.

The Home Assistant and Z-Wave JS teams do not take any responsibility for any damages to your device as a result of the firmware update and will not be able to help you if you render your device useless due to firmware update.
{% endnote %}

### Prerequisites

- Administrator rights in Home Assistant
- Downloaded the firmware file from the manufacturer website

### To update firmware of a Z-Wave device

1. In Home Assistant, go to {% my config_zwave_js title="**Settings** > **Z-Wave**" %}.
2. Select **Devices**.
   - Then select the device you want to update.
3. Under **Device info**, select the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Update**.
4. Select the firmware file that you previously downloaded to your computer.
   - **Notice: Risk of damage to the device**
     - Make sure you select the correct firmware file.
       - An incorrect firmware file can damage your device.
     - Once you start the update process, you must wait for the update to complete.
       - An interrupted update can damage your device.
5. Select **Begin firmware update** and wait for it to complete.

## Resetting a Z-Wave adapter

It is recommended to back up your Z-Wave network before resetting the device.

- The adapter will forget all devices it is paired with.
- All Z-Wave devices for this network will be removed from Home Assistant.

- If there are any devices still paired with the adapter when it is reset, they will have to go through the exclusion process before they can be re-paired.
- The device firmware will remain on the device.

### Prerequisites

- Administrator rights on Home Assistant
- [Backup your Z-Wave network](#backing-up-your-z-wave-network)
- [Remove all devices that are paired with your adapter from the network](#removing-a-device-from-the-z-wave-network).
  - Removing can be done by any adapter, not just the one that originally managed the network. In theory, this could also be done later.

### To reset a Z-Wave adapter

1. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Z-Wave** integration. Then, select the controller.
3. Under **Device info**, select the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Factory reset**.


    ![Screenshot showing the device panel of a Z-Wave adapter](/images/integrations/z-wave/z-wave-controller-commands.png)
4. On the device info page, check the **Activity** panel. When you see that the status entity became unavailable, the reset process is finished.
   - You can now unplug the adapter and use it to start a new network, or pass it on to someone else.
5. If you no longer need the Z-Wave integration, you can [remove it](#removing-z-wave-js-from-home-assistant) from Home Assistant.

## Special Z-Wave entities

The Z-Wave integration provides several special entities, some of which are available for every Z-Wave device, and some of which are conditional based on the device.

### Entities available for every Z-Wave device

1. **Node status** sensor: This sensor shows the node status for a given Z-Wave device. The sensor is disabled by default. The available node statuses are explained in the [Z-Wave JS documentation](https://zwave-js.github.io/node-zwave-js/#/api/node?id=status). They can be used in state change automations. For example to ping a device when it is dead, or refresh values when it wakes up.
2. **Ping** button: This button can be pressed to ping a device. It is an alternative to the `zwave_js.ping` action.
3. **Adapter/node statistics** sensors: Z-Wave JS collects statistics about communications between [nodes](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotstatistics-updatedquot) and the [adapter](https://zwave-js.github.io/node-zwave-js/#/api/controller?id=quotstatistics-updatedquot). The statistics can be used to troubleshoot RF issues in your environment. These statistics are available in the network configuration and device info panels. But they are also available as sensors which are disabled by default.

### Conditional entities

1. Button to **manually idle notifications**: Any Notification Command Class (CC) values on a device that have an idle state will get a corresponding button entity. This button entity can be used to manually idle a notification when it doesn't automatically clear on its own. A device can have multiple Notification CC values. For example one for detecting smoke and one for detecting carbon monoxide.

## Using advanced features (UI only)

While the integration aims to provide as much functionality as possible through existing Home Assistant constructs (entities, states, automations, actions, etc.), there are some features that are only available through the UI.

All of these features can be accessed either in the Z-Wave integration configuration panel or in a Z-Wave device's device panel.

### Integration configuration panel

The following features can be accessed from the integration configuration panel:

![Z-Wave integration configuration panel](/images/integrations/z-wave/z-wave-integration-config-panel.png)

- **Add device**: Button in the bottom-right corner. Allows you to pre-provision a SmartStart device or start the inclusion process for adding a new device to your network.

The **My network** section gives you access to the device and entity lists for your Z-Wave network.

- **Show map**: Allows you to see a visual representation of your Z-Wave network, showing the devices and the routes between them. This can be helpful to troubleshoot issues in your network.

- **Options** > **Remove device**: Starts the exclusion process for [removing a foreign device from a network](#removing-a-device-from-a-foreign-z-wave-network). This allows you to remove a device that is still paired to another Z-Wave adapter.
- **Options** > **Discover and assign new routes**: Discovers new routes between the adapter and the device. This is useful when devices or the adapter have moved to a new location, or if you are having significant problems with your network. The discovery process generates a lot of network traffic and should be used sparingly.
- **[Statistics](https://zwave-js.github.io/node-zwave-js/#/api/controller?id=quotstatistics-updatedquot)**: Provides statistics about communication between the adapter and other devices, allowing you to troubleshoot your network's RF quality.
- **Logs**: Provides access to Z-Wave JS logs, which can be helpful to troubleshoot issues with your network.
- **Analytics**: Allows you to opt in or out of telemetry that the Z-Wave JS project collects to help development and manufacturers make informed decisions. This telemetry is disabled by default and has to be opted in to be activated.
- **Network information**: Metadata about your Z-Wave network, such as the Home ID, server version, or server URL. This information can be helpful when troubleshooting your network or when contacting support.
- **Download backup**: Create and [download a backup of your Z-Wave network](#backing-up-your-z-wave-network). The backup contains the non-volatile memory (NVM) of your Z-Wave adapter, which includes all paired devices. It is recommended to create a backup before making any major changes to your Z-Wave network, such as migrating to a new adapter or resetting your adapter.
- **Restore from backup**: [Restore your Z-Wave network from a backup file](#restoring-a-z-wave-network-from-backup) that you previously downloaded. This can be helpful when migrating to a new adapter, or when you want to restore your network after resetting your adapter.
- **Migrate adapter**: Allows you to [migrate your Z-Wave network to a new adapter](#migrating-a-z-wave-network-to-a-new-adapter).

#### About network information

The **Network information** section in the integration configuration panel shows metadata about your Z-Wave network and the software running it. This information is useful when troubleshooting issues or when contacting support.

- **Home ID**: A unique identifier assigned to your Z-Wave network. Every device paired to your network shares this ID. It can be used to verify that a device belongs to your network or to identify your network when seeking help.
- **Driver version**: The version of the [Z-Wave JS driver](https://github.com/zwave-js/node-zwave-js) running on your Z-Wave JS server. The driver is the core library that communicates directly with your Z-Wave adapter.
- **Server version**: The version of the [Z-Wave JS server](https://github.com/zwave-js/zwave-js-server) running in your setup. The server acts as the bridge between the Z-Wave JS driver and Home Assistant.
- **Server URL**: The WebSocket URL that Home Assistant uses to connect to your Z-Wave JS server, for example `ws://homeassistant.local:3000`. This can be useful when you need to verify or reconfigure the connection between Home Assistant and the Z-Wave JS server.

### Integration menu

Some features can be accessed from the menu of integration itself. As they are not specific to Z-Wave, they are not described here in detail.
![Z-Wave integration configuration panel](/images/integrations/z-wave/z-wave-integration-menu.png)

- **[Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics):** Exports a JSON file describing the entities of all devices registered with this integration.

#### Network devices

The following features can be accessed from the device panel of any Z-Wave device on your network aside from the adapter:

![Z-Wave device panel](/images/integrations/z-wave/z-wave-device-info.png)

- **Configure:** Provides an easy way to look up and update configuration parameters for the device. While there is an existing action for setting configuration parameter values, this UI may sometimes be quicker to use for one-off changes.
- **Re-interview:** Forces the device to go through the interview process again so that Z-Wave-JS can discover all of its capabilities. Can be helpful if you don't see all the expected entities for your device.
- **Rebuild routes:** Discovers new routes between the adapter and the device. Use this if you think you are experiencing unexpected delays or RF issues with your device. Your device may be less responsive during this process.
- **Delete:** Opens a dialog with the following options for removing the device:
   - Removing it from the network using exclusion
   - Removing a failed device from the adapter without excluding it from the network
- **[Statistics](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotstatistics-updatedquot):** Provides statistics about communication between this device and the adapter, allowing you to troubleshoot RF issues with the device.
- **Update:** Updates a device's firmware using a manually uploaded firmware file. Only some devices support this feature (adapters and devices with the Firmware Update Metadata Command Class).
- **Download diagnostics:** Exports a JSON file describing the entities of this specific device.

## Actions

### Action: Set config parameter

The `zwave_js.set_config_parameter` action updates a configuration parameter. To update multiple partial parameters in a single call, use the `zwave_js.bulk_set_partial_config_parameters` action.

| Data attribute | Required | Description                                                                                                                                                                                                                                                                |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Entity (or list of entities) to set the configuration parameter on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                  |
| `device_id`    | no       | Device ID (or list of device IDs) to set the configuration parameter on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                             |
| `area_id`      | no       | Area ID (or list of area IDs) for devices/entities to set the configuration parameter on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                            |
| `parameter`    | yes      | The parameter number or the name of the property. The name of the property is case sensitive.                                                                                                                                                                              |
| `bitmask`      | no       | The bitmask for a partial parameter in hex (0xff) or decimal (255) format. If the name of the parameter is provided, this is not needed. Cannot be combined with value_size or value_format.                                                                               |
| `value`        | yes      | The target value for the parameter as the integer value or the state label. The state label is case sensitive.                                                                                                                                                             |
| `value_size`   | no       | The size of the target parameter value, either 1, 2, or 4. Used in combination with value_format when a config parameter is not defined in your device's configuration file. Cannot be combined with bitmask.                                                              |
| `value_format` | no       | The format of the target parameter value, 0 for signed integer, 1 for unsigned integer, 2 for enumerated, 3 for bitfield. Used in combination with value_size when a config parameter is not defined in your device's configuration file. Cannot be combined with bitmask. |

#### Examples of setting a single parameter value

Let's use parameter 31 for [this device](https://devices.zwave-js.io/?jumpTo=0x000c:0x0203:0x0001:0.0) as an example to show examples of different ways that the `LED 1 Blink Status (bottom)` partial parameter can be set. Note that in places where we are using different values for the same key, the different values are interchangeable across the examples. We can, for instance, use `1` or `Blink` interchangeably for the `value` in all of the examples.

Example 1:

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  parameter: 31
  bitmask: 0x01
  value: 1
```

Example 2:

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  parameter: 31
  bitmask: 1
  value: "Blink"
```

Example 3:

```yaml
action: zwave_js.set_config_parameter
target:
  entity_id: switch.fan
data:
  entity_id: switch.fan
  parameter: "LED 1 Blink Status (bottom)"
  value: "Blink"
```

### Action: Bulk set partial config parameters

The `zwave_js.bulk_set_partial_config_parameters` action bulk sets multiple partial configuration parameters. Be warned that correctly using this action requires advanced knowledge of Z-Wave.

| Data attribute | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Entity (or list of entities) to bulk set partial configuration parameters on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                                                                                                                                                                     |
| `device_id`    | no       | Device ID (or list of device IDs) to bulk set partial configuration parameters on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                                                                                                                                                                |
| `area_id`      | no       | Area ID (or list of area IDs) for devices/entities to bulk set partial configuration parameters on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                                                                                                                                               |
| `parameter`    | yes      | The parameter number of the property. The name of the property is case sensitive.                                                                                                                                                                                                                                                                                                                                                       |
| `value`        | yes      | Either the raw integer value that you want to set for the entire parameter, or a dictionary where the keys are either the bitmasks (in integer or hex form) or the partial parameter name and the values are the value you want to set on each partial (either the integer value or a named state when applicable). Note that when using a dictionary, and bitmasks that are not provided will be set to their currently cached values. |

#### Examples of bulk setting partial parameter values

Let's use parameter 21 for [this device](https://devices.zwave-js.io/?jumpTo=0x031e:0x000a:0x0001:0.0) as an example to show how partial parameters can be bulk set. In this case, we want to set `0xff` to `127`, `0x7f00` to `10`, and `0x8000` to `1` (or the raw value of `4735`).

{% note %}
When using the dictionary format to map the partial parameter to values, the cached values for the missing partial parameters will be used. So in examples 2, 3, 4, and 5, the action would use the cached value for partial parameters `0xff0000`, `0x3f000000`, and `0x40000000` because new values haven't been specified. If you send the raw integer value, it is assumed that you have calculated the full value, so in example 1, partial parameters `0xff0000`, `0x3f000000`, and `0x40000000` would all be set to `0`.
{% endnote %}

Example 1:

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value: 4735
```

Example 2:

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    0xff: 127
    0x7f00: 10
    0x8000: 1
```

Example 3:

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    255: 127
    32512: 10
    32768: 1
```

Example 4:

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    255: 127
    32512: 10
    32768: "Fine"
```

Example 5:

```yaml
action: zwave_js.bulk_set_partial_config_parameters
target:
  entity_id: switch.fan
data:
  parameter: 21
  value:
    "Quick Strip Effect: Hue Color Wheel / Color Temp": 127
    "Quick Strip Effect Intensity": 10
    "Quick Strip Effect Intensity Scale": "Fine"
```

### Action: Refresh value

The `zwave_js.refresh_value` action refreshes the value(s) for an entity. This action will generate extra traffic on your Z-Wave network and should be used sparingly. Updates from devices on battery may take some time to be received.

| Data attribute       | Required | Description                                                                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`          | yes      | Entity or list of entities to refresh values for.                                                                                                |
| `refresh_all_values` | no       | Whether all values should be refreshed. If  `false`, only the primary value will be refreshed. If  `true`, all watched values will be refreshed. |

### Action: Set value

The `zwave_js.set_value` action sets a value on a Z-Wave device. It is for advanced use cases where you need to modify the state of a node and can't do it using native Home Assistant entity functionality. Be warned that correctly using this action requires advanced knowledge of Z-Wave. The action provides minimal validation and blindly calls the Z-Wave JS API, so if you are having trouble using it, it is likely because you are providing an incorrect value somewhere. To set a config parameter, you should use the `zwave_js.set_config_parameter` or `zwave_js.bulk_set_partial_config_parameters` action instead of this one.

| Data attribute    | Required | Description                                                                                                                                                                                                                                                             |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`       | no       | Entity (or list of entities) to set the value on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                                 |
| `device_id`       | no       | Device ID (or list of device IDs) to set the value on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                                            |
| `area_id`         | no       | Area ID (or list of area IDs) for devices/entities to set the value on. At least one `entity_id`, `device_id`, or `area_id` must be provided.                                                                                                                           |
| `command_class`   | yes      | ID of Command Class that you want to set the value for.                                                                                                                                                                                                                 |
| `property`        | yes      | ID of Property that you want to set the value for.                                                                                                                                                                                                                      |
| `property_key`    | no       | ID of Property Key that you want to set the value for.                                                                                                                                                                                                                  |
| `endpoint`        | no       | ID of Endpoint that you want to set the value for.                                                                                                                                                                                                                      |
| `value`           | yes      | The new value that you want to set.                                                                                                                                                                                                                                     |
| `options`         | no       | Set value options map. Refer to the Z-Wave JS documentation for more information on what options can be set.                                                                                                                                                            |
| `wait_for_result` | no       | Boolean that indicates whether or not to wait for a response from the node. If not included in the payload, the integration will decide whether to wait or not. If set to `true`, note that the action can take a while if setting a value on an asleep battery device. |

### Action: Multicast set value

The `zwave_js.multicast_set_value` action sets a value on multiple Z-Wave devices using multicast. It is for advanced use cases where you need to set the same value on multiple nodes simultaneously. Be warned that correctly using this action requires advanced knowledge of Z-Wave. The action provides minimal validation beyond what is necessary to properly call the Z-Wave JS API, so if you are having trouble using it, it is likely because you are providing an incorrect value somewhere.

| Data attribute  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`     | no       | Entity (or list of entities) to set the value on via multicast. At least two `entity_id` or `device_id` must be resolved if not broadcasting the command.                                                                                                                                                                                                                                   |
| `device_id`     | no       | Device ID (or list of device IDs) to set the value on via multicast. At least two `entity_id` or `device_id` must be resolved if not broadcasting the command.                                                                                                                                                                                                                              |
| `area_id`       | no       | Area ID (or list of area IDs) for devices/entities to set the value on via multicast. At least two `entity_id` or `device_id` must be resolved if not broadcasting the command.                                                                                                                                                                                                             |
| `broadcast`     | no       | Boolean that indicates whether you want the message to be broadcast to all nodes on the network. If you have only one Z-Wave network configured, you do not need to provide a `device_id` or `entity_id` when this is set to true. When you have multiple Z-Wave networks configured, you MUST provide at least one `device_id` or `entity_id` so the action knows which network to target. |
| `command_class` | yes      | ID of Command Class that you want to set the value for.                                                                                                                                                                                                                                                                                                                                     |
| `property`      | yes      | ID of Property that you want to set the value for.                                                                                                                                                                                                                                                                                                                                          |
| `property_key`  | no       | ID of Property Key that you want to set the value for.                                                                                                                                                                                                                                                                                                                                      |
| `endpoint`      | no       | ID of Endpoint that you want to set the value for.                                                                                                                                                                                                                                                                                                                                          |
| `value`         | yes      | The new value that you want to set.                                                                                                                                                                                                                                                                                                                                                         |
| `options`       | no       | Set value options map. Refer to the Z-Wave JS documentation for more information on what options can be set.                                                                                                                                                                                                                                                                                |

### Action: Invoke Command Class API

The `zwave_js.invoke_cc_api` action uses the Command Class API directly. In most cases, the `zwave_js.set_value` action will accomplish what you need, but some Command Classes have API commands that can't be accessed via that action. Refer to the [Z-Wave JS Command Class documentation](https://zwave-js.github.io/node-zwave-js/#/api/CCs/index) for the available APIs and arguments. Be sure to know what you are doing when calling this action.

| Data attribute  | Required | Description                                                                                                                                                                                                                                                                                                            |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`     | no       | Entity (or list of entities) to ping. At least one `entity_id`, `device_id`, or `area_id` must be provided. If `endpoint` is specified, that endpoint will be used to make the CC API call for all devices, otherwise the primary value endpoint will be used for each entity.                                         |
| `device_id`     | no       | Device ID (or list of device IDs) to ping. At least one `entity_id`, `device_id`, or `area_id` must be provided. If `endpoint` is specified, that endpoint will be used to make the CC API call for all devices, otherwise the root endpoint (0) will be used for each device.                                         |
| `area_id`       | no       | Area ID (or list of area IDs) for devices/entities to ping. At least one `entity_id`, `device_id`, or `area_id` must be provided. If `endpoint` is specified, that endpoint will be used to make the CC API call for all devices, otherwise the root endpoint (0) will be used for each `zwave_js` device in the area. |
| `command_class` | yes      | ID of Command Class that you want to set the value for.                                                                                                                                                                                                                                                                |
| `endpoint`      | no       | The endpoint to call the CC API against.                                                                                                                                                                                                                                                                               |
| `method_name`   | yes      | The name of the method that is being called from the CC API.                                                                                                                                                                                                                                                           |
| `parameters`    | yes      | A list of parameters to pass to the CC API method.                                                                                                                                                                                                                                                                     |

### Action: Refresh notifications

The `zwave_js.refresh_notifications` action refreshes the notifications of a given type on a device that supports the Notification Command Class.

| Data attribute       | Required | Description                                                                                                                                            |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`          | no       | Entity (or list of entities) to refresh notifications for. At least one `entity_id`, `device_id`, or `area_id` must be provided.                       |
| `device_id`          | no       | Device ID (or list of device IDs) to refresh notifications for. At least one `entity_id`, `device_id`, or `area_id` must be provided.                  |
| `area_id`            | no       | Area ID (or list of area IDs) for devices/entities to refresh notifications for. At least one `entity_id`, `device_id`, or `area_id` must be provided. |
| `notification_type`  | yes      | The type of notification to refresh.                                                                                                                   |
| `notification_event` | no       | The notification event to refresh.                                                                                                                     |

### Action: Reset meter

The `zwave_js.reset_meter` action resets the meters on a device that supports the Meter Command Class.

| Data attribute | Required | Description                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `entity_id`    | yes      | Entity (or list of entities) for the meters you want to reset.                                              |
| `meter_type`   | no       | If supported by the device, indicates the type of meter to reset. Not all devices support this option.      |
| `value`        | no       | If supported by the device, indicates the value to reset the meter to. Not all devices support this option. |

### Action: Set lock configuration

The `zwave_js.set_lock_configuration` action sets the configuration of a lock.

| Data attribute          | Required | Description                                                                                              |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `entity_id`             | no       | Lock entity or list of entities to set the usercode.                                                     |
| `operation_type`        | yes      | Lock operation type, one of `timed` or `constant`.                                                       |
| `lock_timeout`          | no       | Seconds until lock mode times out. Should only be used if operation type is `timed`.                     |
| `auto_relock_time`      | no       | Duration in seconds until lock returns to secure state. Only enforced when operation type is `constant`. |
| `hold_and_release_time` | no       | Duration in seconds the latch stays retracted.                                                           |
| `twist_assist`          | no       | Enable Twist Assist.                                                                                     |
| `block_to_block`        | no       | Enable block-to-block functionality.                                                                     |

### Action: Set lock usercode

The `zwave_js.set_lock_usercode` action sets the usercode of a lock to X at code slot Y. Valid usercodes are at least 4 digits.

| Data attribute | Required | Description                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `entity_id`    | no       | Lock entity or list of entities to set the usercode. |
| `code_slot`    | yes      | The code slot to set the usercode into.              |
| `usercode`     | yes      | The code to set in the slot.                         |

### Action: Clear lock usercode

The `zwave_js.clear_lock_usercode` action clears the usercode of a lock in code slot X.
Valid code slots are between 1-254.

| Data attribute | Required | Description                                            |
| -------------- | -------- | ------------------------------------------------------ |
| `entity_id`    | no       | Lock entity or list of entities to clear the usercode. |
| `code_slot`    | yes      | The code slot to clear the usercode from.              |

### Action: Get lock usercode

The `zwave_js.get_lock_usercode` action retrieves [usercodes](/docs/scripts/perform-actions#use-templates-to-handle-response-data) from a lock. You can query a specific code slot or retrieve all code slots at once. Returns the usercode and in-use status for each slot.

| Data attribute | Required | Description                                                                                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | Lock entity or list of entities to get usercodes from.                                                                                        |
| `code_slot`    | no       | The code slot to retrieve. If not specified, all code slots are returned.                                                                     |

{% details "Example action response" %}

```yaml
"1":
  usercode: "1234"
  in_use: true
"2":
  usercode: ""
  in_use: false
```

{% enddetails %}

## Events

There are two types of events that are fired, notification events and value notification events. You can test what events come in using the event {% my developer_events title="developer tools in Home Assistant" %} and subscribing to the `zwave_js_notification` or `zwave_js_value_notification` events respectively. Once you know what the event data looks like, you can use this to create automations.

### Node events (Notification)

Check the [Z-Wave JS notification event documentation](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotnotificationquot) for an explanation of the notification event data. These events fire with the `zwave_js_notification` event type.

Notification event data can be used to trigger automations, both in the automation UI and in YAML, using the event platform. Check the details of an event by subscribing to the zwave_js_notification event in the [Developers Tools](/docs/tools/dev-tools/#subscribe-to-an-event).

```yaml
# Fires whenever the lock is unlocked by the keypad.
triggers:
  - trigger: event
    event_type: zwave_js_notification
    event_data:
      node_id: 14
      event_label: "Keypad unlock operation"
```

#### Notification Command Class

These are notification events fired by devices using the Notification Command Class. The `parameters` attribute in the example below is optional, and when it is included, the keys in the attribute will vary depending on the event.

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "command_class": 113,
    "command_class_name": "Notification",
    "type": 6,
    "event": 5,
    "label": "Access Control",
    "event_label": "Keypad lock operation",
    "parameters": {"userId": 1}
}
```

#### Multilevel Switch Command Class

These are notification events fired by devices using the Multilevel Switch Command Class. There are events for start level change and stop level change. These would typically be used in a device like the Aeotec Nano Dimmer with an external switch to respond to long button presses.

##### Start level change

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": 974823419,
    "device_id": "2f44f0d4152be3123f7ad40cf3abd095",
    "command_class": 38,
    "command_class_name": "Multilevel Switch",
    "event_type": 4,
    "event_type_label": "label 1",
    "direction": "up"
},
```

##### Stop level change

```json
{
    "domain": "zwave_js",
    "node_id": 8,
    "endpoint": 0,
    "home_id": 3803689189,
    "device_id": "2f44f0d4152be3123f7ad40cf3abd095",
    "command_class": 38,
    "command_class_name": "Multilevel Switch",
    "event_type": 5,
    "event_type_label": "label 2",
    "direction": null
},
```

#### Entry Control Command Class

These are notification events fired by devices using the Entry Control Command Class.

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "endpoint": 0,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "command_class": 111,
    "command_class_name": "Entry Control",
    "event_type": 6,
    "event_type_label": "label 1",
    "data_type": 5,
    "data_type_label": "label 2",
    "event_data": "555"
}
```

### Scene events (Value Notification)

Value Notifications are used for stateless values, like `Central Scenes` and `Scene Activation`. These events fire with the `zwave_js_value_notification` event type.

Value Notification example:

```json
{
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "endpoint": 0,
    "device_id": "ad8098fe80980974",
    "command_class": 91,
    "command_class_name": "Central Scene",
    "label": "Event value",
    "property": "scene",
    "property_name": "scene",
    "property_key": "001",
    "property_key_name": "001",
    "value": "KeyPressed",
    "value_raw": 0
}
```

### Value updated events

Due to some devices not following the Z-Wave Specification, there are scenarios where a device will send a value update but a state change won't be detected in Home Assistant. To address the gap, the `zwave_js_value_updated` event can be listened to to capture any value updates that are received by an affected entity. This event is **enabled on a per device and per entity domain basis**, and the entities will have `assumed_state` set to `true`. This change will affect how the UI for these entities look; if you'd like the UI to match other entities of the same type where `assumed_state` is not set to `true`, you can override the setting via [entity customization](/docs/configuration/customizing-devices/#assumed_state).

The following devices currently support this event:

| Make            | Model                            | Entity Domain |
| --------------- | -------------------------------- | ------------- |
| Vision Security | ZL7432 In Wall Dual Relay Switch | `switch`      |

Value Updated example:

```json
{
    "node_id": 4,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "entity_id": "switch.in_wall_dual_relay_switch",
    "command_class": 37,
    "command_class_name": "Switch Binary",
    "endpoint": 0,
    "property": "currentValue",
    "property_name": "currentValue",
    "property_key": null,
    "property_key_name": null,
    "value": 0,
    "value_raw": 0
}
```

This event can be used to trigger a refresh of values when the new state needs to be retrieved. Here's an example automation:

```yaml
triggers:
  - trigger: event
    event_type: zwave_js_value_updated
    event_data:
      entity_id: switch.in_wall_dual_relay_switch
actions:
  - action: zwave_js.refresh_value
    data:
      entity_id:
        - switch.in_wall_dual_relay_switch_2
        - switch.in_wall_dual_relay_switch_3
```

## Automations

The `Z-Wave` integration provides its own trigger platforms which can be used in automations.

### `zwave_js.value_updated`

This trigger platform can be used to trigger automations on any Z-Wave JS value update, including Z-Wave JS values that aren't supported in Home Assistant via entities. While they can't be authored from the automation UI, they can be authored in YAML directly in your `configuration.yaml`.

#### Example automation trigger configuration

```yaml
# Fires whenever the `latchStatus` value changes from `closed` to `opened` on the three devices (devices will be derived from an entity ID).
triggers:
  - trigger: zwave_js.value_updated
    # At least one `device_id` or `entity_id` must be provided
    device_id: 45d7d3230dbb7441473ec883dab294d4  # Garage Door Lock device ID
    entity_id:
      - lock.front_lock
      - lock.back_door
    # `property` and `command_class` are required
    command_class: 98 # Door Lock CC
    property: "latchStatus"
    # `property_key` and `endpoint` are optional
    property_key: null
    endpoint: 0
    # `from` and `to` will both accept lists of values and the trigger will fire if the value update matches any of the listed values
    from:
      - "closed"
      - "jammed"
    to: "opened"
```

#### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), the `zwave_js.value_updated` trigger platform has additional trigger data available for use.

| Template variable            | Data                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `trigger.device_id`          | Device ID for the device in the device registry.                                           |
| `trigger.node_id`            | Z-Wave node ID.                                                                            |
| `trigger.command_class`      | Command Class ID.                                                                          |
| `trigger.command_class_name` | Command Class name.                                                                        |
| `trigger.property`           | Z-Wave Value's property.                                                                   |
| `trigger.property_name`      | Z-Wave Value's property name.                                                              |
| `trigger.property_key`       | Z-Wave Value's property key.                                                               |
| `trigger.property_key_name`  | Z-Wave Value's property key name.                                                          |
| `trigger.endpoint`           | Z-Wave Value's endpoint.                                                                   |
| `trigger.previous_value`     | The previous value for this Z-Wave value (translated to a state name when possible).       |
| `trigger.previous_value_raw` | The raw previous value for this Z-Wave value (the key of the state when a state is named). |
| `trigger.current_value`      | The current value for this Z-Wave value (translated to a state name when possible).        |
| `trigger.current_value_raw`  | The raw current value for this Z-Wave value (the key of the state when a state is named).  |

### `zwave_js.event`

This trigger platform can be used to trigger automations on any Z-Wave JS controller, driver, or node event, including events that may not be handled by Home Assistant automatically. Refer to the linked [Z-Wave JS documentation](https://zwave-js.github.io/node-zwave-js/#/) to learn more about the available events and the data that is sent along with it.

There is strict validation in place based on all known event types, so if you come across an event type that isn't supported, please open a GitHub issue in the `home-assistant/core` repository.

#### Example automation trigger configuration

```yaml
# Fires whenever the `interview failed` event is fired on the three devices (devices will be derived from device and entity IDs).
triggers:
  - trigger: zwave_js.event
    # At least one `device_id` or `entity_id` must be provided for `node` events. For any other events, a `config_entry_id` needs to be provided.
    device_id: 45d7d3230dbb7441473ec883dab294d4  # Garage Door Lock device ID
    entity_id:
      - lock.front_lock
      - lock.back_door
    config_entry_id:
    # `event_source` and `event` are required
    event_source: node   # options are node, controller, and driver
    event: "interview failed"  # event names can be retrieved from the Z-Wave JS docs (see links above)
    # `event_data` and `partial_dict_match` are optional. If `event_data` isn't included, all events of a given type for the given context will trigger the automation. When the `interview failed` event is fired, all argument live in a dictionary within the `event_data` dictionary under the `args` key. The default behavior is to require a full match of the event_data dictionary below and the dictionary that is passed to the event. By setting `partial_dict_match` to true, Home Assistant will check if the isFinal argument is true and ignore any other values in the dictionary. If this setting was false, this trigger would never fire because the dictionary always contains more keys than `isFinal` so the comparison check would never evaluate to true.
    event_data:
      args:
        isFinal: true
    partial_dict_match: true  # defaults to false
```

#### Available trigger data

In addition to the [standard automation trigger data](/docs/automation/templating/#all), the `zwave_js.event` trigger platform has additional trigger data available for use.

| Template variable      | Data                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- |
| `trigger.device_id`    | Device ID for the device in the device registry (only included for node events). |
| `trigger.node_id`      | Z-Wave node ID (only included for node events).                                  |
| `trigger.event_source` | Source of event (node, controller, or driver).                                   |
| `trigger.event`        | Name of event.                                                                   |
| `trigger.event_data`   | Any data included in the event.                                                  |

## Advanced installation instructions

If you are using Home Assistant Container or you do not want to use the built-in Z-Wave JS app, you need to run the Z-Wave JS Server yourself, which the Z-Wave integration will connect to.

### Running [Z-Wave JS Server](https://github.com/zwave-js/zwave-js-server)

This application provides the connection between your Z-Wave adapter and Home Assistant. The Home Assistant Z-Wave integration connects to this server via a WebSocket connection. You need to run this Z-Wave JS server before you can use the integration.

There are multiple ways to run this server:
The chart below illustrates Options 1 and 3, which are available for Home Assistant OS only.

![Overview of installation options 1 and 3](/images/integrations/z-wave/z-wave-server-install-options-1-2.png)

**Option 1: The official Z-Wave JS app, as described above**

_This option is only available for {% term "Home Assistant Operating System" %} (the recommended installation type) installations._

This app (formerly known as an add-on) can only be configured via the built-in Z-Wave control panel in Home Assistant. If you followed the standard [installation procedure](#setting-up-a-z-wave-js-server), this is how you are running the Z-Wave JS server.

**Option 2: The Z-Wave JS UI Docker container**

This is the recommended approach if you're running Home Assistant Container. See the [Z-Wave JS UI documentation](https://zwave-js.github.io/zwave-js-ui//#/getting-started/quick-start) for instructions.

This method provides the same server application and UI as the Z-Wave JS UI app. After installing the Docker image, make sure you enable the **WS Server** in the **Home Assistant** section of the **Settings** page.

**Option 3: Run the Z-Wave JS server yourself**

This is considered a more involved use case. In this case, you run the Z-Wave JS Server or Z-Wave JS UI NodeJS application directly. Installation and maintaining this is out of scope for this document. See the [Z-Wave JS server](https://github.com/zwave-js/zwave-js-server) or [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui/) GitHub repository for information.

{% note %}
[Supported Z-Wave adapter](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules). The Z-Wave adapter should be connected to the same host as where the Z-Wave JS server is running. In the configuration for the Z-Wave JS server, you need to provide the path to this adapter. It's recommended to use the `/dev/serial-by-id/yourdevice` version of the path to your adapter, to make sure the path doesn't change over reboots. The most common known path is `/dev/serial/by-id/usb-0658_0200-if00`.
{% endnote %}

{% note %}
**Network keys** are used to connect securely to compatible devices. The network keys consist of 32 hexadecimal characters, for example, `2232666D100F795E5BB17F0A1BB7A146` (do not use this one, pick a random one). Without network keys security enabled devices cannot be added securely and will not function correctly. You must provide these network keys in the configuration part of the Z-Wave JS Server.

For new installations, unique default keys will be auto-generated for you by the Z-Wave JS app.

Make sure that you keep a backup of these keys in a safe place. You will need to enter the same keys to be able to access securely paired devices.
{% endnote %}

### Installing and configuring the Z-Wave integration in Home Assistant

Once you have the Z-Wave JS server up and running, you need to install and configure the integration in Home Assistant (as described above).

If you're running full Home Assistant with supervisor, you will be presented with a dialog that asks if you want to use the Z-Wave JS Supervisor app. You **must** uncheck this box if you are running the Z-Wave JS server in any manner other than the official Z-Wave JS app, including using Z-Wave JS UI app.

If you're not running the supervisor or you've unchecked the above-mentioned box, you will be asked to enter a WebSocket URL (defaults to ws://localhost:3000). It is very important that you fill in the correct (Docker) IP/hostname here. For example for the Z-Wave JS UI app this is `ws://a0d7b954-zwavejs2mqtt:3000`.

## FAQ: Supported devices and Command Classes

For a list of supported devices, refer to the [Z-Wave JS device database](https://devices.zwave-js.io/).

While there is support for the most common devices, some Command Classes are not yet (fully) implemented in Z-Wave JS. You can track the status [here](https://github.com/zwave-js/node-zwave-js/issues/6).

You can also check the list of Z-Wave [Command Classes Home Assistant responds to when queried](#z-wave-command-classes-home-assistant-responds-to-when-queried) towards the end of this page.

You can also keep track of the road map for the Z-Wave integration [here](https://github.com/home-assistant-libs/zwave-js-server-python/issues/56).

## FAQ: Installation and configuration

### Which Z-Wave adapter should I buy?

Z-Wave supports all known 500, 700, and 800 series Z-Wave adapters. If you are just starting out, we recommend that you purchase a 800-series adapter (with firmware updated to >=7.23.2).

For more information, see [Supported Z-Wave adapters](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules)

### Why was I (not) automatically prompted to install Z-Wave?

Some Z-Wave adapters can be auto-discovered, which can simplify the Z-Wave setup process. The following devices have been tested with discovery, and offer a quick setup experience; however, these are **not** all of the devices supported by Z-Wave:

| Device               | Identifier | Vendor                                                                             |
| -------------------- | ---------- | ---------------------------------------------------------------------------------- |
| Aeotec Z-Stick Gen5+ | 0658:0200  | <https://aeotec.com/products/aeotec-z-stick-gen5/>                                 |
| Nortek HUSBZB-1      | 10C4:8A2A  | <https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/> |
| Zooz ZST10           | 10C4:EA60  | <https://www.getzooz.com/zooz-zst10-s2-stick/>                                     |
| Z-WaveMe UZB         | 0658:0200  | <https://z-wave.me/products/uzb/>                                                  |

Additional devices may be discoverable, however only devices that have been confirmed discoverable are listed above.

### What happened to Zwavejs2Mqtt or the Z-Wave JS to MQTT app?

Zwavejs2Mqtt was renamed Z-Wave JS UI in September 2022. They are synonymous with no difference between their capabilities.

### What happened to the Z-Wave JS UI app?

The **Z-Wave JS UI** app is being phased out, as its feature-rich UI is now included in the **Z-Wave JS** app. The **Z-Wave JS UI** app will continue to be supported for a while, but users are encouraged to switch to the **Z-Wave JS** app.

### Should I use `Secure Inclusion`?

That depends. There are two generations of Z-Wave encryption, Security S0, and Security S2. Both provide encryption and allow detecting packet corruption.

Security S0 imposes significant additional traffic on your mesh and is recommended only for older devices that do not support Security S2 but require encryption to work, such as door locks.

Security S2 does not impose additional network traffic and provides additional benefits. For example, end devices using S2 require the hub to report whether it has received and understood their reports.

By default, Z-Wave prefers Security S2, if supported. Security S0 is used only when absolutely necessary.

### Where can I see the security keys in the Z-Wave JS app?

After the initial setup of the Z-Wave adapter, you can view the security keys in the Z-Wave JS app. Go to {% my supervisor_addon addon="core_zwave_js" title="**Settings** > **Apps** > **Z-Wave JS**" %} and open the **Configuration** tab. You can now see the three S2 keys and the S0 key. The network security key is a legacy configuration setting, identical to the S0 key.

## FAQ: Troubleshooting topics

### I'm having a problem, what to do first?

_Many_ reported issues result from RF interference caused by the system's USB ports. This can manifest in many ways, including devices that won't include at all, devices that won't include securely, sensors with erroneous values (packets corrupted), delayed control of devices, or no ability to control devices.

**All users are encouraged to use a USB extension cable to prevent such interference.** Please try such a cable before opening an issue or requesting support on Discord. It will nearly always be the first troubleshooting step that we ask you to take anyway.

After ensuring you are using an extension cable, rebuild network routes.

The combination of these two steps corrects a large number of reported difficulties.

### My Z-Wave adapter isn't recognized automatically during setup

If your Z-Wave adapter doesn't show up in the **Discovered** section automatically, try adding it manually:

1. Check the hardware:
   - Make sure the adapter is powered on.
   - Make sure the cable you are using supports data, not power only.
2. Go to **{% my integrations title="Settings > Devices & services" %}**.
3. In the bottom right, select the
  **{% my config_flow_start icon domain="zwave_js" %}** button and select **Z-Wave**.
4. Follow the instructions on screen to complete the setup.
5. If it is still not discovered, [check for interference](#im-having-a-problem-what-to-do-first).

### I have an Aeotec Gen5 adapter, and it isn't detected on my Raspberry Pi&nbsp;4?

The first-generation Gen5 adapter has a known bug when plugged into a Pi&nbsp;4 and possibly other systems. Aeotec released the Gen5+ stick to correct this bug. Gen5 users can plug their adapters into a USB&nbsp;2.0 hub in order to overcome the issue.

### I do not see any entities created for my device in Home Assistant

Entities will be created only after the node is ready (the interview is completed). Also, note that some devices (like button remotes) do not create any entities but will only provide events when a button is pressed. See the events section on how to handle those events in your automations.

If you are certain that your device should have entities and you do not see them (even after a restart of Home Assistant Core), create an issue about your problem on the GitHub issue tracker.

### My device doesn't automatically update its status in HA if I control it manually

Your device might not send automatic status updates to the adapter. While the best advice would be to update to recent Z-Wave Plus devices, there is a workaround with active polling (request the status).

Z-Wave does not automatically poll devices on a regular basis. Polling can quickly lead to network congestion and should be used very sparingly and only where necessary.

- We provide a `zwave_js.refresh_value` action to manually poll a value, for example from an automation that only polls a device when there is motion in that same room.

- Z-Wave JS allows you to configure scheduled polling on a per-value basis, which you can use to keep certain values updated. It also allows you to poll individual values on-demand from your automations, which should be preferred over blindly polling all the time if possible.

{% warning %}
Polling should only be used as a last resort. You must use it with care and accept the negative impact on your network. Z-Wave is a very low speed network and poll requests can easily flood your network and slow down your commands.
{% endwarning %}

### My device is recognized as Unknown Manufacturer and/or some functions don't work with the Z-Wave integration

When your device is not yet fully interviewed, this info will not yet be present. So make sure your device is interviewed at least once.

If the interview is complete, then the device does not yet have a device file for Z-Wave JS. Unlike other Z-Wave drivers, your device may very well work as intended even without such a file. If your device not fully supported, consider [contributing the device configuration file](https://zwave-js.github.io/node-zwave-js/#/config-files/contributing-files).

### How do I get a dump of the current network state?

When trying to determine why something isn't working as you expect, or when reporting an issue with the integration, it is helpful to know what Z-Wave JS sees as the current state of your Z-Wave network. To get a dump of your current network state, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Z-Wave** integration. Then, select the three-dot {% icon "mdi:dots-vertical" %} menu.
3. From the dropdown menu, select **Download diagnostics**.

### How do I address interference issues?

Many users have reported issues with interference when the adapter was directly connected to the machine (proximity). If you are having issues, try to use a short USB&nbsp;2.0&nbsp;A (male to female) extension cord.

### How do I access the Z-Wave logs?

#### The easy way

##### Enable Z-Wave JS logging

1. Go to the Z-Wave integration panel: {% my integration badge domain="zwave_js" %}
2. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Enable debug logging**.
   - **Result**: The log level will be set to `debug` for the integration, library, and optionally the driver (if the driver log level is not already set to `verbose`, `debug`, or `silly`), and all Z-Wave JS logs will be added to the Home Assistant logs.
3. If you want to change the log level, on the Z-Wave integration panel: {% my integration badge domain="zwave_js" %}, select the cogwheel {% icon "mdi:cog-outline" %}.
   - Select the **Logs** tab, then select the log level.

##### Disable Z-Wave JS logging

1. Go to the Z-Wave integration panel: {% my integration badge domain="zwave_js" %}
2. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Disable debug logging**.
   - **Result**: The log level will be reset to its previous value for the integration, library, and driver, and the Home Assistant frontend will automatically send you the Z-Wave logs generated during that time period for download.

#### The advanced way

##### Enable Z-Wave JS logging manually, or via an automation

Set the log level for `zwave_js_server` to `debug`. This can either be done in your `configuration.yaml` in the `logger` section, or using the `logger.set_level` action. When the integration detects that the log level has been set to `debug`, it will also set the Z-Wave JS logs to `debug` if the level isn't already `verbose`, `debug`, or `silly` and will include those logs in the Home Assistant logs. The Z-Wave JS logs can be found under the logger name `zwave_js_server.server`.

##### Disable Z-Wave JS logging manually, or via an automation

Set the log level for `zwave_js_server` to a level higher than `debug`. This can either be done in your `configuration.yaml` in the `logger` section, or using the `logger.set_level` action. The Z-Wave JS logs will no longer be included in the Home Assistant logs, and if the log level of Z-Wave JS was changed by the integration, it will automatically change back to its original level.

## Unsupported functionality

This sections lists functionality that is available in Z-Wave but that is not currently supported in Home Assistant.

### Setting the adapter into learn mode to receive network information

In Home Assistant, it is currently not possible to set the Z-Wave controller into learn mode to receive network information from another controller.

### Including / excluding a adapter in an existing network using [classic inclusion](#classic-inclusion-versus-smartstart)

A Z-Wave controller that manages an empty network can also join a different network and act as a secondary controller there. However, with Home Assistant, this is not possible. Home Assistant does not allow the Z-Wave controller to join another network, because Home Assistant acts as the central hub.

## Z-Wave association groups

In Home Assistant, a single [association group](#association-group) is implemented:

- **Group 1**: This is an association group that includes only one device. It is used after a [factory reset](#resetting-a-z-wave-adapter), to send a **Device Reset Locally Notification**.

This association group is used when Home Assistant [resets the Z-Wave adapter](#resetting-a-z-wave-adapter).

Under normal circumstances, it is not necessary to add a device to this group.

## Identification via Z-Wave

Other Z-Wave devices can instruct a Home Assistant instance to identify itself by sending the following `Indicator Set` Z-Wave command (all bytes are hexadecimal):

```txt
87010003500308500403500506
            ~~    ~~    ~~
```

The bytes underlined with `~` can also have any other value.

When receiving such a command, Home Assistant will show a notification in its sidebar, mentioning which node sent the command.

## Z-Wave Command Classes Home Assistant responds to when queried

The following table lists the Command Classes together with the implemented version and required security class. These are the Command Classes that Home Assistant will respond to when queried by other devices.

| Command Class                 | Version | Security Class  |
| ----------------------------- | ------- | --------------- |
| Association                   | 4       | Highest granted |
| Association Group Information | 3       | Highest granted |
| CRC-16 Encapsulation          | 1       | None            |
| Device Reset Locally          | 1       | Highest granted |
| Firmware Update Meta Data     | 8       | Highest granted |
| Inclusion Controller          | 1       | None            |
| Indicator                     | 4       | Highest granted |
| Manufacturer Specific         | 2       | Highest granted |
| Multi Channel Association     | 5       | Highest granted |
| Multi Command                 | 1       | None            |
| Power Level                   | 1       | Highest granted |
| Security                      | 1       | None            |
| Security 2                    | 1       | None            |
| Supervision                   | 2       | None            |
| Transport Service             | 2       | None            |
| Version                       | 3       | Highest granted |
| Z-Wave Plus Info              | 2       | None            |

{% note %}
Home Assistant and Z-Wave JS will never return a "Working" or "Fail" status for a valid and supported command of the Supervision Command Class.
{% endnote %}

## Z-Wave terminology

This section explains some Z-Wave terms and concepts you might find in Z-Wave product documentation.

### Association group

An _association_ in Z-Wave terminology is when two or more Z-Wave products communicate directly. This enables devices to communicate with each other without the need to communicate via a hub, or to send unsolicited reports to the central hub.

An _association group_ in Z-Wave terminology is a group of devices that another one will send commands to in certain situations. Association groups and their functionality are specific to the device that sends the commands. Refer to the device manual for details.

### Classic inclusion versus SmartStart

Home Assistant supports both _classic inclusion_ and _SmartStart_. _Classic inclusion_ means you set both the hub and the device to be included into the corresponding mode. The alternative is _SmartStart_, where the hub is constantly listening for inclusion requests from devices that want to join the network.

### SmartStart

SmartStart enabled products can be added into a Z-Wave network by scanning the Z-Wave QR Code present on the product with an adapter supporting SmartStart inclusion.
No further action is required and the SmartStart product will be added automatically within 10 minutes of being switched on in the network vicinity. Not all devices support SmartStart. Some devices require *classic inclusion*. For documentation on adding a device to Home Assistant, refer to [adding a new device to the Z-Wave network](#adding-a-new-device-to-the-z-wave-network).

### Terminology mapping table

Throughout this documentation, Home Assistant terminology is used. For some of the concepts, the terminology does not correspond to the terminology used in Z-Wave documentation. The table below provides equivalents for some of those terms.

| Z-Wave functionality | Home Assistant | Definition |
| -------------------- | -------------- | ---------- |
| barrier operator | cover | |
| controller | adapter, when referring to the hardware device that provides the Z-Wave functionality. The term controller is still used when referring to the network role (such as primary, secondary controller)  | |
| exclusion | remove | The process of removing a node from the Z-Wave network |
| [inclusion](#classic-inclusion-versus-smartstart) | add | The process of adding a node to the Z-Wave network |
| multilevel switch | represented by different entity types: light, fan etc. | |
| replication | copy (not supported in Home Assistant) | The process of copying network information from one adapter to another. Not supported in Home Assistant. |
| window covering | cover | |

## Removing Z-Wave JS from Home Assistant

This removes all paired Z-Wave devices and their entities, the Z-Wave JS app, and the Z-Wave integration from Home Assistant.

### To remove Z-Wave JS from Home Assistant

1. [Remove the device from your Z-Wave network](/integrations/zwave_js/#removing-a-device-from-the-z-wave-network).
   - Do this for each device that is joined to your network so that it is no longer paired to the adapter.
   - You cannot add a device to a new adapter while it is still paired with an old one.
   - Alternatively, you can factory reset each device. Refer to the device manual to see how this is done.
     - This usually involves finding the device in your household and pressing a button.
2. Remove the Z-Wave integration.
   - Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the integration card.
   - Next to the integration entry, select the three dots {% icon "mdi:dots-vertical" %} menu.
   - Select **Delete**.
3. If it hasn't been deleted automatically, remove the Z-Wave JS app.
   - Go to {% my supervisor_addon addon="core_zwave_js" title="**Settings** > **Apps** > **Z-Wave JS**" %}.
   - Select **Uninstall**.
   - Decide whether to also delete the data related to the app or whether to keep it.
4. Done. Z-Wave JS is now completely removed from your Home Assistant server.
   - You can now use your Z-Wave devices and adapter on a new server.
