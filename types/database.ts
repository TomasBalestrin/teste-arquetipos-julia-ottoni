export type UserRole = "user" | "admin";

export type TestStatus = "started" | "in_progress" | "completed";

export type PurchaseStatus = "approved" | "refunded" | "cancelled";

export type ContentType = "link" | "iframe";

export type EntityStatus = "active" | "inactive";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  access_granted: boolean;
  password_hash: string;
  must_reset_password: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArchetypeScore {
  [archetype: string]: number;
}

export interface AnswerEntry {
  option: string;
  archetype_scores: ArchetypeScore;
}

export interface Answers {
  [questionKey: string]: AnswerEntry;
}

export interface Top3Entry {
  rank: number;
  archetype: string;
  score: number;
}

export interface TestSession {
  id: string;
  user_id: string | null;
  email: string;
  current_step: number;
  status: TestStatus;
  answers: Answers;
  scores: ArchetypeScore;
  top_3: Top3Entry[] | null;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  session_id: string | null;
  user_id: string | null;
  email: string;
  transaction_id: string;
  hotmart_product_id: string | null;
  status: PurchaseStatus;
  amount_cents: number | null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  name: string;
  sort_order: number;
  status: EntityStatus;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  cover_image_url: string | null;
  content_type: ContentType;
  content_url: string;
  sort_order: number;
  status: EntityStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}
