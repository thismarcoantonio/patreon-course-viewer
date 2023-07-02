import { h, createContext } from "preact";
import { useEffect, useState, useContext } from "preact/hooks";
import { getCampaign } from "../services/campaign";

const CampaignContext = createContext({});

export function CampaignProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const campaign = await getCampaign();
      setCampaign(campaign);
      setLoading(false);
    })();
  }, []);

  return (
    <CampaignContext.Provider
      value={{
        loading,
        campaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaign = () => useContext(CampaignContext);
