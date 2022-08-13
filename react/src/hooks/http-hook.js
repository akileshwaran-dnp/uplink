import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // return function
  const sendRequest = useCallback(async (reqConf, modifyFunction) => {
    // request sending
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: reqConf.method,
        url: reqConf.url,
        headers: reqConf.headers ? reqConf.headers : {},
        params: reqConf.params ? reqConf.params : {},
        responseType: reqConf.responseType ? reqConf.responseType : {},
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      const data = await response.data;
      modifyFunction(response.data);
    } catch (err) {
      console.log(error);
    }

    setIsLoading(false);
  });

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
