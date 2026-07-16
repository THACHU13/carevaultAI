import { MedicalRecord, ActivityLog, EmergencyProfile, HospitalRecord } from './types';

export const initialRecords: MedicalRecord[] = [
  {
    id: 'CV-88210-XC',
    title: 'Annual Physical - Apollo Hospital',
    facility: 'Apollo Hospital',
    provider: 'Dr. Robert Aristhone',
    date: 'October 14, 2023',
    status: 'Verified',
    fileSize: '2.4 MB',
    source: 'Direct API Sync',
    encryption: 'AES-256',
    summary: {
      text: 'Summary of findings indicates Normal Vitals overall. However, lipid panel reveals LDL cholesterol slightly elevated (132 mg/dL). Metabolic function is within optimal ranges. No acute distress noted during examination.',
      clinicianApproved: true,
      reviewedBy: 'Dr. Sarah Chen',
      accuracy: 'High',
      medications: ['Lisinopril 10mg', 'Vitamin D3 2000IU'],
      diagnoses: ['Mild Hyperlipidemia', 'Essential Hypertension'],
      patientExplanation: 'Your tests look good! The only thing to watch is your "bad" cholesterol (LDL), which is just a little high. Your doctor suggested eating more fiber and staying active to help lower it. You also have a prescription for Lisinopril for your blood pressure.'
    },
    originalReportBlur: true
  },
  {
    id: 'CV-44211-OP',
    title: 'Complete Blood Count (CBC)',
    facility: 'LabCorp Main Plaza',
    provider: 'Dr. Allison Vance',
    date: 'October 24, 2023',
    status: 'Verified',
    fileSize: '1.2 MB',
    source: 'Patient Upload',
    encryption: 'AES-256',
    summary: {
      text: 'White blood cell count, red blood cell count, and platelet count all fall within standard physiological ranges. Hemoglobin levels are stable at 14.2 g/dL. No anomalies detected.',
      clinicianApproved: true,
      reviewedBy: 'Dr. Allison Vance',
      accuracy: 'High',
      medications: [],
      diagnoses: ['Normal Hematology'],
      patientExplanation: 'Your blood counts are completely normal! Your body is producing healthy amounts of oxygen-carrying red blood cells, infection-fighting white blood cells, and blood-clotting platelets.'
    },
    originalReportBlur: true
  },
  {
    id: 'CV-90123-XR',
    title: 'Chest X-Ray - Posterior',
    facility: 'St. Jude Medical Center',
    provider: 'Dr. Marcus Vance',
    date: 'September 15, 2023',
    status: 'Verified',
    fileSize: '12.8 MB',
    source: 'Hospital Portal',
    encryption: 'AES-256',
    summary: {
      text: 'Lungs are clear bilaterally without consolidated infiltration, pleural effusion, or pneumothorax. Cardiomediastinal contour is normal. Bony thorax is intact.',
      clinicianApproved: true,
      reviewedBy: 'Dr. Marcus Vance',
      accuracy: 'High',
      medications: [],
      diagnoses: ['Unremarkable Chest Radiograph'],
      patientExplanation: 'Your chest X-ray looks completely clear! Your lungs show no signs of infection or fluid, and your heart shape and ribs are normal.'
    },
    originalReportBlur: true
  }
];

export const emergencyProfile: EmergencyProfile = {
  name: 'V Rahul',
  dob: '07/24/1988',
  id: 'CV-88122-PT',
  gender: 'Male',
  bloodType: 'O Negative (O-)',
  allergies: ['Penicillin', 'Latex', 'Peanuts'],
  conditions: ['Type 2 Diabetes', 'Hypertension', 'Chronic Asthma'],
  medications: [
    { name: 'Metformin', dose: '500mg', freq: 'BID (Twice daily)' },
    { name: 'Lisinopril', dose: '10mg', freq: 'QD (Once daily)' },
    { name: 'Albuterol Inhaler', dose: '90 mcg', freq: 'PRN (As needed)' }
  ],
  summary: 'Patient was admitted 3 months ago for acute diabetic ketoacidosis. Rahul has an Advanced Directive on file which specifies "No Intubation". Allergic reaction to Penicillin is anaphylactic. Immediate stabilization should focus on glucose monitoring and respiratory support via nebulizer.',
  contacts: [
    { name: 'Sarah Rahul', relation: 'Spouse / Primary Proxy', phone: '+1 (555) 438-2991' },
    { name: 'Dr. Aravind Kumar', relation: 'Primary Physician', phone: '+1 (555) 890-3412' }
  ]
};

