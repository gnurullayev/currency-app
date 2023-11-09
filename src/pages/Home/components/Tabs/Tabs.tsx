import { useState, FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ConvertForm from "../ConvertForm/ConvertForm";
import { ICurrensySelectData } from "../..";
import { CurrenciesTab } from "../";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IProps {
  selectData: ICurrensySelectData[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsComponent: FC<IProps> = ({ selectData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="tabs-box">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Konverter" {...a11yProps(0)} />
          <Tab label="Currencies" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ConvertForm selectData={selectData} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <CurrenciesTab selectData={selectData} />
      </CustomTabPanel>
    </Box>
  );
};

export default TabsComponent;
