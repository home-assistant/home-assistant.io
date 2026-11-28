---
description: Instructions on how to integrate Govee lights with Govee local API
ha_release: 2024.2
ha_domain: govee_light_local
---
The **Govee Lights Local** {% term integration %} controls [Govee](https://www.govee.com/) lights over your local network using the Govee LAN API. No cloud connection or Govee account is needed in Home Assistant.

Each light is added to Home Assistant as its own device, with one light entity.

## Prerequisites

- Enable **LAN Control** for each light in the Govee Home app. Refer to the [Govee LAN guide](https://app-h5.govee.com/user-manual/wlan-guide) for instructions.
- To be discovered, the lights must be on the same network as Home Assistant. Discovery uses multicast, which usually does not cross VLANs or separate subnets. A light on another network can be [added by its IP address](#adding-a-light-by-ip-address).
- UDP port 4002 must be free on the Home Assistant host. Only one application on the host can listen for Govee lights at a time.
 
{% include integrations/config_flow.md %}


## Adding lights

Home Assistant scans the network for Govee lights. Each light that answers shows up under **Discovered** in {% my integrations title="**Settings** > **Devices & services**" %}, labeled with its model and IP address. Select **Add** on a discovered light to set it up.

When you add the integration manually, you choose how to find the light:

- **Search the network**: Home Assistant runs a new scan and the lights it finds appear under **Discovered** in the same way. If you dismissed a discovered light earlier, searching again brings it back.
- **Enter the IP address**: Home Assistant contacts the light at the address you enter and adds it directly.

### Adding a light by IP address

Use this option for a light that the scan does not find, for example, because it is on another VLAN or subnet.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Add integration**.
2. Select **Govee Lights Local**, then select **Enter the IP address**.
3. Enter the IPv4 address of the light and select **Submit**.

The light must be powered on and answer at that address, otherwise it is not added. If the light is already set up in Home Assistant, its stored IP address is updated instead.

For a light on another network, your router or firewall must allow UDP traffic from Home Assistant to the light on ports 4001 and 4003, and from the light back to Home Assistant on port 4002.

### Changing the IP address of a light

If the IP address of a light changes, Home Assistant picks up the new address the next time the light answers a scan.

A light that the scan cannot reach, such as one on another network, is not updated this way. Assign it a fixed IP address in your router, or change the address in Home Assistant:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Govee Lights Local**.
2. On the entry of the light, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Enter the new IP address and select **Submit**.

The new address must belong to the same light. If a different light answers there, the address is not changed.

## Upgrading from an earlier version

Earlier versions used a single integration entry for all lights. After the update, that entry is converted automatically into one entry per light. Your devices, entities, and their names are kept, so automations and dashboards keep working.

- A light that is offline during the update gets its own entry the first time it answers again.
- Lights that Home Assistant finds later are no longer added automatically. They appear under **Discovered** and you choose whether to add them.

## Troubleshooting

### No devices found on the network

- Check that **LAN Control** is turned on for the light in the Govee Home app. The option only appears for models that support it.
- Make sure the light and Home Assistant are on the same network and that your router or access point does not block multicast traffic.
- Make sure no other application on the Home Assistant host is using UDP port 4002.
- If the light is on another VLAN or subnet, [add it by its IP address](#adding-a-light-by-ip-address).

### A light cannot be added by its IP address

- **Invalid hostname or IP address**: Enter an IPv4 address, such as `192.168.1.50`. Hostnames and IPv6 addresses are not supported.
- **Failed to connect**: The light did not answer at that address. Check the address, that the light is powered and connected to Wi-Fi, and that **LAN Control** is turned on. For a light on another network, check that the UDP ports listed in [Adding a light by IP address](#adding-a-light-by-ip-address) are allowed.

### A light is shown as failing to set up

The light did not answer. Check that it is powered and connected to Wi-Fi. Home Assistant keeps retrying and sets the light up as soon as it answers.

If the light is on another network and its IP address has changed, [change the IP address](#changing-the-ip-address-of-a-light) of the light.

## Removing the integration

Each light has its own entry, so you can remove lights one at a time.

{% include integrations/remove_device_service.md %}

## Supported devices

H1232,
H1250,
H1270,
H1310,
H1401,
H14A1,
H14C0,
H14C1,
H1630,
H16B0,
H16C0,
H1A43,
H1A45,
H2A40,
H2A41,
H3200,
H3500,
H3501,
H3510,
H3511,
H3751,
H6004,
H6006,
H6008,
H600A,
H600D,
H601A,
H6020,
H6022,
H6038,
H6039,
H6042,
H6043,
H6046,
H6047,
H6048,
H6051,
H6052,
H6056,
H6059,
H605D,
H6061,
H6062,
H6063,
H6065,
H6066,
H6067,
H6069,
H606A,
H6072,
H6073,
H6076,
H6076A,
H6078,
H6079,
H607C,
H6087,
H6088,
H608A,
H608B,
H608C,
H608D,
H6093,
H6094,
H6095,
H609D,
H60A0,
H60A1,
H60A4,
H60A6,
H60B0,
H60B1,
H60B2,
H60C1,
H610A,
H610B,
H610E,
H610F,
H6110,
H6117,
H612A,
H612B,
H612C,
H612D,
H612F,
H6141,
H6143,
H6144,
H6159,
H615A,
H615B,
H615C,
H615D,
H615E,
H6163,
H6167,
H6168,
H6169,
H616C,
H616D,
H616E,
H6172,
H6173,
H6175,
H6176,
H617E,
H6182,
H618A,
H618C,
H618E,
H618F,
H618G,
H619A,
H619B,
H619C,
H619D,
H619E,
H619Z,
H61A0,
H61A1,
H61A2,
H61A3,
H61A5,
H61A8,
H61A9,
H61B1,
H61B2,
H61B3,
H61B5,
H61B6,
H61B8,
H61B9,
H61BA,
H61BC,
H61BE,
H61C2,
H61C3,
H61C5,
H61D3,
H61D4,
H61D5,
H61D6,
H61E0,
H61E1,
H61E5,
H61E6,
H61F2,
H61F5,
H61F6,
H6609,
H6630,
H6631,
H6640,
H6641,
H6671,
H6672,
H6800,
H6810,
H6811,
H6840,
H6841,
H6860,
H6861,
H6870,
H6871,
H7012,
H7013,
H7020,
H7021,
H7025,
H7026,
H7027,
H7028,
H702A,
H702B,
H702C,
H7030,
H7033,
H7037,
H7038,
H7039,
H703A,
H703B,
H7041,
H7042,
H7045,
H7046,
H7050,
H7051,
H7052,
H7053,
H7055,
H7056,
H7057,
H7058,
H705A,
H705B,
H705C,
H705D,
H705E,
H705F,
H7060,
H7061,
H7062,
H7063,
H7065,
H7066,
H7067,
H706A,
H706B,
H706C,
H7070,
H7071,
H7072,
H7073,
H7075,
H7076,
H7078,
H707A,
H707B,
H707C,
H7086,
H7087,
H7093,
H7094,
H70A1,
H70A2,
H70A3,
H70B1,
H70B3,
H70B5,
H70B6,
H70B8,
H70BC,
H70C1,
H70C2,
H70C4,
H70C5,
H70C7,
H70C9,
H70D1,
H70D2,
H70D3,
H8015,
H801A,
H801B,
H801D,
H8022,
H8025,
H8026,
H802A,
H8048,
H8057,
H805A,
H805B,
H805C,
H8066,
H8069,
H8072,
H8076,
H8076A,
H807C,
H808A,
H80A1,
H80A4,
H80C4,
H80C5,
H80D1,
H8630,
H8811,
H8840,
H8841

{% note %}
Some scenes may not be supported from all devices. If you find a scene that's not working with a specific model, please open an issue at the [underlying library](https://github.com/Galorhallen/govee-local-api/issues)
{% endnote %}
