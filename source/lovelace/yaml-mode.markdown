---
title: "Lovelace YAML mode"
description: "Advanced users can switch on YAML mode for editing the Lovelace UI."
---

It is possible to customize your Home Assistant interface by writing in YAML instead of via the UI. To do so, you configure the Lovelace integration to be in YAML mode by adding the following to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
```

Restart Home Assistant for the mode to be changed. Create a new file `<config>/ui-lovelace.yaml` and add your Lovelace configuration. A good way to start this file is to copy and paste the "Raw configuration" from the UI so your manual configuration starts the same as your existing UI.

- Go into the `Overview` tab.
- Click the three dots menu (top-right) and click on `Configure UI`.
- Click the three dots menu again and click on `Raw config editor`.
- There you see the configuration for your current Lovelace UI. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your Lovelace interface, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw configuration section of Home Assistant and restart.

### Advanced configuration

You can define multiple dashboards that all have their own YAML file, and add custom resources that are shared by all dashboards. For more details refer to [this](/lovelace/dashboards-and-views/) page.
