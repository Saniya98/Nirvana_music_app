import React, { useRef, useState, useEffect, useStateRef } from 'react';
import axios from 'axios'
import {fetchSongToPlayAPICall} from '../../redux/songs/songActions'
import { connect } from 'react-redux';
import './music-player.css'
const MusicPlayer = ({playerSong}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false   );
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [musicObj, setMusicObj] = useState("");

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value;
  };
  
 const handlePlay=()=>{
  if (typeof playerSong !== "undefined" && Object.keys(playerSong).length > 0) {
    setMusicObj(playerSong.playerSong)
  }
 }
//   useEffect(() => {
//     testLink()
//     // if(typeof playerSong !="undefined") 
//     // setMusicObj(playerSong.playerSong)
//     }, [])
    // useEffect(() => {
    //     testLink()
    //     if(typeof playerSong !="undefined") 
    //     setMusicObj(playerSong.playerSong)
    //     }, [playerSong])

    // const testLink=async()=>{
    //     try {
    //         let {data} = await axios.get('http://localhost:3000/songs/639d36f90714051adb426682');
    //         const blob = new Blob([data], {type: 'audio/mp3' });
    //         const url = URL.createObjectURL(blob);
    //         setMusicObj(data)
    //       } catch (error) {
    //       }
    // }
    useEffect(() => {
        handlePlay()
    }, [playerSong]);
    useEffect(() => {
      if(musicObj!==""){
        audioRef.current.play();
        setIsPlaying(true);
      }
  }, [musicObj]);
  useEffect(()=>{
    audioRef.current.pause();
      setIsPlaying(false);
  },[])
  
  return (
    <div className="music-player">
      <audio src={musicObj} ref={audioRef} />
      <button className="play-pause-button" onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button className="repeat-button" onClick={toggleRepeat}>
        {repeat ? 'Repeat On' : 'Repeat Off'}
      </button>
      <label for="musicplayer"></label>
      <input
      id="musicplayer"
        type="range"
        className="volume-control"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <progress className="progress-bar" value="0" max="100" />
    </div>
  );
};

const mapStateToProps = state => {
    return {
      playerSong : state.playerSong
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    //   fetchSongToPlayAPICall:(obj)=>dispatch(fetchSongToPlayAPICall(obj))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )((MusicPlayer))
