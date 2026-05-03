import {useState, useEffect, useRef} from "react";

const AudioPlayer = (src) => {
    const audioRef= useRef(new Audio());
    const [volume, setVolume] = useState(0.5);
    const [isNotPlaying, setIsNotPlaying] = useState(true);


    useEffect(()=>{
        if(!src) return;
        const audio= audioRef.current;
        audio.src= src;
        audio.load();
        audio.volume= volume;
        audio.loop =true;

    const startAudio = () => {
        // 1. Nếu volume bằng 0, dừng ngay lập tức
        if (volume === 0) return;

        // 2. Chỉ gọi play nếu audio đang bị tạm dừng (paused)
        if (audio.paused) {
            audio.play()
                .then(() => {
                    setIsNotPlaying(false);
                })
                .catch((err) => {
                    // Chỉ log lỗi nếu không phải lỗi do bị gián đoạn (AbortError)
                    if (err.name !== 'AbortError') {
                        console.error("Lỗi phát nhạc:", err);
                    }
                });
        }
    };

        // Nếu người dùng đã click trước đó (isNotPlaying đang là false), ta có thể thử play luôn
        if (!isNotPlaying) {
            startAudio();
        } else {
            // Trình duyệt chặn autoplay, cần phải có tương tác.
            // Lắng nghe sự kiện click trên toàn bộ cửa sổ để bắt đầu phát nhạc
            window.addEventListener("click", startAudio, { once: true });
        }

        return ()=>{
            window.removeEventListener("click", startAudio);
        };
    },[src, isNotPlaying, volume]);

    
    useEffect(()=>{
        audioRef.current.volume= volume;
    }, [volume]);
    return [volume, setVolume, isNotPlaying];
}
export default AudioPlayer;