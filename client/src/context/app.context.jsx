/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, } from "react";
import useFetchData from "../hooks/useFetchData";
import apis from "../api/apis";
import { useAuth } from "./auth.context";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { userId } = useAuth();
  const { data, refetch, loading, error } = useFetchData(apis.home.getAll, "", { userId });

  const categories = data?.data?.category || [];
  const bestSellingProducts = data?.data?.bestSellingProduct || [];
  const newArrivalProducts = data?.data?.newArrivalProduct || [];
  const carousels = data?.data?.carousel || [];
  const promotions = data?.data?.promotion || [];
  const youTubeVideos = data?.data?.youTubeVideo || [];
  const testimonials = data?.data?.testimonial || [];
  const clients = data?.data?.client || [];
  const blogs = data?.data?.blog || [];

  const value = {
    categories,
    bestSellingProducts,
    newArrivalProducts,
    carousels,
    promotions,
    youTubeVideos,
    testimonials,
    clients,
    blogs,
    refetchHomePageData: refetch,
    loading,
    error
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
