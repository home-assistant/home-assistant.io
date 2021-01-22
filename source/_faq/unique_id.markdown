---
title: "This entity does not have a unique ID?"
description: "This entity does not have a unique ID?"
ha_category: Configuration
---

If you try to access the configuration dialog for an entity in your Home Assistant, you might end up seeing this message:

<p class='img'>
<img src='/images/faq/faq_no_unique_id.jpg' alt='Screenshot of popup for no unique ID'>
</p>

This simply means that this entity does not have a unique identification e.g., a serial number or another identifier that is guaranteed to be static and never change\*. As a result, the normal editing process that allows you to change various settings through the user interface (such as the entity ID, icon, friendly name, etc.) is not possible here. 

Typically, you'll see this when you create entities manually using YAML, but it can also appear if the integration that provides this entity simply cannot determine a unique ID. This however is not an error, but just a limitation of the integration you use.

|                 | Unique ID                         | Entity ID                                                                                                                                                                                                                                                                                       |
|-----------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Used where?       | Only internally in Home Assistant. | **If entity has a unique ID:**<br>Only as reference e.g., in automations or dashboards.<br>**If entity does not have a unique ID:**<br>Entity ID acts as the replacement for the non-existing unique ID plus as reference e.g., in automations or dashboards.                                                                                                                                                                                                                                                                        |   |   |
| Can be changed? | No. It is a static identifier.    | **If entity has a unique ID:**<br>Entity ID can be adjusted freely (as long as it follows the format `<domain>.<id>`). But keep in mind that if you change the entity ID, you also need to update the references e.g. in automations and dashboards to the new entity ID.<br>**If entity does not have a unique ID:**<br>The entity ID is considered a fixed, static identifier and cannot be changed.  |

If your user profile has the "Advanced Mode" activated, you will also see the second paragraph in the popup with a link to the [customization user interface](https://www.home-assistant.io/docs/configuration/customizing-devices/#customization-using-the-ui) for this specific entity, which offers some customization options.

\* In case you want to read about more about that, head over to this [developer documentation page](https://developers.home-assistant.io/docs/entity_registry_index/).
