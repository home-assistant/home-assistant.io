---
layout: page
title: "Creating components"
description: "Guidelines to get you create your first component for Home Assistant."
date: 2014-12-21 13:32
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant offers [built-in components]({{site_root}}/components/) but it is easy to build your own. If you are the kind of person that likes to learn from code rather then guide then head over to the [`config/custom_components`](https://github.com/home-assistant/home-assistant/tree/master/config/custom_components) folder in the repository for two example components. Or visit the [Custom Python Component Examples]({{site_root}}/cookbook/#custom-python-component-examples).

The first is [hello_world.py](https://github.com/home-assistant/home-assistant/blob/master/config/custom_components/hello_world.py) (this is similar to the [Basic State Setting Example](https://home-assistant.io/cookbook/python_component_basic_state/)), which is the classic "Hello World" example for Home Assistant. The second one is [example.py](https://github.com/home-assistant/home-assistant/blob/master/config/custom_components/example.py) which showcases various ways you can tap into Home Assistant to be notified when certain events occur.

If you want to load these components in Home Assistant, add the following lines to your `configuration.yaml` file:

```yaml
hello_world:

example:
  target: TARGET_ENTITY
```

`TARGET_ENTITY` should be one of your devices that can be turned on and off, ie a light or a switch. Example value could be `light.Ceiling` or `switch.AC` (if you have these devices with those names).

## {% linkable_title Loading components %}

A component will be loaded on start if a section (ie. `light:`) for it exists in the config file. A component can also be loaded if another component is loaded that depends on it. When loading a component Home Assistant will check the following paths:

 * `<config directory>/custom_components/<component name>`
 * `homeassistant/components/<component name>` (built-in components)

Once loaded, a component will only be setup if all dependencies can be loaded and are able to setup. Keep an eye on the logs to see if your component could be loaded and initialized.

<p class='note warning'>
You can override a built-in component by having a component with the same name in your <code>config/custom_components</code> folder. This is not recommended and will probably break things!
</p>

<p class='note'>
Home Assistant will use the directory that contains your config file as the directory that holds your customizations. By default this is the <code>config</code> folder in your current work directory. You can use a different folder by running Home Assistant with the --config argument: <code>python3 homeassistant --config /YOUR/CONFIG/PATH/</code>.
</p>

## {% linkable_title Dependencies %}

Home Assistant allows components and platforms to specify their dependencies and requirements using the variables `DEPENDENCIES` and `REQUIREMENTS`. Both are lists that contain strings.

Dependencies are other Home Assistant components that should be setup before the platform is loaded. An example is the MQTT sensor component, which requires an active connection to an MQTT broker. If Home Assistant is unable to load and setup the MQTT component, it will not setup the MQTT sensor component.

Requirements are Python libraries that you would normally install using `pip`. Each entry in a requirement list is a pip compatible string. For example, the media player Cast platform depends on the Python package PyChromecast thus `REQUIREMENTS = ['pychromecast==0.6.12']`. If Home Assistant is unable to install the package or verify it is installed, the component will fail to load.

## {% linkable_title Initializing components %}

After loading, the bootstrapper will call `setup(hass, config)` method on the component to initialize it.

### {% linkable_title `hass`: the Home Assistant instance %}

The Home Assistant instance contains three objects to help you interact with the system.

| Object | Description |
| ------ | ----------- |
| `hass.config` | This is the core configuration of Home Assistant exposing location, temperature preferences and config directory path. [Details](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L687)
| `hass.states` | This is the StateMachine. It allows you to set states and track when they are changed. [See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L434). |
| `hass.bus` | This is the EventBus. It allows you to trigger and listen for events.<br>[See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L229). |
| `hass.services` | This is the ServiceRegistry. It allows you to register services.<br>[See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L568). |

### {% linkable_title `config`: User given configuration. %}

The `config` parameter is a dictionary containing the user supplied configuration. The keys of the dictionary are the component names and the value is another dictionary with the component configuration.

If your configuration file contains the following lines:

```yaml
example:
  host: paulusschoutsen.nl
```

Then in the setup method of your component you will be able to refer to `config['example']['host']` to get the value `paulusschoutsen.nl`.

## {% linkable_title Responding to events %}

Home Assistant has different ways of responding to events that occur in Home Assistant. These have been organized in [helper methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/event.py). Examples are `track_state_change`, `track_point_in_time`, `track_time_change`.
