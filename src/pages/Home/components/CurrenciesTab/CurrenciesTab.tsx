import { FC, useState, useMemo } from "react";
import { useQuery } from "react-query";
import {
  Pagination,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { ICurrensySelectData } from "../..";
import { API } from "../../../../services/api";
import { paginationCount } from "../../../../utils";

interface IProps {
  selectData: ICurrensySelectData[];
}

const CurrenciesTab: FC<IProps> = ({ selectData }) => {
  const [value, setValue] = useState<string>(selectData[0]?.label);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useQuery(["getData", value], async () => {
    return await API.currencies(value).then((res) => res.data);
  });

  const resData = useMemo(() => {
    let list = [];

    if (!!data) {
      for (let key in data.results) {
        list.push({ value: data.results[key], key });
      }
    }
    return list;
  }, [data]);

  const currencyList = useMemo(() => {
    return resData.slice(page * 10 - 10, page * 10);
  }, [page, resData]);

  const totalPagination = paginationCount(10, resData.length);
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={selectData}
        defaultValue={selectData[0]}
        onChange={(event: any, value: any) => {
          setValue((prev) => value?.label);
        }}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Enter" required={true} />
        )}
      />

      <div className="convert_resalt">
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={"300px"}
          >
            <CircularProgress
              color="success"
              style={{ width: "50px", height: "50px" }}
            />
          </Box>
        ) : (
          <>
            <ul className="convert_resalt__list">
              {currencyList.map((el) => (
                <li className="convert_resalt__item">
                  <span>1{data?.base}</span> = <b>{el.value + " " + el.key}</b>
                </li>
              ))}
            </ul>

            <Pagination
              page={page}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
              count={totalPagination}
              size="small"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CurrenciesTab;
