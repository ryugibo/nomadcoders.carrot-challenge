import { API_URL } from "../app/constants";
import styles from "../styles/movie-info.module.css";

export async function getBillion(id: string) {
    const response = await fetch(`${API_URL}/person/${id}`, { cache: "force-cache" });
    const json = await response.json();
    return json;
}

export default async function BillionDetail({ id }: { id: string }) {
    const billion = await getBillion(id);
    return <div>
        {JSON.stringify(billion)}
    </div>;
}