// backend call
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// JWT token headers
function getAuthHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// create study plan
export async function createStudyPlan(
  data: { subject: string; examDate: string },
  token: string
) {
  return api.post("/study-plan", data, getAuthHeaders(token));
}

// get study plans
export async function getStudyPlans(token: string) {
  return api.get("/study-plan", getAuthHeaders(token));
}
