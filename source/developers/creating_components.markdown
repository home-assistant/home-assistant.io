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

Home Assistant offers [built-in components]({{site_root}}/components/) but it
is easy to built your own.

## Loading components

A component will be loaded on start if a section (ie. `[light]`) for it exists in the config file. A component can also be loaded if another component is loaded that depends on it. When loading a component Home Assistant will check the following paths:

 * <code>&lt;config directory>/custom_components/&lt;component name></code>
 * <code>homeassistant/components/&lt;component name></code> (built-in components)

Once loaded, a component will only be setup if all dependencies can be loaded and are able to setup. Keep an eye on the logs to see if your component could be loaded and initialized.

<p class='note warning'>
You can override a built-in component by having a component with the same name in your <code>config/custom_components</code> folder. This is not recommended and will probably break things!
</p>

<p class='note'>
Home Assistant will use the directory that contains your config file as the directory that holds your customizations. By default this is the <code>config</code> folder in your current work directory. You can use a different folder by running Home Assistant with the --config argument: <code>python3 homeassistant --config /YOUR/CONFIG/PATH/</code>.
</p>

## Initializing components

After loading, the bootstrapper will call `setup(hass, config)` method on the component to initialize it. The following parameters are passed in:

| Parameter | Description |
| --------- | ----------- |
| <code>hass</code> | The Home Assistant object. Call its methods to track time, register services, listen for events or track states: [Overview of available methods.](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L38) |
| <code>config</code> | A dict containing the configuration. The keys of the config-dict are component names and the value is another dict with the component configuration. |

### Guidance on using the Home Assistant object
The Home Assistant object contains three objects to help you interact with the system.

| Object | Description |
| ------ | ----------- |
| <code>hass.states</code> | This is the StateMachine. It allows you to set states and trach when they are changed. [See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L473). |
| <code>hass.events</code> | This is the EventBus. It allows you to trigger and listen for events.<br>[See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L308). |
| <code>hass.services</code> | This is the ServiceRegistry. It allows you to register services.<br>[See available methods](https://github.com/balloob/home-assistant/blob/master/homeassistant/__init__.py#L589). |

### Example on using the configuration parameter
If your configuration file containes the following lines:

```
[example]
host=paulusschoutsen.nl
```

Then in the setup-method of your component you will be able to refer to `config['example']['host']` to get the value `paulusschoutsen.nl`.
