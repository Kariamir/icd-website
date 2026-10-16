Frames and window tracks for the homepage film (app/components/sections/HeroFilm.vue).

seq/000.webp … seq/313.webp
    Every third frame of the client's 31s clip, 1280x720.
    Source: Asset Icd / ICD_video_v1.mp4 (940 frames at 30fps).

windows.json
    The six windows in the closing shot, tracked frame by frame:
    {stride, count, windows:[{enter, exit, centre, pts:{<frame>: [x,y,w,h]}}]}
    Boxes are normalised 0..1 against the 1280x720 frame.
