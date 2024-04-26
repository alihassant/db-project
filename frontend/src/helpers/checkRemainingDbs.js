import { PLANS } from "@/config/stripe";

export default function checkRemainingDbs(slug, dbsNumber) {
  const plan = PLANS.find((plan) => plan.slug === slug);

  return dbsNumber < plan.dbs;
}
