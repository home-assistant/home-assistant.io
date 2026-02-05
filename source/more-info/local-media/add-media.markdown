---
title: "Adding local media"
description: "More information on how to add local media to Home Assistant."
---

In order to see your local media in your Home Assistant media browser, you'll
need to add media to your media folder.

If you haven't set up a local media folder yet, check out this page on
[setting up the local media source][setup-media]


You can access your (automatically) created media folder using the dashboard.
Navigate to the {% my media_browser title="Media > Local Media" %}, and in the 
top right corner, click manage. Here you can add and delete your media. 

## Home Assistant OS

If you are running {% term "Home Assistant Operating System" %}, you can also use the 
Samba app. If you haven't installed the **Samba** app yet, you can do 
so by browsing to the {% my supervisor title="**Settings** > **Apps**" %} panel. 
Next, select **Install app** and search for the **Samba** app.

On the **Samba** app page, you can find a tab called **Documentation** with
the app installation and usage instructions. After that, you can copy/move
media onto your device using drag and drop in your file explorer.

Other apps, such as SSH, provide access to the
media folders as well.

## Home Assistant Container

After you have [set up a local media][setup-media] folder, you can add
any media to that folder you have mounted in.

Your media will show up in the Home Assistant frontend automatically.

[setup-media]: /more-info/local-media/setup-media
