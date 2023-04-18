import { json } from '@sveltejs/kit'
import fs from 'fs/promises';

export const GET = async ({})=>{
    return json({
        status: 200,
        body: {
            message: 'Hello World'
        }
    })
}
export const POST = async ({request})=>{
    const data = await request.formData();
    const obj = Object.fromEntries(data.entries());
    const name = obj.name as string;
    const file = obj.file as Blob;    
    fs.mkdir("upload", {recursive: true});
    fs.writeFile("upload/"+name+".txt", Buffer.from(await file.arrayBuffer()));
    return json({
        status: 204,
        body: {
            id: name+".txt"
        }
    })
}