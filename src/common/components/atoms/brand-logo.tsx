/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { FC } from "react";
import { Box, Text } from "@mantine/core";

const Logo = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface IBrandLogo {
  color?: string;
  size?: number;
}
const BrandLogo: FC<IBrandLogo> = ({
  size = undefined,
  color = "black",
  ...props
}) => (
  <Logo>
    <Box>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size && size * 0.7}
        viewBox="0 0 225.188 150">
        <g transform="translate(0.001 0.004)">
          <path
            fill={`${color === "dark" ? "white" : "black"}`}
            d="M1.381,138.963,0,137.517,107.34,34.972V138.24h-2V39.648Z"
          />
          <path
            fill={`${color === "dark" ? "white" : "black"}`}
            d="M223.773,138.247,90.36,4.824V138.24h-2V0L225.187,136.833Z"
          />
        </g>
      </svg>
    </Box>
    <Text component="h1"style={{ fontFamily: "TwCenMT-Regular" }}>
      A R R I S
    </Text>
  </Logo>
);
export default BrandLogo;
