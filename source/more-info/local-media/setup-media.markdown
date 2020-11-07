---
title: "Setting up local media sources"
description: "More information on how to set up local media sources in Home Assistant."
---

In order to use the media browser with Home Assistant, it needs to know where to
find you local media.

## Home Assistant OS and Supervised

No action is needed from your end to set it up. Home Assistant will
automatically use the "media" folder that is provided on these systems.

## Home Assistant Container

If you run the Home Assistant Container in, for example, Docker, you'll need to
add a Docker volume mount to the Home Assistant container, to mount in
your local media.

The default path Home Assistant will try to use, is `/media`.

For example, if you are currently using this command for Docker:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  homeassistant/home-assistant:stable
```

You'll need to change it to this:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /PATH_TO_YOUR_MEDIA:/media \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  homeassistant/home-assistant:stable
```

If you are using Docker compose, you can add a volume to your composition file
in similar fashion as listed in the command above.

## Home Assistant Core

If you run Home Assistant Core directly in, for example, a Python virtual
environment, you'll need to create a media folder yourself.

By default, Home Assistant will look for the `media` folder inside your current
Home Assistant configuration folder.

For example, if your current configuration folder is stored in:

`/home/frenck/.homeassistant/`

The you'll need to create a media folder in that same path:

`/home/frenck/.homeassistant/media`

## Using custom folders

It is also possible to set up custom and additional media directories. To do
so, you'll need to adjust the [core configuration][basic-configuration].

This example adds the two media folders to Home Assistant:

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    media: /media
    recording: /mnt/recordings
```

## Using network shares as custom media folder

This approach creates a local folder which is used as moutpoint for a folder on a network storage. 
To trigger Homeassistant to mount the folder an automation is created which runs at startup and calls a shell command. 

This example adds one shared network folder to  Home Assistant:

```yaml
# Example configuration.yaml
homeassistant:
  # check this - media_dirs might not be needed if default_config: is used
  media_dirs:
    media: /media
    
automations:
  # this automation can easily be created in Settings->Automations
- id: '1604432883902'
  alias: Automount media from NAS
  description: 'Automount media from NAS'
  trigger:
  - platform: homeassistant
    event: start
  condition: []
  action:
  - delay: 00:10
  - service: shell_command.mount_smbmedia_folder
    data: {}
  mode: single

shell_command:
  mount_smbmedia_folder:
    # 1. the mount point (/mnt/nasmp3) is created
    # 2. the net share (//NAS/Volume/MP3) is mounted
    # 3. a link to a folder in the media folder (/media/nasmp3) refers to the mounted directory
    # ATTENTION - this approach exposes your user and password in your configuration file.
    mkdir -p /mnt/nasmp3; mount -t cifs -o username=YOURUSER,password=YOURPASSWORD,domain=YOURDOMAIN //NAS/Volume/MP3 /mnt/nasmp3 ;ln -s /mnt/nasmp3 /media/nasmp3

```

[basic-configuration]: /docs/configuration/basic/#media_dirs
