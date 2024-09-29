import { useQuery } from "@tanstack/react-query";
import fetchFireballs from "../util/fetchFireballs";

export default function useQueryFireballs() {
  return useQuery({
    queryKey: ["fireballs"],
    queryFn: () => fetchFireballs() as Promise<FireballsResponse>,
  });
}

export interface FireballsResponse {
  signature: Signature;
  count: string;
  fields: string[];
  data: string[][];
}

interface Signature {
  source: string;
  version: string;
}
