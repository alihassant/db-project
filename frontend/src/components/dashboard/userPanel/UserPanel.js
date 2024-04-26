import "@/app/dashboard.min.css";
import { PLANS } from "@/config/stripe";

export default function UserPanel({ user }) {
  const plan = PLANS.find((plan) => plan.slug === user.currentPlan);

  const totalUserDbs = user.databases.length;

  const remainingDbs = plan.dbs - totalUserDbs;

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="text-primary fw-bold m-0">Available Resources</h6>
      </div>
      <div className="card-body" style={{ minHeight: "165px" }}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <strong>Current Plan: {user.currentPlan.toUpperCase()}</strong>
            </div>
            <div className="mb-3">
              <strong>Remaining Databases: {remainingDbs}</strong>
            </div>
            <div className="mb-3">
              <strong>Total Users per Database: {plan.users}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
