import React from 'react';
import Player, {PlayerAction} from './player';

function App() {

    const playerRef = React.useRef<PlayerAction>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            playerRef.current?.setSrc(url);
            playerRef.current?.play();
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'aqua',
                width: '100vw',
                height: '100vh'
            }}
        >
            <div
                style={{position: 'absolute', top: 10, left: 10, zIndex: 10}}
            >
                <input type="file"
                       accept="video/*"
                       onChange={handleFileChange}
                />
                <button
                    onClick={() => {
                        playerRef.current?.play();
                    }}>
                    play
                </button>
                <button
                    onClick={() => {
                        playerRef.current?.stop();
                    }}>
                    stop
                </button>
            </div>


            <Player playerAction={playerRef}/>
        </div>
    );
}

export default App;
