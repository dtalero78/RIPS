"use server";

import { hash } from "bcryptjs";
import { db } from "@/db";
import { tenants, users } from "@/db/schema";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth.schema";
import { eq } from "drizzle-orm";

export async function registerAction(input: RegisterInput) {
  // Validate
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { ipsName, nit, fullName, email, password } = parsed.data;

  // Check duplicate email
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    return { error: "Ya existe una cuenta con este email" };
  }

  // Check duplicate NIT
  const [existingTenant] = await db
    .select({ id: tenants.id })
    .from(tenants)
    .where(eq(tenants.nit, nit))
    .limit(1);

  if (existingTenant) {
    return { error: "Ya existe una IPS registrada con este NIT" };
  }

  // Create tenant
  const [tenant] = await db
    .insert(tenants)
    .values({
      name: ipsName,
      nit,
      razonSocial: ipsName,
    })
    .returning();

  // Create owner user
  const passwordHash = await hash(password, 12);
  await db.insert(users).values({
    tenantId: tenant.id,
    email,
    passwordHash,
    fullName,
    role: "owner",
  });

  return { success: true };
}
