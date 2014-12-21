---
layout: page
title: "Developers"
date: 2014-12-21 13:32
sidebar: false
comments: true
sharing: true
footer: true
---

Home Assistant can be extended by components. Components can listen for- or trigger events and offer services. Components are written in Python and can do all the goodness that Python has to offer.

Home Assistant offers [built-in components]({{site_root}}/components/) but it is easy to built your own. An example component can be found in [`/config/custom_components/example.py`](https://github.com/balloob/home-assistant/blob/master/config/custom_components/example.py).

<div class='note'><p class='title'>Note</p><p class='content'>
Home Assistant will use the directory that contains your config file as the directory that holds your customizations. By default this is the <code>config</code> folder in your current work directory. You can use a different folder by running Home Assistant with the --config argument <code>python3 homeassistant --config /YOUR/CONFIG/PATH/</code>.
</p></div>

A component will be loaded on start if a section (ie. `[light]`) for it exists in the config file. A component can also be loaded if another component is loaded that depends on it. When loading a component Home Assistant will check the following paths:

 * <code>&lt;config directory>/custom_components/&lt;component name></code>
 * <code>homeassistant/components/&lt;component name></code> (built-in components)

Once loaded, a component will only be setup if all dependencies can be loaded and are able to setup. Keep an eye on the logs to see if loading and setup of your component went well.

<div class='note warning'><p class='title'>Warning</p><p class='content'>
*Warning:* You can override a built-in component by offering a component with the same name in your custom_components folder. This is not recommended and may lead to unexpected behavior!
</p></div>

Each component is responsible for a specific domain within Home Assistant. An example is the switch component, which is responsible for interaction with different types of switches. The switch component consists of the following files in `homeassistant/components/switch/`:

| File | Description |
| ---- | ----------- |
| \_\_init\_\_.py | Contains the Switch component code.|
| wemo.py | WeMo platform support. Included if in config `platform=wemo`. |
| tellstick.py | Tellstick platform support. Included if in config `platform=tellstick`. |

If a component exists, your job is easy. Have a look at how the component works with other platforms and create a similar file for the platform that you would like to add. If you cannot find a suitable component, you'll have to add it yourself. When writing a component try to structure it after the Switch component to maximize reusability.

Communication between Home Assistant and devices should happen via third-party libraries that implement the device API. This will make sure the platform support code stays as small as possible.

After a component is loaded the bootstrapper will call its setup method `setup(hass, config)`:

| Parameter | Description |
| --------- | ----------- |
| <code>hass</code> | The Home Assistant object. Call its methods to track time, register services or listen for events: [Overview of available methods.](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L38) |
| <code>config</code> | A dict containing the configuration. The keys of the config-dict are component names and the value is another dict with configuration attributes. |

### Guidance on using the Home Assistant object
The Home Assistant object contains three objects to help you interact with the system.

| Object | Description |
| ------ | ----------- |
| <code>hass.states</code> | This is the StateMachine. The StateMachine allows you to see which states are available and set/test states for specified entities. [See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L473). |
| <code>hass.events</code> | This is the EventBus. The EventBus allows you to listen and trigger events. [See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L308). |
| <code>hass.services</code> | This is the ServiceRegistry. The ServiceRegistry allows you to register services. [See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L589). |

### Example on using the configuration parameter
If your configuration file containes the following lines:

```
[example]
host=paulusschoutsen.nl
```

Then in the setup-method of your component you will be able to refer to `config['example']['host']` to get the value `paulusschoutsen.nl`.
