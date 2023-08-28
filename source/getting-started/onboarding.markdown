---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

Alright, you made it here. The tough part is done.

After entering the Home Assistant device's address in your browser's address bar, the preparation screen is shown. Depending on your hardware, preparation may take a while.

![Home Assistant preparation](/images/getting-started/onboarding_preparing_01.png)

To show the logs, select the blue pulsing circle.
![Home Assistant preparation](/images/getting-started/onboarding_preparing_show_logs.png)

With Home Assistant installed, it's time to set up the basics.

In this step, you will create the owner account of Home Assistant. This account is an administrator account. It will always be able to change everything. 
 
1. Enter a name, username, and password.  Select **Create account**.

    ![Set your username and password.](/images/getting-started/username.png)

2. Enter a name for your home.
3. Enter the location of your home.
   - The location is used to populate settings such as time zone, unit system, and currency.
   - It is also used for location-based information and automations: for example showing the weather-forecast, opening the shades at sunrise, or starting the vacuum when you leave the home.
   - If you'd rather not send your location, you can choose a location far away from where you live.
   - You can always change this information later in the settings.

    ![Define your location.](/images/getting-started/onboarding_location.png)
    
4. Check if the location based information is correct and change if necessary.
   - You can always change this information later in the settings.

   ![Define your location specific settings.](/images/getting-started/location_based_settings.png)

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
   - Now you're brought to the Home Assistant web interface. This screen will show all of your devices.

{% include getting-started/next_step.html step="Concepts & Terminology" link="/getting-started/concepts-terminology/" %}
