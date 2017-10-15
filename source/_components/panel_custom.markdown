---
layout: page
title: "Panel Custom"
description: "Instructions how to add customized panels to the frontend of Home Assistant."
date: 2015-08-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
ha_release: 0.26
---


The `panel_custom` support allows you to add additional panels to your Home Assistant frontend. The panels are listed in the sidebar if wished and can be highly customized.

To enable customized panels in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for https://github.com/home-assistant/example-custom-config/blob/master/panels/hello_world.html
panel_custom:
  - name: todomvc
    sidebar_title: TodoMVC
    sidebar_icon: mdi:work
    url_path: my-todomvc
    webcomponent_path: /home/hass/hello.html
    config:
      who: world
```

Configuration variables:

- **name** (*Optional*): Name of the panel.
- **sidebar_title** (*Optional*): Friendly title for the panel in the sidebar. Omitting it means no sidebar entry (but still accessible through the URL).
- **sidebar_icon** (*Optional*): Icon for entry. Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
- **url_path** (*Optional*): The URL your panel will be available on. If omitted will default to the panel name.
- **webcomponent_path** (*Optional*): The  path to your component. If omitted will default to `<config dir>/panels/<component name>.html`
- **config** (*Optional*): Configuration to be passed into your web component when being instantiated.

