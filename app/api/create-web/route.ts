import google from "@/app/ai/main";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const {logo,name,description,industry,location,linkedin,contact,email,primary_color} = await req.json();

    if (!logo || !name || !description || !industry || !location || !linkedin || !contact || !email || !primary_color) {
        return NextResponse.json({error: "Please fill out all fields."}, {status: 400});
    }

    const prompt = `for ${name} in ${location} in ${industry} industry, write content for hero section in 2 lines, write feature section in 3 lines, write about section in 5 lines and write contact section in 2 lines and the description is ${description} and the contact is ${contact} and the email is ${email} make each section seaprated by $ and don't add section name in the content`;

    const { text } = await generateText({
        model: google("gemini-pro"),
        prompt: prompt,
    });

    console.log(text)

    const arr = text.split("$");

    const hero = arr[1];
    const feature = arr[2];
    const about = arr[3];
    const contact_section = arr[4];

    return NextResponse.json({hero,feature,about,contact_section}, {status: 200});


}