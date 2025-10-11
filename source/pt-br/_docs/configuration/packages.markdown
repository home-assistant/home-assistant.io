---
title: "Pacotes"
description: "Como usar pacotes para organizar sua configuração."
---

Os pacotes permitem que você agrupe sua configuração em pedaços lógicos. Isso pode ajudar a manter sua configuração organizada e mais fácil de gerenciar, especialmente à medida que ela cresce.

## O que é um pacote?

Um pacote é um arquivo YAML que contém um conjunto de configurações relacionadas. Por exemplo, você poderia criar um pacote para todas as sua configurações de iluminação ou um pacote para todas as suas automações.

## Criando um pacote

Para criar um pacote, crie um novo arquivo YAML em seu diretório de configuração. O nome do arquivo não importa, mas é uma boa ideia dar a ele um nome descritivo.

Dentro do arquivo do pacote, você pode adicionar qualquer configuração que desejar. A configuração em um arquivo de pacote é a mesma que a configuração em seu arquivo `configuration.yaml`.

## Incluindo um pacote

Depois de criar um pacote, você precisa incluí-lo em seu arquivo `configuration.yaml` principal. Você pode fazer isso usando a diretiva `!include`.

Por exemplo, se você criou um pacote chamado `lighting.yaml`, você o incluiria em seu arquivo `configuration.yaml` da seguinte forma:

```yaml
homeassistant:
  packages:
    !include lighting.yaml
```

Você também pode incluir um diretório inteiro de pacotes usando a diretiva `!include_dir_named`. Por exemplo, se você criasse um diretório chamado `packages` e colocasse todos os seus arquivos de pacote nele, você o incluiria em seu arquivo `configuration.yaml` da seguinte forma:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

## Vantagens de usar pacotes

Existem várias vantagens em usar pacotes:

- **Organização:** Os pacotes ajudam a manter sua configuração organizada, agrupando configurações relacionadas.
- **Reutilização:** Os pacotes podem ser facilmente reutilizados em diferentes instalações do Home Assistant.
- **Compartilhamento:** Os pacotes podem ser facilmente compartilhados com outras pessoas, para que você possa se beneficiar do trabalho de outros na comunidade do Home Assistant.

## Mesclando configurações

Quando você usa pacotes, o Home Assistant mesclará a configuração de todos os seus pacotes. Se houver algum conflito entre a configuração em seus pacotes, a última configuração encontrada terá precedência.

É importante estar ciente disso ao usar pacotes, pois isso pode levar a um comportamento inesperado se você não for cuidadoso.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar pacotes, incluindo exemplos de como usar diferentes diretivas de inclusão.