export const initialHospitalRecords: HospitalRecord[] = [
  {
    id: 'HOSP-APOLLO-01',
    hospitalName: 'Apollo Hospital',
    patientName: 'V Rahul',
    diagnosis: 'Subacute Bronchitis with Mild Asthma Flare-up',
    visitedDate: 'June 12, 2024',
    provider: 'Dr. Robert Aristhone',
    isGenerated: false,
    fileSize: '1.8 MB',
    medications: ['Budesonide 200mcg Inhaler', 'Levocetirizine 5mg'],
    diagnosesList: ['Subacute Bronchitis', 'Mild Asthma Exacerbation'],
    summaryText: 'Patient V Rahul presented with a persistent hacking cough for 14 days accompanied by mild chest tightness and wheezing. Clinical examination reveals bilateral expiratory wheezes. Diagnosed with Subacute Bronchitis with mild asthmatic flare-up. Advised daily inhaled corticosteroid therapy (Budesonide 200mcg BID) for airway inflammation control and Levocetirizine for allergic triggers.',
    patientExplanation: 'You were diagnosed with mild bronchitis and a slight asthma flare-up. To help clear your lungs and reduce chest tightness, the doctor prescribed a Budesonide inhaler to use twice daily and Levocetirizine to manage any allergic coughing.'
  },
  {
    id: 'HOSP-ACS-02',
    hospitalName: 'ACS Hospital',
    patientName: 'V Rahul',
    diagnosis: 'Gastroesophageal Reflux Disease (GERD) & Mild Antral Gastritis',
    visitedDate: 'April 05, 2024',
    provider: 'Dr. Allison Vance',
    isGenerated: false,
    fileSize: '2.1 MB',
    medications: ['Pantoprazole 40mg', 'Sucralfate Suspension 10ml'],
    diagnosesList: ['GERD', 'Mild Antral Gastritis'],
    summaryText: 'V Rahul evaluated for severe postprandial retrosternal burning (heartburn) and epigastric discomfort. Upper endoscopy reveals mild mucosal erythema in the gastric antrum consistent with antral gastritis, and lower esophageal sphincter laxity. Diagnosed with GERD and mild gastritis. Initiated Pantoprazole 40mg QD before breakfast for 30 days and Sucralfate suspension as needed for symptomatic mucosal lining coating.',
    patientExplanation: 'The doctor found mild acid reflux and stomach irritation (gastritis). To help heal your stomach lining and stop heartburn, you have been prescribed Pantoprazole (to take once daily before breakfast) and a Sucralfate liquid to coat your stomach when needed.'
  },
  {
    id: 'HOSP-KAUVERY-03',
    hospitalName: 'Kauvery Hospital',
    patientName: 'V Rahul',
    diagnosis: 'Type 2 Diabetes Mellitus & Stage 1 Essential Hypertension',
    visitedDate: 'January 18, 2024',
    provider: 'Dr. Marcus Vance',
    isGenerated: false,
    fileSize: '1.5 MB',
    medications: ['Metformin 500mg (BID)', 'Lisinopril 10mg (QD)'],
    diagnosesList: ['Type 2 Diabetes Mellitus', 'Stage 1 Hypertension'],
    summaryText: 'Routine diabetic care and metabolic check-up for V Rahul. Epigastric and systemic vitals show blood pressure elevated at 138/88 mmHg. HbA1c lab returns at 6.9%, showing stable pre-diabetes/early diabetic range. Diagnosed with Stage 1 Essential Hypertension and Type 2 Diabetes Mellitus. Optimized therapeutic regimen with Metformin 500mg twice daily and Lisinopril 10mg once daily. Recommend dietary sodium restriction (<2000mg/day) and low glycemic diet.',
    patientExplanation: 'During your routine health check-up, your blood pressure was slightly high (138/88) and your blood sugar level (HbA1c of 6.9%) shows mild diabetes. To keep both safe, the doctor recommends continuing Metformin twice daily for blood sugar and Lisinopril once daily for your blood pressure, alongside a low-sodium, low-sugar diet.'
  }
];

