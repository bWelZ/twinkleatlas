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
