import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database"

export const GET=async()=>{
    try {
        connectToDb();
        const prompt= await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompt),{status:202})
    } catch (error) {
        return new Response("Failed to fetch",{status:500})
    }
}