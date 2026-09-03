---
title: Delete a meal plan
action: mealie.delete_mealplan
domain: mealie
description: "Delete an existing meal plan in Mealie."
related_actions:
  - mealie.set_mealplan
  - mealie.set_random_mealplan
  - mealie.get_mealplan
  - mealie.update_mealplan
  - mealie.get_recipes
---

Use this action to delete an existing meal plan in Mealie.

{% include actions/ui_header.md %}

To delete a meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Delete a meal plan**.
6. Select the **Mealie instance** you want to use, and add the existing meal plan ID you want to delete.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to delete the meal plan on.
Mealplan ID:
  description: The meal plan ID to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.delete_mealplan`. A basic example looks like this:

{% example %}
action: |
  action: mealie.delete_mealplan
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    mealplan_id: AN_EXISTING_MEALPLAN_ID
{% endexample %}

This deletes the specified meal plan.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to plan the meal on.
  required: true
  type: string
mealplan_id:
  description: The meal plan ID to delete.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- You can get existing meal plans using the [`mealie.get_mealplan`](/actions/mealie.get_mealplan/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
