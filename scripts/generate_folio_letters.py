import bpy
import os
from mathutils import Vector

def clean_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

font_path = os.path.abspath("experiences/folio-2019/resources/3d/resources/Oswald/Oswald-Bold.ttf")

chars = ["b", "h", "a", "v", "i", "s", "y", "n", "g", "l"]
base_dir = os.path.abspath("experiences/folio-2019/static/models/intro")

letter_info = {}

for char in chars:
    clean_scene()
    font = bpy.data.fonts.load(font_path)
    char_upper = char.upper()
    
    # 1. Base visual mesh
    curve = bpy.data.curves.new(type="FONT", name=f"curve_{char}")
    curve.body = char_upper
    curve.font = font
    curve.size = 1.0
    curve.extrude = 0.08
    curve.bevel_depth = 0.0
    
    obj = bpy.data.objects.new("shadeWhite", curve)
    bpy.context.collection.objects.link(obj)
    
    # Folio scale & rotation (rotate 90 deg around X so text stands upright)
    obj.scale = (2.685395, 2.685395, 2.685395)
    obj.rotation_euler = (1.5707963, 0, 0)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    
    # Separate loose parts (if letter has holes like B, A) and rejoin to ensure clean single mesh
    bpy.ops.mesh.separate(type="LOOSE")
    parts = list(bpy.context.selected_objects)
    bpy.context.view_layer.objects.active = parts[0]
    for p in parts:
        p.select_set(True)
    if len(parts) > 1:
        bpy.ops.object.join()
    obj = bpy.context.active_object
    obj.name = "shadeWhite"
    
    # Calculate bounding box
    bbox = [Vector(c) for c in obj.bound_box]
    min_x, max_x = min(v.x for v in bbox), max(v.x for v in bbox)
    min_y, max_y = min(v.y for v in bbox), max(v.y for v in bbox)
    min_z, max_z = min(v.z for v in bbox), max(v.z for v in bbox)
    
    width = max_x - min_x
    depth = max_y - min_y
    height = max_z - min_z
    
    # Center vertices horizontally and in depth, and rest exactly on floor (with 1mm clearance)
    cx = (min_x + max_x) / 2.0
    cy = (min_y + max_y) / 2.0
    cz_min = min_z
    
    for v in obj.data.vertices:
        v.co.x -= cx
        v.co.y -= cy
        v.co.z = (v.co.z - cz_min) + 0.001
        
    char_dir = os.path.join(base_dir, char)
    os.makedirs(char_dir, exist_ok=True)
    
    # Export base.glb
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    base_path = os.path.join(char_dir, "base.glb")
    bpy.ops.export_scene.gltf(filepath=base_path, export_format="GLB", export_yup=False, use_selection=True)
    
    # 2. Collision model
    bpy.data.objects.remove(obj)
    
    center_z = height / 2.0 + 0.002
    empty = bpy.data.objects.new("center", None)
    empty.location = (0, 0, center_z)
    bpy.context.collection.objects.link(empty)
    
    col_width = max(width, 0.30) if char == "i" else width
    
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, center_z))
    cube = bpy.context.active_object
    cube.name = "Cube"
    cube.scale = (col_width, 0.4333, height)
    
    bpy.ops.object.select_all(action="DESELECT")
    empty.select_set(True)
    cube.select_set(True)
    
    col_path = os.path.join(char_dir, "collision.glb")
    bpy.ops.export_scene.gltf(filepath=col_path, export_format="GLB", export_yup=False, use_selection=True)
    
    letter_info[char] = {
        "width": round(width, 3),
        "height": round(height, 3),
        "col_width": round(col_width, 3),
        "center_z": round(center_z, 4)
    }
    print(f"Generated letter {char_upper}: width={width:.3f}, height={height:.3f}")

print("\nAll 10 letter models generated successfully!")
