---
layout: post
title: "Content Trust with Home Assistant & Codenotary CAS"
description: "Ability to verify that the updates which we deliver are the same as the update that you have fetched."
date: 2022-03-13 00:00:00
date_formatted: "March 14, 2022"
author: Pascal Vizeli
author_twitter: falstaff_ch
comments: true
categories:
- Announcements
---

We started to revamp our Content of Trust validation with [Codenotary CAS](https://cas.codenotary.com/) on the devices. This way, we ensure that only containers tested by us are rolled out and that no one has changed anything on the way to our users. CAS is still a young solution but already with the greatest potential and an energy-efficient decentralized cryptographically coherent and verifiable database technology called [immudb](https://github.com/codenotary/immudb). The latter allows us to host parts of this data ourselves in the future, it could even be made available as an add-on to be installed by users locally. CAS does not upload any user data for verification, it’s all done locally. It needs to check the CAS database to ensure that the image has not been revoked (similar to SSL with the CRL). It unlocks the ability to verify that the updates which we deliver over multiple public endpoints are the same as the update that you have fetched.

While rolling out CAS we ran into some issues which caused users unable to install updates for ~12 hours on March 11 for which we want to apologize. Thanks to the help from Codenotary engineers we were able to get it quickly fixed.

Pascal
