---
title: "Setting up local media sources"
description: "Learn how to configure local media sources in Home Assistant so your audio and video files are available in the media browser."
related:
  - docs: /more-info/local-media/add-media/
    title: Adding your media to Home Assistant
  - docs: /integrations/homeassistant/#media_dirs
    title: Media directories configuration
---

Home Assistant includes a built-in media browser (in the sidebar under {% my media_browser title="**Media** > **My media**" %}) that lets you browse and play your local media files. Before you can use it, you need to make sure your media files are accessible to Home Assistant.

On {% term "Home Assistant Operating System" %}, the `/media` folder is created automatically with no configuration needed. On {% term "Home Assistant Container" %}, you need to mount a volume to `/media` when starting your container.

Files stored in your media directories are only accessible to users who are logged in to Home Assistant. This is different from the [`www` folder](/integrations/http/#hosting-files), where files are publicly accessible without a login, which is useful for things like images in notifications, but not something you typically want for your personal media library.

## Setting up a media folder on Home Assistant Operating System

No setup is required. The `/media` folder is automatically created and available in the media browser as soon as Home Assistant starts.

To add files, follow the [steps on adding media][add-media].

## Setting up a media folder on Home Assistant Container

On {% term "Home Assistant Container" %}, you need to mount a directory on your host machine to `/media` inside the container. This must be done when starting or recreating the container.

### Using Docker CLI

Add `-v /PATH_TO_YOUR_MEDIA:/media` to your `docker run` command:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /PATH_TO_YOUR_MEDIA:/media \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  {{ site.installation.container }}:stable
```

### Using Docker Compose

Add a volume entry for `/media` in your `compose.yaml` file:

```yaml
services:
  homeassistant:
    container_name: homeassistant
    image: "{{ site.installation.container }}:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /PATH_TO_YOUR_MEDIA:/media
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
    environment:
      TZ: Europe/Amsterdam
```

After restarting the container, your media files will appear in the media browser, under {% my media_browser title="**Media** > **My media**" %}.

To add files, follow the [steps on adding media][add-media].

## Adding additional media directories

This applies to both {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %}.

You can expose more than one media directory to the media browser. For example, a network storage path on Home Assistant OS, or an additional mounted volume on Home Assistant Container.

### Prerequisites

- If you want to use media from a network storage, connect the network storage first.
  - Refer to the [instructions on how to connect network storage](/common-tasks/os/#network-storage).
  - Once connected, the media from network storage is automatically added to the local media browser.

### To add additional media directories

1. Open your {% term "`configuration.yaml`" %} file.
2. Under `homeassistant:`, add a `media_dirs:` entry with one or more directories:

    ```yaml
    homeassistant:
      media_dirs:
        media: /media
        recordings: /mnt/recordings
        photos: /mnt/photos
    ```

    Each key is the label that appears as the folder name in the media browser. For example, `recordings` will show up as "recordings" in the media browser, pointing to `/mnt/recordings` on disk.

3. Save the file and [reload the configuration](/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes.
4. To add files, follow the [steps on adding media][add-media].

[add-media]: /more-info/local-media/add-media
