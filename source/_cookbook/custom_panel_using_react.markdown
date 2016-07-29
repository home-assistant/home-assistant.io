---
layout: page
title: "Custom Panel using React"
description: ""
date: 2016-07-29 12:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Custom Panel Examples
---

This is a [React](https://facebook.github.io/react/) implementation of [TodoMVC](http://todomvc.com/) but instead of checking off to do items, you are turning lights and switches on/off.

- It uses React to render the data.
- It hooks into Home Assistant JS which means updates pushed from the server are instantly rendered.
- It accesses properties made available from Polymer.
- It uses the user configuration for the component in the `configuration.yaml` file for rendering.
- It allows toggling the sidebar.

All you need is available as a [custom component](https://github.com/home-assistant/home-assistant/tree/dev/config/custom_components/react_panel).

Create a entry for the panel in your `configuration.yaml` file to enable it. Set a title if you like.

```yaml
react_panel:
  title: 'React'
```

This video shows the frontend in action.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/2200UutdXlo" frameborder="0" allowfullscreen></iframe>
</div>

