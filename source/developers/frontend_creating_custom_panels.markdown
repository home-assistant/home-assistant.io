---
layout: page
title: "Creating custom panels"
description: "Introduction to create custom panels for Home Assistant."
date: 2016-07-29 13:00
sidebar: true
comments: false
sharing: true
footer: true
---

Any component has the possibility to add a panel to the frontend. Panels will be rendered full screen and have real-time access to the Home Assistant object via JavaScript. Examples of this in the app are map, logbook and history.

Create a file called `hello.html` in your <config dir>/panels/.

The `hello.html` contains the needed building blocks to create the elements inside the view.

```javascript
<dom-module id='ha-panel-hello'>
  <template>
    <style>
      p {
        font-weight: bold;
      }
    </style>
    <p>Hello {% raw %}{{who}}{% endraw %}. Greetings from Home Assistant.</p>
  </template>
</dom-module>

<script>
class HaPanelHello extends Polymer.Element {
  static get is() { return 'ha-panel-hello'; }
  
  static get properties() {
    return {
      // Home Assistant object
      hass: Object,
      // If should render in narrow mode
      narrow: {
        type: Boolean,
        value: false,
      },
      // If sidebar is currently shown
      showMenu: {
        type: Boolean,
        value: false,
      },
      // Home Assistant panel info
      // panel.config contains config passed to register_panel serverside
      panel: Object,
      who: {
        type: String,
        computed: 'computeWho(panel)',
      },
    };
  }

  computeWho(panel) {
    return panel && panel.config && panel.config.who ? panel.config.who : 'World';
  }
}
customElements.define(HaPanelHello.is, HaPanelHello);
</script>
```

Create an entry for the new panel in your `configuration.yaml` file:

```yaml
panel_custom:
  - name: hello
    sidebar_title: Hello World
    sidebar_icon: mdi:hand-pointing-right
    url_path: hello
```

For more possibilities, see the [Custom panel section](/cookbook/#user-interface) on our Examples page.
