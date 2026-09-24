import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getVehicleAudioUrl } from "../../../services/commonServices";
import { pause_icon, play_icon } from "../../../assets/SVGIcons/CommonIcons";
import { sendEvent } from "../../../services/analytics-service";

const VehicleAudioSummary = ({
  vehicleId,
  audioField,
  registration_number,
  oem,
  vehicle_type,
}) => {
  const { t } = useTranslation();

  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const trackedMilestones = useRef(new Set());

  const audioId = audioField?.fieldValue?.[0];

  const waveformBars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        height: [10, 14, 20, 28, 18, 12, 16, 24][index % 8],
      })),
    [],
  );

  useEffect(() => {
    const fetchAudio = async () => {
      if (!audioId) return;

      try {
        setIsLoading(true);

        const response = await getVehicleAudioUrl(vehicleId, audioId);
        const preSignedUrl = response?.data?.downloadPreSignedUrl;

        if (preSignedUrl) {
          setAudioUrl(preSignedUrl);
        }
      } catch (error) {
        console.error("Audio Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudio();
  }, [audioId, vehicleId]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleWaveformClick = (event) => {
    if (!duration || !audioRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickRatio = (event.clientX - rect.left) / rect.width;
    const seekTime = clickRatio * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleOnPlay = () => {
    setIsPlaying(true);

    if (!trackedMilestones.current.has("PLAY")) {
      trackedMilestones.current.add("PLAY");

      sendEvent({
        flowContext: "AUDIO_NUDGE_PLAY",
        action: "CLICK",
        source_page: window.location.pathname,
        vehicleId,
        registration_number,
        oem_name: oem,
        vehicle_type,
      });
    }
  };

  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    setCurrentTime(current);

    if (duration > 0) {
      const percent = (current / duration) * 100;
      const milestones = [25, 50, 75, 90];

      milestones.forEach((milestone) => {
        if (percent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);

          const flowContext =
            milestone === 90 ? "AUDIO_NUDGE_COMPLETE" : "AUDIO_NUDGE_PROGRESS";

          sendEvent({
            flowContext,
            action: "CLICK",
            source_page: window.location.pathname,
            vehicleId,
            registration_number,
            oem_name: oem,
            vehicle_type,
            field_name: `${milestone}%`,
          });
        }
      });
    }
  };

  const handleOnEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    trackedMilestones.current.clear();
  };

  if (!audioId) return null;

  return (
    <div
      className="card shadow-sm border-0 rounded-4"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="card-body p-4">
        <h6
          className="fw-bold mb-4"
          style={{
            fontSize: "16px",
            color: "#212121",
            margin: 0,
          }}
        >
          {t("VEHICLE_DETAILS.HEAR_FROM_THE_EXPERT")}
        </h6>

        {isLoading ? (
          <div className="d-flex align-items-center gap-3">
            <div
              className="placeholder-glow"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#f1f3f5",
                flexShrink: 0,
              }}
            />

            <div className="flex-grow-1">
              <div
                className="placeholder-glow rounded-pill mb-2"
                style={{
                  height: "20px",
                  background: "#f1f3f5",
                }}
              />

              <div
                className="placeholder-glow rounded"
                style={{
                  width: "90px",
                  height: "12px",
                  background: "#f1f3f5",
                }}
              />
            </div>
          </div>
        ) : audioUrl ? (
          <>
            <audio
              ref={audioRef}
              src={audioUrl}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
              onTimeUpdate={handleTimeUpdate}
              onPlay={handleOnPlay}
              onPause={() => setIsPlaying(false)}
              onEnded={handleOnEnded}
            />

            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                onClick={togglePlayPause}
                className="border-0 d-flex align-items-center justify-content-center"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#7225f5",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px #7225f5",
                  transition: "all 0.2s ease",
                }}
              >
                {isPlaying ? pause_icon : play_icon}
              </button>

              <div
                className="flex-grow-1"
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  onClick={handleWaveformClick}
                  style={{
                    cursor: "pointer",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    overflow: "hidden",
                  }}
                >
                  {waveformBars.map((bar, index) => {
                    const progress = duration > 0 ? currentTime / duration : 0;
                    const active = progress >= index / waveformBars.length;

                    return (
                      <div
                        key={bar.id}
                        style={{
                          width: "5px",
                          minWidth: "5px",
                          height: `${bar.height}px`,
                          borderRadius: "999px",
                          backgroundColor: active ? "#7225F5" : "#E5D5FF",
                          opacity: 1,
                          transition: "all 0.25s ease",
                          transform: active ? "scaleY(1.05)" : "scaleY(1)",
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    marginTop: "4px",
                    fontWeight: 500,
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            <div
              className="mt-4"
              style={{
                fontSize: "15px",
                lineHeight: "22px",
                color: "#6B7280",
              }}
            >
              {t("VEHICLE_DETAILS.EXPERT_AUDIO_SUB")}
            </div>
          </>
        ) : (
          <div
            className="text-muted"
            style={{
              fontSize: "14px",
            }}
          >
            {t("COMMON.SOMETHING_WENT_WRONG", "Unable to load audio")}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAudioSummary;
