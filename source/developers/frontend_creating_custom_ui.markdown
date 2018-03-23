---
layout: page
title: "Creating custom UI"
description: "Introduction to create custom ui for Home Assistant."
date: 2017-02-04 13:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.38
---

If you would like to use your own [State card](/developers/frontend_add_card/) without merging your code into [home-assistant-polymer](https://github.com/home-assistant/home-assistant-polymer/) you can create your own implementation.

Put the element source file and its dependencies in `www/custom_ui/` directory under your Home Assistant [configuration](/docs/configuration/) directory.

For example if creating a state card for the `light` domain named `state-card-my-custom-light` put `state-card-my-custom-light.html` in `www/custom_ui/`.

That file should implement `<state-card-my-custom-light>` tag with Polymer.

In `state-card-my-custom-light.html` you should use `<link rel="import">` to import all the dependencies **not** used by Home Assistant's UI.
Do not import any dependencies used by the Home Assistant UI.
Importing those will work in `development: 1` mode, but will fail in production mode.

1. In the `customize:` section of the `configuration.yaml` file put `custom_ui_state_card: state-card-my-custom-light`.
2. In the `frontend` section use `extra_html_url` to specify the URL to load.

Example:

`configuration.yaml`:

```yaml
homeassistant:
  customize:
    light.bedroom:
      custom_ui_state_card: state-card-my-custom-light

frontend:
  extra_html_url:
    - /local/custom_ui/state-card-my-custom-light.html
```

`www/custom_ui/state-card-my-custom-light.html`:

```html
<script>
{
  // show the version of your custom UI in the HA dev info panel (HA 0.66.0+):
  const _NAME = 'My custom light';
  const _URL = 'https://home-assistant.io/developers/frontend_creating_custom_ui/';
  const _VERSION = '20180312';

  if (!window.CUSTOM_UI_LIST) window.CUSTOM_UI_LIST = [];
  window.CUSTOM_UI_LIST.push({
    name: _NAME,
    url: _URL,
    version: _VERSION
  });
}
</script>
<dom-module id='state-card-my-custom-light'>
  <template>
    <style>

    </style>
    <textarea>[[_toStr(stateObj)]]</textarea>
  </template>
</dom-module>

<script>
class StateCardMyCustomLight extends Polymer.Element {
  static get is() { return 'state-card-my-custom-light'; }
  
  static get properties() {
    return {
      // Home Assistant object
      hass: Object,
      // inDialog is true if shown as more-info-card
      inDialog: {
        type: Boolean,
        value: false,
      },
      // includes state, config and more information of the entity
      stateObj: Object,
    };
  }

  _toStr(obj) {
    return JSON.stringify(obj, null, 2);
  }
}
customElements.define(StateCardMyCustomLight.is, StateCardMyCustomLight);
</script>
```
<p class='note'>
Some browsers don't support latest ECMAScript standards, these require a separate ES5 compatible file (`extra_html_url_es5`).
</p>

For more possibilities, see the [Custom UI section](/cookbook/#user-interface) on our Examples page.
