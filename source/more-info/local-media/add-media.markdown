---
title: "Adding your media to Home Assistant"
description: "More information on how to add your media to Home Assistant."
related:
  - docs: /actions/media_player.play_media/
    title: Play specified media action
  - docs: /integrations/media_source/#identifying-a-media-source-from-the-media-browser
    title: Identifying a media source from the media browser
---

Home Assistant includes a built-in media browser that lets you browse, view, and play your local media files. This feature is available on {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %}. You find it in the sidebar under {% my media_browser title="**Media** > **My media**" %}. For more about browsing and playing your media, refer to the [Media source](/integrations/media_source/) integration.

On {% term "Home Assistant Operating System" %}, the media folder is automatically created and ready to use. On {% term "Home Assistant Container" %}, you need to mount a volume to `/media` when starting your container.

## Adding media using the media browser

You can add media files using the built-in media browser. This method is ideal for uploading a few files at a time.

You can add images, videos, and audio files. Each file can be up to 20 MB. The files go into the folder that you have open. This method does not let you create folders.

### Prerequisites

- Administrator rights.
- On {% term "Home Assistant Container" %}, a [local media folder][setup-media].

### To add media using the media browser

1. Go to {% my media_browser title="**Media** > **My media**" %}.
2. Open the folder where you want to add the files.
3. In the top-right corner, select {% icon "mdi:folder-edit" %} **Manage**.
   - Result: The **Media management** dialog opens.
4. Select {% icon "mdi:upload" %} **Add media**, and choose the files on your device.
   - Result: The files show up in the list. If a file can't be uploaded, Home Assistant shows **Upload failed** with the reason.
5. If you uploaded the wrong file, [remove it](#removing-media-using-the-media-browser).

## Removing media using the media browser

You can remove media files using the built-in media browser. This method is ideal for deleting a few files at a time. This method does not let you delete folders. If a folder only contains other folders, the dialog shows **Folders cannot be managed via the UI.**

### Prerequisites

- Administrator rights.

### To remove media using the media browser

1. Go to {% my media_browser title="**Media** > **My media**" %}.
2. Open the folder with the files.
3. In the top-right corner, select {% icon "mdi:folder-edit" %} **Manage**.
4. Select the checkbox of each file that you want to remove. To select all files, select **Select all**.
   - Result: The **Add media** button changes to a **Delete** button with the number of files, such as **Delete 2**.
5. Select the **Delete** button.
6. To confirm, select **OK**.

## Adding media using network file sharing on Home Assistant OS

If you are running {% term "Home Assistant Operating System" %}, you can use the **Samba share** app for bulk file transfers. This method is ideal for transferring large files or many files at once using your computer's file explorer (File Explorer, macOS Finder, or Linux file manager).

1. To install and use the Samba share app, follow the instructions on [installing and using the Samba share app](/common-tasks/os/#installing-and-using-the-samba-share-app).
2. After setup, you can copy or move media files onto your device using drag and drop in your file explorer.
3. You can also create folders to organize your media.

Other apps, such as **Terminal & SSH**, also provide access to the media folders.

## Adding media on Home Assistant Container

On {% term "Home Assistant Container" %}, your media folder is a folder on your host machine that you mount into the container as `/media`. The mount keeps your files when you update or recreate the container. You can add files to this folder directly on your host machine. This method is ideal for adding many files, or for organizing your media in folders.

### Prerequisites

- Home Assistant Container installation type.
- Before you can add media files on Home Assistant Container, you need to [set up a local media folder][setup-media] by mounting a volume to the `/media` directory when starting your container. This must be done at container startup time.

### To add media on Home Assistant Container

After you have mounted the volume, you can add media files directly to the folder on your host machine. This gives you direct file system access to add media files and create folders to organize them.

Your media will show up in the Home Assistant media browser automatically. You can manage your files in the following ways:

- Use the [built-in media browser](#adding-media-using-the-media-browser).
- Use direct file system access on your host machine.

[setup-media]: /more-info/local-media/setup-media
