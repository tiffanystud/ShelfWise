
// backend/middleware/logger.ts

import { db } from "../utils/database.ts";

export function logToDB(action: string,  userId: number) {
    db.query("INSERT INTO audit_log (action, user_id) VALUES (?, ?)", [action, userId]);
}


export function logEventToDB(event: string, method: string, url: string, status: number, userId?: number, ip?: string) {
    db.query(
      "INSERT INTO event_log (event, method, url, status_code, user_id, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [event, method, url, status, userId ?? null, ip ?? null]
    );
  }
  