import {
  CheckinSubmission,
  CheckinResult,
  StudentWellbeingData,
  AdminOverview,
  AlertItem,
  StudentAdminDetail,
  SocialGraphData,
  SupportResource,
  ChatMessage
} from '../types';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errText = await res.text();
    let errorDetail = `Request failed (${res.status})`;
    try {
      const parsed = JSON.parse(errText);
      errorDetail = parsed.detail || errorDetail;
    } catch {
      // keep fallback
    }
    throw new Error(errorDetail);
  }
  return res.json();
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse<{ status: string; service: string }>(res);
  },

  async submitCheckin(data: CheckinSubmission): Promise<CheckinResult> {
    const res = await fetch(`${API_BASE}/checkins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<CheckinResult>(res);
  },

  async getStudentWellbeing(studentId: string = 'CG-1042'): Promise<StudentWellbeingData> {
    const res = await fetch(`${API_BASE}/student/${studentId}/wellbeing`);
    return handleResponse<StudentWellbeingData>(res);
  },

  async getAdminOverview(): Promise<AdminOverview> {
    const res = await fetch(`${API_BASE}/admin/overview`);
    return handleResponse<AdminOverview>(res);
  },

  async getAdminAlerts(riskLevel?: string, statusFilter?: string): Promise<AlertItem[]> {
    const params = new URLSearchParams();
    if (riskLevel) params.append('risk_level', riskLevel);
    if (statusFilter) params.append('status_filter', statusFilter);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/admin/alerts${query}`);
    return handleResponse<AlertItem[]>(res);
  },

  async updateAlertAction(alertId: number, action: string, notes?: string) {
    const res = await fetch(`${API_BASE}/admin/alerts/${alertId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, notes }),
    });
    return handleResponse<{ success: boolean; message: string; status: string }>(res);
  },

  async getAdminStudentDetail(studentId: string): Promise<StudentAdminDetail> {
    const res = await fetch(`${API_BASE}/admin/student/${studentId}`);
    return handleResponse<StudentAdminDetail>(res);
  },

  async getSocialGraph(): Promise<SocialGraphData> {
    const res = await fetch(`${API_BASE}/admin/social-graph`);
    return handleResponse<SocialGraphData>(res);
  },

  async sendChatMessage(message: string, sessionId: string = 'demo-session') {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: sessionId }),
    });
    return handleResponse<{
      reply: string;
      is_crisis: boolean;
      suggested_resources: string[];
      emergency_contacts?: any[];
    }>(res);
  },

  async getResources(): Promise<SupportResource[]> {
    const res = await fetch(`${API_BASE}/resources`);
    return handleResponse<SupportResource[]>(res);
  },

  async resetDemoData() {
    const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    return handleResponse<{ success: boolean; message: string }>(res);
  }
};
