---
title: "Aliases - entity, area, and floor"
related:
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /docs/organizing/floors/
    title: Floors
  - docs: /voice_control/custom_sentences/
    title: Assist - custom sentences
---

Assist uses the names of your entities, areas, and floors, as well as any aliases you've configured.
If you have set up Google Assistant or Amazon Alexa, they use the first alias of an entity as its name.
Google Assistant also uses the other aliases as alternatives.

These aliases are helpful in case you call the same device by multiple names
or when using a voice assistant in multiple languages at the same time.

## Adding an alias of an entity

1. Open the dialog of the entity.
   - For example, select the entity on a dashboard. Or go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity.
2. In the upper-right corner of the dialog, select **Settings** {% icon "mdi:cog-outline" %}.
3. Select **Voice assistants**.
   ![Screenshot of the entity settings, with the Voice assistants entry that lists the aliases of the entity](/images/assist/assist_aliases_02.png)
4. Under **Aliases**, select **Add alias**, and enter the alias.
   - To add more aliases, repeat this step.
   - Result: Home Assistant saves the alias when you leave the field.
   ![Screenshot of the voice assistant settings of an entity, with three aliases in the Aliases list](/images/assist/assist_aliases.png)

If the entity is already exposed to a voice assistant, you can also start from the **Expose** tab. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}. On the **Expose** tab, select the entity. The same settings open, with the **Aliases** list.

### Default name and the order of aliases

The **Aliases** list starts with the default name of the entity, such as `Coffee machine Power`.
When the switch next to it is turned on, the default name is used as the first alias.

The order matters for some voice assistants:

- Assist uses all aliases equally.
- Google Assistant uses the first alias as the main name and the others as alternatives.
- Amazon Alexa uses only the first alias.

Renaming an entity, its device, or its area doesn't change the aliases you added. Only the default name in the list follows the new name.

### Using a different name for voice assistants

Voice assistants don't have to use the name that Home Assistant shows. For example, you might want Amazon Alexa to call a device `Kitchen light`, while Home Assistant shows it as `Ceiling light`.

1. [Add the name you want as an alias of the entity](#adding-an-alias-of-an-entity).
2. In the **Aliases** list, turn off the switch next to the default name.
3. Drag your alias to the top of the list.
   - Result: Voice assistants that use the first alias, such as Amazon Alexa, now use your alias as the name of the entity.

## Adding an alias of an area

1. To add an alias for an area, go to **Settings** > **Areas, labels & zones**.
2. On the area card of interest, select the pencil button.
3. Select **Add alias** and enter the alias you want to use for that area.
4. **Save** your changes.

## Adding an alias of a floor

1. To add an alias for a floor, go to **Settings** > **Areas, labels & zones**.
2. Next to the floor of interest, select the three dots {% icon "mdi:dots-vertical" %}, then select **Edit floor**.
3. Select **Add alias** and enter the alias you want to use for that floor.
4. **Save** your changes.


### Area-less aliases for entities with an assigned area

Assist can infer the area from the satellite you're talking to, and it can also take the area from your sentence.
That's why entity names don't need to include the area, as described in the [naming recommendations](/docs/configuration/customizing-entities/#recommendations-on-entity-naming-and-related-elements).
If an entity name includes the area, such as `Living room lamp`, add a simplified alias, such as `Lamp`.
This allows you to say "turn on the lamp in the living room", or simply "turn on the lamp" when asking a satellite in the living room.

Don’t worry if you also have a Bedroom lamp. You can alias that one Lamp as well, as it would get matched only when in conjunction with the area name (Living room or Bedroom).