---
title: "I'm locked out!"
description: "Options for regaining access"
related:
  - docs: /common-tasks/os/#listing-all-users-from-the-command-line
    title: Listing all usernames via command line
  - url: https://yellow.home-assistant.io/guides/factory-reset/
    title: Reset the Yellow
  - url: https://green.home-assistant.io/guides/reset/
    title: Reset the Green
---

The sections below deal with recovering from a situation where you are not able to sign in,
or need to recover your data.

## Forgot username

### Symptom: I'm the owner and I forgot my username

You are the **owner** of the Home Assistant server and you cannot login because you forgot your username.

#### Remedy

1. Check if the following conditions are met:
   - you are using the {% term "Home Assistant Operating System" %}
   - you have access to the Home Assistant server.
2. Open a terminal connection to Home Assistant:
   - If you are using a Home Assistant Green, follow these steps [to access the console](https://green.home-assistant.io/guides/use-terminal/).
   - If you are using a Home Assistant Yellow, follow these steps:
     - [to access the console from Windows](https://yellow.home-assistant.io/guides/use-serial-console-windows/)
     - [to access the console from Linux or macOS](https://yellow.home-assistant.io/guides/use-serial-console-linux-macos/).
   - If you are using another system, connect keyboard and monitor. The procedure might be similar the one used for Green.
   - If you are using a Home Assistant OVA (virtualization image):
     - Access the system console by opening the terminal through your virtualization platform's interface (for example, Proxmox, VMware, VirtualBox).
     - Follow the platform-specific steps to interact with the virtual machine's console.
3. In the terminal, enter the `auth list` command.
   - This command lists all users that are registered on your Home Assistant.

## Forgot password

### Symptom: I'm the owner and I forgot my password

You are the owner or administrator of Home Assistant and forgot your password.

### Remedy: resetting an owner's password

If you are the owner or have administrator, there are different methods to reset a password, depending on your situation:

- [Reset a password while still logged in](#to-reset-a-password-while-still-logged-in-including-supervised)
- [Reset an owner's password when logged out](#to-reset-an-owners-password-via-console)
- [reset a user's password, via the container command line](#to-reset-a-users-password-via-the-container-command-line)

#### To reset a password while still logged in (including Supervised)

The method used to reset a password depends on your user rights:

- If you are a regular user without administrator rights, ask the owner to [give you a new password](/docs/locked_out/#to-reset-a-users-password-as-an-owner-via-the-web-interface).
- If you are the owner, choose one of the procedures below to reset your password.
  - You cannot recover an owner password from within Home Assistant.
  - There is only one owner per system. You cannot add a new owner.
- If you are an administrator, add a new user as an administrator and give the new user a password you can remember.
  1. Then log out, and log in with this new user.
  2. Reset your password via this new administrator account (and then [delete this new account](/docs/locked_out/#to-delete-a-user)).
     - Your configuration will remain, and you don't have to do a new onboarding process.

#### To reset an owner's password, via console

Use this procedure only if the following conditions are met:

- You know the username.
- You can access the Home Assistant console **on the device itself** (not via the SSH terminal from the add-ons).

1. If you are using a Home Assistant Yellow or Green, refer to their documentation.
   - If you are using a Home Assistant Yellow, refer to the following procedure:
     - [Resetting the owner password on Home Assistant Yellow](https://yellow.home-assistant.io/faq/#i-forgot-the-owner-password-for-home-assistant-how-can-i-reset-it)
   - If you are using a Home Assistant Green, refer to the following procedure:
     - [Resetting the owner password on Home Assistant Green](https://green.home-assistant.io/faq/#i-forgot-the-owner-password-for-the-home-assistant-green-how-can-i-reset-it)
2. If you are not using a Yellow or Green: Connect to the console of the Home Assistant server:
   - If you are using a virtual machine, connect to your virtual machine console.
   - If you are using another board, connect a keyboard and monitor to your device and access the terminal. The procedure is likely very similar to the one described for the Home Assistant Green.
3. Once you have opened the Home Assistant command line, enter the following command:
   - Note: `existing_user` is a placeholder. Replace it with your username.
   - Note: `new_password` is a placeholder. Replace it with your new password.
   - **Command**: `auth reset --username 'existing_user' --password 'new_password'`
     ![Screencast showing how to enter the ha auth reset command](/images/docs/troubleshooting/home-assistant-cli.webp)
   - **Troubleshooting**: If you see the message `zsh: command not found: auth`, you likely did not enter the command in the serial console connected to the device itself, but in the terminal within Home Assistant.
4. You can now log in to Home Assistant using this new password.

#### To reset a user's password, via the container command line

If you are running Home Assistant in a container, you can use the command line in the container with the `hass` command to change your password. The steps below refer to a Home Assistant container in Docker named `homeassistant`. Note that while working in the container, commands will take a few moments to execute.

1. `docker exec -it homeassistant bash` to open to the container command line
2. `hass` to create a default user, if this is your first time using the tool
3. `hass --script auth --config /config change_password existing_user new_password` to change the password
4. `exit` to exit the container command line
5. `docker restart homeassistant` to restart the container.

#### To reset a user's password, as an owner via the web interface

Only the owner can change other user's passwords.

1. In the bottom left, select your user to go to the {% my profile title="**Profile**" %} page and make sure **Advanced Mode** is activated.
2. Go to {% my people title="**Settings** > **People**" %} and select the person for which you want to change the password.
3. At the bottom of the dialog box, select **Change Password**.
   - Note: this is available as the owner, not administrator.
4. Enter the new password, and select **OK**.
5. Confirm the new password by entering it again, and select **OK** again.
6. A confirmation box will be displayed with the text **Password was changed successfully**.

## Preparing the system to start a new onboarding process

If you lose the password associated with the owner account and the steps above do not work to reset the password, the only way to resolve this is to start a new onboarding process.

- If you have an external backup with an administrator account of which you still know the login credentials, you can restore that backup.
- If you do not have a backup, resetting the device will erase all data.

- If you have a Home Assistant Green, [reset the Green](https://green.home-assistant.io/guides/reset/).
- If you have a Home Assistant Yellow, [reset the Yellow](https://yellow.home-assistant.io/guides/factory-reset/).

## Recovering data for Home Assistant (including Supervised)

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

## Accessing files from the SD/HDD

### Remove the SD and access the files from another computer

The files are on an EXT4 partition (`hassos-data`) and the path is `/mnt/data/supervisor`.
These are easily accessed using another Linux machine with EXT support.

For Windows or macOS you will need third party software. Below are some options.

- Windows: <https://www.diskinternals.com/linux-reader/> (read-only access to the SD)
- macOS: <https://osxfuse.github.io/>

## Deleting a user

You need to be an owner or have administrator rights to delete a user.

1. Go to {% my people title="**Settings** > **People**" %} and select the person which you want to delete.
   - Note: you cannot delete the owner.
2. At the bottom of the dialog box, select **Delete**.
   - A confirmation dialog box will be displayed.
3. To confirm, select **OK**.
