## Network storage

You can configure both Network File System (NFS) and Samba/Windows (CIFS) targets to be used within Home Assistant and apps.
To list all your currently connected network storages, go to {% my storage title="**Settings** > **System** > **Storage**" %} in the UI.

{% if page.installation == "os" %}

{% important %}
You need to update to Home Assistant Operating System 10.2 before you can use this feature.
{% endimportant %}

{% endif %}

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/list_light.png">
  </picture>
  Screenshot of the list of network shares inside the storage panel.
</p>

### Add a new network storage

1. Go to {% my storage title="**Settings** > **System** > **Storage**" %} in the UI.
2. Select **Add storage**.
3. Fill out all the information for your network storage.
4. Select **Connect**.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/connect_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/connect_light.png">
  </picture>
  Screenshot of connecting a new network storage.
</p>

#### Network storage configuration

{% configuration_basic "hassio.network_share" %}
Name:
  description: This is the name that will be used for the mounted directory on your system.
Usage:
  description: Select how you want to use the storage. For the options, see [usage types](#usage-types).
"Type<sup>3</sup>":
  description: The type of storage. For network storage, select **Samba/Windows (CIFS)** or **Network File System (NFS)**.
Server:
  description: The IP/hostname of the server running NFS/CIFS.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Username":
  description: "The username to use when connecting to the storage server. Use User Principal Name for domain accounts. For example: `user@domain.com`."
"[CIFS]<sup>2</sup> Password":
  description: The password to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Share":
  description: The share to connect to on the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` are only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` are only available for CIFS targets._<br>
<sup>3</sup> _For the `CIFS` option, only version 2.1+ is supported._<br>

##### Usage types

{% configuration_basic "hassio.network_share.usage" %}
Backup:
  description: This will become a target. You can use it when creating an automatic or manual backup. The first storage you add of this type becomes your new default target. If you want to change the default target, [check out the documentation below](#change-default-local-backup-location).
Media:
  description: A new directory with the name you gave your storage will be created under `/media`. This directory can be accessed by Home Assistant and apps.
Share:
  description: A new directory with the name you gave your storage will be created under `/share`. This directory can be accessed by Home Assistant and apps.
{% endconfiguration_basic %}

### Change default local backup location

By default, the first storage you add with the **Backup** usage becomes your default local backup location. This can be network storage or a local disk.

To change the default local backup location, follow these steps:

1. Go to {% my backup title="**Settings** > **System** > **Backups**" %}.
2. Select **Settings and history**.
3. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Change default action location**.
4. Under **Default location**, select the storage you want to use, then select **Save**.
   ![Select default location used for local backup](/images/screenshots/network-storage/backup_select_local_default.png)
5. Troubleshooting: Don't see your external storage location? This list contains only the storage you have added with the **Backup** usage.

## Local disk storage

You can also add a disk connected to your system, such as an internal drive or a USB drive, and use it for media, shared files, or backups. Home Assistant mounts the disk and reconnects it after a restart.

The disk needs to be formatted already. These file systems are supported:

- ext4, ext3, and ext2
- FAT and FAT32, reported as `vfat`
- exFAT
- NTFS
- Btrfs
- F2FS (requires {% term "Home Assistant Operating System" %} 18.3 or later)

Home Assistant does not format disks for you. If your disk uses a different file system, format it on a computer first.

### Adding a local disk

1. Go to {% my storage title="**Settings** > **System** > **Storage**" %} in the UI.
2. Select **Add storage**.
3. For **Type**, select **Local disk**.
4. Fill out the rest of the information for your disk.
5. Select **Connect**.

#### Local disk configuration

{% configuration_basic "hassio.local_disk" %}
Name:
  description: This is the name that will be used for the mounted directory on your system.
Usage:
  description: Select how you want to use the disk. For the options, see [usage types](#usage-types).
Disk:
  description: The disk you want to use. Disks that are already in use, or that belong to Home Assistant, are not listed. If you connect a disk while this dialog is open, close the dialog and open it again to see the disk.
Read-only:
  description: Home Assistant reads from the disk but never writes to it. A write-protected disk can only be added as read-only. Backup storage cannot be read-only.
{% endconfiguration_basic %}

### Keeping a local disk connected

Home Assistant remembers the disk by its file system identifier, not by a device name such as `/dev/sda1`. Device names can change after a restart or when you move a drive, so your storage keeps working either way.

If the disk is disconnected, or missing when the system starts, Home Assistant creates a repair issue at {% my repairs title="**Settings** > **System** > **Repairs**" %}. Anything using the disk's folder while it is disconnected gets an error instead of writing to internal storage.

After you reconnect the disk, Home Assistant can take up to 15 minutes to mount it again, and the repair issue then clears on its own. To mount the disk right away, open the repair issue and select **Reload**. If the disk uses Btrfs and you reconnect it before a repair issue appears, reboot the system to use the disk again.

If you no longer want to use the disk, open the repair issue and select **Remove**.
