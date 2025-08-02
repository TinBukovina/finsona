import { NextResponse } from "next/server";

import { supabaseAdmin, getSession } from "@/6_shared/server";

export async function GET() {
  // Getting session from user
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Fetching settings from user
  const { data: settings, error } = await supabaseAdmin
    .from("user_settings")
    .select("*")
    .eq("id", session.id)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(settings || {});
}

export async function POST(request: Request) {
  // Getting session from user
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Getting payload from request
  const newSettings = await request.json();

  // Getting existing settings from user
  const { data: existingSettingsData, error: fecthingSettingsError } =
    await supabaseAdmin
      .from("user_settings")
      .select("*")
      .eq("id", session.id)
      .single();

  if (fecthingSettingsError) {
    console.error(fecthingSettingsError);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }

  // Creating new settings for users
  const updatedSettings = { ...existingSettingsData, ...newSettings };

  // Saving new settings for a user in database
  const { error: updatingError } = await supabaseAdmin
    .from("user_settings")
    .update(updatedSettings)
    .eq("id", session.id);

  if (updatingError) {
    console.error(updatingError);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Settings updated successfully." },
    { status: 200 }
  );
}
