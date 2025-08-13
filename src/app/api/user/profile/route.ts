import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/6_shared/api";
import { getSession } from "@/6_shared/auth";
import { UserPersonalInfo, UserSettings } from "@/5_entities/user";

const USER_FIELDS = ["full_name"];
const SETTINGS_FIELDS = [
  "theme",
  "default_currency",
  "language",
  "month_start_day",
];

// --- GET: Fetching all data about user ---
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetching data from users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("full_name, email")
      .eq("id", session.id)
      .single();

    if (userError) throw userError;

    // Fetching settings from 'user_settings' table
    const { data: settingsData, error: settingsError } = await supabaseAdmin
      .from("user_settings")
      .select("*")
      .eq("id", session.id)
      .single();

    if (settingsError) throw settingsError;

    // Combine all data into a single object
    const combinedData = { ...settingsData, ...userData };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("[PROFILE_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// --- PATCH: Updating user profile and settings ---
export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const profileDataToUpdate: { [key: string]: UserPersonalInfo } = {};
    const settingsDataToUpdate: { [key: string]: UserSettings } = {};

    // 1. Differentiate between profile and settings data
    Object.keys(body).forEach((key) => {
      if (USER_FIELDS.includes(key)) {
        profileDataToUpdate[key] = body[key];
      } else if (SETTINGS_FIELDS.includes(key)) {
        settingsDataToUpdate[key] = body[key];
      }
    });

    // 2. Update 'users' table if there is data for it
    if (Object.keys(profileDataToUpdate).length > 0) {
      const { error } = await supabaseAdmin
        .from("users")
        .update(profileDataToUpdate)
        .eq("id", session.id);
      if (error)
        throw new Error(`Failed to update user profile: ${error.message}`);
    }

    // 3. Update 'user_settings' table if there is data for it
    if (Object.keys(settingsDataToUpdate).length > 0) {
      const { error } = await supabaseAdmin
        .from("user_settings")
        .update(settingsDataToUpdate)
        .eq("id", session.id);
      if (error)
        throw new Error(`Failed to update user settings: ${error.message}`);
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
