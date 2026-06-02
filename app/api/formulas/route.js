import { NextResponse } from "next/server";
import {
  getAllFormulas,
  createFormula,
} from "@/lib/services/formulas.service";

export async function GET() {
  const formulas = await getAllFormulas();

  return NextResponse.json(formulas);
}

export async function POST(request) {
  const body = await request.json();

  const result = await createFormula(body);

  return NextResponse.json(result);
}