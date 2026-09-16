import cv2
import os
import json
import time

def extract_frames():
    video_path = os.path.join('public', 'hero-video-hq.mp4')
    out_dir = os.path.join('public', 'frames')
    os.makedirs(out_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {video_path}")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    target_count = 100
    
    # Calculate exact frame indices for linear distribution
    indices = [int(i * (total_frames - 1) / (target_count - 1)) for i in range(target_count)]
    target_set = set(indices)

    print(f"Extracting {target_count} frames from {total_frames} total frames in {video_path}...")
    t0 = time.time()

    frame_idx = 0
    saved_count = 0
    total_size = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_idx in target_set:
            # Resize from 4K (3840x2160) to crisp 1600x900
            resized = cv2.resize(frame, (1600, 900), interpolation=cv2.INTER_AREA)
            out_filename = f"frame_{saved_count:03d}.webp"
            out_path = os.path.join(out_dir, out_filename)
            
            # Encode as WebP with quality 76 (crisp details, minimal file size)
            cv2.imwrite(out_path, resized, [cv2.IMWRITE_WEBP_QUALITY, 76])
            total_size += os.path.getsize(out_path)
            saved_count += 1
            
            if saved_count % 20 == 0:
                print(f"Extracted {saved_count}/{target_count} frames...")
        
        frame_idx += 1

    cap.release()
    t1 = time.time()

    manifest = {
        "frameCount": saved_count,
        "width": 1600,
        "height": 900,
        "format": "webp",
        "totalSizeBytes": total_size,
        "totalSizeMB": round(total_size / (1024 * 1024), 2),
        "framePattern": "/frames/frame_%03d.webp"
    }

    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"Extraction complete in {t1 - t0:.2f}s!")
    print(f"Saved {saved_count} frames to {out_dir} (Total: {manifest['totalSizeMB']} MB)")

if __name__ == '__main__':
    extract_frames()
