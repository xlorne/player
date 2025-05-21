import React, {useEffect} from 'react';
import Player, {PlayerAction} from './player';
import {Button, Card, Input, Select, Space, Upload} from "antd";
import {PauseCircleOutlined, PlayCircleOutlined, UploadOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";

function App() {

    const playerRef = React.useRef<PlayerAction>(null);

    const [inputType, setInputType] = React.useState('input');
    const defaultUrl = 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4';
    const [url, setUrl] = React.useState('');
    const [playing, setPlaying] = React.useState(false);

    // 切换视频源时，暂停播放并重置
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setSourceUrl(url);
        }
        setPlaying(false);
    }, [url]);

    // 切换输入类型时，暂停播放并重置
    useEffect(() => {
        setUrl('');
        setPlaying(false);
    }, [inputType]);

    return (
        <div>
            <Card>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center',
                        marginBottom: 10
                    }}
                >
                    <Space.Compact>
                        <Select
                            style={{
                                width: "100px"
                            }}
                            defaultValue="input"
                            options={[
                                {value: 'input', label: '在线视频'},
                                {value: 'file', label: '本地视频'},
                            ]}
                            onChange={(e) => {
                                setInputType(e);
                            }}
                        />

                        {inputType === 'input' && (
                            <Input
                                value={url}
                                style={{
                                    width: "500px"
                                }}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                }}
                                addonAfter={(
                                    <a
                                        onClick={() => {
                                            setUrl(defaultUrl);
                                        }}
                                    >默认地址</a>
                                )}
                            />
                        )}

                        {inputType === 'file' && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center'
                            }}>
                                <Upload
                                    maxCount={1}
                                    showUploadList={false}
                                    style={{
                                        width: "500px"
                                    }}
                                    customRequest={async ({file, onSuccess}) => {
                                        const currentFile = file as RcFile;
                                        const fileUrl = URL.createObjectURL(currentFile);
                                        setUrl(fileUrl);
                                        //@ts-ignore
                                        onSuccess(
                                            {
                                                url: fileUrl,
                                                id: currentFile.uid,
                                                name: currentFile.name
                                            }
                                        )
                                    }}
                                >
                                    <Button icon={<UploadOutlined/>}>选择文件</Button>
                                </Upload>
                                <div>
                                    {inputType === 'file' && url}
                                </div>
                            </div>
                        )}
                    </Space.Compact>

                    {!playing && (
                        <PlayCircleOutlined
                            style={{
                                fontSize: '25px',
                                marginLeft: 20,
                                color:'#0f86e8'
                            }}
                            onClick={() => {
                                setPlaying(true);
                                playerRef.current?.play();
                            }}
                        />
                    )}

                    {playing && (
                        <PauseCircleOutlined
                            style={{
                                fontSize: '25px',
                                marginLeft: 20,
                                color:'#ea2a39'
                            }}
                            onClick={() => {
                                setPlaying(false);
                                playerRef.current?.stop();
                            }}
                        />
                    )}
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    <Player
                        width={"80vw"}
                        height={"80vh"}
                        playerAction={playerRef}/>
                </div>
            </Card>
        </div>
    );
}

export default App;
