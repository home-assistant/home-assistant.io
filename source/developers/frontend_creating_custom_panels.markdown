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

Panels are pages within Home Assistant that show information within Home Assistant and can allow controlling it. Panels are linked from the sidebar and rendered full screen. The have have real-time access to the Home Assistant object via JavaScript. Examples of panels in the app are map, logbook and history.

Besides components registering panels, users can also register panels using the `panel_custom` component. This allows users to quickly build their own custom interfaces for Home Assistant.

### {% linkable_title Before you get started %}

The Home Assistant user interface is currently served to browsers in modern JavaScript and older JavaScript (ES5). The older version has a wider browser support but that comes at a cost of size, performance and more difficult to get started building panels for authors.

We therefore advice to set up the frontend to serve the modern version of the frontend so that you won't need any build tools while developing. If you realize that your audience requires both, you can add a transpilation step in the future. To set up your frontend to always serve the latest version, add this to your config:

```
frontend:
  javascript_version: latest
```

### {% linkable_title Building your first panel %}

Create a file called `hello.html` in your <config dir>/panels/.

The `hello.html` contains the needed building blocks to create the elements inside the view.

```html
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
