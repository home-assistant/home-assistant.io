---
title: "Set pet location"
action: surepetcare.set_pet_location
domain: surepetcare
description: "Manually sets the location of a pet to inside or outside."
---

Use this action to manually set the location of a pet to inside or outside. This is handy to correct the location when a pet was not detected entering or leaving.

{% include actions/ui_header.md %}

To set a pet's location from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sure Petcare: Set pet location**.
6. Enter the **Pet name** and select a **Location**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Pet name:
  description: The name of the pet whose location you want to set.
  required: true
Location:
  description: "The pet's location: Inside or Outside."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `surepetcare.set_pet_location`. A basic example looks like this:

{% example %}
action: |
  action: surepetcare.set_pet_location
  data:
    pet_name: My_cat
    location: Inside
{% endexample %}

This sets the location of the pet named "My_cat" to inside.

### Options in YAML

{% options_yaml %}
pet_name:
  description: The name of the pet whose location you want to set.
  required: true
  type: string
location:
  description: "The pet's location. One of `Inside` or `Outside`."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
