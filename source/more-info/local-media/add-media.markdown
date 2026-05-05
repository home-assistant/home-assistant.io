---
title: "Adding your media to Home Assistant"
description: "More information on how to add your media to Home Assistant."
related:
  - docs: /integrations/media_player/#action-play-media
    title: Play media action
  - docs: /integrations/media_source/#identifying-a-media-source-from-the-media-browser
    title: Identifying a media source from the media browser
---

Home Assistant includes a built-in media browser that lets you browse and play your local media files. This feature is available in all Home Assistant installation types.

On {% term "Home Assistant Operating System" %}, the media folder is automatically created and ready to use. On {% term "Home Assistant Container" %}, you need to mount a volume to `/media` when starting your container.

## Accessing the media browser

The media browser is available on both {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %} installations.

1. In the sidebar (left side of your Home Assistant interface), go to {% my media_browser title="**Media** > **My media**" %}.
2. From here, you can browse all media files in your `/media` folder and any custom media directories you've configured.

## Adding media using the media browser on Home Assistant OS

You can add media files using the built-in media browser. This method is ideal for uploading a few files at a time. This method does not let you create folders.

1. Go to {% my media_browser title="**Media** > **My media**" %}.
2. In the top-right corner, select {% icon "mdi:cog" %} **Manage**.
3. Select **Upload** and choose files from your device.
4. If you uploaded the wrong file, select the file and choose **Delete**.

## Removing media using the media browser on Home Assistant OS

You can remove media files using the built-in media browser. This method is ideal for deleting a few files at a time. This method does not let you delete folders.

1. Go to {% my media_browser title="**Media** > **My media**" %}.
2. In the top-right corner, select {% icon "mdi:cog" %} **Manage**.
3. Select one or more files and choose **Delete**.

## Adding media using network file sharing on Home Assistant OS

If you are running {% term "Home Assistant Operating System" %}, you can use the **Samba** app for bulk file transfers. This method is ideal for transferring large files or many files at once using your computer's file explorer (File Explorer, macOS Finder, or Linux file manager).

1. To install and use the Samba app, follow the instructions on [installing and using the Samba app](/common-tasks/os/#installing-and-using-the-samba-app).
2. After setup, you can copy or move media files onto your device using drag and drop in your file explorer.
3. You can also create folders to organize your media.

Other apps, such as **SSH**, also provide access to the media folders.

## Adding media on Home Assistant Container

### Prerequisites

- Home Assistant Container installation type.
- Before you can add media files on Home Assistant Container, you need to [set up a local media folder][setup-media] by mounting a volume to the `/media` directory when starting your container. This must be done at container startup time.

### To add media on Home Assistant Container

After you have mounted the volume, you can add media files directly to the folder on your host machine. This gives you direct file system access to add media files and create folders to organize them.

Your media will show up in the Home Assistant media browser automatically. You can manage your files in the following ways:

- Use the built-in media browser (as described above).
- Use direct file system access on your host machine.

[setup-media]: /more-info/local-media/setup-media
