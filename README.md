# Micael Nildo • MNAnimat - GitHub Pages

> 🎨 3D Animator • 💻 Full Stack Developer • 📱 Android Developer • 🎬 Video Editor  
> Portfólio e hub de downloads oficial - hospedado no GitHub Pages

![Gerado por IA](https://img.shields.io/badge/imagens-Geradas%20por%20IA-7c3aed?style=for-the-badge)
![Cyberpunk Snow](https://img.shields.io/badge/estilo-Cyberpunk%20Neve-00e5ff?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-00e5ff?logo=github&style=for-the-badge)

## 🚀 Sobre

Este repositório contém a página oficial de **Micael Nildo Oliveira Souza (mnanimat)** para GitHub Pages.

- **Interface:** tons claros com textura de neve ❄️, cores vibrantes cyberpunk (ciano #00e5ff, magenta #ff2ea6, violeta #7c3aed)
- **Fontes comerciais livres:** Space Grotesk, Inter, JetBrains Mono (SIL Open Font License)
- **Imagens:** estilo desenho animado / cartoon 3D, geradas por Inteligência Artificial

> ⚠️ **Aviso:** Todas as imagens em estilo cartoon desta página foram **geradas por Inteligência Artificial** a partir de fotos reais do autor.

## 📦 Releases - Como baixar

A página carrega automaticamente todos os releases disponíveis em `github.com/mnanimat` via GitHub API.

No topo da página há botões dinâmicos:
- Cada card mostra `repo` + `tag` + data + botão **Baixar**
- Se o release tem asset binário, o botão baixa o asset. Caso contrário, baixa o `zipball` do código.
- Fallback: se a API estiver limitada, mostra links diretos para `/releases` de cada repositório.

### Links diretos manuais:

- [MNAnimat3D](https://github.com/mnanimat/mnanimat3d/releases)
- [Portal Downloads](https://github.com/mnanimat/portal_downloads/releases)
- [Nuvem](https://github.com/mnanimat/nuvem/releases)
- [MNCAD](https://github.com/mnanimat/mncad/releases)
- [Planner](https://github.com/mnanimat/Planner-mnanimat/releases)

## 🛠️ Tecnologias da página

- HTML5 semântico
- CSS3 com glassmorphism, gradientes neon e textura de neve em SVG
- JavaScript vanilla (fetch GitHub API)
- Fontes: Google Fonts OFL
- Imagens cartoon: geradas por IA

## 📂 Estrutura

```
/
├── index.html        # Página principal (GitHub Pages)
├── css/style.css     # Estilos - tons claros + neve + cyberpunk
├── js/app.js         # Loader de releases via GitHub API + efeito neve
├── assets/
│   ├── avatar-portrait.webp   # Cartoon - Gerado por IA
│   ├── avatar-full.webp       # Cartoon corpo inteiro - Gerado por IA
│   └── banner-snow-city.webp  # Background cidade cyberpunk nevada - Gerado por IA
├── README.md
└── .nojekyll
```

## 🌐 Publicar no GitHub Pages

### Opção 1 - Pelo repositório `mnanimat.github.io` ou `mnanimat` (profile):

1. Crie um repositório chamado `mnanimat.github.io` (se ainda não existir)
2. Faça upload de todos os arquivos deste zip na branch `main`
3. Vá em **Settings > Pages**
4. Source: **Deploy from a branch**, Branch: `main`, Folder: `/ (root)`
5. Salve. Seu site ficará em `https://mnanimat.github.io`

### Opção 2 - Usando repositório atual `mnanimat`:

1. Suba os arquivos para a branch `main` ou crie uma branch `gh-pages`
2. Em **Settings > Pages**, selecione a branch com os arquivos
3. O GitHub Pages servirá o `index.html` automaticamente

### Teste local:

```bash
# dentro da pasta
python -m http.server 8000
# abra http://localhost:8000
```

## 📜 Licença de fontes

- **Space Grotesk, Inter, JetBrains Mono:** SIL Open Font License 1.1 - uso comercial permitido

## 📫 Contato

- GitHub: https://github.com/mnanimat
- Portfólio: https://micaelnildo.com

---
© 2026 Micael Nildo Oliveira Souza • Feito com ❄️ e neon cyberpunk • Imagens cartoon geradas por IA
