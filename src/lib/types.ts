export type EventStatus = 'planning' | 'in-progress' | 'ready' | 'completed' | 'archived';
export type BacklogStatus = 'todo' | 'in-progress' | 'done';
export type BacklogPriority = 'high' | 'medium' | 'optional';
export type BacklogCategory = 'social' | 'digital' | 'booth' | 'print' | 'content' | 'system';

export interface BacklogItem {
  id: string;
  title: string;
  category: BacklogCategory;
  status: BacklogStatus;
  priority: BacklogPriority;
  notes?: string;
  direction?: string[];
  headline?: string;
  cta?: string;
  missing?: string[];
  variants?: string[];
}
export type AssetStatus = 'pending' | 'in-design' | 'review' | 'approved' | 'delivered';
export type AssetType = 'banner' | 'social' | 'postcard' | 'swag' | 'landing' | 'ad' | 'qr' | 'mockup' | 'pdf' | 'logo' | 'tablecloth' | 'booth' | 'copy' | 'email' | 'workflow' | 'other';
export type AssetCategory = 'social' | 'digital' | 'booth' | 'content' | 'operations';

export interface PrintFile {
  url: string;
  filename: string;
  size?: string;
  thumbnailUrl?: string;
}

export interface AssetSide {
  label: string;
  previewUrl: string;
}

export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  category?: AssetCategory;
  previewColor: string;
  previewUrl?: string;
  aspectRatio: string;
  status: AssetStatus;
  notes?: string;
  externalUrl?: string;
  iframeUrl?: string;
  printFile?: PrintFile;
  tags: string[];
  exportDate?: string;
  sides?: AssetSide[];
  relatedAssets?: string[];
  mapPosition?: { x: number; y: number };
  physicalSize?: { w: number; h: number; unit: 'in' | 'cm' | 'ft' };
}

export interface EventDeadline {
  id: string;
  title: string;
  date: string;
  type: 'design' | 'print' | 'shipping' | 'conference' | 'review' | 'other';
  done: boolean;
}

export interface EventContact {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  website?: string;
  group?: string;
}

// ─── Playbook ────────────────────────────────────────────────────────────────

export type MessageMode = 'selling' | 'gratitude' | 'awareness' | 'launch';

export interface MessageExample {
  channel: string;
  text: string;
}

export interface MessageModeConfig {
  mode: MessageMode;
  label: string;
  description: string;
  tone: string;
  headline?: string;
  cta?: string;
  examples: MessageExample[];
  contexts: string[];
}

export interface CompanyGuideline {
  id: string;
  company: string;
  year: number;
  theme: string;
  tagline?: string;
  color: string;
  mission?: string;
  audience?: string;
  toneDescriptors: string[];
  toneAvoid?: string[];
  messages: string[];
  headlines: { primary: string; variations?: string[] };
  ctas: string[];
  modes: MessageModeConfig[];
}

export interface Template {
  id: string;
  title: string;
  type: AssetType;
  company?: string;
  description?: string;
  previewUrl?: string;
  downloadUrl?: string;
  externalUrl?: string;
  tags: string[];
  lastUpdated?: string;
}

export type DirectoryType = 'vendor' | 'partner' | 'internal' | 'contact';

export interface DirectoryEntry {
  id: string;
  name: string;
  company?: string;
  type: DirectoryType;
  role: string;
  services?: string[];
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  tags: string[];
}

// ─────────────────────────────────────────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  organization: string;
  date: string;
  endDate?: string;
  location: string;
  audience: string;
  objective: string;
  company: string;
  presence: string;
  status: EventStatus;
  progress: number;
  coverGradient: string;
  assets: Asset[];
  deadlines: EventDeadline[];
  notes: string;
  links: { label: string; url: string }[];
  contacts: EventContact[];
  tags: string[];
  backlog?: BacklogItem[];
}
