import React, {useEffect, useRef} from 'react';
import XGPPlayer from 'xgplayer';
import 'xgplayer/dist/index.min.css';

export interface PlayerAction{
    setSrc: (url: string) => void;
    play: () => void;
    stop: () => void;
}

interface PlayerProps {
    width?: number | string;
    height?: number | string;
    playerAction?: React.Ref<PlayerAction>;
}

const Player: React.FC<PlayerProps> = (props) => {
    const playerRef = useRef<XGPPlayer | null>(null);

    const width = props.width || '100vw';
    const height = props.height || '100vh';

    useEffect(() => {
        playerRef.current = new XGPPlayer({
            id: 'player',
            plugins: [],
            width: width,
            height: height,
        });
        playerRef.current.start();
        return () => {
            playerRef.current && playerRef.current.destroy();
        };
    }, []);

    React.useImperativeHandle(props.playerAction,()=>{
        return {
            setSrc: (url: string) => {
                if (playerRef.current) {
                    playerRef.current.src = url;
                }
            },
            stop: () => {
                if (playerRef.current) {
                    playerRef.current.pause();
                }
            },
            play: () => {
                if (playerRef.current) {
                    playerRef.current.play();
                }
            },
        }
    },[]);

    return (
        <div
            style={{
                width: width,
                height: height
            }}
        >
            <div id="player"></div>
        </div>
    );
}

export default Player;
