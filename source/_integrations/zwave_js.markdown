---
title: Z-Wave JS
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave JS.
featured: true
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave_js
---

This integration allows you to control a Z-Wave network via the [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/) driver.

## Quick start (Home Assistant including Supervisor)

To add Z-Wave JS to your installation, plug the Z-Wave stick into the device that runs Home Assistant. Then Go to Configuration >> Integrations in the UI. Click the "Add integration" button in the bottom right and from the list of integrations, select "Z-Wave JS" and follow the instructions shown.

Note: A new network key is automatically generated for you. If this Z-Wave stick has already paired with secure devices, you need to enter the previously used network key.

## Advanced installation instructions

The above instructions won't work if you are using Home Assistant Container, Home Assistant Core, or you don't want to use the built-in Z-Wave JS Server add-on. Below you'll find the more detailed set-up instructions that covers all usecases.

### Requirements

Controlling your Z-Wave network using the Z-Wave JS integration has the following requirements:

1. The [Z-Wave JS Server](https://github.com/zwave-js/zwave-js-server) is the gateway between your Z-Wave USB stick and Home Assistant, think of it like a virtual bridge/hub, running in software. You can run this server separately from Home Assistant so your Z-Wave mesh will keep running if you restart or stop Home Assistant. The Home Assistant Z-Wave JS integration connects to this server with a websocket connection. You need to run this Z-Wave server before you can use the integration.

2. [Supported Z-Wave dongle](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules). The Z-Wave controller dongle should be connected to the same host as where the Z-Wave JS server is running. In the configuration for the Z-Wave server you need to provide the path to this stick, Z-Wave sticks will generally be /dev/ttyACM0 and GPIO hats will generally be /dev/ttyAMA0.

3. A 16-byte **network key** used in order to connect securely to compatible devices. It is recommended that a network key is configured as security enabled devices may not function correctly if they are not added securely. You must provide this network key in the configuration part of the Z-Wave JS Server. For new installations, a default key will be auto generated for you.

4. The Z-Wave JS integration in Home Assistant. This integration connects to the Z-Wave JS Server to retrieve the info from your Z-Wave network and turns it into Home Assistant devices and entities.

### Running the Z-Wave JS Server

As stated in the above requirements, you need to run the Z-Wave JS Server somewhere in your network. There are multiple ways to run this server, we'll explain the most common ways below:

#### 1. The official Z-Wave JS add-on, available from the add-on store

This is the recommended approach if you're running the default version of Home Assistant, including the supervisor and you do not require any advanced configuration/options but just want your Z-Wave devices available to control within Home Assistant.

#### 2. The Z-Wave JS to MQTT add-on installed available from the community add-on store

This is the recommended approach if you're running the default version of Home Assistant, including the supervisor and you like to have maximum control over your Z-Wave network and it's nodes. Despite what the name suggests, you can actually run this addon without MQTT enabled. In that case it will provide you with a full fledged, attractive and feature complete UI to manage your Z-Wave nodes and settings. The Z-Wave JS server is **included** in Zwave JS to MQTT, you enable it on the Z-Wave tab within the UI. If you install the add-on from the community repo, this will be done for you automatically.

#### 3. The Z-Wave JS to MQTT docker container

This is the recommended approach if you're running the Home Assistant Core yourself, without the supervisor and it's convenient add-ons. See the [zwavejs2m1tt documentation](https://zwave-js.github.io/zwavejs2mqtt/#/getting-started/quick-start) for instructions. Important note: make sure you run a recent version of the docker image, as that contains the required WS server option.

#### 4. Run the Z-Wave server yourself

This is considered a very advanced scenario where you run the (nodejs) Z-Wave JS Server (or zwavejs2mqtt) yourself. Installation and maintaining this is out of scope for this documentation. See the [Z-Wave JS server](https://github.com/zwave-js/zwave-js-server) or [zwavejs2mqtt](https://github.com/zwave-js/zwavejs2mqtt) Github repo's for information.

#### Important note

When you start the Z-Wave JS server, it will begin interviewing your entire Z-Wave network, depending on the size of your network (how many nodes) this can take a while, especially when started for the very first time. Information about your devices is stored in cache files by Z-Wave JS. Be aware that (re)starting the Z-Wave server will cause your network to be (partially) unresponsive until the interview process is done. While your Z-Wave mesh is permanently stored on your stick, the additional metadata is not, so when you loose the cache files (for example by switching between any of the above mentioned ways to run the server) all your nodes will have to be re-interviewed again before they can be properly controlled. You can speed up this process by manually waking up your battery powered devices. Most of the times this is a simple press on the button on those devices (see manual). In any way it is not needed to exclude/re-include devices from the mesh. Just be patient with this.

> Make sure that the server started successfully by inspecting the logs or (in case of zwavejs2mqtt) the web UI. Give the Z-Wave controller some time to start. For zwavejs2mqtt users, you need to fill in the details for your Z-Wave stick and network key in the web interface.

### Installing and configuring the Z-Wave JS integration in Home Assistant

Once you have the Z-Wave server up and running, it's time to configure the integration in Home Assistant. This integration can be configured using the integrations in the Home Assistant frontend:

1. Click on the `+` sign to add an integration and click on **Z-Wave JS**.

2. If you're running full Home Assistant with supervisor, you will be presented with a dialog that asks if you want to use the Z-Wave JS Supervisor add-on. Check the box if you prefer this option. If you run the server yourself, or prefer the alternative zwavejs2mqtt addon, uncheck this box. After completing the configuration flow, the Z-Wave JS integration will be
available.

3. If you're not running the supervisor or you've unchecked the above mentioned box, you will be asked to enter a websocket URL (defaults to ws://localhost:3000). It is very important that you fill in the correct (docker) IP/hostname here. For example for the Z-Wave JS to MQTT add-on this is `ws://a0d7b954-zwavejs2mqtt:3000`.

### Configuration

At this time the configuration options for this new Z-Wave integration are still limited (but will be extended over time). Basic features like adding a new node or removing a node are available.
You can configure the Z-Wave network within Home Assistant from the Integrations configuration page. Just click "configure" on the Z-Wave JS card.

Menu: **Configuration** -> **Integrations** -> **Z-Wave JS** -> **Configure**

Do you want more configuration options ? In that case you could either wait for these options to be added to the integration over time or you can run the zwavejs2mqtt as your default Z-Wave server (you don't have to enable/use mqtt!).

## Services

### Service `zwave_js.set_lock_usercode`

This service will set the usercode of a lock to X at code slot Y.
Valid usercodes are at least 4 digits.

| Service Data Attribute | Required | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | no       | Lock entity or list of entities to set the usercode. |
| `code_slot`            | yes      | The code slot to set the usercode into.              |
| `usercode`             | yes      | The code to set in the slot.                         |

### Service `zwave_js.clear_lock_usercode`

This service will clear the usercode of a lock in code slot X.
Valid code slots are between 1-254.

| Service Data Attribute | Required | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `entity_id`            | no       | Lock entity or list of entities to clear the usercode. |
| `code_slot`            | yes      | The code slot to clear the usercode from.              |

## Events

Events are issued for example when you press some button on a Z-Wave remote (aka Central Scene support) or when some other stateless value is being signalled by your device. You can test what events come in by using the developer tools in Home Assistant and listen for "zwave_js_event". Once you know what the event data looks like, you can use this to create automations. In the future we'd like to provide you with some autogenerated device automations for these kind of events.

### Event `zwave_js_event`

This event is fired whenever a [notification](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotnotificationquot) or [value notification](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotvalue-notificationquot) event is received.


#### Notifications

Notifications are events sent using the Notification command class. The `parameters` attribute in the example below is optional, and when it is included, the keys in the attribute will vary depending on the event.

Notification exapmle:

```json
{
    "type": "notification",
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "label": "Keypad lock operation",
    "parameters": {"userId": 1}
}
```

#### Value Notifications

Value Notifications are used for stateless values, like `Central Scenes`.

Value Notification example:

```json
{
    "type": "value_notification",
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "endpoint": 0,
    "device_id": "ad8098fe80980974",
    "command_class": 32,
    "command_class_name": "Basic",
    "label": "Event value",
    "property_name": "event",
    "property_key_name": "some value",
    "value": 255,
}
```

## Current Limitations

As this integration is still in the early stages there are some important limitations to be aware of.

- Some advanced CommandClasses are not yet fully implemented in Z-Wave JS. No worries as all the most common devices are already working. You can track status [here](https://github.com/zwave-js/node-zwave-js/issues/6). Actually the only one that impacts HA users is Barrier Operator CC (= garage door controllers) but the good news is that this is [almost finished](https://github.com/zwave-js/node-zwave-js/pull/1337)!
- Configuration of Z-Wave nodes and/or configuration with the Home Assistant UI is currently not yet implemented. You will need to use another tool, such as [zwavejs2mqtt](https://github.com/zwave-js/zwavejs2mqtt), to manage device configuration.
- Polling is currently not supported in the integration but will be added soon as a service.
- Support for setting configuration parameters through service calls is currently not supported but may be added in a later release.
- There currently is no migration path available from any of the other Z-Wave implementations in Home Assistant. Your Z-Wave network is however stored on your stick so migrating will only require you to redo your device and entity naming.

## Migrating from previous Z-Wave implementations

If you are currently running on the [zwave](https://www.home-assistant.io/integrations/zwave/) or [ozw](https://www.home-assistant.io/integrations/ozw/) Z-Wave integration there is **no need to switch over** to Z-Wave JS. The only thing important to know is that all/most development power currently goes to Z-Wave JS and the previous implementations are still provided as-is. They will **NOT be removed** without proper notice but in time there *might* come technical dependencies that render one or both of those integrations unusable. While both integrations will continue to exist and working, we've marked them as deprecated just to make sure that newcomers start with Z-Wave JS instead of legacy.

It is perfectly doable to switch over from one of the above mentioned previous integrations to the new Z-Wave JS integration. The good news is that your entire Z-Wave network is **stored on your stick** so you will not have to run through your house to recreate your network. That said, we currently do not provide a full-fledged, worry free, click-a-button, migration from old to new, we're exploring options to provide this in the future. This means that if you want to switch over now, *you* will be the migration wizard.

### In a nutshell this is what the migration path looks like

1) Make a **backup** of your Home Assistant configuration. If you're running the supervisor this is very easy to do by creating a snapshot. You should do this so you'll be able to quickly revert if you may run into unexpected problems.

   **! Write down/copy your Z-Wave network key somewhere, you are going to need it later.**

   **! Make a list of what node ID belongs to each device. Your network (Nodes and their config etc) is stored on the stick but the names you gave your devices and entities is not. This step is optional but will save you a lot of time later.**

2) Remove the Z-Wave integration from Home Assistant: Configuration --> Integrations --> Z-Wave (or OpenZWave) --> Press the three dots and click Remove.

3) If you were running the OpenZWave beta, make sure to stop (or even remove) the OpenZWave add-on, also make sure it doesn't start automatically at startup.

4) Restart your Home Assistant host. This step is important to make sure that your Z-Wave stick is released by the operating system.

5) Install the Z-Wave JS Server of your choice, If you run the supervisor and you'd like to run the standard add-on, you can skip this step if you want. The add-on is installed automatically for you when you choose so in the integration set-up. Remember to fill in the network key you've saved before.

6) Install the Z-Wave JS integration and connect it to the server. You should see your nodes being detected by Home Assistant. Carefully watch if the status of the node is "ready", this means it's been fully interviewed (and those details cached) by the Z-Wave JS driver. Battery-powered nodes will only be interviewed when they wake up (at scheduled intervals) which can take from a few hours to a few days. To speed that up, you might want to consider waking the device up once. The manual of your device will tell you how to do a manual wake.

7) Once a node hits the ready state, the entities will be created (so not before). Only at this point, it is safe to rename the device (and so its entities). You will thank yourself at this point for having that list noted down of nodes and their names. This is actually the only real hard part of the migration as you will need to name all your devices again.

8) Enjoy your super fast up-to-date Z-Wave network in Home Assistant with support for all modern devices!

