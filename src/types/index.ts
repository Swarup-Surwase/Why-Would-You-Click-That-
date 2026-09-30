export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'absurd';
  timestamp: string;
}

export interface MetricItem {
  label: string;
  value: string | number;
  subtext: string;
  change: string;
  isPositive: boolean;
  tooltip: string;
}

export interface ProgressItem {
  id: string;
  label: string;
  value: number;
  color: string;
  meaning: string;
}

export interface FilterState {
  query: string;
  learningMode: string;
  difficulty: string;
  contentType: string;
  aiConfidence: number;
  personalization: string;
  cognitiveLoad: string;
  semanticSimilarity: number;
  learningMomentum: string;
  recommendedBy: string;
  maybeFilter: boolean;
}

export type AIMode = 'quick' | 'deep' | 'smart' | 'advanced' | 'ultra' | 'experimental';

export interface ConfirmationStep {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  warningText?: string;
}
