import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const  IsLoading = (WrappedComponent) => {
  const LoadedComponent = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, [])
  
    return (
      <>
        {isLoading ? <Spinner /> : <WrappedComponent/>}
      </>
    )
  }
  return LoadedComponent;
}

export default IsLoading;