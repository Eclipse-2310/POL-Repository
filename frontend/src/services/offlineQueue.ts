import { CheckinSubmission, CheckinResult } from '../types';
import { api } from './api';

const QUEUE_KEY = 'campusguard_offline_checkins';
const DRAFT_KEY = 'campusguard_checkin_draft';
const SIMULATE_OFFLINE_KEY = 'campusguard_simulated_offline';

export interface QueuedCheckin extends CheckinSubmission {
  queued_at: string;
}

export const offlineService = {
  isSimulatedOffline(): boolean {
    return localStorage.getItem(SIMULATE_OFFLINE_KEY) === 'true';
  },

  setSimulatedOffline(val: boolean) {
    localStorage.setItem(SIMULATE_OFFLINE_KEY, val ? 'true' : 'false');
    window.dispatchEvent(new Event('offline-status-changed'));
  },

  isOnline(): boolean {
    if (this.isSimulatedOffline()) return false;
    return navigator.onLine;
  },

  saveDraft(draft: Partial<CheckinSubmission>) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Failed to save draft locally', e);
    }
  },

  getDraft(): Partial<CheckinSubmission> | null {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  },

  enqueueCheckin(checkin: CheckinSubmission) {
    const queue: QueuedCheckin[] = this.getQueuedCheckins();
    queue.push({
      ...checkin,
      is_offline_sync: true,
      queued_at: new Date().toISOString()
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new Event('offline-queue-changed'));
  },

  getQueuedCheckins(): QueuedCheckin[] {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  async syncQueuedCheckins(): Promise<number> {
    if (!this.isOnline()) return 0;
    const queue = this.getQueuedCheckins();
    if (queue.length === 0) return 0;

    let syncedCount = 0;
    const remaining: QueuedCheckin[] = [];

    for (const item of queue) {
      try {
        await api.submitCheckin(item);
        syncedCount++;
      } catch (e) {
        remaining.push(item);
      }
    }

    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    window.dispatchEvent(new Event('offline-queue-changed'));
    return syncedCount;
  }
};
