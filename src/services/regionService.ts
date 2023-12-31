import axios from "@/library/axios";
import type { IRegion } from "@/views/Order/types";

export async function getRegions(): Promise<IRegion[]> {
  try {
    const {data} = await axios.get('/Region/GetAll');
    console.log('here2');

    return data as IRegion[];
    
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error; 
  }
}

