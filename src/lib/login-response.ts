import type { WhoamiResponseData } from "@/types/auth";
import { parseLoginRole } from "@/types/auth";

export type LoginTokensPayload = {
  access_token: string;
  refresh_token?: string;
  user: WhoamiResponseData;
};

export type NormalizedLoginResult =
  | { ok: true; data: LoginTokensPayload }
  | { ok: false; message: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isTruthySuccess(v: unknown): boolean {
  return v === true || v === "true" || v === 1 || v === "1";
}

function isFalsySuccess(v: unknown): boolean {
  return v === false || v === "false" || v === 0 || v === "0";
}

/** Some APIs wrap the body as `{ data: { success, token, user } }`. */
function unwrapLoginBody(raw: Record<string, unknown>): Record<string, unknown> {
  const inner = raw.data;
  if (!isRecord(inner)) return raw;
  const looksLikeLogin =
    typeof inner.token === "string" ||
    typeof inner.access_token === "string" ||
    isTruthySuccess(inner.success) ||
    isFalsySuccess(inner.success) ||
    readUserFromLoginApi(inner.user) !== undefined;
  return looksLikeLogin ? inner : raw;
}

function readUserFromLoginApi(raw: unknown): WhoamiResponseData | undefined {
  if (!isRecord(raw)) return undefined;
  if (typeof raw.id !== "string") return undefined;

  const email =
    typeof raw.email === "string"
      ? raw.email
      : typeof raw.username === "string"
        ? raw.username
        : undefined;
  if (!email) return undefined;

  const role = parseLoginRole(raw.role);
  if (!role) return undefined;

  const sname =
    typeof raw.sname === "string"
      ? raw.sname
      : typeof raw.surname === "string"
        ? raw.surname
        : "";

  const customerId =
    raw.customerId === null || raw.customerId === undefined
      ? null
      : typeof raw.customerId === "string"
        ? raw.customerId
        : String(raw.customerId);

  const user: WhoamiResponseData = {
    id: raw.id,
    name: typeof raw.name === "string" ? raw.name : "",
    sname,
    email,
    role,
    customerId,
  };

  if (typeof raw.username === "string") {
    user.username = raw.username;
  }

  return user;
}

function pullTokenBlock(obj: Record<string, unknown>): {
  access_token?: string;
  refresh_token?: string;
  user?: WhoamiResponseData;
} {
  const nested = obj.data;
  if (isRecord(nested)) {
    return {
      access_token: typeof nested.access_token === "string" ? nested.access_token : undefined,
      refresh_token: typeof nested.refresh_token === "string" ? nested.refresh_token : undefined,
      user: readUserFromLoginApi(nested.user),
    };
  }
  return {
    access_token: typeof obj.access_token === "string" ? obj.access_token : undefined,
    refresh_token: typeof obj.refresh_token === "string" ? obj.refresh_token : undefined,
    user: readUserFromLoginApi(obj.user),
  };
}

/**
 * Maps backend login JSON into `{ ok, data }` / `{ ok, message }`.
 * Supports: `token` + `user` (your API), `access_token` + nested `data`, and legacy `status` + `data`.
 */
export function normalizeLoginResponse(raw: unknown): NormalizedLoginResult {
  if (!isRecord(raw)) {
    return { ok: false, message: "Invalid response" };
  }

  const r = unwrapLoginBody(raw);

  if (isFalsySuccess(r.success)) {
    const message = typeof r.message === "string" ? r.message : "Failed to login";
    return { ok: false, message };
  }

  if (isTruthySuccess(r.success)) {
    const { access_token: at1, refresh_token, user: u1 } = pullTokenBlock(r);
    if (at1 && u1) {
      return { ok: true, data: { access_token: at1, refresh_token, user: u1 } };
    }

    const jwt = typeof r.token === "string" ? r.token : undefined;
    const user = readUserFromLoginApi(r.user);
    if (jwt && user) {
      return { ok: true, data: { access_token: jwt, user } };
    }

    return { ok: false, message: "Invalid login response" };
  }

  /** Legacy `{ status: true, data: { access_token, refresh_token, user } }` */
  if (r.status === true && isRecord(r.data)) {
    const d = r.data;
    const access_token = typeof d.access_token === "string" ? d.access_token : undefined;
    const refresh_token = typeof d.refresh_token === "string" ? d.refresh_token : undefined;
    const user = readUserFromLoginApi(d.user);
    if (access_token && user) {
      return { ok: true, data: { access_token, refresh_token, user } };
    }
  }

  if (r.status === false) {
    const message = typeof r.message === "string" ? r.message : "Failed to login";
    return { ok: false, message };
  }

  /** Implicit success: `token` + `user` without `success` flag */
  const implicitJwt = typeof r.token === "string" ? r.token : undefined;
  const implicitUser = readUserFromLoginApi(r.user);
  if (implicitJwt && implicitUser) {
    return { ok: true, data: { access_token: implicitJwt, user: implicitUser } };
  }

  return { ok: false, message: "Failed to login" };
}

/** Read `message` from error response bodies (e.g. HTTP 401 with JSON). */
export function loginFailureMessageFromPayload(payload: unknown): string | null {
  if (!isRecord(payload)) return null;
  const inner = unwrapLoginBody(payload);
  if (isFalsySuccess(inner.success) && typeof inner.message === "string") return inner.message;
  if (typeof inner.message === "string") return inner.message;
  return null;
}
