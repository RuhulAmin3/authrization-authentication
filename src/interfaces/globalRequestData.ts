export type GlobalRequestData = {
  u_id?: string | null;
  user_email?: string | null;
  org_id?: string | null;
  api_key?: string | null;
  fingerprint?: string;
  token?: string;
  requestId: string;
  ip: string;
  userAgent: string;
};
