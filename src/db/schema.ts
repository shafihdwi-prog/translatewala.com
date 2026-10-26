import { boolean, index, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  requestKey: uuid("request_key").notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  company: varchar("company", { length: 160 }),
  service: varchar("service", { length: 40 }).notNull(),
  sourceLanguage: varchar("source_language", { length: 60 }),
  targetLanguage: varchar("target_language", { length: 60 }),
  country: varchar("country", { length: 80 }).notNull(),
  deadline: varchar("deadline", { length: 10 }),
  description: text("description").notNull(),
  consent: boolean("consent").notNull(),
  privacyVersion: varchar("privacy_version", { length: 20 }).default("2026-01").notNull(),
  locale: varchar("locale", { length: 5 }).default("en").notNull(),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, table => [index("inquiries_email_created_idx").on(table.email, table.createdAt)]);

export const inquiryRateLimits = pgTable("inquiry_rate_limits", {
  key: varchar("key", { length: 64 }).primaryKey(),
  hits: integer("hits").notNull().default(1),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
});
