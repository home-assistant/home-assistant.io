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

## Home Assistant OS & Supervised

If you are running Home Assistant OS or Supervised, you can also use the 
Samba add-on. If you haven't installed the Samba add-on yet, you can do 
so by browsing to the {% my supervisor title="Settings > Add-ons" %} panel. 
Next, click on the "Add-on store" tab and search for "Samba" and click on it.

On the Samba add-on page, you can find a tab called "Documentation" with
the add-on installation and usage instructions. After that, you can copy/move
media onto your device using drag and drop in your file explorer.

Other add-ons are available, for example, SSH and others provide access to the
media folders as well.

## Home Assistant Docker

After you have [set up a local media][setup-media] folder, you can add
any media to that folder you have mounted in.

Your media will show up in the Home Assistant frontend automatically.

## Home Assistant Core

After you have [set up a local media][setup-media] folder, you can add any
media to that folder you have set up.

Your media will show up in the Home Assistant frontend automatically.

[setup-media]: /more-info/local-media/setup-media
