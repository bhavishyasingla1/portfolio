---
title: How I Made My 3D Avatar Load 40× Faster (23 MB to 0.56 MB)
description: My Three.js avatar took ages to appear, so visitors stared at a blue capsule. Here is how welding, quantization and Meshopt cut the GLB from 23 MB to 0.56 MB.
date: 2026-11-10
tags: [Three.js, Performance, WebGL, 3D]
image: /articles/images/infinite-world-avatar.webp
image_alt: My avatar exploring Infinite World at dusk, loaded from the new 0.56 MB model
---

The Infinite World experience on this site drops you onto procedural terrain as my 3D avatar. The problem: the avatar took so long to download that for the first few seconds you played as a plain blue capsule. On a slow phone connection it never felt like "me" at all.

The fix took one afternoon and no visible loss in quality. The model went from **23.0 MB to 0.56 MB**, about 40× smaller, with every triangle, the skeleton and both animations intact.

## Find out what is actually in the file

Before compressing anything, look inside. [glTF Transform](https://gltf-transform.dev/) has an `inspect` command that lists meshes, materials, textures and animations with their sizes:

```bash
npx @gltf-transform/cli inspect player.glb
```

The report was surprising:

| What | Value |
| --- | --- |
| Textures | none |
| Triangles | 127,470 |
| Vertices | 382,310 |
| Attributes | position, normal, colour, joints, weights, all 32-bit floats |
| Animations | Idle and Run, about 66 KB together |

No textures, tiny animations. Almost all 23 MB was raw vertex data.

## The real problem: every vertex stored six times

382,310 vertices for 127,470 triangles is exactly three per triangle. Nothing was shared. The avatar is **flat shaded**, so the exporter gave each triangle its own copy of every corner, just so each face could carry its own normal.

Counting unique positions told the story: only **63,715** distinct points. Each one was stored roughly six times.

## Step 1: Drop the normals and let the GPU do it

For a flat-shaded model you do not need to store normals at all. Three.js can compute a face normal per pixel from screen-space derivatives:

```js
material.flatShading = true
```

With normals gone, the duplicated corners become identical and can be merged.

## Step 2: Weld, quantize, compress

I ran a small Node script with glTF Transform and [meshoptimizer](https://github.com/zeux/meshoptimizer):

```js
await doc.transform(
  weld(),                       // merge identical vertices: 382k → 64k
  reorder({ encoder }),         // better vertex cache order and compression
  quantize({                    // 32-bit floats → 16 / 8-bit integers
    quantizePosition: 14,
    quantizeColor: 8,
    quantizeWeight: 8
  })
)
// then write with the EXT_meshopt_compression extension
```

- **Weld** merged the duplicates: 382,310 vertices became 63,715.
- **Quantize** stores positions as 16-bit integers and colours and skin weights as 8-bit. At avatar scale the difference is invisible.
- **Meshopt compression** packs what is left into a format the browser decodes almost instantly.

I did not simplify the mesh. With everything above, the full-detail model was already small enough.

## Step 3: Teach the loader to read it

Meshopt-compressed files need the decoder registered on the `GLTFLoader`. It ships with Three.js, so there is nothing extra to host:

```js
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

loader.setMeshoptDecoder(MeshoptDecoder)
```

## Step 4: Start the download before anyone asks

Even 0.56 MB is faster if it is already cached. When a visitor opens the world selector on the home page, the site quietly adds a `<link rel="prefetch">` for the avatar. By the time they click Infinite World, the model is usually waiting in the cache. With that in place I removed the blue capsule completely.

## Results

| | Before | After |
| --- | --- | --- |
| File size | 23.0 MB | 0.56 MB |
| Vertices | 382,310 | 63,715 |
| Triangles | 127,470 | 127,470 |
| Skeleton and animations | yes | yes |

## Takeaways

1. **Inspect first.** The fix depended on noticing there were no textures and that nothing was shared.
2. **Flat-shaded exports are a trap.** Drop the normals and weld, and you often save most of the file.
3. **Quantization and Meshopt are nearly free.** Two lines of loader code for a huge cut in size.
4. **Prefetch what the next click needs.** The fastest download is the one that already happened.

You can try the result yourself in [Infinite World](/world/).
