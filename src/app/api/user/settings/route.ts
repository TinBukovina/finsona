import { NextResponse } from "next/server";

import { supabaseAdmin, getSession } from "@/6_shared/server";

export async function GET() {
  // Getting session from user
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Fetching settings from user
  const { data: user_settings_data, error: settings_error } =
    await supabaseAdmin
      .from("user_settings")
      .select("*")
      .eq("id", session.id)
      .single();

  if (settings_error) {
    console.error(settings_error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  // Fetching personal data from user
  const { data: user_data, error: user_error } = await supabaseAdmin
    .from("users")
    .select("full_name, email")
    .eq("id", session.id)
    .single();

  if (user_error) {
    console.error(user_error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  const result = {
    ...user_settings_data,
    ...user_data,
  };

  return NextResponse.json(result || {});
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

  // Saving new user settings for a user in database
  const { error: updatingSettingsError } = await supabaseAdmin
    .from("user_settings")
    .update(updatedSettings)
    .eq("id", session.id);

  if (updatingSettingsError) {
    console.error(updatingSettingsError);
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
