import { FC } from "react";
import { InputProps } from "../../../../types";

type TDateInputProps = {
  inputProps: InputProps;
};

export const DateInput: FC<TDateInputProps> = ({ inputProps }) => {
  return (
    <>
      <input
        type="text"
        className="us-profile-small-input"
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        {...inputProps}
      />
    </>
  );
};
