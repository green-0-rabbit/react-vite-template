import { MantineThemeOverride, Text, Button, ButtonStylesParams, MantineTheme, AvatarStylesParams, InputStylesParams, ScrollAreaStylesParams, } from "@mantine/core";
import { redirect } from "react-router-dom";

// type MantineThemeType = Pick<MantineProviderProps, "theme">;

const theme: MantineThemeOverride = {
  colorScheme: 'light',

  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400
    // "2xl": 1536
  },

  focusRing: 'auto',
  cursorType: 'pointer',
  defaultRadius: 'md',
  colors: {
    'primary': ['#D1DFFA', '#BACFF7', '#A3BEF5', '#8CAEF2', '#759EF0', '#5D8EED', '#3470E8', '#1857D5', '#1345AA', '#0E3480'],
    'secondary': ['#A2FF8B', '#83FF65', '#65FF3E', '#46FF17', '#30F000', '#29CD00', '#22AB00', '#1B8900', '#156700', '#0E4400'],
    'text': ['#BBBBBB', '#A5A5A5', '#8E8E8E', '#777777', '#616161', '#535353', '#454545', '#373737', '#2A2A2A', '#1C1C1C'],
    'icon': ['#f4f4f4', '#C5C5C5', '#B2B2B2', '#9E9E9E', '#8B8B8B', '#787878', '#676767', '#565656', '#444444', '#333333'],
    'disabled': ['#F4F4F4'],
  },
  primaryColor: 'primary',
  primaryShade: { light: 5, dark: 5 },
  fontFamily: "TwCenMT-Regular",
  headings: {
    fontFamily: "TwCenMT-Regular",
    sizes: {
      h1: { fontSize: 30, lineHeight: 1.4 },
      h2: { fontSize: 28, lineHeight: 1.5 },
    },
  },
  // fontFamilyMonospace: string ,  //To add after
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32
  },
  spacing: {
    xs: 8,
    sm: 14,
    md: 20,
    lg: 26,
    xl: 32
  },


  components: {
    Grid: {
      defaultProps: {
        gutter: 'md'
      }
    },
    Group: {
      defaultProps: {
        spacing: 'md'
      }
    },
    SimpleGrid: {
      defaultProps: {
        spacing: 'md',
        verticalSpacing: 'xs'
      }
    },



    Text: {
      defaultProps: {
        size: "sm",
        color: 'text'
      }
    },
    Input: {
      defaultProps: {
        radius: 'md',
        // variant: 'filled',
      },
      styles: (theme, params: InputStylesParams) => (
        {
          root: {
            backgroundColor: theme.colors.orange,
          },
        }),
    },
    Button: {
      defaultProps: {
        radius: 'lg',
        variant: 'filled',
      },
      // Subscribe to theme and component params
      styles: (theme, params: ButtonStylesParams) => (
        {
          root: {
      
            ':active&:hover': {
              outline: params.variant === 'filled'
                ? '2px solid ' + theme.colors[params.color || theme.primaryColor][5]
                : undefined,
              outlineOffset: '2px',
            }
          },
        }),
    },




    Card: {
      defaultProps: {
        p: "lg",
        radius: 'lg',
        shadow: "md",
      }
    },

    Avatar: {
      defaultProps: {
        color: 'icon',
        variant: 'light',
        radius: 'xl',
        size: 'md'
      },

    },

    Drawer: {
      defaultProps: {
        padding: 'xl',
        size: 'xl',
        position: 'right',
        overlayBlur: 0.8,
      }
    },

   

    Modal: {
      defaultProps: {
        padding: 'xl',
        overlayBlur: 0.8,
        overlayOpacity: 0.75,
      },
     
    },



  }


};

export default theme;
