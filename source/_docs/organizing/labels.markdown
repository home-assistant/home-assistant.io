---
title: "Labels"
description: "Label your areas, devices, entities, automations, scripts, and helpers. Then, filter by label or run an automation on all entities with that label."
---

Labels in Home Assistant allow grouping elements irrespective of their physical location or type. Labels can be assigned to areas, devices, entities, automations, scenes, scripts, and helpers. Labels can be used in automations and scripts as a target for actions and services. Labels can also be used to filter data. For example, you can filter the list of devices to show only devices with the label `heavy energy usage` or turn these devices off when there is not a lot of solar energy available.

## Creating a label

Follow these steps to create a new label from the **Labels** view.

1. Go to {% my labels title="**Settings** > **Areas, labels & zones**" %} and on top, select the **Labels** tab.
2. Select the **Create label** button.
3. In the dialog, enter the label details:
   - Give the label a **Name** (required).
   - Add an icon (We use [Material icons](https://pictogrammers.com/library/mdi/)).
   - Add a **Color**.

    ![Create label dialog](/images/organizing/create_label_01.png)
4. Select **Create**.

   **Result**: A new label is created.

## Applying labels

Follow these steps to apply a label

1. To apply a label to an area:
   - Go to {% my areas title="**Settings** > **Areas, labels & zones**" %}.
   - On the area card, select the pencil icon.
   - Select one or more labels or select **Add new label** to create a new one.
2. To apply a label to a device, entity, or helper:
   - Go to **{% my integrations title="Settings > Devices & Services" %}** and open the respective tab.
   - Select the <img height="28px" src="/images/organizing/multiselect_icon.png" alt="Multiselect icon"/> button.
   - From the list, select all the items to which you want to apply a label.
   - In the top right corner, select **Add label**. Then, select the labels from the list.

    ![Apply label](/images/organizing/labels_add_05.png)
3. To apply a label to an automation, scene, or script:
   - Go to {% my automations title="**Settings** > **Automations & Scenes**" %} and open the respective tab.
   - Select the <img height="28px" src="/images/organizing/multiselect_icon.png" alt="Multiselect icon"/> button.
   - From the list, select all the items to which you want to apply a label.
   - In the top right corner, select the three dots menu, then select **Add label**. Then, select the labels from the list.

## Related topics

- [Areas](/docs/organizing/areas/)
- [Using labels in templates](/docs/configuration/templating/#labels)
