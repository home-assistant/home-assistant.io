---
title: Browser
description: Instructions on how to setup the browser integration with Home Assistant.
ha_category:
  - Utility
ha_release: pre 0.7
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: browser
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Browser** {% term integration %} provides a action to open URLs in the default browser on the host machine.

## Configuration

To load this integration, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
browser:
```

### Actions

Once loaded, the `browser` platform will expose {% term actions %} that can be called to perform various {% term actions %}.

Available actions: `browser/browse_url`.

| Data attribute | Optional | Description      |
| ---------------------- | -------- | ---------------- |
| `url`                  | no       | The URL to open. |

### Usage

To use this {% term action %}, select the **Actions** tab from the **Developer Tools**. Choose the action *browser/browse_url* from the list of **Actions:** and enter the URL into the **data** field and select **Perform action**.

```json
{"url": "http://www.google.com"}
```

This will open the given URL on the host machine.
