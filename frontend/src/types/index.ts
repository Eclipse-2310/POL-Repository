export type Language = 'en' | 'hi' | 'mr';

export interface CheckinSubmission {
  student_id: string;
  mood: number;
  sleep_hours: number;
  study_hours: number;
  isolation_level: string;
  attendance_pct: number;
  journal_note?: string;
  is_offline_sync?: boolean;
}

export interface CheckinResult {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  status_label: string;
  factors: string[];
  supportive_recommendation: string;
  is_emergency_triggered: boolean;
}

export interface HistoryPoint {
  date: string;
  mood: number;
  sleep_hours: number;
  study_hours: number;
  attendance_pct: number;
  isolation_level: string;
  wellbeing_score: number;
}

export interface TodayWellbeing {
  mood: number;
  sleep_hours: number;
  study_hours: number;
  attendance_pct: number;
  isolation_level: string;
  risk_score: number;
  status_label: string;
}

export interface StudentWellbeingData {
  student_id: string;
  today_wellbeing: TodayWellbeing;
  history_7d: HistoryPoint[];
  insights: string[];
  opt_in: boolean;
}

export interface RiskDistributionData {
  low: number;
  medium: number;
  high: number;
  low_pct: number;
  medium_pct: number;
  high_pct: number;
}

export interface CampusTrendPoint {
  date: string;
  avg_mood: number;
  avg_sleep: number;
  avg_study: number;
  avg_attendance: number;
  avg_wellbeing: number;
}

export interface AdminOverview {
  total_active_students: number;
  checkins_today: number;
  students_needing_attention: number;
  high_priority_alerts: number;
  risk_distribution: RiskDistributionData;
  trends_14d: CampusTrendPoint[];
}

export interface AlertItem {
  id: number;
  student_id: string;
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  top_factors: string[];
  trend: 'improving' | 'stable' | 'declining';
  status: 'pending' | 'reviewed' | 'counsellor_requested' | 'dismissed';
  suggested_action: string;
  notes?: string;
  last_checkin: string;
  created_at: string;
}

export interface StudentAdminDetail {
  student_id: string;
  department: string;
  year: number;
  current_risk_score: number;
  current_risk_level: string;
  top_factors: string[];
  trend: string;
  suggested_action: string;
  status: string;
  history_7d: HistoryPoint[];
}

export interface SocialNode {
  id: string;
  degree: number;
  centrality: number;
  clustering: number;
  isolation_score: number;
  status: string;
  x: number;
  y: number;
}

export interface SocialEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphSummary {
  total_nodes: number;
  total_edges: number;
  isolated_nodes_count: number;
  peripheral_nodes_count: number;
  connected_nodes_count: number;
  average_clustering: number;
  density: number;
  disclaimer: string;
}

export interface SocialGraphData {
  nodes: SocialNode[];
  edges: SocialEdge[];
  summary: GraphSummary;
}

export interface SupportResource {
  id: number;
  category: string;
  title: string;
  description: string;
  contact_info: string;
  availability: string;
  is_emergency: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  type: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isCrisis?: boolean;
  emergencyContacts?: EmergencyContact[];
  suggestedResources?: string[];
  time: string;
}
