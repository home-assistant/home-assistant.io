---
layout: page
title: "Decora"
description: "Instructions on how to setup Leviton Decora Bluetooth dimmers within Home Assistant."
date: 2017-01-18 22:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
logo: leviton.png
ha_release: 0.37
---

Support for the Decora Bluetooth dimmer switch [Leviton](http://www.leviton.com/OA_HTML/SectionDisplay.jsp?section=76697&minisite=10251).

The API key can be obtained by downloading [this git repository](https://github.com/mjg59/python-decora) and running the `read_key.py` script with the Bluetooth address of the switch as the first argument. Hold the switch in the off position until the green status LED starts flashing before running the script. The output is the API key.

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: decora
    devices:
      00:21:4D:00:00:01:
        api_key: 0x12345678
```

Configuration variables:

- **devices** array (*Required*): A list of lights to use.
  - **[mac address]** (*Required*): The bluetooth address of the switch.
    - **name** (*Optional*): The custom name to use in the frontend.
    - **api_key** (*Required*): The API key to acces the device.

<p class='note'>
If you get an error looking like this:

```
Jun 20 19:41:18 androlapin hass[29588]: ERROR:homeassistant.components.light:Error while setting up platform decora
Jun 20 19:41:18 androlapin hass[29588]: Traceback (most recent call last):
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/local/lib/python3.6/dist-packages/homeassistant/helpers/entity_component.py", line
 161, in _async_setup_platform
Jun 20 19:41:18 androlapin hass[29588]:     SLOW_SETUP_MAX_WAIT, loop=self.hass.loop)
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/lib/python3.6/asyncio/tasks.py", line 357, in wait_for
Jun 20 19:41:18 androlapin hass[29588]:     return fut.result()
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/lib/python3.6/asyncio/futures.py", line 244, in result
Jun 20 19:41:18 androlapin hass[29588]:     raise self._exception
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/lib/python3.6/concurrent/futures/thread.py", line 55, in run
Jun 20 19:41:18 androlapin hass[29588]:     result = self.fn(*self.args, **self.kwargs)
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/custom_components/light/decora.py", line 68, in setup_platform
Jun 20 19:41:18 androlapin hass[29588]:     light = DecoraLight(device)
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/custom_components/light/decora.py", line 103, in __init__
Jun 20 19:41:18 androlapin hass[29588]:     self._switch.connect()
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/deps/decora/__init__.py", line 53, in connect
Jun 20 19:41:18 androlapin hass[29588]:     self._connect()
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/deps/decora/__init__.py", line 26, in _connect
Jun 20 19:41:18 androlapin hass[29588]:     self.device = btle.Peripheral(self.mac, addrType=btle.ADDR_TYPE_PUBLIC)
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/deps/bluepy/btle.py", line 353, in __init__
Jun 20 19:41:18 androlapin hass[29588]:     self._connect(deviceAddr, addrType, iface)
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/deps/bluepy/btle.py", line 388, in _connect
Jun 20 19:41:18 androlapin hass[29588]:     self._startHelper()
Jun 20 19:41:18 androlapin hass[29588]:   File "/opt/homeassistant/deps/bluepy/btle.py", line 246, in _startHelper
Jun 20 19:41:18 androlapin hass[29588]:     universal_newlines=True)
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/lib/python3.6/subprocess.py", line 707, in __init__
Jun 20 19:41:18 androlapin hass[29588]:     restore_signals, start_new_session)
Jun 20 19:41:18 androlapin hass[29588]:   File "/usr/lib/python3.6/subprocess.py", line 1327, in _execute_child
Jun 20 19:41:18 androlapin hass[29588]:     raise child_exception_type(errno_num, err_msg)
Jun 20 19:41:18 androlapin hass[29588]: OSError: [Errno 8] Exec format error
```

1. Go to your home-assistant folder
2. Then go to `deps/bluepy` subfolder.
3. Then run `make all`
4. Restart home assistant
</p>
