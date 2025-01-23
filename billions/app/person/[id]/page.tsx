import { Suspense } from "react";
import BillionDetail from "../../../component/billion-detail";

interface IParams {
    params: Promise<{ id: string }>;
}

export default async function Person({ params }: IParams) {
    const { id } = await params;
    return <h1><Suspense fallback=""><BillionDetail id={id} /></Suspense></h1>
}