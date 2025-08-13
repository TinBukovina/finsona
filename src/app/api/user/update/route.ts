import { getSession, supabaseAdmin } from "@/6_shared/server";
import { NextResponse } from "next/server";

import { FormDataInterface } from "@/3_widgets/personal_details_settings/ui/PersonalDetailsCard";

const allowedFields: (keyof FormDataInterface)[] = ["fullName"];

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Filtering only allowed fields
    const body = await request.json();
    const dataToUpdate: Partial<FormDataInterface> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        dataToUpdate[field] = body[field];
      }
    }

    // Checking if full name is long enough
    if (
      dataToUpdate.fullName &&
      (typeof dataToUpdate.fullName !== "string" ||
        dataToUpdate.fullName.length < 2)
    ) {
      return NextResponse.json(
        { message: "Full name must be a string with at least 2 characters." },
        { status: 400 }
      );
    }

    // Ako nema podataka za ažuriranje nakon filtriranja
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({
        message: "No valid data provided for update.",
      });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update(dataToUpdate)
      .eq("id", session.id);

    if (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json(
        { message: "Faild to update user profile." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User profile updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
