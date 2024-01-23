//GET
import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
//PATCH
export const PATCH=async(req,{params})=>{
    const {prompt,tag}=await req.json();
    try {
        await connectToDb();
        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response('Prompt not found' ,{status:404}) 
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:202})
    } catch (error) {
        return new Response("Failed to fetch",{status:500})
    }
}
//Delelte

export const DELETE=async(req,{params})=>{
try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);
    return new Response('Prompt deleted Successfully',{status:202})
} catch (error) {
    return new Response("Failed to Delete",{status:500})
}
}