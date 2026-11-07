/** The canonical live URLs used by both the Projects UI and embed-policy check. */
export const PROJECT_LIVE_SITES = {
  pdsw: "https://pdsw.netlify.app/",
  agripredict: "https://agripredictf.vercel.app/",
  linkarmor: "https://link-armor.vercel.app/",
  insprizy: "https://inspirzy.vercel.app/",
  clarionet: "https://clarionet.vercel.app/",
} as const;

export type ProjectLiveSiteId = keyof typeof PROJECT_LIVE_SITES;
