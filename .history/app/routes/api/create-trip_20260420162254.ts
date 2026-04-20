import { data, type ActionFunctionArgs } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson } from "~/lib/myutils";
import { appwriteConfig, database } from "~/appwrite/client";
import { ID } from "appwrite";

export const action = async ({ request }: ActionFunctionArgs) => {
    const {
        country,
        duration,
        budget,
        interest,
        travelStyle,
        groupType,
        userId } = await request.json();


    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const unsuplashAccessKey = process.env.UNSPLASH_ACCESS_KEY!;

    const prompt = `Generate a ${duration}-day travel itinerary for ${country} based on the following user information: 
Budget: '${budget}'
Interests: '${interest}'
TravelStyle: '${travelStyle}'
GroupType: '${groupType}'
Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
{
  "name": "A descriptive title for the trip",
  "description": "A brief description of the trip and its highlights not exceeding 100 words",
  "estimatedPrice": "Lowest average price for the trip in USD, e.g., $2,500 (include commas for thousands)",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country}",
  "interests": "${interest}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    '🌸 Season (from month to month): reason to visit',
    '☀️ Season (from month to month): reason to visit',
    '🍁 Season (from month to month): reason to visit',
    '❄️ Season (from month to month): reason to visit'
  ],
  "weatherInfo": [
    '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
    '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
    '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
    '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
  ],
  "location": {
    "city": "name of the city or region",
    "coordinates": [latitude, longitude],
    "openStreetMap": "link to open street map"
  },
  "itineraryRules": "Include **up to 10 itinerary points only**, no matter how many days the trip lasts. Each point must have a day range (e.g., '1-4'), location, and 2-3 activities. If the trip is 10 days or fewer, list each day individually. If the trip is longer than 10 days, divide the total duration into up to 10 evenly spaced day ranges (1-3, 4-6, etc.) and assign 2-3 representative activities per range. Always return valid JSON.",
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
  ]
}`;


    try {

        // 1️⃣ Generate trip
        const textResult = await genAI.getGenerativeModel({ model: "gemini-2.5-lite" }).generateContent([prompt]);
        // const trip = parseMarkdownToJson(textResult.response.text());
        const rawText = textResult.response.text();

        const trip = parseMarkdownToJson(rawText);

        if (!trip) {
            console.error("Trip parsing failed:", rawText);
            throw new Error("AI returned invalid JSON");
        }

        // 2️⃣ Generate images
        // const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${country} ${interest} ${travelStyle}&orientation=landscape&client_id=${unsuplashAccessKey}`);
        async function fetchImages(query: string) {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${unsuplashAccessKey}`
            );

            const data = await res.json();
            return data?.results?.map((img: any) => img.urls?.regular) || [];
        }

        let imageUrls: string[] = [];

        // 1️⃣ Try detailed search
        imageUrls = await fetchImages(`${country} ${interest} ${travelStyle}`);

        // 2️⃣ Fallback → country only
        if (imageUrls.length < 3) {
            const fallback = await fetchImages(country);
            imageUrls = [...new Set([...imageUrls, ...fallback])];
        }

        // 3️⃣ Final fallback → generic travel
        if (imageUrls.length < 3) {
            const generic = await fetchImages("travel landscape");
            imageUrls = [...new Set([...imageUrls, ...generic])];
        }

        // Always limit to 3
        imageUrls = imageUrls.slice(0, 3);

        // const imageUrls = (await imageResponse.json()).results.slice(0, 3).map((image: any) => image.urls?.regular || null);
        // const imageData = await imageResponse.json();

        // const imageUrls =
        //     imageData?.results?.length > 0
        //         ? imageData.results.slice(0, 3).map((img: any) => img.urls.regular)
        //         : [];


        console.log("RAW AI RESPONSE:", textResult.response.text());
        console.log("PARSED TRIP:", trip);
        console.log("TYPEOF trip:", typeof trip);


        // 3️⃣ Save trip
        const result = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            ID.unique(),
            {
                tripDetails: JSON.stringify(trip),
                // $createdAt: new Date().toISOString(),
                imageUrls,
                userId,
            }
        );

        const userDoc = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId,
        )
        const currentTotal = userDoc?.totalTrips || 0;

        await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId,
            { totalTrips: currentTotal + 1 }
        )

        return data({ $id: result.$id })
    } catch (error: any) {
        console.error("Error generating trip:", error);
        // Return proper JSON error response
        return data(
            {
                error: error.message || "Failed to generate trip",
                details: error.status === 429
                    ? "API quota exceeded. Please try again later or upgrade your plan."
                    : "An error occurred while generating your trip.",
            },
            { status: error.status || 500 }
        );
    }
}
