---
layout: page
title: "Homematic"
description: "Instructions for integrating Homematic into Home Assistant."
date: 2016-11-27 21:38
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Hub
ha_iot_class: "Local Push"
featured: false
---


The [Homematic](http://www.homematic.com/) component provides bi-directional communication with your CCU/Homegear. It uses a XML-RPC connection to set values on devices and subscribes to receive events the devices and the CCU emit.

Device support is available for most of the wired and wireless devices, as well as a few IP devices. If you have a setup with mixed protocols, you have to configure additional hosts with the appropriate ports. The default is using port 2001, which are wireless devices. Wired devices usually are available through port 2000 and IP devices through port 2010.

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the source code. A dictionary with the device identifiers (e.g. HM-Sec-SC-2) can be found within the relevant modules near the bottom. If your device is not supported, feel free to contribute.

We automatically detect all devices we currently support and try to generate useful names. If you enable name-resolving, we try to fetch names from Metadata (Homegear), via JSON-RPC or the XML-API you may have installed on your CCU. Since this may fail this is disabled by default.
You can manually rename the created entities by using Home Assistants [Customizing](https://home-assistant.io/getting-started/customizing-devices/) feature. With it you are also able to hide entities you don't want to see in the UI.

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
homematic:
  hosts:
    wireless:
      ip: 127.0.0.1
```

Configuration variables (global):

- **hosts** (*Required*): Configuration for each host to integrate into Home Assistant.
- **local_ip** (*Optional*): IP of device running Home Assistant. Override autodetected value for exotic network setups.
- **local_port** (*Optional*): Port for connection with Home Assistant. By default it is randomly assigned.
- **delay** (*Optional*): [Float] Delay fetching of current state per device on startup. Used to prevent overloading of the CCU. Defaults to 0.5.

Configuration variables (host):

- **ip** (*Required*): IP of CCU/Homegear
- **port** (*Optional*): Port of Homegear/CCU XML-RPC Server (default is 2001, use 2000 for wired and 2010 for IP)
- **resolvenames** (*Optional*): [`metadata`, `json`, `xml`] Try to fetch device names. Defaults to `false` if not specified.
- **username** (*Optional*): When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU.
- **password** (*Optional*): When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
- **primary** (*Optional*): Set to `true` when using multiple hosts and this host should provide the services and variables.
- **variables** (*Optional*): Set to `true` if you want to use CCU2/Homegear variables. Should only be enabled for the primary host.

#### Example configuration with multiple protocols and some other options set:

```yaml
homematic:
  delay: 1.0
  hosts:
    rf:
      ip: 127.0.0.1
      resolvenames: json
      username: Admin
      password: secret
      primary: true
      variables: true
    wired:
      ip: 127.0.0.1
      port: 2000
      resolvenames: json
      username: Admin
      password: secret
    ip:
      ip: 127.0.0.1
      port: 2010
```

### The `resolvenames` option

We use three approaches to fetch the names of devices. Each assumes you have properly named your devices in your existing Homematic setup. As a general advice: Use ASCII for your devices names. Home Assistant won't include non-ASCII characters in entity-names.

1. `json`: The CCU allows to fetch details of the paired devices via JSON-RPC. For this to work you need to add valid credentials to your component-configuration. Guest-access is sufficient to query for device names.
2. `xml`: If you use a CCU, there is an add-on called the "XML-API". With it installed, you are able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. We don't support authentication with this method.
3. `metadata`: Homegear provides device-names through the metadata devices internally have. When using an HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like.

Resolving names can take some time. So when you start Home Assistant you won't see you devices at first. For a setup with 20+ devices it can take up to a minute until all devices show up in the UI.

### Multiple hosts

In order to allow communication with multiple hosts or different protocols in parallel (wireless, wired and ip), multiple connections will be established, each to the configured destination. The name you choose for the host has to be unique and limited to ASCII letters.  
Using multiple hosts has the drawback, that the services (explained below) may not work as expected. Only one connection can be used for services, which limits the devices/variables a service can use to the scope/protocol of the host.  
This does *not* affect the entites in Home Assistant. They all use their own connection and work as expected.

### Variables

It is possible to read and set values of system variables you have setup on the CCU/Homegear. An example of how that is done can be found below. The supported types for setting values are float- and bool-variables.  
Each variable will be available as it's own entity in the form of `homematic.name`. The predefined `homematic.homematic` variable has the number of service messages as it's value. You can use these variable-entities like any other entity in Home Assistant to trigger automations.  
The values of variables are polled from the CCU/Homegear in an interval of 30 seconds. Setting the value of a variable happens instantly and is directly pushed.

### Events

When HomeMatic devices change their state or some other internal value, the CCU/Homegear sends event messages to Home Assistant. These events are automatically parsed and the entities in Home Assistant are updated. However, you can also manually use these events to trigger automations. Two event-types are available:

* **homematic.keypress**: For devices with buttons, see information below
* **homematic.impulse**: For impulse sensors

#### Devices with buttons

Devices with buttons (e.g. HM-Sen-MDIR-WM55, remote controls) may not be fully visible in the UI. This is intended, as buttons don't serve any value here and all they do is trigger events.
As an example:
The HM-Sen-MDIR-WM55 motion detector will be displayed as 2 entities. A motion sensor and a brightness sensor. On top of that we have 2 sets (one set per button) of 4 events: PRESS_SHORT, PRESS_LONG, PRESS_CONT, PRESS_LONG_RELEASE. Be aware, that there are devices which don't provide all of these events. But in general: if you can press it, it usually at least has PRESS_SHORT.

Here's an example of how to use these events for automations:

```yaml
automation:
   trigger:
     platform: event
     event_type: homematic.keypress
     event_data:
       name: Kitchen Switch
       channel: 1
       param: PRESS_SHORT
   action:
     service: switch.turn_on
     entity_id: switch.Kitchen_Ambience
```

The channel parameter is equal to the channel of the button you are configuring the automation for. You can view the available channels in the UI you use to pair your devices.
The name depends on if you chose to resolve names or not. If not, it will be the device ID (e.g. LEQ1234657). If you chose to resolve names (and that is successful), it will be the name you have set in your CCU or in the metadata (e.g. "Kitchen Switch").

### Services

* *homematic.virtualkey*: Simulate a keypress (or other valid action) on CCU/Homegear with device or virtual keys.
* *homematic.reconnect*: Reconnect to CCU/Homegear without restarting Home Assistant (useful when CCU has been restarted)
* *homematic.set_var_value*: Set the value of a system variable.
* *homematic.set_dev_value*: Control a device manually (even devices without support). Equivalent to setValue-method from XML-RPC.

#### Examples
Simulate a button being pressed
```yaml
...
action:
  service: homematic.virtualkey
  data:
    address: BidCoS-RF
    channel: 1
    param: PRESS_LONG
```

Open KeyMatic
```yaml
...
action:
  service: homematic.virtualkey
  data:
    address: LEQ1234567
    channel: 1
    param: OPEN
```

Set variable
```yaml
...
action:
  service: homematic.set_var_value
  data:
    entity_id: homematic.varname_bool
    value: true
```


#### Advanced examples

If you are familiar with the internals of HomeMatic devices, you can manually set values on the devices. This can serve as a workaround if support for a device is currently not available, or only limited functionality has been implemented.  
Using this service provides you direct access to the setValue-method of the primary connection. If you have multiple hosts, you may select the one hosting a specific device by providing the proxy-parameter with a value equivalent to the name you have chosen. In the example configuration from above `rf`, `wired` and `ip` would be valid values.

Manually turn on a switch actor
```yaml
...
action:
  service: homematic.set_dev_value
  data:
    address: LEQ1234567
    channel: 1
    param: STATE
    value: true
```

Manually set temperature on thermostat
```yaml
...
action:
  service: homematic.set_dev_value
  data:
    address: LEQ1234567
    channel: 4
    param: SET_TEMPERATURE
    value: 23.0
```
