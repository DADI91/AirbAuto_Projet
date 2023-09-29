import { useEffect } from "react";

export const useMount = (func: Function) => useEffect(() => func(), []);
