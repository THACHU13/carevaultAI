export interface MedicalRecord {
  id: string;
  title: string;
  facility: string;
  provider: string;
  date: string;
  status: 'Verified' | 'Pending Review' | 'Draft';
  fileSize: string;
  source: string;
  encryption: string;
  summary: {
    text: string;
    clinicianApproved: boolean;
    reviewedBy?: string;
    accuracy: 'High' | 'Standard' | 'Experimental';
    medications: string[];
    diagnoses: string[];
    patientExplanation: string;
  };
  originalReportBlur: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  role: string;
  timestamp: string;
  justification?: string;
  status: 'SUCCESS' | 'DENIED';
  ipAddress: string;
}

export interface EmergencyProfile {
  name: string;
  dob: string;
  id: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: { name: string; dose: string; freq: string }[];
  summary: string;
  contacts: { name: string; relation: string; phone: string }[];
  gender?: string;
}

export interface HospitalRecord {
  id: string;
  hospitalName: string;
  patientName: string;
  diagnosis: string;
  visitedDate: string;
  provider: string;
  isGenerated: boolean;
  fileSize: string;
  medications: string[];
  diagnosesList: string[];
  summaryText: string;
  patientExplanation: string;
}

export type AppView = 'home' | 'records' | 'ai' | 'profile' | 'emergency' | 'verify' | 'prd' | 'current-drugs' | 'ai-drugs-predictor';
