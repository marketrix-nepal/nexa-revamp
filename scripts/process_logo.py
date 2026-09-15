import numpy as np
from PIL import Image

def process_logo():
    img = Image.open("logo.jpeg").convert("RGB")
    arr = np.array(img, dtype=np.float32)

    # 1. Bounding box detection
    # Compute max channel value for each pixel
    max_val = np.max(arr, axis=-1)
    mask = max_val > 15
    y_indices, x_indices = np.where(mask)
    
    pad = 20
    min_x = max(0, int(x_indices.min()) - pad)
    max_x = min(arr.shape[1], int(x_indices.max()) + pad)
    min_y = max(0, int(y_indices.min()) - pad)
    max_y = min(arr.shape[0], int(y_indices.max()) + pad)

    cropped_arr = arr[min_y:max_y, min_x:max_x]
    
    # 2. Key out black background smoothly
    # Calculate luminance / max color intensity
    lum = np.max(cropped_arr, axis=-1)
    
    # Soft alpha ramp
    low_thresh = 10.0
    high_thresh = 38.0
    alpha = np.clip((lum - low_thresh) / (high_thresh - low_thresh), 0.0, 1.0)
    
    # Unpremultiply black background to prevent dark fringes
    alpha_safe = np.maximum(alpha, 1e-4)[..., np.newaxis]
    unmult_rgb = np.clip(cropped_arr / alpha_safe, 0.0, 255.0)
    
    rgba = np.zeros((cropped_arr.shape[0], cropped_arr.shape[1], 4), dtype=np.uint8)
    rgba[..., :3] = unmult_rgb.astype(np.uint8)
    rgba[..., 3] = (alpha * 255.0).astype(np.uint8)

    full_logo = Image.fromarray(rgba, mode="RGBA")
    full_logo.save("public/logo.png", "PNG", optimize=True)
    print(f"Saved public/logo.png: size {full_logo.size}")

    # 3. Create isolated circular emblem (the red embroidered disc with fern)
    # Let's locate the disc in the cropped image
    # The disc is on the left side: x from 0 to approx 370 in cropped_arr
    disc_mask = (alpha > 0.5) & (np.arange(cropped_arr.shape[1])[np.newaxis, :] < 400)
    y_disc, x_disc = np.where(disc_mask)
    pad_d = 10
    d_min_x = max(0, int(x_disc.min()) - pad_d)
    d_max_x = min(cropped_arr.shape[1], int(x_disc.max()) + pad_d)
    d_min_y = max(0, int(y_disc.min()) - pad_d)
    d_max_y = min(cropped_arr.shape[0], int(y_disc.max()) + pad_d)

    emblem_rgba = rgba[d_min_y:d_max_y, d_min_x:d_max_x]
    emblem_img = Image.fromarray(emblem_rgba, mode="RGBA")
    emblem_img.save("public/logo-mark.png", "PNG", optimize=True)
    print(f"Saved public/logo-mark.png: size {emblem_img.size}")

    # Favicon 64x64 PNG
    favicon = emblem_img.copy()
    favicon.thumbnail((64, 64), Image.Resampling.LANCZOS)
    # Center on 64x64 canvas
    fav_canvas = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    offset = ((64 - favicon.size[0]) // 2, (64 - favicon.size[1]) // 2)
    fav_canvas.paste(favicon, offset)
    fav_canvas.save("public/favicon.png", "PNG")
    print(f"Saved public/favicon.png")

if __name__ == "__main__":
    process_logo()
