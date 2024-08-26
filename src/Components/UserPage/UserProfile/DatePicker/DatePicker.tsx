import { useRef } from "react";
import { isDigit } from "./dateHelpers";
import { DateInput } from "./DateInput";

type tDatePicker = {
  dayInput: string;
  monthInput: string;
  yearInput: string;
  setDayInput: React.Dispatch<React.SetStateAction<string>>;
  setMonthInput: React.Dispatch<React.SetStateAction<string>>;
  setYearInput: React.Dispatch<React.SetStateAction<string>>;
};

export const DatePicker = ({
  dayInput,
  monthInput,
  yearInput,
  setDayInput,
  setMonthInput,
  setYearInput,
}: tDatePicker) => {
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const onChangeMonthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (
      (inputValue.length < 3 && isDigit(inputValue[inputValue.length - 1])) ||
      inputValue.length === 0
    )
      setMonthInput(e.target.value);
    if (inputValue.length > 1) {
      dayRef.current?.focus();
      dayRef.current?.select();
    }
  };
  const onChangeDayhHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length === 0) {
      monthRef.current?.focus();
      monthRef.current?.select();
      setDayInput(e.target.value);
    }
    if (inputValue.length < 3 && isDigit(inputValue[inputValue.length - 1]))
      setDayInput(e.target.value);
    if (inputValue.length > 1) {
      yearRef.current?.focus();
      yearRef.current?.select();
    }
  };
  const onChangeYearhHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length === 0) {
      dayRef.current?.focus();
      dayRef.current?.select();
      setYearInput(e.target.value);
    }
    if (inputValue.length < 5 && isDigit(inputValue[inputValue.length - 1]))
      setYearInput(inputValue);
  };

  return (
    <>
      <label>Date of birth</label>
      <div className="date-wrapper">
        <div className="user-profile-div-date">
          <label>mm</label>
          <DateInput
            inputProps={{
              ref: monthRef,
              value: monthInput,
              onChange: (e) => onChangeMonthHandler(e),
            }}
          />
        </div>
        <div className="user-profile-div-date">
          <label>dd</label>
          <DateInput
            inputProps={{
              ref: dayRef,
              value: dayInput,
              onChange: (e) => onChangeDayhHandler(e),
            }}
          />
        </div>
        <div className="user-profile-div-date">
          <label>yyyy</label>
          <DateInput
            inputProps={{
              value: yearInput,
              ref: yearRef,
              onChange: (e) => onChangeYearhHandler(e),
            }}
          />
        </div>
      </div>
    </>
  );
};