## Frequently Asked Questions

### Can I switch between the Official Z-Wave JS add-on and Z-Wave JS to MQTT?

You can but be aware to not run them both at the same time, only one of them can be active.
Do remember however that switching requires a re-interview of the network. It is possible to copy the (JSON) cache files but that is out of the scope of this manual. To prevent you from doing all the renaming work again there's a small trick to update the existing Z-Wave JS configuration with the new WebSocket URL: Just re-add the Z-Wave integration to Home Assistant, filling in the new/updated WebSocket URL. There will be a popup raised that this Z-Wave network is already configured but "under the hood" the WebSocket URL is adjusted.
  

### I do not see any entities created for my device in Home Assistant

Entities will be created only after the node hits the ready state (its interview is completed). Also, note that some devices (like button remotes) do not create any entities but will only provide events when a button is pressed. See the events section on how to handle those events in your automations. If you are certain that your device should have entities and you do not see them (even after a restart of Home Assistant Core), that will be the time to create an issue about your problem on the GitHub issue tracker, see below section of troubleshooting issues.

## Troubleshooting Issues

### Get a dump of the current network state

When trying to determine why something isn't working as you expect, or when reporting an issue with the integration, it is helpful to know what Z-Wave JS sees as the current state of your Z-Wave network. To get a dump of your current network state, follow the menu:

**Configuration** -> **Integrations** -> **Z-Wave JS** -> **Configure** -> **Download a dump of your network to help diagnose issues**

### Watch traffic between the server and the integration (Advanced Users)

Z-Wave JS Server comes with a client that can be used to see the messages that the server is sending and to check the state of a node/all nodes as well. Visit the [`zwave-js-server` repository](https://github.com/zwave-js/zwave-js-server/) and follow the instructions in the README.
