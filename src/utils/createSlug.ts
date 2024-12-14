import { ulid } from "ulidx"
export const createSlug = (name:string): string=>{

    return `${name}-${ulid()}`
}