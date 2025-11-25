---
title: Custom panel
description: Instructions on how to add customized panels to the front end of Home Assistant.
ha_category:
  - Front end
ha_release: 0.26
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/frontend'
ha_domain: panel_custom
ha_integration_type: system
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `panel_custom` {% term integration %} allows you to write your own panels in JavaScript and add them to Home Assistant. See the developer documentation on [instructions how to build your own panels](https://developers.home-assistant.io/docs/frontend/custom-ui/creating-custom-panels/).

To enable customized panels in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
panel_custom:
  - name: my-panel
    sidebar_title: TodoMVC
    sidebar_icon: mdi:work
    url_path: my-todomvc
    module_url: /local/my-panel.js
    config:
      who: world
```

{% tip %}
Store your custom panels in `<config>/www` to make them available in the frontend at the path `/local`.
{% endtip %}

{% configuration %}
name:
  description: Name of the web integration that renders your panel.
  required: true
  type: string
sidebar_title:
  description: Friendly title for the panel in the sidebar. Omitting it means no sidebar entry (but still accessible through the URL).
  required: false
  type: string
sidebar_icon:
  description: Icon for entry. Pick an icon that from [Material Design Icons](https://pictogrammers.com/library/mdi/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
  required: false
  default: "mdi:bookmark"
  type: icon
url_path:
  description: The URL your panel will be available on in the frontend. If omitted will default to the panel name.
  required: false
  type: string
js_url:
  description: The URL that contains the JavaScript of your panel. If used together with `module_url`, will only be served to users that use the ES5 build of the frontend.
  required: false
  type: string
module_url:
  description: The URL that contains the JavaScript module of your panel. Loaded as a JavaScript module instead of a script. If used together with `module_url`, will only be served to users that use the "latest" build of the frontend.
  required: false
  type: string
config:
  description: Configuration to be passed into your web component when being instantiated.
  required: false
  type: list
require_admin:
  description: If admin access is required to see this panel.
  required: false
  type: boolean
  default: false
embed_iframe:
  description: Set to `true` to embed panel in iframe. This is necessary if the panel is using the React framework or if it contains conflicting web components.
  required: false
  default: false
  type: boolean
trust_external_script:
  description: By default the user has to confirm before loading a script from an external source. Setting this to `true` will omit this confirmation.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
