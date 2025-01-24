import { API_URL } from "../app/constants";
import styles from "../styles/billion-detail.module.css";

export async function getBillion(id: string) {
  const response = await fetch(`${API_URL}/person/${id}`, {
    cache: "force-cache",
  });
  const json = await response.json();
  return json;
}

export default async function BillionDetail({ id }: { id: string }) {
  const billion = await getBillion(id);
  return (
    <>
      <img src={billion.squareImage} />
      <div className={styles.info}>
        <div>{billion.name}</div>
        <div>
          Networth:{" "}
          {(billion.netWorth / 1000).toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}{" "}
          Billion
        </div>
        <div>Country: {billion.country}</div>
        <div>Industry: {billion.industries}</div>
        <div>{billion.bio}</div>
      </div>

      {billion.financialAssets ? (
        <>
          <div className={styles.financialTitle}>Financial Assets</div>
          <div className={styles.financial}>
            {billion.financialAssets.map((financialAsset) => (
              <div>
                <span>Ticker: {financialAsset.ticker}</span>
                <span>
                  Shares:{" "}
                  {financialAsset.numberOfShares.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
                {financialAsset.exerciseOptionPrice ? (
                  <span>
                    Exercise Price: ${financialAsset.exerciseOptionPrice}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
