---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

Alright, you made it here. The tough part is done.

- As the last step of the [installation procedure](/installation/) specific to your device, you entered the Home Assistant device's address in your browser's address bar.
    - Typically, this is `http://homeassistant.local:8123/`.
    - If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your device's IP address).

    - **Result**: You now see the welcome screen. Depending on your hardware, preparation may take a while.

    ![Home Assistant preparation](/images/getting-started/onboarding_preparing_01_.png)

    - Depending on the preinstalled software version, you might see a slightly different version of the welcome screen.
      - To view the log files, select the pulsing blue dot.

    ![Home Assistant preparation](/images/getting-started/onboarding_preparing_01.png)

With Home Assistant installed, it's time to set up the basics.

We will now create the owner's account of Home Assistant. This account is an administrator account. It will always be able to change everything.
 
1. If you want to restore from a backup of a previous installation, select **Restore from backup**.
    - Continue with the procedure on [restoring from backup](/common-tasks/os/#restoring-a-backup).
    - Ignore the rest of this procedure. The following steps describe how to create a new installation, not how to restore from backup.
2. If this is your initial installation, select **Create my smart home**.
3. Enter a name, username, and password. Select **Create account**.

    ![Set your username and password.](/images/getting-started/username.png)

4. Enter the location of your home.
   - The location is used to populate settings such as time zone, unit system, and currency.
   - It is also used for location-based information and automations: for example showing the weather-forecast, opening the shades at sunrise, or starting the vacuum when you leave the home.
   - If you'd rather not send your location, you can choose a location far away from where you live.
   - You can always change this information later in the settings.

    ![Define your location.](/images/getting-started/onboarding_location.png)

5. Select which information you are willing to share.
    - Sharing is disabled by default. However, we would like to encourage you to share some of this data.
    - This information helps us to find out which platforms we need to support and where to focus our efforts.
    - The data is anonymized and aggregated. To see the charts we generate out of this data, take a look at our [analytics page](https://analytics.home-assistant.io/).
   ![Share anonymized data](/images/getting-started/onboarding_share_anonymized_info.png)

6. Once you are done, select **Next**.
    - Home Assistant will then show any {% term devices %} it has discovered on your network.
    - Don't be alarmed if you see fewer items than shown below; you can always manually add devices later.

    ![Discovery of devices on your network.](/images/getting-started/onboarding_devices.png)

7. Finally, select **Finish**.
   - Now you're brought to the Home Assistant web interface. If some of your devices were discovered and set up automatically, this default dashboard may already show some of your devices.

{% include getting-started/next_step.html step="Edit the dashboard" link="/getting-started/onboarding_dashboard/" %}
