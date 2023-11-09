import { useMemo } from "react";
import { useQuery } from "react-query";
import { API } from "../../services/api";
import { TabsComponent } from "./components";
import "./home.css";

export interface ICurrensySelectData {
  label: string;
  name: string;
}

const Home = () => {
  const { data } = useQuery("getData", async () => {
    return await API.getSymbols().then((res) => res.data.currencies);
  });

  const selectData = useMemo(() => {
    const initialData = [];
    if (data) {
      for (let key in data) {
        initialData.push({ label: key, name: data[key] });
      }
    }
    return initialData;
  }, [data]);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero_inner">
          <TabsComponent selectData={selectData} />
        </div>
      </div>
    </section>
  );
};

export default Home;
