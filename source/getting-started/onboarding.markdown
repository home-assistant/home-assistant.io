---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

Alright, you made it here. The tough part is done.

After entering the Home Assistant devices address in the address bar of your browser, the preparation screen is shown. Depending on your hardware, preparation may take a while.

![Home Assistant preparation](/images/getting-started/onboarding_preparing_01.png)

To show the logs, select the blue pulsing circle.
![Home Assistant preparation](/images/getting-started/onboarding_preparing_show_logs.png)

With Home Assistant installed, it's time to set up the basics.

In this step, you will create the owner account of Home Assistant. This account is an administrator account. It will always be able to change everything. 
 
1. Enter a name, username, and password.  Select **Create account**.

    ![Set your username and password.](/images/getting-started/username.png)

1. Enter a name for your home and define the location specific settings and the language of the user interface. 
   * To automatically populate these settings, select **Detect**.
   * If you'd rather not send your location, you can set these values manually.

    ![Define your location specific settings.](/images/getting-started/onboarding_location.png)
    
1. Select which information you are willing to share. 
    * Sharing is disabled by default. However, we would like to encourage you to share some of this data. 
    * This information helps us to find out which platforms we need to support and where to focus our efforts.
    * The data is anonymized and aggregated. To see the charts we generate out of this data, take a look at our [analytics page](https://analytics.home-assistant.io/). 
    
   ![Share anonymized data](/images/getting-started/onboarding_share_anonymized_info.png) 

1. Once you are done, select **Next**. 
    * Home Assistant will then show any {% term devices %} that it has discovered on your network. 
    * Don't be alarmed if you see fewer items than shown below; you can always manually add devices later.

    ![Discovery of devices on your network.](/images/getting-started/onboarding_devices.png)

1. Finally, select **Finish**. 
   * Now you're brought to the Home Assistant web interface. This screen will show all of your devices.

{% include getting-started/next_step.html step="Concepts & Terminologies" link="/getting-started/concepts-terminology/" %}
