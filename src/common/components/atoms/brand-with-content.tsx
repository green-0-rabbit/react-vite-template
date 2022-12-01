/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import { Button, ButtonProps } from "@mantine/core";
import { ForwardedRef, forwardRef, ReactNode } from "react";

const CustomButton: ButtonProps = {
  sx: {
    border: "none"
  }
};

interface IButton extends ButtonProps {
  children: ReactNode;
}

const BrandWithContent = forwardRef(
  (props: IButton, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children } = props;
    return (
      <Button fullWidth {...CustomButton} ref={ref}>
        {children}
      </Button>
    );
  }
);
export default BrandWithContent;
