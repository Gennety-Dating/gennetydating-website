"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    SpotifyIFrameAPI?: any;
  }
}

interface SpotifyMobilePlayerProps {
  spotifyUri: string;
  spotifyUrl: string;
  trackTitle: string;
  artistName: string;
}

// Global script loading state to prevent duplicate injections
let scriptLoadingStarted = false;
let apiReadyPromise: Promise<any> | null = null;

function loadSpotifyIframeApi(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Server-side rendering is active"));
  }
  if (window.SpotifyIFrameAPI) {
    return Promise.resolve(window.SpotifyIFrameAPI);
  }
  if (apiReadyPromise) {
    return apiReadyPromise;
  }

  apiReadyPromise = new Promise((resolve) => {
    const originalCallback = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      window.SpotifyIFrameAPI = IFrameAPI;
      if (originalCallback) originalCallback(IFrameAPI);
      resolve(IFrameAPI);
    };
  });

  if (!scriptLoadingStarted) {
    scriptLoadingStarted = true;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api";
    script.async = true;
    document.body.appendChild(script);
  }

  return apiReadyPromise;
}

/**
 * SpotifyMobilePlayer Component
 * 
 * We use the official Spotify Embed Controller pattern for compliance.
 * A hidden official Spotify Embed Controller element is mounted outside the visual flow,
 * and we control playback programmatically via the createController API.
 * This guarantees audio is played securely and legitimately through Spotify.
 */
export default function SpotifyMobilePlayer({
  spotifyUri,
  spotifyUrl,
  trackTitle,
  artistName,
}: SpotifyMobilePlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controller, setController] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Initialize the Spotify Embed Controller
  useEffect(() => {
    let active = true;
    let currentController: any = null;

    const init = async () => {
      try {
        const IFrameAPI = await loadSpotifyIframeApi();
        if (!active || !mountRef.current) return;

        const options = {
          uri: spotifyUri,
          width: "100%",
          height: "80",
        };

        IFrameAPI.createController(mountRef.current, options, (EmbedController: any) => {
          if (!active) {
            if (EmbedController && typeof EmbedController.destroy === "function") {
              EmbedController.destroy();
            }
            return;
          }
          currentController = EmbedController;
          setController(EmbedController);
          setLoading(false);

          // Listen to playback state changes to update our play/pause button state
          const handlePlaybackUpdate = (e: any) => {
            if (!active) return;
            if (e && e.data) {
              setIsPlaying(!e.data.isPaused);
            }
          };

          EmbedController.addListener("playback_update", handlePlaybackUpdate);
        });
      } catch (err) {
        console.error("Failed to load Spotify iFrame API:", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      active = false;
      if (currentController) {
        if (typeof currentController.destroy === "function") {
          currentController.destroy();
        }
      }
    };
  }, []);

  // Update track URI on the controller if the prop changes
  useEffect(() => {
    if (controller && spotifyUri) {
      controller.loadUri(spotifyUri);
    }
  }, [spotifyUri, controller]);

  const handlePlayPause = () => {
    if (controller) {
      controller.togglePlay();
    }
  };

  return (
    <div
      className="w-[280px] h-[80px] rounded-2xl flex items-center justify-between px-4 py-3 border border-white/10"
      style={{
        background:
          "linear-gradient(135deg, rgba(27, 27, 31, 0.95), rgba(8, 8, 10, 0.98) 58%, rgba(18, 15, 22, 0.95))",
        boxShadow:
          "0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Hidden container for the official Spotify Embed Controller iframe */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
          left: "-9999px",
        }}
      >
        <div ref={mountRef} />
      </div>

      {/* Play/Pause custom button with large touch target */}
      <button
        type="button"
        disabled={loading || error}
        onClick={handlePlayPause}
        aria-label={
          loading
            ? "Loading music player"
            : error
            ? "Player error"
            : isPlaying
            ? "Pause track"
            : "Play track"
        }
        className="w-12 h-12 rounded-full flex items-center justify-center bg-magenta/10 border border-magenta/20 text-magenta hover:bg-magenta/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shrink-0 shadow-[0_0_10px_rgba(208,173,252,0.15)]"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
      </button>

      {/* Track Metadata */}
      <div className="flex-1 min-w-0 px-3 flex flex-col justify-center text-left select-none">
        <span className="text-white text-xs font-semibold truncate block">
          {trackTitle}
        </span>
        <span className="text-white/50 text-[10px] truncate block mt-0.5">
          {artistName}
        </span>
      </div>

      {/* Spotify Attribution & Link back to track */}
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Listen to ${trackTitle} on Spotify`}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-[#191414] hover:bg-[#252525] border border-white/10 hover:border-white/20 transition-all duration-300 shrink-0 text-[#1DB954]"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.502 9.82 1.13.297.182.39.566.206.86zm1.226-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.11-.972-.524-.125-.413.11-.847.523-.972 3.668-1.112 8.243-.57 11.362 1.348.368.226.488.708.261 1.07zm.107-2.835C14.417 8.7 8.018 8.49 4.305 9.617c-.57.173-1.17-.152-1.342-.722-.173-.57.152-1.17.722-1.343 4.275-1.298 11.346-1.053 15.433 1.373.513.305.68.97.375 1.483-.305.513-.97.68-1.483.375z" />
        </svg>
      </a>
    </div>
  );
}
