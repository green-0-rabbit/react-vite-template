/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
import {
  Accordion,
  AccordionProps,
  createStyles
  // useAccordionState
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";

const borderRadius = "15px";
const border = "1px solid rgba(0, 0, 0, .125)";

const useStyles = createStyles((theme, _params, getRef) => ({
  icon: { ref: getRef("icon") },

  control: {
    ref: getRef("control"),
    border: 0,
    opacity: 0.6,
    borderRadius,
    boxShadow: "0px 0px 21px 0px #5f5f5f1a",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    "&:hover": {
      backgroundColor: "transparent",
      opacity: 1
    }
  },

  item: {
    borderBottom: border,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border,
    borderRadius
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],

    [`& .${getRef("control")}`]: {
      opacity: 1
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)"
    }
  },

  content: {
    paddingLeft: 0
  }
}));
interface IDropDown extends Omit<AccordionProps, "children"> {
  title: string;
  fixed?: boolean;
  defaultExpanded?: boolean;
}

const DropDown: FC<IDropDown> = (props) => {
  const { title, children, defaultExpanded, fixed, ...rest } = props;
  // const expandedDefaultValue = fixed ? true : defaultExpanded;
  // const [expanded, setExpanded] = useState(expandedDefaultValue);
  // const [state, handlers] = useAccordionState();
  const [value, setValue] = useState({
    total: 1,
    initialItem: 0
  });
  const { classes } = useStyles();

  return (
    <Accordion
      // value={value}
      // onChange={() => setValue}
      classNames={classes}
      chevron={<IconPlus size={16} />}
      {...rest}>
      <Accordion.Item value={title}>{children}</Accordion.Item>
    </Accordion>
  );
};

export default DropDown;
