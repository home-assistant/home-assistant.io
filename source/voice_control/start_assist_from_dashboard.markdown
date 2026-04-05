---
title: "Starting Assist from your dashboard"
related:
  - docs: /voice_control/android/
    title: Assist for Android
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Creating a Cloud assistant
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing devices to Assist
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
---

If you are using Home Assistant in kiosk mode, for example if you have a tablet mounted on the wall, the Assist icon in the top right corner is not accessible. In this case, use a dashboard button to start Assist.

## Prerequisites

- You have a [local assistant](/voice_control/voice_remote_local_assistant/) or a [Cloud assistant](/voice_control/voice_remote_cloud_assistant/) set up.
- You have the devices you want to control via Assist [exposed to Assist](/voice_control/voice_remote_expose_devices/).

## Adding an Assist button to the dashboard

1. On your dashboard, select the {% icon "mdi:pencil" %} button.
2. If it is the first time that you are editing your dashboard, in the **Edit dashboard** dialog, go to the three dots {% icon "mdi:dots-vertical" %} menu and select **Take control**.
3. Do one of the following, depending on the type of the view you are editing:
     - In a sections view, select the {% icon "mdi:plus" %} button below **New Section**.
     - In a masonry, panel, or sidebar view, select **Add card** in the lower right corner of the view.
4. On the **By card** tab of the dialog, select the **Button** card.
5. Clear the **Entity** field.
6. In **Name**, select **+ Add** and enter a name for the card, such as *Assist - listen*.
7. Select an icon from the **Icon** dropdown list, such as `mdi:account-tie-voice`.
8. In the **Interactions** section:
   - Select the desired tap behavior and, in the related dropdown list, select **Assist**.
   - Select the assistant you want to use, for example **Home Assistant Cloud**, from the **Assistant** dropdown list.
     - You can use any assistant that you have previously set up.
     - If you have assistants in different languages, you can add a button for each of these languages.
   - Enable **Start listening** if you are using Assist with your voice. If you don’t want to use voice and just want to type, you do not need to enable listening.
9. Select **Save**.
10. In the upper right corner, select **Done** to save the changes to your dashboard.