export const initialLogs: ActivityLog[] = [
  {
    id: 'TXN-4882-EM-99',
    action: 'BREAK-GLASS ACCESS',
    actor: 'Dr. Aravind Kumar',
    role: 'Emergency Room Physician',
    timestamp: '2026-07-14T08:14:02Z',
    justification: 'Emergency life-safety event triggered. Patient unconscious with respiratory distress.',
    status: 'SUCCESS',
    ipAddress: '192.168.42.105'
  },
  {
    id: 'TXN-4112-RD-04',
    action: 'RECORD RETRIEVAL',
    actor: 'Dr. Sarah Chen',
    role: 'Treating Physician',
    timestamp: '2026-07-14T06:45:11Z',
    justification: 'Informed clinical consent granted by patient for annual checkup.',
    status: 'SUCCESS',
    ipAddress: '10.22.41.98'
  },
  {
    id: 'TXN-9023-UP-12',
    action: 'REPORT UPLOAD & AI SUMMARIZE',
    actor: 'CareVault OCR Pipeline',
    role: 'System Service',
    timestamp: '2026-07-13T23:12:44Z',
    status: 'SUCCESS',
    ipAddress: '127.0.0.1'
  },
  {
    id: 'TXN-3829-AD-88',
    action: 'RECORDS SEARCH',
    actor: 'Dr. James Smith',
    role: 'Unassigned Practitioner',
    timestamp: '2026-07-13T14:22:10Z',
    justification: 'Search without active treatment consent.',
    status: 'DENIED',
    ipAddress: '172.16.254.12'
  }
];

