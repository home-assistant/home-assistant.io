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
If you have set up Google Assistant or Amazon Alexa, they can use the aliases of your entities too.

These aliases are helpful in case you call the same device by multiple names
or when using a voice assistant in multiple languages at the same time.

## Adding an alias of an entity

There are multiple ways to add an alias of an entity:

- **Option 1**: Go to **Settings** > **Voice assistants**. On the **Expose** tab, select the entity for which you want to add an alias.
![Screenshot showing the alias editing capabilities added to the more info dialog of entities, accessed from the Voice assistants page](/images/assist/assist_aliases.png)
- **Option 2**: You can also change the alias from the entity's more information dialog. In the upper right corner of the dialog, select the cogwheel {% icon "mdi:cog-outline" %} and then select **Voice assistants**.
![Screenshot showing the alias editing capabilities added to the more info dialog of entities, accessed from the Voice assistants page](/images/assist/assist_aliases_02.png).

### Default name and the order of aliases

The **Aliases** list starts with the default name of the entity, such as `Coffee machine Power`.
When the switch next to it is turned on, the default name is used as the first alias.
To use a different name first, drag the aliases into the order you want.

The order matters for some voice assistants:

- Assist uses all aliases equally.
- Google Assistant uses the first alias as the main name and the others as alternatives.
- Amazon Alexa uses only the first alias.

If you renamed an entity before Home Assistant 2026.11 and its name changed with the new naming, Home Assistant kept your previous name as the first alias for voice assistants that the entity is exposed to.
This way, your voice commands keep working.

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