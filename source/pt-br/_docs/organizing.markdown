---
title: "Organizando seus dispositivos e entidades"
description: "Como organizar seus dispositivos e entidades no Home Assistant."
---

À medida que você adiciona mais dispositivos e entidades ao seu sistema Home Assistant, pode ficar difícil manter o controle de tudo. Felizmente, o Home Assistant oferece várias maneiras de organizar seus dispositivos e entidades para torná-los mais fáceis de gerenciar.

## Áreas

As áreas são a principal maneira de organizar seus dispositivos no Home Assistant. Uma área é uma representação de uma sala ou área em sua casa, como "Sala de Estar" ou "Cozinha".

Você pode atribuir dispositivos a áreas na seção de configuração do Home Assistant. Depois que um dispositivo é atribuído a uma área, ele aparecerá nessa área na interface do usuário.

As áreas são úteis para agrupar dispositivos que estão localizados na mesma sala. Isso pode facilitar a localização de um dispositivo específico e o controle de todos os dispositivos em uma sala ao mesmo tempo.

## Rótulos

Os rótulos são outra maneira de organizar seus dispositivos e entidades. Um rótulo é uma tag que você pode aplicar a um dispositivo ou entidade, como "iluminação" ou "segurança".

Você pode criar seus próprios rótulos e aplicá-los a seus dispositivos e entidades na seção de configuração do Home Assistant.

Os rótulos são úteis para agrupar dispositivos e entidades que estão relacionados entre si, mas não estão necessariamente na mesma sala. Por exemplo, você pode usar um rótulo "segurança" para agrupar todos os seus sensores de segurança, independentemente de onde eles estejam localizados.

## Pisos

Os pisos permitem que você organize suas áreas por andar. Se você tem uma casa de vários andares, pode criar pisos para cada andar e, em seguida, atribuir suas áreas ao piso apropriado.

Isso pode tornar ainda mais fácil encontrar os dispositivos que você está procurando, especialmente se você tiver muitas áreas.

## Categorias

As categorias permitem que você agrupe dispositivos por tipo. Por exemplo, você pode ter categorias para "luzes", "interruptores" e "sensores".

O Home Assistant atribui automaticamente dispositivos a categorias com base em seu tipo, mas você pode substituir a categoria, se necessário.

As categorias são úteis para ver todos os seus dispositivos de um determinado tipo em um só lugar.

## Visualizações

As visualizações permitem que você crie painéis personalizados que exibem apenas os dispositivos e entidades que você deseja ver. Você pode criar várias visualizações e alternar entre elas.

As visualizações são úteis para criar painéis para diferentes finalidades. Por exemplo, você pode ter uma visualização que mostra todos os seus dispositivos de segurança e outra visualização que mostra todos os seus dispositivos de mídia.

Você pode configurar suas visualizações editando o arquivo de configuração `ui-lovelace.yaml`.