export const prdData = [
  {
    id: 'goals',
    title: '1. Goals & Stakeholders',
    content: `
### 1.1 Primary Stakeholder Needs

*   **Patients (Data Owners):**
    *   *Needs:* Absolute control over data sharing, simple access to complex reports, zero-knowledge security guarantees, and portability across different hospital networks.
    *   *Key Pain Points:* Fragmented historical records, impenetrable medical jargon, risk of credential leaks, and lack of clarity on who has viewed their sensitive data.
*   **Hospitals & Clinics (Data Sources):**
    *   *Needs:* High-throughput secure channels for report pushing, zero storage liability, compliance alignment (HIPAA, GDPR), and standard API endpoints.
    *   *Key Pain Points:* High integration cost with old EMRs, liability of storing unencrypted PHI, and difficulty in cross-sharing records.
*   **Doctors & Clinicians (Data Consumers):**
    *   *Needs:* Sub-second record loading, concise AI-generated summaries mapping to raw findings, clear clinician sign-off state, and simple break-glass flows.
    *   *Key Pain Points:* Clinical review fatigue, untrustworthy AI hallucinations, and critical lack of patient histories in emergency scenarios.
*   **Emergency Responders (Life Savers):**
    *   *Needs:* Zero-friction emergency lookup returning life-critical bio-stats, allergies, and active medications in under 3 seconds.
    *   *Key Pain Points:* Zero patient responsiveness, lack of active internet/credential tokens, and severe danger of administering contraindicated treatments.
*   **System Administrators (Security & Compliance Officers):**
    *   *Needs:* 100% immutable tamper-proof activity logs, real-time alert triggers for access violations, and automatic encryption key rotation monitoring.
    *   *Key Pain Points:* High cost of manual security audits, retroactively altered log files, and delayed notice of system breaches.

### 1.2 Regulatory Compliance Matrix

| Regulation | Scope Requirement | CareVault AI Implementation |
| :--- | :--- | :--- |
| **HIPAA Security Rule** | Technical Safeguards (Access, Transmission, Integrity) | AES-256-GCM symmetric encryption for records, mTLS inside cluster, immutable SHA-256 hash-chaining for access logs. |
| **HIPAA Privacy Rule** | Minimum Necessary Disclosure | Emergency view strips details down to blood type, active allergies, conditions, and active medications. |
| **GDPR (Article 9)** | Processing of Special Categories of Data (Consent) | Revocable, fine-grained, date-bounded cryptographic consent tokens, stored as FHIR \`Consent\` resources. |
| **GDPR (Article 17)** | Right to Erasure vs. Medical Retention | Logical anonymization for statistical analytics, and database separation of clinical indices from PII vault. |
| **Aadhaar Act 2016** | Masking & Vaulting Regulations (UIDAI) | Zero plaintext storage of Aadhaar numbers. CareVault queries third-party licensed KUA gateways and maps matches to salted hashes. |
| **DPDP Act 2023** | Consent Manager Framework | Consent artifacts are fully viewable, editable, and auditable in real-time by the data principal (patient). |
    `
  },
  {
    id: 'architecture',
    title: '2. System Architecture & Standards',
    content: `
### 2.1 Suggested Tech Stack

*   **Frontend Client:** React 19 + TypeScript + Tailwind CSS 4 + Vite (optimized for lightweight iframe execution and rapid cold starts).
*   **API Gateway & Ingress:** Kong API Gateway (or AWS API Gateway) with rate-limiting, WAF (Web Application Firewall), and active JWT signature checks.
*   **Clinical Backend Core:** Node.js (NestJS) microservices or Java (Spring Boot) handling FHIR translation, validation, and consent enforcement.
*   **Identity Vault Service:** Isolated database storing demographic data with envelope encryption, returning synthetic UUID keys to downstream systems.
*   **Cryptographic Vault:** HashiCorp Vault (or AWS KMS / Azure Key Vault) for FIPS 140-2 Level 3 compliant hardware security modules (HSMs).
*   **Native EMR Store:** HAPI FHIR Server facade layered on PostgreSQL, optimizing queries against standardized JSON structures.
*   **Object Storage Repository:** AWS S3 (or Google Cloud Storage) with SSE-KMS server-side envelope encryption and Object Lock (WORM) enabled for medical PDFs.
*   **AI Orchestrator Pipeline:** Python (FastAPI) async pipeline managing Document AI/Textract OCR queues, PyTorch NER transformers, and BAA-covered Claude/Gemini API pipelines.

### 2.2 End-to-End Cryptographic Data Flow

1.  **Ingestion:** Hospital Client requests a signed upload URL → API Gateway validates Doctor JWT role.
2.  **Upload:** Client posts encrypted file chunk to Object Store. The upload triggers a secure S3 bucket notification event.
3.  **Processing:** Document pipeline reads from Event Queue → OCR reads PDF → Medical NER parses text into discrete anatomical tokens.
4.  **AI Summarization:** Private LLM endpoint takes NER tokens, formats clinical and patient summaries, and creates a pending FHIR \`DocumentReference\`.
5.  **Veto Check:** Treating physician reviews the draft, approves or edits, committing the signed transaction to the database.
6.  **Symmetric Storage:** File is stored using unique envelope Data Encryption Key (DEK) encrypted with KMS Key Encryption Key (KEK).

### 2.3 Interoperability & FHIR Standards

CareVault strictly matches the clinical information to standardized **FHIR Release 4 (R4)** schemas:
*   \`Patient\`: Core demographic identity (linked via UUID, strictly de-identified from national database IDs).
*   \`Practitioner\`: Clinician credentials, hospital affiliation, and verified licensing status.
*   \`DocumentReference\`: Storage pointer to the original PDF, file hash, and encryption metadata block.
*   \`AllergyIntolerance\`: Critical allergy markers used for clinical safety and Emergency screen feeds.
*   \`MedicationStatement\`: Current medications list, structured with RxNorm/SNOMED-CT identifiers.
*   \`Consent\`: Legal agreement capturing the "Who, What, When, and Why" of permitted data access.
    `
  },
  {
    id: 'modules',
    title: '3. Core Module Specifications',
    content: `
### 3.1 Patient Registration Module
*   **Scope:** User self-onboarding portal verifying identities via multi-factor tokens (mobile OTP).
*   **Inputs:** Legal Name, Date of Birth, Gender, Mobile Number, Email (Optional).
*   **Outputs:** Created FHIR \`Patient\` resource, persistent Client Auth profile, default Consent policy set.
*   **Access Control:** Rate-limited public route. Identity verification block is mandatory before generating any DB keys.
*   **Critical APIs:** \`POST /api/v1/patient/register\` (demographics), \`POST /api/v1/patient/verify-otp\`.

### 3.2 Hospital Registration Module
*   **Scope:** Secure B2B registration portal with document uploads for provider validation.
*   **Inputs:** Facility Name, License Certificate, Administrator details, Organization Type.
*   **Outputs:** Verified FHIR \`Organization\` resource, generated Org Admin credentials, cryptographic namespace.
*   **Access Control:** Manual verification flow. Approved status required before issuing any staff-invite tokens.
*   **Critical APIs:** \`POST /api/v1/hospital/register\`, \`POST /api/v1/hospital/{id}/verify\`.

### 3.3 Doctor Login & MFA Module
*   **Scope:** Strict clinician session management incorporating two-factor validation.
*   **Inputs:** Professional Licensing Credentials, Email/ID, Password + Mobile Authenticator TOTP.
*   **Outputs:** Short-lived JWT Session Token (15m expiry) with locked Organization scopes.
*   **Access Control:** Global MFA mandate. Adaptive rate-limiting triggers account lockouts after 5 failed attempts.
*   **Critical APIs:** \`POST /api/v1/auth/login\`, \`POST /api/v1/auth/mfa/verify\`.

### 3.4 Medical Report Upload Module
*   **Scope:** Ingestion engine for scanned clinical reports and diagnostic imagery.
*   **Inputs:** Diagnostic File (PDF, JPEG, DICOM), Patient ID, Encounter Reference, Submitter ID.
*   **Outputs:** Encrypted File URI, processing pipeline Ticket ID, pending FHIR document profile.
*   **Access Control:** REST client restricted to active treating clinicians with verified active Consent relationships.
*   **Critical APIs:** \`POST /api/v1/records/upload\` (multipart), \`GET /api/v1/records/upload/status/{ticketId}\`.

### 3.5 Secure Record Storage Module
*   **Scope:** Application-level envelope encryption module mediating read/write events to storage.
*   **Inputs:** Raw clinical payloads, KMS KEK reference.
*   **Outputs:** Cyphertext JSON payloads, Encrypted DEK blocks.
*   **Access Control:** Internal microservice only. Direct DB access strictly blocked for external clients.
*   **Critical APIs:** Internal RPC \`SecureStore.write()\`, \`SecureStore.read()\`.

### 3.6 Patient Record Retrieval (OTP / Aadhaar Flow)
*   **Scope:** Dynamic ad-hoc record retrieval driven by patient consent OTP tokens.
*   **Flow:**
    1. Clinician enters Patient Phone or Masked Aadhaar identifier.
    2. System posts to Aadhaar KUA / Telecom gateway. Patient receives secure SMS OTP.
    3. Patient inputs OTP on clinical terminal or mobile app.
    4. Upon successful validation, the system presents a granular Consent interface (e.g., share "Apollo Hospital report only for 24 hours").
    5. Temporary access token (JWT, 24h) is minted.
*   **Access Control:** Only valid matching OTP releases the database records. Identity keys are hashed with high-entropy salt before indexing.
*   **Critical APIs:** \`POST /api/v1/retrieval/initiate\`, \`POST /api/v1/retrieval/verify-otp\`.

### 3.7 AI-Based Summarization Module
*   **Scope:** Asynchronous processing pipeline generating high-accuracy clinical summaries.
*   **Inputs:** Raw OCR strings, parsed NER nodes.
*   **Outputs:** Draft Clinician Summary, Draft Patient Explanation, flagged anomaly markers.
*   **Access Control:** Pipeline microservice restricted; drafts are locked to original medical team until approved.
*   **Critical APIs:** \`POST /api/v1/ai/summarize\`, \`POST /api/v1/ai/summary/{id}/approve\` (clinician review veto).

### 3.8 Emergency Access Dashboard Module ("Break-Glass")
*   **Scope:** Unrestricted life-saving data access module bypassed only under strict logging guidelines.
*   **Inputs:** Emergency Responder identity token, Patient Identification identifier, Incident Justification string.
*   **Outputs:** Standard minimum critical dataset (Blood type, active allergies, critical conditions, active meds).
*   **Access Control:** Open to verified clinical accounts with "Emergency Responder" attributes. Prompts real-time SMS alert to patient and triggers immediate compliance review.
*   **Critical APIs:** \`POST /api/v1/emergency/break-glass\`, \`GET /api/v1/emergency/critical-profile/{patientId}\`.

### 3.9 Admin & Auditing Module
*   **Scope:** Central logging query portal, audit trails monitor, and system lifecycle configurations.
*   **Inputs:** Search queries (scoped by actor, date, IP, action), User suspend signals, Key rotation triggers.
*   **Outputs:** Formatted audit trails, compliance readiness documents, revoked account locks.
*   **Access Control:** Restricted to Platform Security Admin roles; all admin actions are double-signed and logged to immutable storage.
*   **Critical APIs:** \`GET /api/v1/admin/audit-logs\`, \`POST /api/v1/admin/users/{id}/suspend\`.
    `
  },
  {
    id: 'ai-ml',
    title: '4. AI/ML Core Components',
    content: `
### 4.1 Hybrid OCR Pipeline
*   **Technology:** Integration with Cloud Document AI APIs (AWS Textract or Google Document AI) for scanning handwritings and structured clinical tables, with a self-hosted Tesseract fallback for offline operations.
*   **Confidence Scoring:** Each character is evaluated. Scores below 85% generate a visual highlights overlay in the Clinician Review Portal, directing the human eye to potential transcription errors.

### 4.2 Medical Named Entity Recognition (NER)
*   **Engine:** Spacy Transformer models fine-tuned with Clinical Vocabularies (scispaCy, MedCAT).
*   **Extracted Classes:**
    *   \`MEDICATIONS\` (linked to RxNorm, checking dosages e.g., "Lisinopril 10mg").
    *   \`DIAGNOSES\` (linked to ICD-10 medical coding registries).
    *   \`LABS\` (mapped to LOINC, capturing tests, values, reference ranges).
    *   \`ANATOMY\` & \`PROCEDURES\` (linked to SNOMED-CT).

### 4.3 Grounded Summarization & Safety Guards
*   **Safety Prompts:** Direct LLM instructions strictly forbidding diagnostic opinions or pharmaceutical recommendations.
*   **Hallucination Checkers (Fact Verification):** High-efficiency pipeline cross-compares every entity in the generated summary text against the lists of raw NER-extracted facts. If the LLM generates a medication or condition not found in the raw facts, the summary is instantly blocked and thrown to an administrative review queue.
*   **Clinician Veto Design:** Zero summaries are shared with patients or added to historical views without an active clinician logging into the system, reviewing the text, and clicking **Approve**.
    `
  },
  {
    id: 'security',
    title: '5. Security, Privacy & Compliance Controls',
    content: `
### 5.1 Access Control Matrix

| Role | Demographics | General Records | High-Sensitivity (Mental/HIV) | Emergency Data | Admin Logs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Patient** | View & Edit | View & Self-Upload | View & Toggle Cryptographic Lock | View | No |
| **Treating Doctor** | View | View & Upload (Consent-locked) | Blocked (Requires explicit secondary OTP) | View | No |
| **Emergency Responder** | View | Blocked | Blocked | View (Read-Only) | No |
| **Hospital Admin** | View Metadata | Blocked | Blocked | Blocked | View (Org Scoped) |
| **Security Officer** | View Logs Only | Blocked | Blocked | Blocked | Read & Export All |

### 5.2 Encryption at Rest and Transit
*   **In Transit:** Force TLS 1.3 with Perfect Forward Secrecy. Internally, services must communicate using mTLS with certificate authority checks (using Linkerd or Istio).
*   **At Rest:** Data is written using AES-256-GCM. Clinical data inside databases is encrypted at the row level using keys generated from the patient's individual cryptographic salt, making mass decryption highly impractical for attackers.
*   **Key Rotation:** Envelope encryption keys are automatically rotated every 90 days. Every single report is protected by a separate key, allowing selective re-keying or deletion (cryptographic shredding).

### 5.3 Non-Repudiation Activity Auditing & SIEM
*   Every API transaction registers a log payload featuring: Actor UUID, Event Type, Target Patient UUID, Client IP, Hash of current DB block, and Event Timestamp.
*   Logs are indexed to an isolated open-search cluster with zero delete/update access.
*   Anomaly engines run real-time heuristics checking:
    *   *Volume Spikes:* Doctor downloading more than 10 medical records in 5 minutes.
    *   *Geographic Hop:* User authenticating from Munich 15 minutes after logging into New Delhi.
    *   *Scope Mismatch:* Unassigned practitioner attempting queries on high-sensitivity categories.
    `
  },
  {
    id: 'privacy',
    title: '6. Privacy-Preserving Design',
    content: `
### 6.1 Strict Data Segregation
*   **PII Vault Separation:** Demographic records (PII) are stored in a completely distinct, firewalled database from Clinical Records (PHI). They are bound only via synthetic UUID tokens.
*   **Zero-Knowledge Principles:** All patient data can be encrypted client-side using WebCrypto keys derived from the patient's master password before uploading. CareVault servers serve as blind, zero-knowledge storage hosts, ensuring even system admins cannot read the raw data files without the patient's password.

### 6.2 Granular Consent & Revocation Engine
*   Consent is not an "All-or-Nothing" setting. Patients can authorize specific hospitals to read only specific diagnostic files (e.g., Blood tests only) for defined durations.
*   At any moment, patients can click **Revoke Access** on their dashboard, which cryptographic shredding immediately enforces by rotating or deleting the dedicated decryption key assigned to that organization's token.
*   Anonymization engines automatically strip all demographic records when exporting diagnostic profiles for hospital analytics or training clinical OCR models.
    `
  },
  {
    id: 'nfr',
    title: '7. Non-Functional Requirements',
    content: `
### 7.1 Performance, Scalability & Availability Targets
*   **API Response Time:** p95 latency for structured record loads < 300ms. p99 < 800ms.
*   **AI Pipeline SLA:** OCR text extraction + NER parse completed in < 60s per page.
*   **System Availability:** Core retrieval systems target **99.99%** uptime (using Multi-AZ databases and geo-redundant clusters).
*   **Disaster Recovery SLA:**
    *   *Recovery Point Objective (RPO):* ≤ 15 Minutes (continuous data replication).
    *   *Recovery Time Objective (RTO):* ≤ 1 Hour (fully automated secondary region DNS failover).

### 7.2 Backup, Failover & Business Continuity
*   Hourly incremental snapshots of PostgreSQL databases, backed up into cross-region S3 buckets with automatic lifecycle policies.
*   Continuous active-active health checking across separate cloud availability zones.
*   Periodic automatic "Chaos Engineering" drills (e.g., simulating immediate database loss in Zone A to verify instant failover mechanics without active user connection losses).
    `
  },
  {
    id: 'roadmap',
    title: '8. MVP & Phased Roadmap',
    content: `
### 8.1 MVP Release Scope (Months 1 - 4)
*   **Core Portal Framework:** Basic patient self-registration and doctor login with email-based MFA.
*   **Secure Document Upload:** Basic drag-and-drop report ingestion (PDFs up to 10MB) in S3.
*   **AI Pipeline V1:** Google Textract OCR parsing and structured clinical-summary LLM generations.
*   **Clinician Review Queue:** Desktop interface for doctors to review, edit, and approve draft summaries.
*   **OTP Verification Engine:** SMS OTP verification flow on patient phone lookup to release historical records.
*   **Secure Storage V1:** Server-side KMS AES-256 encryption.

### 8.2 Subsequential Enhancement Roadmap

#### Phase 1: Security & Identity Expansion (Months 5 - 8)
*   Integrate government identities directly (Aadhaar / ABDM implementation).
*   Launch full Emergency "Break-Glass" active dashboard with real-time alerting.
*   Deploy HashiCorp Vault for envelope-level cryptographic key management.
*   Develop granular ABAC (Attribute-Based Access Control) using Open Policy Agent.

#### Phase 2: Interoperability Integration (Months 9 - 12)
*   Deploy HAPI FHIR Native database facades.
*   Build HL7 v2 ADT/ORU pipelines for direct hospital lab system syncing.
*   Implement SMART on FHIR integrations to launch CareVault as an embedded tab inside Epic or Cerner EMR platforms.
*   Add multi-language NLP translation support.

#### Phase 3: Offline-First Edge Architectures (Months 13+)
*   Offline-first mobile app client syncing state using local SQLCipher key repositories.
*   Predictive wellness trends detection.
*   Federated clinical trials query platform (allowing researchers to query clinical data with 100% anonymization and patient opt-in payouts).
    `
  }
];
