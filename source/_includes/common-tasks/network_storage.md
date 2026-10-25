## Network storage

You can configure both Network File System (NFS) and Samba/Windows (CIFS) targets to be used within Home Assistant and apps.
To list all your currently connected network storages, go to **{% my storage title="Settings > System > Storage" %}** in the UI.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/list_light.png">
  </picture>
  Screenshot of the list of network shares inside the storage panel.
</p>

### Add a new network storage

1. Go to {% my storage title="**Settings** > **System** > **Storage**" %}.
2. Select **Add network storage**.
3. Enter the details of your network storage. For a description of each option, refer to [Network storage configuration](#network-storage-configuration).
4. Select **Connect**.
   - If the connection to a Samba/Windows (CIFS) share fails, the **Samba/Windows (CIFS) version** option appears. If your storage server only supports an older version, select it, and then select **Connect** again.

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
  description: The name of the folder for the network storage on your system. The name can only contain letters, numbers, and underscores.
Usage:
  description: Here, you select how the target should be used. [See usage types below](#usage-types)
Server:
  description: The IP address or host name of the storage server.
"Protocol<sup>3</sup>":
  description: The service the server is using for the network storage.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Samba/Windows (CIFS) version":
  description: "The version of the CIFS protocol to use. This option only appears if the connection fails, or if the network storage already uses an older version. Keep **Auto (2.1+)** unless your storage server only supports an older version. Then, select **Legacy (2.0)** or **Legacy (1.0)**. Older versions are less secure."
"[CIFS]<sup>2</sup> Remote share":
  description: The name of the share on the storage server.
"[CIFS]<sup>2</sup> Username":
  description: "Optional. The username to use when connecting to the storage server. Use User Principal Name for domain accounts. For example: `user@domain.com`."
"[CIFS]<sup>2</sup> Password":
  description: Optional. The password to use when connecting to the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` are only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` are only available for CIFS targets._<br>
<sup>3</sup> _For CIFS, Home Assistant uses version 2.1 or later by default. If the connection fails, you can select an older version with the **Samba/Windows (CIFS) version** option._<br>

##### Usage types

{% configuration_basic "hassio.network_share.usage" %}
Backup:
  description: This will become a target. You can use it when creating an automatic or manual backup. The first storage you add of this type becomes your new default target. If you want to change the default target, [check out the documentation below](#change-default-local-backup-location).
Media:
  description: A new directory with the name you gave your network storage will be created under `/media`. This directory can be accessed by Home Assistant and apps.
Share:
  description: A new directory with the name you gave your network storage will be created under `/share`.  This directory can be accessed by Home Assistant and apps.
{% endconfiguration_basic %}

### Change default local backup location

By default, the first network storage of type **Backup** that you add is used as your local default backup location.

If you want to change the local network storage that is used to store your backups, follow these steps:

1. Go to **{% my backup title="Settings > System > Backups" %}**.
2. Select **Settings and history**.
3. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Change default action location**.
4. Select your preferred network location and save your changes.
   ![Select default location used for local backup](/images/screenshots/network-storage/backup_select_local_default.png)
5. Troubleshooting: Don't see your external storage location? This list contains only the network storage targets you have added of type **Backup**.
