---
title: "Editor de Cena"
description: "Como usar o editor de cena para criar e editar cenas."
---

O editor de cena é uma ferramenta na interface do usuário do Home Assistant que permite criar e editar cenas sem precisar escrever YAML.

## Criando uma cena

Para criar uma nova cena, vá para a seção "Automações & Cenas" de sua configuração e clique na guia "Cenas". A partir daqui, você pode clicar no botão "Adicionar Cena" para iniciar o editor de cena.

No editor de cena, você pode dar um nome à sua cena e, em seguida, adicionar os dispositivos e entidades que deseja incluir na cena.

Para cada dispositivo e entidade, você pode especificar o estado em que ele deve estar quando a cena for ativada. Por exemplo, você pode especificar que uma luz deve estar acesa e definida com uma cor específica.

## Editando uma cena

Para editar uma cena existente, encontre-a na lista de cenas e clique nela. Isso abrirá o editor de cena, onde você poderá fazer alterações na cena.

## Usando o editor de YAML

O editor de cena também inclui um editor de YAML que você pode usar para editar o YAML de suas cenas diretamente. Isso é útil se você preferir escrever YAML ou se precisar usar recursos avançados que não são suportados pelo editor visual.

Para acessar o editor de YAML, clique no ícone de três pontos no canto superior direito do editor de cena e selecione "Editar como YAML".

## Ativando uma cena

Você pode ativar uma cena a partir da lista de cenas clicando no botão "Ativar" ao lado do nome da cena.

Você também pode ativar uma cena a partir de uma automação ou script usando o serviço `scene.turn_on`.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar o editor de cena, incluindo uma lista de todos os recursos disponíveis.
