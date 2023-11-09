import { FC, useState } from "react";
import { useMutation } from "react-query";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ICurrensySelectData } from "../..";
import { API } from "../../../../services/api";

export interface CurrensyFormData {
  to: string;
  from: string;
  amount: string;
}

interface IProps {
  selectData: ICurrensySelectData[];
}

const ConvertForm: FC<IProps> = ({ selectData }) => {
  const [formValue, setFormValue] = useState<CurrensyFormData>({
    to: "",
    from: "",
    amount: "",
  });

  const { data, mutate, isLoading, isError } = useMutation(
    async (data: CurrensyFormData) => {
      return await API.ConvertEndpoint({
        from: data.from,
        to: data.to,
        amount: data.amount,
      }).then((res) => res.data);
    }
  );

  const hendleSubmit = (evt: any) => {
    evt.preventDefault();
    mutate(formValue);
  };

  return (
    <div>
      <form className="currensy-convert_form" onSubmit={hendleSubmit}>
        <Box>
          <Typography className="form-label">From</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={selectData}
            onChange={(event: any, value: any) => {
              setFormValue((prev) => ({
                ...prev,
                from: value?.label,
              }));
            }}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter" required={true} />
            )}
          />
        </Box>

        <Box>
          <Typography className="form-label">To</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={selectData}
            onChange={(event: any, value: any) => {
              setFormValue((prev) => ({ ...prev, to: value?.label }));
            }}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter" required={true} />
            )}
          />
        </Box>

        <Box>
          <Typography className="form-label">Amount</Typography>
          <TextField
            type="number"
            id="outlined-basic"
            label="Enter"
            variant="outlined"
            required={true}
            onChange={(value: any) => {
              setFormValue((prev) => ({ ...prev, amount: value.target.value }));
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button type="submit" variant="contained" size="large">
            Konvert
          </Button>
        </Box>
      </form>

      <div className="convert_resalt">
        {!!data && (
          <>
            <p style={{ textAlign: "center", padding: "40px 0" }}>
              {" "}
              <span>
                {data.amount + " "}
                {data.base}
              </span>{" "}
              ={" "}
              <span style={{ fontSize: "20px" }}>
                <b>{data.result[Object.keys(data.result)[0]]}</b>
                <b>{" " + Object.keys(data.result)[0]}</b>
              </span>
            </p>

            <p style={{ textAlign: "center" }}>
              {" "}
              <span>1 {data.base}</span> ={" "}
              <span style={{ fontSize: "20px" }}>
                <b>{data.result.rate}</b>
                <b>{" " + Object.keys(data.result)[0]}</b>
              </span>
            </p>
          </>
        )}

        {isLoading && (
          <p style={{ width: "100px", margin: "0 auto", padding: "40px 0" }}>
            <Skeleton animation="wave" width={100} height={40} />
          </p>
        )}
      </div>
    </div>
  );
};

export default ConvertForm;
