---
title: Proxy Panel
description: Instructions on how to add proxy using iFrames in the frontend of Home Assistant.
ha_category:
  - Front End
ha_release: 0.107
ha_quality_scale: internal
ha_codeowners:
  - '@doudz'
ha_domain: panel_proxy
---

The `panel_proxy` support allows you to create a simple reverse proxy to other webapp in Home Assistant frontend. The panels are listed in the sidebar and can contain external resources like the web frontend of your router, your monitoring system, or your media server.

This is similar to the directive proxy_pass of NGINX for example.

To enable proxy Panel in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
panel_proxy:
  router:
    title: 'Router'
    url: 'http://192.168.1.1/router'
  fridge:
    title: 'Fridge'
    url: 'http://192.168.1.5/fridge'
  otherapp:
    title: 'Other App'
    url: 'http://localhost:8080/otherapp'
```

{% configuration %}
panel_proxy:
  description: Enables the panel_proxy component. Only allowed once.
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
          description: The absolute URL.
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

panel_name must be the mount point of the remote app, example otherapp => http://localhost:8080/otherapp

</div>
