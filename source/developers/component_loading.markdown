---
layout: page
title: "Loading your components"
description: "Instructions how to get your component loaded by Home Assistant."
date: 2016-04-16 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

A component will be loaded on start if a section (ie. `light:`) for it exists in the config file. A component can also be loaded if another component is loaded that depends on it. When loading a component Home Assistant will check the following paths:

 * `<config directory>/custom_components/<component name>`
 * `homeassistant/components/<component name>` (built-in components)
    
    If Home Assistant is installed in an **venv** you find the components folder under the following subfolder:
    * `lib/python3.5/site-packages/homeassistant/components/<component name>`

Once loaded, a component will only be setup if all dependencies can be loaded and are able to setup. Keep an eye on the logs to see if your component could be loaded and initialized.

<p class='note warning'>
You can override a built-in component by having a component with the same name in your <code>config/custom_components</code> folder. If the built-in component is inside a subfolder, take care to place your customization in a folder with the same name in <code>config/custom_components/*folder*</code>. Note that overriding built-in components is not recommended and will probably break things!
</p>

<p class='note'>
Home Assistant will use the directory that contains your config file as the directory that holds your customizations. By default this is the <code>config</code> folder in your current work directory. You can use a different folder by running Home Assistant with the --config argument: <code>python3 homeassistant --config /YOUR/CONFIG/PATH/</code>.
</p>
