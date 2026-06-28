"""
MN Animat — animação de apresentação e vista explodida para Blender.

Como usar:
1. Abra uma cópia do arquivo .blend.
2. Entre no Object Mode.
3. Abra a área Scripting > New.
4. Cole este script e clique em Run Script.
5. Confira a animação na timeline.
6. Exporte como GLB com Animation ativado.

O script usa todas as malhas visíveis da cena.
"""

import bpy
import math
from mathutils import Vector

EXPLODE_START = 1
EXPLODE_END = 55
EXPLODE_HOLD = 90
ASSEMBLE_END = 135

PRESENTATION_START = 170
GROUP_DURATION = 34
GROUP_MOVE = 0.35
EXPLODE_STRENGTH = 0.75

GROUPS = [
    ("Chassis, tanque e banco", ("base", "lateral", "tanque", "banco", "segurador", "back_wheel", "engrenagem")),
    ("Fiação e componentes mecânicos", ("fio", "nurbspath", "mola", "nitro")),
    ("Suspensão e guidão", ("suspension", "direita", "punho", "guidom")),
    ("Freios e controles", ("freio", "controlador", "aparelho", "cube")),
    ("Farol e iluminação", ("headlight", "sphere", "luz")),
    ("Rodas e aros", ("roda", "principal", "rims", "ponta")),
    ("Discos e paralamas", ("brakedisk", "disk", "fender")),
    ("Placas, logo e parafusos", ("plate", "logo", "parafuso")),
]


def visible_meshes():
    return [
        obj for obj in bpy.context.scene.objects
        if obj.type == "MESH" and not obj.hide_get() and not obj.hide_render
    ]


def set_linear_interpolation(obj):
    if not obj.animation_data or not obj.animation_data.action:
        return
    for curve in obj.animation_data.action.fcurves:
        for point in curve.keyframe_points:
            point.interpolation = "BEZIER"


def group_for_object(obj):
    collection_names = " ".join(collection.name for collection in obj.users_collection)
    search_text = f"{obj.name} {collection_names}".casefold()
    for index, (_, keywords) in enumerate(GROUPS):
        if any(keyword in search_text for keyword in keywords):
            return index
    return 0


if bpy.context.object and bpy.context.object.mode != "OBJECT":
    bpy.ops.object.mode_set(mode="OBJECT")

objects = visible_meshes()
if not objects:
    raise RuntimeError("Nenhum objeto de malha visível foi encontrado.")

scene = bpy.context.scene
scene.frame_start = 1
scene.render.fps = 30

# Marcadores facilitam a leitura da timeline.
scene.timeline_markers.clear()
scene.timeline_markers.new("EXPLODIR", frame=EXPLODE_START)
scene.timeline_markers.new("VISTA EXPLODIDA", frame=EXPLODE_END)
scene.timeline_markers.new("REMONTAR", frame=EXPLODE_HOLD)

world_centers = [obj.matrix_world.translation.copy() for obj in objects]
model_center = sum(world_centers, Vector()) / len(world_centers)

original_locations = {obj.name: obj.location.copy() for obj in objects}
original_scales = {obj.name: obj.scale.copy() for obj in objects}

# Remove animações anteriores somente das transformações criadas neste arquivo.
for obj in objects:
    obj.animation_data_clear()

# Vista explodida e remontagem.
for index, obj in enumerate(objects):
    original = original_locations[obj.name]
    world_direction = obj.matrix_world.translation - model_center

    if world_direction.length < 0.0001:
        angle = index * 2.399963
        world_direction = Vector((math.cos(angle), 0.35, math.sin(angle)))

    world_direction.normalize()
    local_direction = obj.matrix_world.inverted().to_3x3() @ world_direction
    distance = EXPLODE_STRENGTH * (0.86 + (index % 7) * 0.035)
    exploded = original + local_direction * distance

    obj.location = original
    obj.keyframe_insert("location", frame=EXPLODE_START)

    obj.location = exploded
    obj.keyframe_insert("location", frame=EXPLODE_END)
    obj.keyframe_insert("location", frame=EXPLODE_HOLD)

    obj.location = original
    obj.keyframe_insert("location", frame=ASSEMBLE_END)

# Apresentação sequencial dos conjuntos.
for group_index, (group_label, _) in enumerate(GROUPS):
    scene.timeline_markers.new(
        f"APRESENTAR — {group_label}",
        frame=PRESENTATION_START + group_index * GROUP_DURATION,
    )

for obj in objects:
    group_index = group_for_object(obj)
    group_start = PRESENTATION_START + group_index * GROUP_DURATION
    peak_start = group_start + 8
    peak_end = group_start + 23
    group_end = group_start + 31

    original = original_locations[obj.name]
    base_scale = original_scales[obj.name]

    direction_vectors = [
        Vector((0.0, 1.0, 0.15)),
        Vector((-1.0, 0.35, 0.2)),
        Vector((0.05, 0.3, -1.0)),
        Vector((1.0, 0.35, -0.25)),
        Vector((0.0, 0.45, -1.0)),
        Vector((0.0, -1.0, 0.0)),
        Vector((-1.0, 0.1, 0.15)),
        Vector((1.0, 0.5, 0.35)),
    ]
    direction = direction_vectors[group_index].normalized()
    local_direction = obj.matrix_world.inverted().to_3x3() @ direction
    highlighted = original + local_direction * GROUP_MOVE

    obj.location = original
    obj.scale = base_scale
    obj.keyframe_insert("location", frame=group_start)
    obj.keyframe_insert("scale", frame=group_start)

    obj.location = highlighted
    obj.scale = base_scale * 1.055
    obj.keyframe_insert("location", frame=peak_start)
    obj.keyframe_insert("scale", frame=peak_start)
    obj.keyframe_insert("location", frame=peak_end)
    obj.keyframe_insert("scale", frame=peak_end)

    obj.location = original
    obj.scale = base_scale
    obj.keyframe_insert("location", frame=group_end)
    obj.keyframe_insert("scale", frame=group_end)

    set_linear_interpolation(obj)

scene.frame_end = PRESENTATION_START + len(GROUPS) * GROUP_DURATION + 10
scene.frame_set(1)

print("MN Animat: animação criada com sucesso.")
print(f"Objetos animados: {len(objects)}")
print(f"Timeline: frames {scene.frame_start} a {scene.frame_end}")
