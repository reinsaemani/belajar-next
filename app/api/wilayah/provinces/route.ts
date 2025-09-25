// app/api/wilayah/provinces/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const resp = await fetch("https://wilayah.id/api/provinces.json");
  const raw = await resp.json();

  // raw.data sudah array dengan { code, name }
  const provinces = Array.isArray(raw?.data)
    ? raw.data.map((p: any) => ({
        code: p.code,
        name: p.name,
      }))
    : [];

  return NextResponse.json(provinces);
}
