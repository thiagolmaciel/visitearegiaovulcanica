import { isCity, isState } from "./locationServices";
import { fetchAllMembers, fetchMembersByCityName, fetchMembersByPartialQuery, fetchMembersByStateName, } from "./memberServices";


export async function searchMembers(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return null;

  if (normalizedQuery === '*') {
    return fetchAllMembers();
  }

  if (await isCity(normalizedQuery)) {
    return fetchMembersByCityName(normalizedQuery);
  }
  if (await isState(normalizedQuery)) {
    return fetchMembersByStateName(normalizedQuery);
  }
  return fetchMembersByPartialQuery(normalizedQuery);
}




