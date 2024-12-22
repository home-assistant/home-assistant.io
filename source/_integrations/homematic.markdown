---
title: Homematic
description: Instructions for integrating Homematic into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Notifications
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.23
ha_codeowners:
  - '@pvizeli'
ha_domain: homematic
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - notify
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The [Homematic](https://www.eq-3.com/products/homematic.html) {% term integration %} provides bi-directional communication with your CCU/Homegear. It uses an XML-RPC connection to set values on devices and subscribes to receive events the devices and the CCU emit.
If you are using Homegear with paired [Intertechno](https://intertechno.at/) devices, uni-directional communication is possible as well.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Climate
- Cover
- Light
- Lock
- Notifications
- Sensor
- Switch

Device support is available for most of the wired and wireless devices, as well as a lot of IP devices. If you have a setup with mixed protocols, you have to configure additional [interfaces](/integrations/homematic#interfaces) with the appropriate ports. The default is using port 2001, which are wireless devices. Wired devices usually are available through port 2000 and IP devices through port 2010. The virtual thermostatgroups the CCU provides use port 9292 **and** require you to set the `path` setting to `/groups`. When using SSL on a CCU3, by default the same ports as usual with a prepended 4 are available. So 2001 becomes 42001, 2010 becomes 42010 etc..

{% important %}
Since CCU Version 3, the internal firewalls are enabled by default. You have to grant full access for the `XML-RPC API` or specify the IP-address of the Home Assistant instance and allowlist it, inside the CCU's security settings.
{% endimportant %}

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the source code. A dictionary with the device identifiers (e.g., HM-Sec-SC-2) can be found within the relevant modules near the bottom. If your device is not supported, feel free to contribute.

We automatically detect all devices we currently support and try to generate useful names. If you enable name-resolving, we try to fetch names from Metadata (Homegear), via JSON-RPC or the XML-API you may have installed on your CCU. Since this may fail this is disabled by default.
You can manually rename the created entities by using Home Assistant's [Customizing](/docs/configuration/customizing-devices/) feature. The Homematic integration is also supported by the [Entity Registry](https://developers.home-assistant.io/docs/entity_registry_index/), which allows you to change the friendly name and the entity ID directly in the Home Assistant UI.

## Configuration

To set up the integration, add the following information to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  default: 0.0.0.0
local_port:
  description: Port for connection with Home Assistant. By default it is randomly assigned.
  required: false
  type: integer
{% endconfiguration %}

Configuration variables (interface):

{% configuration %}
host:
  description: IP address or hostname of CCU/Homegear device or Home Assistant add-on.
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
  description: Set this, if Home Assistant is reachable under a different port from the CCU (NAT, Docker etc.).
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
port:
  description: "Port of CCU/Homegear XML-RPC Server. Wireless: 2001, wired: 2000, IP: 2010"
  required: false
  type: integer
username:
  description: When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU.
  required: false
  type: string
password:
  description: When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
  required: false
  type: string
{% endconfiguration %}

### Example configuration with multiple protocols and some other options set

```yaml
homematic:
  interfaces:
    rf:
      host: 127.0.0.1
      resolvenames: "json"
      username: "Admin"
      password: "secret"
    wired:
      host: 127.0.0.1
      port: 2000
      resolvenames: "json"
      username: "Admin"
      password: "secret"
    ip:
      host: 127.0.0.1
      port: 2010
    groups:
      host: 127.0.0.1
      port: 9292
      resolvenames: "json"
      username: "Admin"
      password: "secret"
      path: /groups
  hosts:
    ccu2:
      host: 127.0.0.1
      port: 2001
      username: "Admin"
      password: "secret"

```

### The `resolvenames` option

We use three approaches to fetch the names of devices. Each assumes you have properly named your devices in your existing Homematic setup. As a general advice: Use ASCII for your devices names. Home Assistant won't include non-ASCII characters in entity-names.

1. `json`: The CCU allows to fetch details of the paired devices via JSON-RPC. For this to work, you need to add valid credentials to your integration configuration. Guest-access is sufficient to query for device names.
2. `xml`: If you use a CCU, there is an add-on called the "XML-API". With it installed, you are able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. We don't support authentication with this method. The `json` method should be preferred over `xml`. Support for the XML-API is only available for downwards compatibility and may be disabled in a future release.
3. `metadata`: Homegear provides device-names through the metadata devices internally have. When using an HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like.

Resolving names can take some time. So when you start Home Assistant you won't see you devices at first. For a setup with 20+ devices it can take up to a minute until all devices show up in the UI.

### Multiple hosts

In order to allow communication with multiple hosts or different protocols in parallel (wireless, wired and IP), multiple connections will be established, each to the configured destination. The name you choose for the host has to be unique and limited to ASCII letters.
Using multiple hosts has the drawback, that the actions (explained below) may not work as expected. Only one connection can be used for actions, which limits the devices/variables an action can use to the scope/protocol of the host.
This does *not* affect the entities in Home Assistant. They all use their own connection and work as expected.

### Reading attributes of entities

Most devices have, besides their state, additional attributes like their battery state or valve position. These can be accessed using templates in automations, or even as their own entities using the [template sensor](/integrations/template) integration. Here's an example of a template sensor that exposes the valve position of a thermostat.

{% raw %}

```yaml
template:
  - sensor:
    - name: "Bedroom valve"
      state: "{{ state_attr('climate.leq123456', 'level') }}"
```

{% endraw %}

### Variables

It is possible to read and set values of system variables you have setup on the CCU/Homegear. The supported types for setting values are float- and bool-variables. With the CCU a user with Admin-access is required.
The states of the variables are available through the attributes of your hub entity (e.g., `homematic.ccu2`). Use templates (as mentioned above) to make your variables available to automations or as entities.
The values of variables are polled from the CCU/Homegear in an interval of 30 seconds. Setting the value of a variable happens instantly and is directly pushed.

### Events

When Homematic devices change their state or some other internal value, the CCU/Homegear sends event messages to Home Assistant. These events are automatically parsed and the entities in Home Assistant are updated. However, you can also manually use these events to trigger automations. Two event-types are available:

- `homematic.keypress`: For devices with buttons, see information below
- `homematic.impulse`: For impulse sensors

#### Devices with buttons

Devices with buttons (e.g., HM-Sen-MDIR-WM55, remote controls) may not be fully visible in the UI. This is intended, as buttons don't serve any value here and all they do is trigger events.
As an example:
The HM-Sen-MDIR-WM55 motion detector will be displayed as 2 entities. A motion sensor and a brightness sensor. On top of that we have 2 sets (one set per button) of 4 events: PRESS_SHORT, PRESS_LONG, PRESS_CONT, PRESS_LONG_RELEASE. Be aware, that there are devices which don't provide all of these events. But in general: if you can press it, it usually at least has PRESS_SHORT.

Here's an example of how to use these events for automations:

```yaml
automation:
  triggers:
    - trigger: event
      event_type: homematic.keypress
      event_data:
        name: "Kitchen Switch"
        channel: 1
        param: PRESS_SHORT
  actions:
    - action: switch.turn_on
      target:
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

#### `homematic.keypress` events for Homematic IP devices

To get the `homematic.keypress` event for some Homematic IP devices like WRC2 / WRC6 (wall switch) or SPDR (passage sensor) or the KRC4 (key ring remote control) you have to temporary create an empty program for each channel in the CCU:

1. In the menu of your CCU's admin panel go to `Programs and connections` > `Programs & CCU connection`
2. Go to `New` in the footer menu
3. Click the plus icon below `Condition: If...` and press the button `Device selection`
4. Select one of the device's channels you need (1-2 / 1-6 for WRC2 / WRC6 and 2-3 for SPDR)
5. Select short or long key press
6. Save the program with the `OK` button
7. Trigger the program by pressing the button as configured in step 5. Your device might indicate success via a green LED or similar. When you select the device in `Status and control` > `Devices` on the CCU, the `Last Modified` field should no longer be empty
8. When your channel is working now, you can edit it to select the other channels one by one
9. At the end, you can delete this program from the CCU

### Actions

- *homematic.virtualkey*: Simulate a keypress (or other valid action) on CCU/Homegear with device or virtual keys.
- *homematic.reconnect*: Reconnect to CCU/Homegear without restarting Home Assistant (useful when CCU has been restarted)
- *homematic.set_variable_value*: Set the value of a system variable.
- *homematic.set_device_value*: Control a device manually (even devices without support). Equivalent to setValue-method from XML-RPC.
- *homematic.put_paramset*: Manually change a device's paramset (even devices without support). Equivalent to putParamset-method from XML-RPC.

#### Examples

Simulate a button being pressed:

```yaml
...
actions:
  - action: homematic.virtualkey
    data:
      address: "BidCoS-RF"
      channel: 1
      param: PRESS_LONG
```

Open KeyMatic:

```yaml
...
actions:
  - action: homematic.virtualkey
    data:
      address: "LEQ1234567"
      channel: 1
      param: OPEN
```

Set boolean variable to true:

```yaml
...
actions:
  - action: homematic.set_variable_value
    target:
      entity_id: homematic.ccu2
    data:
      name: "Variablename"
      value: true
```

#### Advanced examples

If you are familiar with the internals of Homematic devices, you can manually set values on the devices. This can serve as a workaround if support for a device is currently not available, or only limited functionality has been implemented.
Using this action provides you direct access to the setValue-method of the primary connection. If you have multiple hosts, you may select the one hosting a specific device by providing the proxy-parameter with a value equivalent to the name you have chosen. In the example configuration from above, `rf`, `wired`, and `ip` would be valid values.

Manually turn on a switch actor:

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 1
      param: STATE
      value: true
```

Manually set temperature on thermostat:

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 4
      param: SET_TEMPERATURE
      value: 23.0
```

Manually set the active profile on thermostat:

```yaml
...
actions:
  - action: homematic.set_device_value
    data:
      address: "LEQ1234567"
      channel: 1
      param: ACTIVE_PROFILE
      value: 1
      value_type: int
```

Set the week program of a wall thermostat:

```yaml
...
actions:
  - action: homematic.put_paramset
    data:
      interface: wireless
      address: "LEQ1234567"
      paramset_key: MASTER
      paramset:
        WEEK_PROGRAM_POINTER: 1
```

Set the week program of a wall thermostat with explicit `rx_mode` (BidCos-RF only):

```yaml
...
actions:
  - action: homematic.put_paramset
    data:
      interface: wireless
      address: "LEQ1234567"
      paramset_key: MASTER
      rx_mode: WAKEUP
      paramset:
        WEEK_PROGRAM_POINTER: 1
```

BidCos-RF devices have an optional parameter for put_paramset which defines the way the configuration data is sent to the device.

`rx_mode` `BURST`, which is the default value, will wake up every device when submitting the configuration data and hence makes all devices use some battery. It is instant, i.e. the data is sent almost immediately.

`rx_mode` `WAKEUP` will send the configuration data only after a device submitted updated values to CCU, which usually happens every 3 minutes. It will not wake up every device and thus saves devices battery.

Manually set lock on KeyMatic devices:

```yaml
...
actions:
  - action: lock.lock
    target:
      entity_id: lock.leq1234567
```

Manually set unlock on KeyMatic devices:

```yaml
...
actions:
  - action: lock.unlock
    target:
      entity_id: lock.leq1234567
```


#### Integrating HMIP-DLD

There is no available default integration for HMIP Doorlock (HMIP-DLD) in the current `pyhomematic` implementation.
A workaround is to define a template lock in your configuration:

{% raw %}

```yaml
lock:
  - platform: template
    name: Basedoor
    unique_id: basedoor
    value_template: "{{ is_state('sensor.lock_status', 'locked') }}"
    lock:
      action: homematic.set_device_value
      data:
        address: "002A1BE9A792D2"
        channel: 1
        param: LOCK_TARGET_LEVEL
        value: 0
    unlock:
      action: homematic.set_device_value
      data:
        address: "002A1BE9A792D2"
        channel: 1
        param: LOCK_TARGET_LEVEL
        value: 1
```

{% endraw %}

#### Detecting lost connections

When the connection to your Homematic CCU or Homegear is lost, Home Assistant will stop getting updates from devices. This may happen after rebooting the CCU for example. Due to the nature of the communication protocol this cannot be handled automatically, so you must call *homematic.reconnect* in this case. That's why it is usually a good idea to check if your Homematic integrations are still updated properly, in order to detect connection losses. This can be done in several ways through an automation:

- If you have a sensor which you know will be updated frequently (e.g., an outdoor temperature sensor, voltage sensor or light sensor) you could set up a helper binary sensor and an automation like this:

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: "Homematic is sending updates"
        state: >-
          {{ (now() - states.sensor.office_voltage.last_changed).seconds < 600 }}

automation:
  - alias: "Homematic Reconnect"
    triggers:
      - trigger: state
        entity_id: binary_sensor.homematic_is_sending_updates
        to: "off"
    actions:
      # Reconnect, if sensor has not been updated for over 10 minutes
      - action: homematic.reconnect
```

{% endraw %}

  The important part is the `sensor.time` entity (from time_date integration). This will update the binary sensor on every change of the sensor and every minute. If the Homematic sensor does not send any updates anymore, the `sensor.time` will set the binary sensor to `off` 10 minutes after the last sensor update. This will trigger the automation.

- If you have a CCU you can also create a system variable on the CCU, which stores its last reboot time. Since Home Assistant can still refresh system variables from the CCU (even after a reboot) this is another option to call *homematic.reconnect*. Even though this option might look preferable to many since it does not rely on a sensor, **it is less fail-safe** than checking for updates of a sensor. Since the variable on the CCU is only changed on boot, any problem that causes the connection between Home Assistant and the CCU to break but will not result in a reboot will not be detected (eg. in case of networking issues). This is how this can be done:

  1. Create a string variable **V_Last_Reboot** on the CCU

  2. Create a new program on the CCU **without any conditions**, which executes the following *HM-Script* with a delay of 30 seconds. The script needs to be implemented within the section `Activity: Then`.

     ```javascript
     var obj = dom.GetObject("V_Last_Reboot");
     string now = system.Date("%d.%m.%Y %H:%M:%S");
     obj.State(now);
     ```

     The Homematic CCU will execute all active programs which meet their conditions (none in this case) on every reboot.

  3. Set up a template sensor in Home Assistant, which contains the value of the system variable:

     {% raw %}

     ```yaml
     template:
       - sensor:
         - name: "v last reboot"
           state: "{{ state_attr('homematic.ccu2', 'V_Last_Reboot') or '01.01.1970 00:00:00' }}"
           icon: "mdi:clock"
     ```

     {% endraw %}

  4. Set up an automation which calls *homematic.reconnect* whenever the sensor variable changes:

     ```yaml
     automation:
       - alias: "Homematic CCU Reboot"
         triggers:
           - trigger: state
             entity_id: sensor.v_last_reboot
         actions:
           - action: homematic.reconnect
     ```

## Notifications

The `homematic` notification platform enables invoking Homematic devices.

To use this notification platform in your installation, add the following to your {% term "`configuration.yaml`" %} file:

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  - name: my_hm
    platform: homematic
    address: "NEQXXXXXXX"
    channel: 2
    param: "SUBMIT"
    value: "1,1,108000,8"
```

{% configuration %}
address:
  description: The address of your Homematic device. The address is the serial number of the device shown in the CCU in the `devices` section in the column `serial number`.
  required: true
  type: string
channel:
  description: The channel of your Homematic device.
  required: true
  type: integer
param:
  description: An additional parameter for the Homematic device.
  required: true
  type: string
interface:
  description: Set the name of the interface from the configuration.
  required: false
  type: string
value:
  description: This is the value that is set on the device. It's device specific.
  required: true
  type: string
{% endconfiguration %}

### Usage

`homematic` is a notify platform and can be controlled by calling the notify action [as described here](/integrations/notify/).

Only the `data` part of the event payload is processed. This part can specify or override the value given as configuration variable:

```json
{
  "data": {
    "address": "NEQXXXXXXX",
    "channel": 2,
    "param": "SUBMIT",
    "value": "1,1,108000,8"
  }
}
```

It is possible to provide a template in order to compute the value:

{% raw %}

```json
{
  "data": {
    "value": "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"
  }
}
```

{% endraw %}

You can also specify the event payload using a group notification (instead of specifying the value for the notify itself):

{% raw %}

```yaml
notify:
  - name: my_hm
    platform: homematic
    address: NEQXXXXXXX
  - name: group_hm
    platform: group
    services:
      - action: my_hm
        data:
          data:
            value: "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"

alert:
  temperature:
    name: Temperature too high
    done_message: Temperature OK
    entity_id: binary_sensor.temperature_too_high
    can_acknowledge: true
    notifiers:
      - group_hm
```

{% endraw %}

Please note that the first `data` element belongs to the `my_hm` action, while the second one belongs to the event payload.
