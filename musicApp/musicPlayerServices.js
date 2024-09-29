import TrackPlayer, {Event, RepeatMode} from "react-native-track-player";

import { playListData, playListData as TrackPlayerData } from "./src/constants";

export async function setupPlayer(){
    let isSetup = false;

    try {
        // case if already setup
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    } catch (error) {
        // creating new track player.
        await TrackPlayer.setupPlayer();
        isSetup = true;
    }finally{
        return isSetup;
    }
}

export async function addTrack (){
    // addign tracks to the queue
    await TrackPlayer.add(playListData);
    // when we reach the last song repeat the queue
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}


// all events happening remotely
export async function playbackService (){
    // fired when user presses the pause button
    // it may be from a bluetooth device or from phone
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })
     
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })
}