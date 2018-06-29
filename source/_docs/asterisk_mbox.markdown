---
layout: page
title: "Asterisk Voicemail Server Installation"
description: "Instructions on how to integrate your existing Asterisk voicemail within Home Assistant."
date: 2017-06-30 18:30
sidebar: true
comments: false
sharing: true
footer: true
---

Asterisk Voicemail integration allows Home Assistant to view, listen-to, and delete voicemails from a Asterisk voicemail mailbox.

There are two components to the integration:
- A server that runs on the Asterisk PBX host and communicates over an open port.
- A client which can request inormation from the server.

Both parts are necessary for Asterisk voicemail integration.

The server installation is documented below.  The client is [integrated inside Home Assistant](/components/asterisk_mbox)

<p class='note'>
Currently this module can only monitor a single Asterisk PBX mailbox.  Multiple mailbox support is planned for the future
</p>

### {% linkable_title Prerequisites %}

Before beginning make sure that you have the following:
- A functional Asterisk PBX setup which is using the default `voicemail` application
- Both Home Assistant and Asterisk PBX running on the same LAN (or the same server)
- The Asterisk PBX server has python 3.4 or newer installed
- Administrator access on the Asterisk PBX (for python module installation)
- Account Access to the `asterisk` user that runs the Asterisk PBX software

### {% linkable_title Installation %}

1. Apply for a Google API key to enable speech-transcription services

2. Install the `asterisk_mbox_server` python module:

   ```bash
   $ pip3 install asterisk_mbox_server
   ```

3. Create a configuration file for the server

   As the `asterisk` user create an `asterisk_mbox.ini` file (You can place this in any directory you choose, but the rommended location is `/etc/asterisk/asterisk_mbox.ini`)

   ```ini
   [default]
   host = IP_ADDRESS 
   port = PORT
   password = PASSWORD
   mbox_path = PATH_TO_VOICEMAIL_FILES
   cache_file = PATH_TO_CACHE_FILE
   google_key = GOOGLE_API_KEY
   ```

   - **host** (*Optional*): The IP address to listen on for client requests.  This defaults to all IP addresses on the server.  To listen only locally, choose `127.0.0.1`
   - **port** (*Optional*): The port to listen on for client requests.  (default: 12345)
   - **password** (*Required*):  A password shared between client and server.  Use only alpha-numeric characters and spaces
   - **mbox\_path** (*Required*): The path to the storage location of mailbox files.  This is typically `/var/spool/asterisk/voicemail/default/<mailbox>/`
   - **cache\_file** (*Required*): A fully-qualified path to a file thht can be written by the server containing transcriptions of voicemails.  Example: `/var/spool/asterisk/transcription.cache`
   - **google\_key** (*Required*): Your 40 character Google API key

   Once complete, ensure this file is only accessible by the asterisk user:

   ```bash
   $ sudo chown asterisk:asterisk /etc/asterisk/asterisk_mbox.ini
   $ sudo chmod 600 /etc/asterisk/asterisk_mbox.ini
   ```
4. Interactively start the server to verify it is functioning

   ```bash
   $ sudo -u asterisk asterisk_mbox_server -v --cfg /etc/asterisk/asterisk_mbox.ini
   ```

   Now complete the [Home Assistant configuration](/components/asterisk_mbox) and verify that Home Assistant can communicate with the server

   You can use `Ctrl-C` to terminate the server when done testing

5. Configure the server to start automatically

   Copy the following code into `/etc/systemd/system/asterisk_mbox.service`:
   ```ini
   [Unit]
   Description=Asterisk PBX voicemail server for Home Assistant
   Wants=network.target
   After=network.target

   [Service]
   Type=simple
   User=asterisk
   Group=asterisk
   ExecStart=/usr/local/bin/asterisk_mbox_server -cfg /etc/asterisk/asterisk_mbox.ini
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

<p class='note'>
This assumes that your Asterisk PBX server is using `systemd` for init handling.  If not, you will need to create the appropriate configuration files yourself.
</p>
