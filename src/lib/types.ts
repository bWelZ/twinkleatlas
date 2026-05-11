export type EventStatus = 'planning' | 'in-progress' | 'ready' | 'completed' | 'archived';
export type AssetStatus = 'pending' | 'in-design' | 'review' | 'approved' | 'delivered';
export type AssetType = 'banner' | 'social' | 'postcard' | 'swag' | 'landing' | 'ad' | 'qr' | 'mockup' | 'pdf' | 'logo' | 'tablecloth' | 'booth' | 'other';

export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  previewColor: string;
  previewUrl?: string;
  aspectRatio: string;
  status: AssetStatus;
  notes?: string;
  externalUrl?: string;
  tags: string[];
  exportDate?: string;
  relatedAssets?: string[];
  mapPosition?: { x: number; y: number };
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
}
