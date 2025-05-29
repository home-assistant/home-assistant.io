---
title: "Blueprint Editor"
description: "Tutorial on using the blueprint editor."
---

Have you wanted your own personal theme song that plays when you come in the
house? For this tutorial, we're going to create a blueprint to play a song
when someone enters a zone!

1. Go to {% my blueprints title="**Settings** > **Automations & scenes** > **Blueprints**" %}
   and in the lower right corner, select the **Add Blueprint** button.
2. To create an automation blueprint, select **Create new automation blueprint**.
    ![Create blueprint dialogue box](/images/docs/blueprint-editor/create-blueprint.png)

3. Add an input for the person:
   - Select **Add New Input**
   - In the **ID** field, type `person`.
   - Select the type **Input**.
   - Click save
   - Change **Selector** to **Entity**
   - Optionally, give your input a name and description

    ![Add person input](/images/docs/blueprint-editor/person-input.png)

4. Add an input for the zone:
   - Select **Add New Input**
   - In the **ID** field, type `place`.
   - Select the type **Input**.
   - Click save
   - Change **Selector** to **Entity**
   - Optionally, give your input a name and description

    ![Add place input](/images/docs/blueprint-editor/place-input.png)

5. Add an input for the song:
   - Select **Add New Input**
   - In the **ID** field, type `song`.
   - Select the type **Input**.
   - Click save
   - Change **Selector** to **Media**
   - Optionally, give your input a name and description

    ![Add song input](/images/docs/blueprint-editor/song-input.png)

6. Add an input for the speaker:
   - Select **Add New Input**
   - In the **ID** field, type `speaker`.
   - Select the type **Input**.
   - Click save
   - Change **Selector** to **Entity**
   - Optionally, give your input a name and description

    ![Add speaker input](/images/docs/blueprint-editor/speaker-input.png)

7. Enter the trigger condition:
   - Under **When**, click **Add Trigger**, select **Time and location > Zone**
   - Select the overflow menu, then select **Edit in YAML** and input the
     following YAML:

    ```yaml
    trigger: zone
    entity_id: !input person
    zone: !input place
    event: enter
    ```

    ![Blueprint trigger](/images/docs/blueprint-editor/zone-trigger.png)

8. Define the action that should happen:
   - In the **Then do** section, select **Add Action**.
   - Select **Media player > Play media**
   - Select the overflow menu, then select **Edit in YAML** and input the
     following YAML:

   ```yaml
   action: media_player.play_media
   target:
    entity_id: !input speaker
   data:
    media_content_id: !input song
   metadata: {}
   ```

    ![Play media action](/images/docs/blueprint-editor/play-action.png)

9. Select **Save**, give your blueprint a meaningful path and name, and **Save** again.

## Using a Blueprint

For more information on how to use a blueprint to create an automation or script,
see the [Blueprint Tutorial](/docs/blueprint/tutorial/#using-the-blueprint-via-the-ui)
