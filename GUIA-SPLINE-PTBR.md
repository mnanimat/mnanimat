# Guia rápido — moto animada no site e no Spline

## Arquivo usado no site

O site utiliza este arquivo:

```text
public/assets/moto-funcional4-animada.glb
```

Ele contém malhas, materiais e três animações:

```text
Exploded_View
Assemble_View
Parts_Presentation
```

O arquivo `.blend` não é colocado diretamente no site. Ele é o arquivo de edição do Blender. Para o navegador, use o GLB.

## Testar no computador

Abra o terminal dentro da pasta do projeto e execute:

```bash
npm install
npm run dev
```

No site, teste os botões:

- **Present parts**
- **Explode motorcycle**
- **Assemble motorcycle**
- **Auto rotate**

## Editar a animação no Blender

O projeto inclui:

```text
tools/blender_exploded_animation.py
```

Passos:

1. Abra uma cópia do arquivo Blender.
2. Vá para **Scripting**.
3. Clique em **New**.
4. Cole o conteúdo do script.
5. Clique em **Run Script**.
6. Reproduza a timeline para conferir.
7. Exporte em **File → Export → glTF 2.0**.
8. Selecione **glTF Binary (.glb)**.
9. Ative **Animation**, **Materials**, **Normals**, **UVs** e **Apply Modifiers**.

## Usar pelo Spline

1. Abra o Spline e crie uma nova cena.
2. Importe `public/assets/moto-funcional4-animada.glb`.
3. Ajuste o tamanho, câmera e iluminação.
4. Em **Play Settings**, ative órbita, zoom, toque e rolagem da página.
5. Clique em **Export → Code → React**.
6. Copie a URL terminada em `scene.splinecode`.
7. Abra `public/config.js`.
8. Cole a URL:

```js
window.MN_ANIMAT_CONFIG = {
  splineSceneUrl: "https://prod.spline.design/ID-DA-CENA/scene.splinecode"
};
```

Ao colocar uma URL do Spline, o site passa a mostrar a cena do Spline. Ao deixar a URL vazia, ele mostra o GLB animado incluído no projeto.

## Controles externos para o Spline

Para os botões HTML controlarem uma cena do Spline, crie objetos auxiliares invisíveis com estes nomes:

```text
ViewFull
ViewFront
ViewSide
ViewRear
ViewTop
AutoRotateOn
AutoRotateOff
HotspotEngine
HotspotTank
HotspotFrontWheel
HotspotRearWheel
HotspotSuspension
HotspotSeat
ExplodeMotorcycle
AssembleMotorcycle
PresentMotorcycleParts
```

Em cada objeto, adicione um evento **Mouse Down** com a ação correspondente.

## Publicar na Vercel

1. Envie os arquivos extraídos para um repositório do GitHub.
2. Entre na Vercel.
3. Clique em **Add New → Project**.
4. Importe o repositório.
5. Escolha **Vite**.
6. Use `npm run build`.
7. Use `dist` como pasta de saída.
8. Clique em **Deploy**.
