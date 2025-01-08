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

Assist will use the names of your entities, areas and floors, as well as any aliases you've configured. The configured aliases are not only used by Assist, but can also be used by Google Assistant, if you have set that up.

These aliases are helpful in case you call the same device by multiple names
or when using a voice assistant in multiple languages at the same time.

## Adding an alias of an entity

There are multliple ways to add an alias of an entity:

- **Option 1**: Go to **Settings** > **Voice assistants**. On the **Expose** tab, select the entity for which you want to add an alias.
![Screenshot showing the alias editing capabilities added to the more info dialog of entities, accessed from the Voice assistants page](/images/assist/assist_aliases.png)
- **Option 2**: You can also change the alias from the entity's more information dialog in the settings tab in the advanced section.
![Screenshot showing the alias editing capabilities added to the more info dialog of entities, accessed from the Voice assistants page](/images/assist/assist_aliases_02.png).

## Adding an alias of an area

1. To add an alias for an area, go to **Settings** > **Areas, labels & zones**.
2. On the area card of interest, select the pencil button.
3. Select **Add alias** and enter the alias you want to use for that area.
4. **Save** your changes.

## Adding an alias of a floor

1. To add an alias for a floor, go to **Settings** > **Areas, labels & zones**.
2. Next to the floor of interest, select the three-dot menu, then select **Edit floor**.
3. Select **Add alias** and enter the alias you want to use for that floor.
4. **Save** your changes.


### Area-less aliases for entities with an assigned area 

It’s good practice to add areas to entity canonical names, such as Living room lamp. However, since Assist can both infer the area and explicitly extract it from sentences, it’s a very good idea to add simplified aliases to all your exposed entities. In this case, having the Lamp alias set for the Living room lamp would allow you to turn on the lamp in the living room or simply turn on the lamp, when asking a satellite in the living room.

Don’t worry if you also have a Bedroom lamp. You can alias that one Lamp as well, as it would get matched only when in conjunction with the area name (Living room or Bedroom).