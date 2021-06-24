---
title: iframe Panel
description: Instructions on how to add iFrames in the frontend of Home Assistant.
ha_category:
  - Front End
ha_release: 0.25
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/frontend'
ha_domain: panel_iframe
---

The `panel_iframe` support allows you to add additional panels to your Home Assistant frontend. The panels are listed in the sidebar and can contain external resources like the web frontend of your router, your monitoring system, or your media server.

<div class='note warning'>
If you are accessing Home Assistant over HTTPS using SSL, you cannot access HTTP sites through an iframe panel.
</div>

To enable Panel iFrames in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
panel_iframe:
  router:
    title: "Router"
    url: "http://192.168.1.1"
  fridge:
    title: "Fridge"
    url: "http://192.168.1.5"
  otherapp:
    title: "Other App"
    url: "/otherapp"
```

{% configuration %}
panel_iframe:
  description: Enables the panel_iframe component. Only allowed once.
  required: true
  type: map
  keys:
    panel_name:
      description: Name of the panel. Only allowed once.
      required: true
      type: map
      keys:
        title:
          description: Friendly title for the panel. Will be used in the sidebar.
          required: true
          type: string
        url:
          description: The absolute URL or relative URL with an absolute path to open.
          required: true
          type: string
        icon:
          description: Icon for entry.
          required: false
          type: icon
        require_admin:
          description: If admin access is required to see this iframe.
          required: false
          type: boolean
          default: false
{% endconfiguration %}

<div class='note warning'>

Do **not** create one that is named `lovelace` it will overwrite Lovelace causing it to never load.

</div>
