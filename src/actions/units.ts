"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const UnitType = {
  STUDIO: "STUDIO",
  ONE_BEDROOM: "ONE_BEDROOM",
  TWO_BEDROOM: "TWO_BEDROOM",
  THREE_BEDROOM: "THREE_BEDROOM",
  PENTHOUSE: "PENTHOUSE",
} as const;

const UnitStatus = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  SOLD: "SOLD",
} as const;

type UnitTypeValue = (typeof UnitType)[keyof typeof UnitType];
type UnitStatusValue = (typeof UnitStatus)[keyof typeof UnitStatus];

type MockUnit = {
  id: string;
  projectId: string;
  name: string;
  type: UnitTypeValue;
  sqm: number;
  price: number;
  floor?: number;
  unitNumber?: string;
  currency: string;
  floorplan?: string;
  gallery: string[];
  status: UnitStatusValue;
};

const mockUnits: MockUnit[] = [];

const createUnitSchema = z.object({
  projectId: z.string().min(1, "projectId is required"),
  name: z.string().min(2),
  type: z.nativeEnum(UnitType),
  sqm: z.coerce.number().positive(),
  price: z.coerce.number().positive(),
  floor: z.coerce.number().int().optional(),
  unitNumber: z.string().optional(),
  currency: z.string().default("USD"),
  floorplan: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  status: z.nativeEnum(UnitStatus).default(UnitStatus.AVAILABLE),
});

const updateUnitSchema = createUnitSchema.partial().extend({
  id: z.string().min(1),
});

export async function createUnit(input: unknown) {
  const parsed = createUnitSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.flatten().formErrors.join(", ") };
  }

  const unit: MockUnit = {
    id: `mock-unit-${mockUnits.length + 1}`,
    ...parsed.data,
  };
  mockUnits.push(unit);
  revalidatePath(`/admin/projects/${parsed.data.projectId}/units`);

  return { ok: true, data: unit };
}

export async function updateUnit(input: unknown) {
  const parsed = updateUnitSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.flatten().formErrors.join(", ") };
  }

  const { id, ...data } = parsed.data;
  const existing = mockUnits.find((unit) => unit.id === id);
  if (!existing) {
    return { ok: false, message: "Unit not found." };
  }

  Object.assign(existing, data);
  const updated = existing;
  revalidatePath(`/admin/projects/${updated.projectId}/units/${updated.id}`);

  return { ok: true, data: updated };
}
