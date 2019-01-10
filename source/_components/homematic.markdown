---
layout: page
title: "Homematic"
description: "Instructions for integrating Homematic into Home Assistant."
date: 2018-02-13 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Hub
ha_iot_class: "Local Push"
ha_release: 0.23
featured: false
---

The [Homematic](http://www.homematic.com/) component provides bi-directional communication with your CCU/Homegear. It uses a XML-RPC connection to set values on devices and subscribes to receive events the devices and the CCU emit.
If you are using Homegear with paired [Intertechno](http://intertechno.at/) devices, uni-directional communication is possible as well.

Device support is available for most of the wired and wireless devices, as well as a lot of IP devices. If you have a setup with mixed protocols, you have to configure additional [interfaces](https://www.home-assistant.io/components/homematic#interfaces) with the appropriate ports. The default is using port 2001, which are wireless devices. Wired devices usually are available through port 2000 and IP devices through port 2010. The virtual thermostatgroups the CCU provides use port 9292 **and** require you to set the `path` setting to `/groups`. When using SSL on a CCU3, by default the same ports as usual with a prepended 4 are available. So 2001 becomes 42001, 2010 becomes 42010 etc..

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the source code. A dictionary with the device identifiers (e.g., HM-Sec-SC-2) can be found within the relevant modules near the bottom. If your device is not supported, feel free to contribute.

We automatically detect all devices we currently support and try to generate useful names. If you enable name-resolving, we try to fetch names from Metadata (Homegear), via JSON-RPC or the XML-API you may have installed on your CCU. Since this may fail this is disabled by default.
You can manually rename the created entities by using Home Assistant's [Customizing](/docs/configuration/customizing-devices/) feature. With it you are also able to hide entities you don't want to see in the UI. The HomeMatic component is also supported by the [Entity Registry](https://developers.home-assistant.io/docs/en/entity_registry_index.html), which allows you to change the friendly name and the entity ID directly in the Home Assistant UI.

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
homematic:
  interfaces:
    wireless:
      host: 127.0.0.1
```

Configuration variables (global):

{% configuration %}
interfaces:
  description: Configuration for each XML-RPC interface to integrate into Home Assistant.
  required: true
  type: list
hosts:
  description: Configuration for each Hub (CCU/Homegear) to integrate into Home Assistant.
  required: false
  type: list
local_ip:
  description: IP of device running Home Assistant. Override auto-detected value for exotic network setups.
  required: false
  type: string
local_port:
  description: Port for connection with Home Assistant. By default it is randomly assigned.
  required: false
  type: integer
{% endconfiguration %}

Configuration variables (interface):

{% configuration %}
host:
  description: IP address or Hostname of CCU/Homegear device or Hass.io add-on.
  required: true
  type: string
port:
  description: "Port of CCU/Homegear XML-RPC Server. Wireless: 2001, wired: 2000, IP: 2010, thermostatgroups: 9292. With enabled SSL on the CCU3 usually a 4 is prepended to the Port. e.g., 2001 becomes 42001 with enabled SSL."
  required: false
  type: integer
ssl:
  default: false
  description: Set to `true` if SSL support is enabled on the CCU3.
  required: false
  type: boolean
verify_ssl:
  default: false
  description: Set to `true` if a valid certificate is being used. The default is `false` as usually a self-signed certificate is configured.
  required: false
  type: boolean
callback_ip:
  description: Set this, if Home Assistant is reachable under a different IP from the CCU (NAT, Docker etc.).
  required: false
  type: string
callback_port:
  description: Set this, if Home Assistant is reachable under a different IP from the CCU (NAT, Docker etc.).
  required: false
  type: integer
resolvenames:
  description: Try to fetch device names. Defaults to `false` if not specified.
  required: false
  type: string
  default: false
jsonport:
  description: Port of CCU JSON-RPC Server. The default is 80, but it may be different when running CCU virtually via Docker or with enabled SSL.
  required: false
  type: integer
username:
  description: When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU. Admin-access is required if you work with variables on the CCU.
  required: false
  type: string
password:
  description: When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
  required: false
  type: string
path:
  description: Set to `/groups` when using port 9292.
  required: false
  type: string
{% endconfiguration %}

Configuration variables (host):

{% configuration %}
host:
  description: IP address of CCU/Homegear device.
  required: true
  type: string
username:
  description: When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU.
  required: false
  type: string
password:
  description: When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
  required: false
  type: string
{% endconfiguration %}

#### Example configuration with multiple protocols and some other options set:

```yaml
homematic:
  interfaces:
    rf:
      host: 127.0.0.1
      resolvenames: json
      username: Admin
      password: secret
    wired:
      host: 127.0.0.1
      port: 2000
      resolvenames: json
      username: Admin
      password: secret
    ip:
      host: 127.0.0.1
      port: 2010
    groups:
      host: 127.0.0.1
      port: 9292
      resolvenames: json
      username: Admin
      password: secret
      path: /groups
  hosts:
    ccu2:
      host: 127.0.0.1
      username: Admin
      password: secret

```

### {% linkable_title The `resolvenames` option %}

We use three approaches to fetch the names of devices. Each assumes you have properly named your devices in your existing Homematic setup. As a general advice: Use ASCII for your devices names. Home Assistant won't include non-ASCII characters in entity-names.

1. `json`: The CCU allows to fetch details of the paired devices via JSON-RPC. For this to work you need to add valid credentials to your component-configuration. Guest-access is sufficient to query for device names.
2. `xml`: If you use a CCU, there is an add-on called the "XML-API". With it installed, you are able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. We don't support authentication with this method. The `json` method should be preferred over `xml`. Support for the XML-API is only available for downwards compatibility and may be disabled in a future release.
3. `metadata`: Homegear provides device-names through the metadata devices internally have. When using an HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like.

Resolving names can take some time. So when you start Home Assistant you won't see you devices at first. For a setup with 20+ devices it can take up to a minute until all devices show up in the UI.

### {% linkable_title Multiple hosts %}

In order to allow communication with multiple hosts or different protocols in parallel (wireless, wired and ip), multiple connections will be established, each to the configured destination. The name you choose for the host has to be unique and limited to ASCII letters.
Using multiple hosts has the drawback, that the services (explained below) may not work as expected. Only one connection can be used for services, which limits the devices/variables a service can use to the scope/protocol of the host.
This does *not* affect the entities in Home Assistant. They all use their own connection and work as expected.

### {% linkable_title Reading attributes of entities %}

Most devices have, besides their state, additional attributes like their battery state or valve position. These can be accessed using templates in automations, or even as their own entities using the [template sensor](/components/sensor.template/) component. Here's an example of a template sensor that exposes the valve state of a thermostat.

```yaml
sensor:
- platform: template
  sensors:
    bedroom_valve:
      value_template: '{% raw %}{{ states.climate.leq123456.attributes.Valve }}{% endraw %}'
      entity_id: climate.leq123456
      friendly_name: 'Bedroom valve'
```

### {% linkable_title Variables %}

It is possible to read and set values of system variables you have setup on the CCU/Homegear. The supported types for setting values are float- and bool-variables. With the CCU a user with Admin-access is required.
The states of the variables are available through the attributes of your hub entity (e.g., `homematic.ccu2`). Use templates (as mentioned above) to make your variables available to automations or as entities.
The values of variables are polled from the CCU/Homegear in an interval of 30 seconds. Setting the value of a variable happens instantly and is directly pushed.

### {% linkable_title Events %}

When HomeMatic devices change their state or some other internal value, the CCU/Homegear sends event messages to Home Assistant. These events are automatically parsed and the entities in Home Assistant are updated. However, you can also manually use these events to trigger automations. Two event-types are available:

- **homematic.keypress**: For devices with buttons, see information below
- **homematic.impulse**: For impulse sensors

#### {% linkable_title Devices with buttons %}

Devices with buttons (e.g., HM-Sen-MDIR-WM55, remote controls) may not be fully visible in the UI. This is intended, as buttons don't serve any value here and all they do is trigger events.
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
The name depends on if you chose to resolve names or not. If not, it will be the device ID (e.g., LEQ1234657). If you chose to resolve names (and that is successful), it will be the name you have set in your CCU or in the metadata (e.g., "Kitchen Switch").

You can test whether your button works within Home Assistant if you look at the terminal output. When pressing a button, lines similar to those should appear:

```bash
2018-01-27 11:51:32 INFO (Thread-12) [pyhomematic.devicetypes.generic] HMGeneric.event: address=MEQ1234567:6, interface_id=homeassistant-CCU2, key=PRESS_SHORT, value=True
2018-01-27 11:51:32 INFO (MainThread) [homeassistant.core] Bus:Handling <Event homematic.keypress[L]: param=PRESS_SHORT, name=your_nice_name, channel=6>
2018-01-27 11:51:32 INFO (Thread-12) [pyhomematic.devicetypes.generic] HMGeneric.event: address=MEQ1234567:6, interface_id=homeassistant-CCU2, key=INSTALL_TEST, value=True
```

It may happen that "your_nice_name" is not resolved correctly; the according message (#2 in the above example) will be missing. This might be due to secure communication between your HM interface and the HM device. You can change the communication from "secure" to "standard" within your HM-interface to solve that issue (in "Einstellungen" - "Geräte" find your device and change "Übertragungsmodus" from secure to standard) - not recommended for devices that should have secure communication.

#### {% linkable_title `homematic.keypress` events for HomeMatic IP devices %}

To get the `homematic.keypress` event for some HomeMatic IP devices like WRC2 / WRC6 (wall switch) or SPDR (passage sensor) or the KRC4 (key ring remote control) you have to temporary create an empty program for each channel in the CCU:

1. In the menu of your CCU's admin panel go to `Programs and connections` > `Programs & CCU connection`
2. Go to `New` in the footer menu
3. Click the plus icon below `Condition: If...` and press the button `Device selection`
4. Select one of the device's channels you need (1-2 / 1-6 for WRC2 / WRC6 and 2-3 for SPDR)
5. Select short or long key press
6. Save the program with the `OK` button
7. Trigger the program by pressing the button as configured in step 5. Your device might indicate success via a green LED or similar. When you select the device in `Status and control` > `Devices` on the CCU, the `Last Modified` field should no longer be empty
8. When your channel is working now, you can edit it to select the other channels one by one
9. At the end, you can delete this program from the CCU

### {% linkable_title Services %}

- *homematic.virtualkey*: Simulate a keypress (or other valid action) on CCU/Homegear with device or virtual keys.
- *homematic.reconnect*: Reconnect to CCU/Homegear without restarting Home Assistant (useful when CCU has been restarted)
- *homematic.set_variable_value*: Set the value of a system variable.
- *homematic.set_device_value*: Control a device manually (even devices without support). Equivalent to setValue-method from XML-RPC.
- *homematic.put_paramset*: Manually change a device's paramset (even devices without support). Equivalent to putParamset-method from XML-RPC.

#### {% linkable_title Examples %}

Simulate a button being pressed:

```yaml
...
action:
  service: homematic.virtualkey
  data:
    address: BidCoS-RF
    channel: 1
    param: PRESS_LONG
```

Open KeyMatic:

```yaml
...
action:
  service: homematic.virtualkey
  data:
    address: LEQ1234567
    channel: 1
    param: OPEN
```

Set boolean variable to true:

```yaml
...
action:
  service: homematic.set_variable_value
  data:
    entity_id: homematic.ccu2
    name: Variablename
    value: true
```

#### {% linkable_title Advanced examples %}

If you are familiar with the internals of HomeMatic devices, you can manually set values on the devices. This can serve as a workaround if support for a device is currently not available, or only limited functionality has been implemented.
Using this service provides you direct access to the setValue-method of the primary connection. If you have multiple hosts, you may select the one hosting a specific device by providing the proxy-parameter with a value equivalent to the name you have chosen. In the example configuration from above `rf`, `wired` and `ip` would be valid values.

Manually turn on a switch actor:

```yaml
...
action:
  service: homematic.set_device_value
  data:
    address: LEQ1234567
    channel: 1
    param: STATE
    value: true
```

Manually set temperature on thermostat:

```yaml
...
action:
  service: homematic.set_device_value
  data:
    address: LEQ1234567
    channel: 4
    param: SET_TEMPERATURE
    value: 23.0
```

Set the week program of a wall thermostat:

```yaml
...
action:
  service: homematic.put_paramset
  data:
    interface: wireless
    address: LEQ1234567
    paramset_key: MASTER
    paramset:
      WEEK_PROGRAM_POINTER: 1
```

Manually set lock on KeyMatic devices:

```yaml
...
action:
  service: lock.lock
  entity_id: lock.leq1234567
```

Manually set unlock on KeyMatic devices:

```yaml
...
action:
  service: lock.unlock
  entity_id: lock.leq1234567
```

#### {% linkable_title Detecting lost connections %}

When the connection to your HomeMatic CCU or Homegear is lost, Home Assistant will stop getting updates from devices. This may happen after rebooting the CCU for example. Due to the nature of the communication protocol this cannot be handled automatically, so you must call *homematic.reconnect* in this case. That's why it is usually a good idea to check if your HomeMatic components are still updated properly, in order to detect connection losses. This can be done in several ways through an automation:

- If you have a sensor which you know will be updated frequently (e.g., an outdoor temperature sensor or light sensor) you could set up an automation like this:

  ```yaml
  automation:
    - alias: Homematic Reconnect
      trigger:
        platform: state
          entity_id: sensor.outdoor_light_level
        for:
          hours: 3
      action:
        # Reconnect, if sensor has not been updated for over 3 hours
        service: homematic.reconnect
  ```

- If you have a CCU you can also create a system variable on the CCU, which stores its last reboot time. Since Home Assistant can still refresh system variables from the CCU (even after a reboot), this is a pretty reliable way to detect situations where you need to call *homematic.reconnect*. This is how this can be done:

  1. Create a string variable **V_Last_Reboot** on the CCU

  2. Creata a new programm on the CCU **without any conditions**, which executes the following *HM-Script* with a delay of 30 seconds:

     ```javascript
     var obj = dom.GetObject("V_Last_Reboot");
     string now = system.Date("%d.%m.%Y %H:%M:%S");
     obj.State(now);
     ```

     The HomeMatic CCU will execute all active programs which meet their conditions (none in this case) on every reboot.

  3. Set up a template sensor in Home Assistant, which contains the value of the system variable:

     ```yaml
     - platform: template
       sensors:
         v_last_reboot:
           value_template: "{% raw %}{{ state_attr('homematic.ccu2', 'V_Last_Reboot') or '01.01.1970 00:00:00' }}{% endraw %}"
           icon_template: "mdi:clock"
           entity_id: homematic.ccu2
     ```

  4. Set up an automation which calls *homematic.reconnect* whenever the sensor variable changes:

     ```yaml
     automation:
       - alias: Homematic CCU Reboot
         trigger:
           platform: state
           entity_id: sensor.v_last_reboot
         action:
           service: homematic.reconnect
     ```
