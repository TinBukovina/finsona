import { NextResponse } from "next/server";

import { getSession, supabaseAdmin } from "@/6_shared/server";
import { UserPersonalInfo } from "@/5_entities/user";

const allowedFields: (keyof UserPersonalInfo)[] = ["full_name"];

export async function POST(request: Request) {
  try {
    // Getting session from user
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Filtering only allowed fields
    const body = await request.json();
    const dataToUpdate: Partial<UserPersonalInfo> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        dataToUpdate[field] = body[field];
      }
    }

    // Checking if full name is long enough
    if (
      dataToUpdate.full_name &&
      (typeof dataToUpdate.full_name !== "string" ||
        dataToUpdate.full_name.length < 2)
    ) {
      return NextResponse.json(
        { message: "Full name must be a string with at least 2 characters." },
        { status: 400 }
      );
    }

    // Ako nema podataka za ažuriranje nakon filtriranja
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        {
          message: "No valid data provided for update.",
        },
        { status: 400 }
      );
    }

    // Saving new user personal data for a user in database
    const { error: updatingPersonalDataError } = await supabaseAdmin
      .from("users")
      .update(dataToUpdate)
      .eq("id", session.id);

    if (updatingPersonalDataError) {
      console.error(updatingPersonalDataError);
      return NextResponse.json(
        { message: "Internal server error." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Settings updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
