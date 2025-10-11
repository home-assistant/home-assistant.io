---
title: "Controladores Z-Wave"
description: "Uma visão geral dos controladores Z-Wave e como eles são usados no Home Assistant."
---

Um controlador Z-Wave é um dispositivo que permite que você se comunique com dispositivos Z-Wave em sua casa. É o cérebro da sua rede Z-Wave.

## Tipos de controladores Z-Wave

Existem dois tipos principais de controladores Z-Wave:

- **Controladores primários:** Um controlador primário é o controlador principal em uma rede Z-Wave. É responsável por adicionar e remover dispositivos da rede, e por gerenciar a rede.
- **Controladores secundários:** Um controlador secundário é um controlador adicional em uma rede Z-Wave. Ele pode ser usado para controlar dispositivos na rede, mas não pode ser usado para adicionar ou remover dispositivos.

Você só pode ter um controlador primário em uma rede Z-Wave, mas pode ter vários controladores secundários.

## Suporte a controladores Z-Wave no Home Assistant

O Home Assistant suporta uma ampla gama de controladores Z-Wave, incluindo controladores USB e GPIO.

A maneira recomendada de usar o Z-Wave com o Home Assistant é usar a integração Z-Wave JS. Esta integração fornece uma interface moderna e confiável para sua rede Z-Wave.

## Integração Z-Wave JS

A integração Z-Wave JS é a maneira recomendada de usar o Z-Wave com o Home Assistant. Ela fornece uma interface moderna e confiável para sua rede Z-Wave.

Para usar a integração Z-Wave JS, você precisará instalar o complemento Z-Wave JS. Este complemento executará o servidor Z-Wave JS, que é responsável por se comunicar com seu controlador Z-Wave.

Depois de instalar o complemento, você pode configurar a integração Z-Wave JS no Home Assistant. Você precisará especificar a porta serial do seu controlador Z-Wave.

## Integração legada Z-Wave

A integração legada Z-Wave ainda está disponível, mas não é mais recomendada. A integração Z-Wave JS é mais confiável e tem mais recursos.

Se você estiver usando atualmente a integração legada Z-Wave, é recomendado migrar para a integração Z-Wave JS.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre controladores Z-Wave e como usá-los com o Home Assistant.
