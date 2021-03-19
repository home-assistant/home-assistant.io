---
title: Leviosa Motor Blinds Zone hub
description: Instructions on how to integrate the Leviosa Zone hub into Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Push
ha_release: 2021.4
ha_domain: leviosa_shades
ha_codeowners:
  - '@altersis'
ha_config_flow: true
ha_platforms:
  - cover
---

This integration allows you to control [Leviosa Zone hubs](https://leviosashades.com/products/leviosa-zone) from [Leviosa Motor Shades](https://leviosashades.com/).

## Configuration

To Add Leviosa Shades to your Home Assistant instance, please configure your Leviosa Shades and Zones with the app before doing it in Home Assistant. Once done, take the following steps:

- Browse to your Home Assistant instance.
- In the sidebar click on [Configuration](https://my.home-assistant.io/redirect/config).
- From the configuration menu select [Integrations](https://my.home-assistant.io/redirect/integrations).
- In the bottom right, click on the [Add Integration](https://my.home-assistant.io/redirect/config_flow_start?domain=leviosa_shades) button.
- From the list, search and select *Leviosa Motor Shades Zone*.
- Follow the instruction on screen to complete the set up. Each Leviosa Zone manages up to 6 groups of shades.
- If you have more than one Leviosa Zone in your Network, Home Assistant will display a list, with one IP address for each Leviosa Zone discovered in your network, in the same order as they were discovered. Once a Leviosa Zone is configured in Home Assistant, it will not appear in this list. Refer to the next section to find the IP address of each zone group.
- If you have only one Leviosa Zone, then you'll be taken directly to the screen to enter the Leviosa Zone name and shade group names.
- You can name the shade groups as you wish. They do not have to match the names already in the Leviosa App.

After completing the steps above, the {{ name }} integration will be immediately available for use. A `cover` entity for each shade group will be ready for you. An additional `cover` entity is created with the name of the zone (prefixed `all_`) to move all groups in a Leviosa Zone at the same time.

## Retrieving the IP Address of the Leviosa Zone (WiFi bridge)

This is needed when multiple Leviosa Zones are detected, to identify each Leviosa Zone:

- Open the Leviosa App.
- Press/hold on any group name. After 1 second, a new screen will appear.
- Select the ‘Name’ tab at the top.
- The screen will now show the IP address of the Leviosa Zone that shade group is on.

## Services that allow you to move your blinds to intermediate positions

The Home Assistant user interface is useful to completely open or close your blinds. When you want your blinds to go to well defined intermediate positions, please [set](https://cdn.shopify.com/s/files/1/1346/0347/files/Leviosa_Shades_Programming_instructions.pdf?) the Mid-point positions with the Leviosa remote controller. These positions are stored in the Leviosa shade motor. If you do not program intermediate points, the shade will travel fully to the pre-set upper or lower limit. when using the following services:

- Use `leviosa_shades.next_up_pos` to move Leviosa shades up to the next mid-point position.
- Use `leviosa_shades.next_down_pos` to move Leviosa shades down to the next mid-point position.

Both services need the `entity_id` of the shade group that you want to move

## Troubleshooting

- Keep in mind that you cannot use the Home Assistant UI to move your blinds to arbitrary positions, only to completely open/close them. Use the services explained above to move to pre-set positions programmed directly into the motors using a Leviosa remote.
- If Home Assistant cannot find your Leviosa Zone hubs, double check that you can ping your Home Assistant instance as well as your Leviosa Zones from the same node in your network, on the same subnet. If you have a network switch that can filter multicast packets, check that it is not filtering SSDP traffic. Home Assistant can only discover your Leviosa Zone hubs if the SSDP advertisements can reach the Home Assistant instance.
