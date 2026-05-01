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

        //Trình duyệt chặn autoplay, cần phải có tương tác.
        const startAudio = () => {
            audio.play().then(() => {
                setIsNotPlaying(false);
            }).catch((err) => {
                console.error("Lỗi phát nhạc:", err);
            });
        };
        // Lắng nghe sự kiện click trên toàn bộ cửa sổ để bắt đầu phát nhạc
        window.addEventListener("click", startAudio, { once: true });
        return ()=>{
            window.removeEventListener("click", startAudio);
            
        };
    },[src]);

    
    useEffect(()=>{
        audioRef.current.volume= volume;
    }, [volume]);
    return [volume, setVolume, isNotPlaying];
}
export default AudioPlayer;