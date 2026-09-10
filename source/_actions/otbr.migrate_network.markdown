---
title: "Migrate Thread network"
action: otbr.migrate_network
domain: otbr
description: "Moves a border router and every device on its Thread network onto another Thread network."
---

Use this action to move a Thread network onto a different set of network credentials, for example to bring devices that were set up by another system onto the network you want to keep.

The border router hands the new credentials to every device on its network and they all switch together after a delay. Thread stays up throughout, and devices that hear about the change do not have to be added again. A device that is powered off for the entire delay misses the change and may need to be added to the new network again.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you provide the credentials of the network to move to, and, if you have more than one border router, you pick which one to migrate.

{% include actions/ui_header.md %}

To migrate a Thread network from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Migrate Thread network**.
6. Optionally, set the **Dataset**, **Delay**, and **Border router** options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Dataset:
  description: The credentials of the network to move to, as Thread operational dataset TLVs in hexadecimal, describing the network completely (channel, channel mask, PAN ID, extended PAN ID, mesh-local prefix, network name, network key, PSKC, and security policy). A partial dataset is refused, because the border router would fill in the missing settings with random ones. If you leave this empty, the preferred network from your Thread settings is used.
Delay:
  description: How long devices wait before switching, in seconds. A longer delay gives battery-powered devices more time to hear about the change. If you leave this empty, five minutes is used.
Border router:
  description: The border router to migrate. You only need to pick one if you have more than one border router set up.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `otbr.migrate_network`. A basic example looks like this:

{% example %}
action: |
  action: otbr.migrate_network
{% endexample %}

This moves the border router's network onto the preferred Thread network from your Thread settings, with the default delay.

### Options in YAML

{% options_yaml %}
dataset:
  description: The credentials of the network to move to, as Thread operational dataset TLVs in hexadecimal. The dataset must describe the network completely; a partial dataset is refused. Defaults to the preferred network from your Thread settings.
  required: false
  type: string
delay:
  description: How long devices wait before switching, in seconds, between 30 and 3600.
  required: false
  type: integer
  default: 300
config_entry:
  description: The border router to migrate. Only needed if you have more than one border router set up.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response data is a mapping. When a migration starts, it reports the network being moved to and how long devices wait before switching:

```yaml
status: migrating
network_name: "My Thread network"
delay: 300
```

If the border router is already on the network you asked for, nothing is changed and the response is:

```yaml
status: already_on_network
```

## Good to know

- This action migrates the whole Thread network, not just the border router you name. Every device on the network follows, including devices that were added by other systems, such as another smart home platform.
- Devices switch when the delay expires, not immediately. Until then, the network keeps running on its current credentials.
- A device that is powered off for the entire delay does not receive the new credentials and may need to be added again once it is back.
- There is no undo. Once the network has moved, bringing it back means running this action again with the previous credentials.
- If another radio in your system pins the Thread channel, a migration onto a different channel is refused.
- If you have more than one border router set up, you are asked which one to migrate.
- If the network you migrate away from is your preferred Thread network, the network you move to becomes the preferred one, so credential sharing and new border routers follow the migration.
- You can also use this action to change the credentials of the network you are already on, by giving it a dataset that keeps the same extended PAN ID but carries a new network key. Every device picks up the new credentials when the delay expires, the same way a migration works.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: move a newly set up border router onto your main network

Run this after adding a border router that came up with its own network, to bring it and its devices onto the network you already use.

- **Action**: Migrate Thread network
  - **Border router**: The new border router

{% details "Show example YAML" %}

{% example %}
script: |
  migrate_new_border_router:
    alias: "Move the new border router onto my main network"
    sequence:
      - action: otbr.migrate_network
        data:
          # Pick the border router in the UI; this is its config entry id.
          config_entry: 1b4dd43eafcf27ac9a2b6a962b3b9f6e
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
