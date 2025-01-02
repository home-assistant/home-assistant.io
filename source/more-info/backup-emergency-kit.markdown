---
title: "Backup emergency kit"
description: "Information about backup emergency kit"
---

Backups are encrypted (using [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)). The backup emergency kit contains information needed to recover your backup, such as the encryption key and metadata about the backup.

## What is encryption and why are backups encrypted?

Encryption is a method of converting data into a coded format so that it can only be read by someone who has the decryption key. This ensures that your data about your home remains private. So even if someone else had a copy of your Home Assistant backup, it is unreadable for them without the decryption key.

## Storing the backup emergency kit somewhere safe

1. To download the emergency kit, go to {% my backup title="**Settings** > **System** > **Backups**" %}
2. If it is your first time defining backup settings, select **Setup automatic backup** and download the backup emergency kit.
   - You can also download the encryption key again later from the configuration page.

    ![Screenshot showing the encryption key in the download dialog for the backup emergency kit](/images/more-info/backup_emergency_kit_01.png)

3. Store the kit somewhere safe, outside the Home Assistant system.
   - Without the encryption key, there is no way to restore the backup.

## Changing your encryption key

When you set up your backups, an encryption key is generated automatically. This key is used for all your backups. You can replace this key with a new one, which will be used for all future backups. To decrypt backups created before the change, you will still need the previous encryption key.

1. To generate a new encryption key, go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Select **Configure automatic backups** and under **Encryption key**, select **Change**.
3. If you haven't downloaded the old emergency kit yet, do it now.
4. Select **Change encryption key**.
5. Download the new encryption key and store it in a safe place.

## Checking and disabling backup location

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Select **Configure automatic backups** and under **Locations**, you can see where your backups are currently stored.
3. You can also enable or disable a backup location.

## Changing the local backup location

1. To change the local default backup location, go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select the local backup location.

## I lost my backup encryption key - how can I retrieve it?

If you still have access to your Home Assistant instance you can download the encryption key again from the backup settings. If you have lost the encryption key, and have no access to your Home Assistant instance, there is no way to restore the backup.
