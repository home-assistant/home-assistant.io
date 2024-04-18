---
title: "Starting Assist from your dashboard"
---

If you are using Home Assistant in kiosk mode, for example if you have a tablet mounted on the wall, the Assist icon in the top right corner is not accessible. In this case, use a dashboard button to start Assist.

## Prerequisites

- You have a [local assistant](/voice_control/voice_remote_local_assistant/) or a [Cloud assistant](/voice_control/voice_remote_cloud_assistant/) set up.
- You have the devices you want to control via Assist [exposed to Assist](/voice_control/voice_remote_expose_devices/).

## To add an Assist button to the dashboard

1. On your dashboard, select **Add card** and select the **Button** card.
2. Clear the **Entity** field and give the card a name, such as *Assist - listen*.
3. Select an icon, such as `mdi:account-tie-voice`.
4. From the **Action** dropdown menu, select **Assist**.
5. From the **Assist** dropdown menu, select the assistant you want to use, for example **Home Assistant Cloud**.
   - You can use any assistant you have previously set up.
   - If you have assistants in different languages, you can add a button for each of these languages.
6. If you are using Assist with your voice, enable **Start listening**.
   - If you don't want to use voice but just want to type, you do not need to enable listening.
7. **Save** your new button card.

## Related topics

- [Assist for Android](/voice_control/android/)
- [Creating a local assistant](/voice_control/voice_remote_local_assistant/)
- [Creating a Cloud assistant](/voice_control/voice_remote_cloud_assistant/)
- [Exposing devices to Assist](/voice_control/voice_remote_expose_devices/)
