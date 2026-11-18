#!/bin/bash
# finish.sh <videoDir>: audio + mux for a dir whose out/video.mp4 already exists
set -e; D=${1%/}; cd "$(dirname "$0")"; NAME=$(basename "$D")
python3 core/audio.py "$D"
ffmpeg -y -loglevel error -i "$D/out/video.mp4" -i "$D/out/mix.wav" -map 0:v:0 -map 1:a:0 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=7" -ar 48000 -c:a aac -b:a 192k -shortest "$D/$NAME.mp4"
mkdir -p final && cp "$D/$NAME.mp4" final/ && echo "DONE $D"
