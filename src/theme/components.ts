import { MantineTheme, MantineThemeOther } from "@mantine/core";

const Fields: MantineThemeOther = {
  defaultProps: {
    size: "md",
    radius: "md",
  },
  styles: (theme: MantineTheme) => ({
    label: {
      fontSize: theme.fontSizes.md,
      fontWeight: 400,
      marginBottom: 4,
      color: theme.colors.neutral[5],
    },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
  DatePicker: Fields,
  Select: Fields,
  NativeSelect: Fields,
  Textarea: Fields,
  TextInput: Fields,
  Checkbox: Fields,
  DateInput: Fields,
  NumberInput: Fields,
  PasswordInput: Fields,
  DatePickerInput: Fields,
  MultiSelect: Fields,
  Text: {
    defaultProps: (theme: MantineTheme) => ({
      color: theme.colors.neutral[6],
    }),
  },
  Button: {
    defaultProps: {
      size: "md",
      radius: "md",
    },
  },
  Switch: {
    styles: (theme: MantineTheme) => ({
      label: {
        fontSize: theme.fontSizes.md,
        fontWeight: 500,
        color: theme?.colors?.neutral[6],
      },
    }),
  },
  RadioGroup: {
    styles: (theme: MantineTheme) => ({
      label: {
        fontSize: theme.fontSizes.md,
        fontWeight: 400,
        marginBottom: 10,
        color: theme.colors.neutral[5],
      },
    }),
  },
  Pagination: {
    defaultProps: {
      color: "primary.5",
    },
  },
  LoadingOverlay: {
    defaultProps: {
      zIndex: 1,
      overlayBlur: 1,
    },
  },
  Menu: {
    defaultProps: {
      shadow: "md",
    },
  },
  Modal: {
    defaultProps: {
      radius: "md",
      centered: true,
      closeButtonProps: {
        size: "md",
      },
    },
    styles: (theme: MantineTheme) => ({
      trapFocus: false,
      content: { padding: 0 },
      header: { position: "static", borderBottom: "1px solid #dddddd" },
      body: { padding: 0 },
      title: {
        fontSize: 18,
        fontWeight: 600,
        color: theme.colors.neutral[8],
      },
      close: {
        top: 16,
        right: 16,
        position: "absolute",
      },
    }),
  },
  Card: {
    defaultProps: {
      shadow: "none",
    },
  },
  NavLink: {
    styles: (theme: MantineTheme) => ({
      label: {
        fontSize: theme.fontSizes.md,
        fontWeight: 500,
        color: "inherit",
      },
    }),
  },
};

export default components;
