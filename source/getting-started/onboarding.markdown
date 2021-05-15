---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

Alright, you made it here. The tough part is done.

With Home Assistant installed, it's time to configure it. Here you will create the owner account of Home Assistant. This account will be an administrator and will always be able to change everything. Enter a name, username, password and click on "create account".

<p class='img'>
<img src='/images/getting-started/username.png' />
Set your username and password.
</p>

Next, you can enter a name for your home and set your location and unit system. Click "DETECT" to find your location and set your time zone and unit system based on that location. If you'd rather not send your location, you can set these values manually.

<p class='img'>
<img src='/images/getting-started/location.png' />
Set your location, time zone, and unit system.
</p>

Once you are done, click Next. In this screen, Home Assistant will show any devices that it has discovered on your network. Don't be alarmed if you see fewer items than what is shown below; you can always manually add devices later.

<p class='img'>
<img src='/images/getting-started/devices.png' />
Discovery of devices on your network.
</p>

Finally, click Finish. Now you're brought to the Home Assistant web interface. This screen will show all of your devices. So let's get that screen filled up!

<p class='img'>
<img src='/images/getting-started/lovelace.png' />
The Home Assistant user interface.
</p>

Click on Configuration in the sidebar on the left. On the next screen, click on Integrations. At this screen you will be able to set up integrations with Home Assistant. You might notice a "discovered" section. This section contains integrations that were found on your network and can easily be added with a few clicks. If your integrations are not discovered, click the + button in the lower right and search for your integration in that list.

<p class='img'>
<img src='/images/getting-started/integrations.png' />
The integrations page in the configurations panel shows you all your configured integrations.
</p>

When each integration is done setting up, it will ask you to put the new devices in areas. Areas allow you to organize all the devices in your home.

When you're done, navigate back to the web interface and voila, your devices are ready for you to control.

{% include getting-started/next_step.html step="Automate Home Assistant" link="/getting-started/automation/" %}
