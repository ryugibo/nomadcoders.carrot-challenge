import Link from "next/link";

interface IBillionProp {
    id: string;
    name: string;
    squareImage: string;
    netWorth: number;
    industries: string[];
}

export default function Billion({ id, name, squareImage, netWorth, industries }: IBillionProp) {
    return <div>
        <img src={squareImage} alt={name} />
        <Link href={`/person/${id}`}>
        {name}
        {netWorth}
        {industries.map(industry => <b>{industry}</b>)}
        </Link>
    </div>;
}