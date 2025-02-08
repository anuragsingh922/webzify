import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchThemes } from "@/store/imageSlice";

const UseFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error fast development
    dispatch(fetchThemes());
  }, [dispatch]);
};

export default UseFetchData;
