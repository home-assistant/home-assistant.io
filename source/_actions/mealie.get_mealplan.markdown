---
title: Get meal plan
action: mealie.get_mealplan
domain: mealie
description: "Get the Mealie meal plan for a specified date range."
related_actions:
  - mealie.set_mealplan
  - mealie.set_random_mealplan
  - mealie.get_recipe
---

Use this action to get the meal plan from Mealie for a specified date range. This is handy when you want to read out today's dinner, show it on a dashboard, or send it in a notification.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Get meal plan**.
6. Select the **Mealie instance** you want to use, and set the date range you want.
7. In the **Response variable** field, enter a name to store the data in, such as `meal_plan`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to get the meal plan from.
Start date:
  description: The start date of the meal plan. Defaults to today if not set.
  required: false
End date:
  description: The end date of the meal plan. Defaults to today if not set.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.get_mealplan`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.get_mealplan
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    start_date: "2025-06-01"
    end_date: "2025-06-07"
  response_variable: meal_plan
{% endexample %}

This gets the meal plan for the first week of June and stores it in the `meal_plan` response variable.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to get the meal plan from.
  required: true
  type: string
start_date:
  description: The start date of the meal plan. Defaults to today if not set.
  required: false
  type: string
end_date:
  description: The end date of the meal plan. Defaults to today if not set.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns the meal plan entries for the date range, under a `mealplan` key. Each entry includes the meal type (such as `breakfast` or `dinner`), the date, and either the planned recipe or a note.

A shortened example of using the response in a template sensor that lists today's dinner looks like this:

```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: mealie.get_mealplan
        data:
          config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
        response_variable: result
    sensor:
      - name: "Dinner today"
        unique_id: mealie_dinner_today
        state: >
          {% raw %}
          {% for meal in result.mealplan if meal.entry_type == "dinner" -%}
          {{ meal.recipe['name'] if meal.recipe is not none else meal.title -}}
          {{ ", " if not loop.last }}
          {%- endfor %}
          {% endraw %}
```

## Good to know

- To find the ID or slug of a recipe in the response, use the [`mealie.get_recipes`](/actions/mealie.get_recipes/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
