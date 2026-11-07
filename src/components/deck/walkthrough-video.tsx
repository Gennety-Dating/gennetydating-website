"use client";

import { useEffect, useRef } from "react";
import { deckTracker } from "@/lib/deck-tracker";
import { WALKTHROUGH } from "@/lib/deck-content";
import styles from "./deck.module.css";

/** The iOS walkthrough. Records play/pause/seek, watched time and the furthest point reached. */
export function WalkthroughVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let last = 0;
    let quartile = 0;

    const percent = () => (element.duration ? (element.currentTime / element.duration) * 100 : 0);
    const onPlay = () => {
      last = element.currentTime;
      deckTracker.setVideoPlaying(true);
      deckTracker.track("video_play", undefined, Math.round(element.currentTime));
    };
    const onPause = () => {
      deckTracker.setVideoPlaying(false);
      if (!element.ended) deckTracker.track("video_pause", undefined, Math.round(element.currentTime));
    };
    const onTime = () => {
      const now = element.currentTime;
      const delta = now - last;
      last = now;
      if (!element.paused && delta > 0 && delta < 2) deckTracker.addVideoTime(delta * 1000, percent());
      const reached = Math.floor(percent() / 25);
      if (reached > quartile && reached < 4) {
        quartile = reached;
        deckTracker.track("video_progress", `${reached * 25}%`, reached * 25);
      }
    };
    const onSeeked = () => {
      last = element.currentTime;
      deckTracker.track("video_seek", undefined, Math.round(element.currentTime));
    };
    const onEnded = () => {
      deckTracker.setVideoPlaying(false);
      deckTracker.addVideoTime(0, 100);
      deckTracker.track("video_end");
    };
    const onFullscreen = () => {
      if (document.fullscreenElement === element) deckTracker.track("video_fullscreen");
    };

    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("timeupdate", onTime);
    element.addEventListener("seeked", onSeeked);
    element.addEventListener("ended", onEnded);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("timeupdate", onTime);
      element.removeEventListener("seeked", onSeeked);
      element.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  return (
    <div className={styles.videoFrame}>
      <video
        ref={video}
        className={styles.video}
        src={WALKTHROUGH.src}
        poster={WALKTHROUGH.poster}
        controls
        playsInline
        preload="metadata"
        aria-label="Walkthrough of the Gennety iOS app"
      />
    </div>
  );
}
