// app/api/wilayah/regencies/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const province_code = req.nextUrl.searchParams.get("province_code");
  if (!province_code) {
    return NextResponse.json(
      { error: "province_code is required" },
      { status: 400 }
    );
  }

  const resp = await fetch(
    `https://wilayah.id/api/regencies/${province_code}.json`
  );

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Failed to fetch regencies" },
      { status: resp.status }
    );
  }

  const raw = await resp.json();

  // raw.data sudah array { code, name }
  const regencies = Array.isArray(raw?.data)
    ? raw.data.map((r: any) => ({
        id: r.code,
        name: r.name,
      }))
    : [];

  return NextResponse.json(regencies);
}
