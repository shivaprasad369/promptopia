import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database"

export const GET=async(req,{params})=>{
    try {
        connectToDb();
        const prompt= await Prompt.find({creator:params.id}).populate('creator')
        return new Response(JSON.stringify(prompt),{status:202})
    } catch (error) {
        return new Response("Failed to fetch",{status:500})
    }
}