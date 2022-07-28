---
title: "I'm Locked Out!"
description: "Options for regaining access"
---

The sections below deal with recovering from a situation where you are not able to sign in,
or need to recover your data.

## Forgot Password

### Home Assistant (including Supervised)

If you are still logged in to the web interface with your user, then you are in luck. Add a new user as an administrator and give the new user a password you can remember. Then log out, and log in with this new user. You may then reset your password via this new administrator account (and then delete this new account), or you can delete your old user account. Either way, your configuration will remain, and you don't have to do a new onboarding process.

If you’ve forgotten your username, then deleting the files mentioned further below will be necessary to start a new onboarding process.

#### To reset a user's password, via console
If you know the username, but not the password and you can access the [Home Assistant console](https://www.home-assistant.io/hassio/commandline/) and use the command below:

Connect a keyboard and monitor to your device.

`auth reset --username existing_user --password new_password`

#### To reset a user's password, via the container command line

If you are running Home Assistant in a container, you can use the command line in the container with the `hass` command to change your password. The steps below refer to a Home Assistant container in Docker named `homeassistant`. Note that while working in the container, commands will take a few moments to execute.
  
1. `docker exec -it homeassistant bash` to open to the container command line
2. `hass` to create a default user, if this is your first time using the tool
3. `hass --script auth --config /config change_password existing_user new_password` to change the password
4. `exit` to exit the container command line
5. `docker restart homeassistant` to restart the container

#### To reset a user's password, as an administrator via the web interface

1. Confirm that you have "Advanced Mode" activated on your "Profile" page.
2. Click "Settings" in the sidebar.
3. Scroll down to "Users", and click in to that section.
4. Click on the user, this should bring up a dialog box.
5. At the bottom of the dialog box, click "Change Password".
   - If you do not see the "Change Password" button, try using another interface, such as the mobile version.
6. Enter the new password, and then click "OK".
7. Confirm the new password by entering it again, and then click "OK" again.
8. A confirmation box will be displayed with the text "Password was changed successfully".

#### To delete a user, as an administrator via the web interface

1. Click "Settings" in the sidebar.
2. Scroll down to "Users", and click in to that section.
3. Click on the user, this should bring up a dialog box.
4. At the bottom of the dialog box, click "Delete User".
5. A confirmation dialog box will be displayed, asking "Are you sure you want to delete <User>"?
6. Click "OK".

#### Start a new onboarding process

If you lose the password associated with the owner account and the steps above do not work to reset the password, the only way to resolve this is to delete *all* the authentication data. You do this by shutting down Home Assistant and deleting the following files from the `.storage/` folder in your [configuration folder](/docs/configuration/):

- `auth`
- `auth_provider.homeassistant`
- `onboarding`
- `hassio`
- `cloud`

## Recovering Data for Home Assistant (including Supervised)

Unless your SD card/data is corrupted, you can still get to your files or troubleshoot further.
There are a few routes:

- Connect a USB keyboard and HDMI monitor directly to the Raspberry Pi.
- Remove the SD and access the files from another machine (preferably one running Linux).

## Connect directly

If you’re using a Raspberry Pi, you're likely going to have to pull the power in order to get your monitor recognized at boot. Pulling power has a risk of corrupting the SD, but you may not have another option. Most standard USB keyboards should be recognized easily.

Once you're connected, you'll see a running dmesg log. Hit the enter key to interrupt the log.
Sign in as "root". There is no password.

You will then be at the Home Assistant CLI, where you can run the custom commands. These are the same as you would run using the SSH add-on but without using `ha` in front of it. For example:

- `core logs` for Home Assistant Core log
- `supervisor logs` for supervisor logs
- `host reboot` to reboot the host
- `dns logs` for checking DNS
- etc (typing `help` will show more)

## Accessing Files from the SD/HDD

### Remove the SD and access the files from another computer

The files are on an EXT4 partition (`hassos-data`) and the path is `/mnt/data/supervisor`.
These are easily accessed using another Linux machine with EXT support.

For Windows or macOS you will need third party software. Below are some options.

- Windows: <https://www.diskinternals.com/linux-reader/> (read-only access to the SD)
- Mac: <https://osxfuse.github.io/>
