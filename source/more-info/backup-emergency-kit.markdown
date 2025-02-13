---
title: "Backup emergency kit"
description: "Information about backup emergency kit"
related:
  - docs: /common-tasks/general/#backups
    title: Backups
  - docs: /common-tasks/general/#restoring-a-backup
    title: Restoring a backup
---

[Backups](/common-tasks/general/#backups) stored on Home Assistant Cloud are always encrypted using [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). For backups stored on other [backup locations](/common-tasks/general/#defining-backup-locations), you can choose whether or not to encrypt the backup. The backup emergency kit contains information needed to [restore the backup](/common-tasks/general/#restoring-a-backup), such as the encryption key and metadata about the related backup.

## What is encryption, and why are backups encrypted?

Encryption is a method of converting data into a coded format so that it can only be read by someone who has the encryption key. This ensures that your data about your home remains private. So even if someone else had a copy of your Home Assistant backup, it is unreadable for them without the encryption key.

## Storing the backup emergency kit somewhere safe

1. To download the backup emergency kit, go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. If it is your first time defining backup settings, select **Setup automatic backup** and download the backup emergency kit.
   - You can also download the encryption key again later from the backup configuration page.

    ![Screenshot showing the encryption key in the download dialog for the backup emergency kit](/images/more-info/backup_emergency_kit_01.png)

3. Store the kit somewhere safe, outside the Home Assistant system.
   - Home Assistant keeps track of the current encryption key. If you download from Home Assistant, it can decrypt your backup.
   - But if you have changed the encryption key in the meantime, you still need the old key that matches old backups.
   Without the encryption key, there is no way to [restore an encrypted backup](/common-tasks/general/#restoring-a-backup).

## Changing your encryption key

When you set up your [backups](/common-tasks/general/#backups), an encryption key is generated automatically. This key is used for all your backups. You can replace this key with a new one, which will be used for all future backups. To decrypt backups created before the change, you will still need the previous encryption key.

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Select **Configure automatic backups** and under **Encryption key**, select **Change**.
3. If you haven't downloaded the old emergency kit yet, do it now.
   - As the new encryption key won't work for the backups you've taken until now, keep it somewhere safe and make a note of which backups it applies to.
4. To generate a new encryption key, select **Next**, then select **Change encryption key**.
5. Download the new encryption key and store it in a safe place.

## I lost my backup encryption key - how can I retrieve it?

If you still have access to your Home Assistant instance you can download the encryption key again from the backup settings.

- **If you have not changed the encryption key**: Home Assistant still has it. If you download the backup from the Home Assistant Backup page, it decrypts the backup on the fly.
- **If you have changed the encryption key**: Home Assistant can not decrypt it on the fly. You need the encryption key that is related to that backup. If you have lost the encryption key, and have no access to your Home Assistant instance, there is no way to restore the backup.
