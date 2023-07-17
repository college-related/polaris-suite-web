import { useEffect, useState } from "react";
import { APICaller } from "../../helpers/api";

export const useApiRead = (url: string, key: string, dependencies: Array<any>=[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<dynamicObject|null>(null);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { statusCode, data, error } = await APICaller(url, "GET");

      if(statusCode === 200) {
        setData(data[key])
      } else {
        console.log(error)
      }
    })();

    setIsLoading(false);
  }, dependencies)

  return {
    isLoading,
    data,
    setData
  };
}