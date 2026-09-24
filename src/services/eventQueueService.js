import { openDB } from "idb";
import * as constants from "./constants";
import { getBaseURL } from "./analytics-service";
import { getEnvConfig } from "../utils/EnvUtils";

let isProcessing = false;

const dbPromise = openDB(constants.IDB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(constants.IDB_STORE_NAME)) {
      db.createObjectStore(constants.IDB_STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export const enqueueEvent = async (event) => {
  const db = await dbPromise;
  await db.add(constants.IDB_STORE_NAME, { payload: event, createdAt: Date.now() });
};

const getAllEvents = async () => {
  const db = await dbPromise;
  return db.getAll(constants.IDB_STORE_NAME);
};

const deleteEvent = async (id) => {
  const db = await dbPromise;
  await db.delete(constants.IDB_STORE_NAME, id);
};

export const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const events = await getAllEvents();

    if (!events || events.length === 0) {
      console.log("No events in queue, stopping.");
      return;
    }

    for (let ev of events) {
      const { id, payload } = ev;

      const config = {
        method: constants?.POST,
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(
          getBaseURL(getEnvConfig()?.env) + constants?.event_api,
          config
        );

        if (response.ok) {
          await deleteEvent(id);
        } else {
          console.error("Event failed, stopping queue for now.");
          break;
        }
      } catch (err) {
        console.error("Network error, stopping queue for now", err);
        break;
      }
    }

    const remaining = await getAllEvents();
    if (remaining.length > 0) {
      setTimeout(processQueue, 2000);
    }
  } finally {
    isProcessing = false;
  }
};

window.addEventListener("load", () => {
  processQueue();
});